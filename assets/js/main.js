/**
 * Modern E-Commerce Website
 * Main JavaScript file
 */

// DOM Elements
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const productGrid = document.querySelector(".product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const filterForm = document.getElementById("filter-form");
const sortSelect = document.getElementById("sort-select");

// State Management
let state = {
  products: [],
  cart: [],
  filteredProducts: [],
  filters: {
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
    search: "",
  },
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// Mobile Menu Toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const expanded =
      mobileMenuBtn.getAttribute("aria-expanded") === "true" || false;
    mobileMenuBtn.setAttribute("aria-expanded", !expanded);

    // Toggle menu icon between bars and times
    const icon = mobileMenuBtn.querySelector("i");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Search Form
if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    performSearch();
  });
}

if (searchInput) {
  // Add keyup event for real-time searching
  searchInput.addEventListener("keyup", function (e) {
    // Only search if there are 3 or more characters or if the field is empty
    if (searchInput.value.length >= 3 || searchInput.value.length === 0) {
      performSearch();
    }
  });
}

// Filter Form
if (filterForm) {
  filterForm.addEventListener("change", () => {
    const categorySelect = document.getElementById("category-select");
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");

    if (categorySelect) state.filters.category = categorySelect.value;
    if (minPriceInput)
      state.filters.minPrice = parseFloat(minPriceInput.value) || 0;
    if (maxPriceInput)
      state.filters.maxPrice = parseFloat(maxPriceInput.value) || 1000;

    filterProducts();
  });
}

// Sort Products
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    sortProducts(sortSelect.value);
  });
}

// Checkout Button
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (state.cart.length === 0) {
      showMessage("Your cart is empty!", "error");
      return;
    }

    // In a real app, this would navigate to a checkout page or open a modal
    showMessage("Proceeding to checkout...", "success");

    // For demo purposes, we'll just clear the cart after a delay
    setTimeout(() => {
      state.cart = [];
      saveCart();
      updateCartDisplay();
      showMessage("Order placed successfully!", "success");
    }, 2000);
  });
}

// Toggle search bar when search icon is clicked
const searchIcon = document.querySelector('.nav-icon[aria-label="Search"]');
const searchContainer = document.querySelector(".search-container");

if (searchIcon && searchContainer) {
  searchIcon.addEventListener("click", function (e) {
    e.preventDefault();
    searchContainer.style.display =
      searchContainer.style.display === "block" ? "none" : "block";
    if (searchContainer.style.display === "block") {
      document.getElementById("search-input").focus();
    }
  });
}

// Toggle filter container on mobile
const filterToggle = document.getElementById("filter-toggle");
const filterContainer = document.getElementById("filter-container");

if (filterToggle && filterContainer) {
  filterToggle.addEventListener("click", function () {
    filterContainer.classList.toggle("show");
    this.innerHTML = filterContainer.classList.contains("show")
      ? '<i class="fas fa-times"></i> Hide Filters'
      : '<i class="fas fa-filter"></i> Show Filters';
  });
}

// Initialize range slider for price filter if it exists
const priceRange = document.getElementById("price-range");
if (priceRange) {
  // We'd normally use noUiSlider or similar library
  // For now we'll use a placeholder
  priceRange.addEventListener("input", function () {
    const value = this.value.split(",");
    if (document.getElementById("min-price-display")) {
      document.getElementById("min-price-display").textContent = `$${value[0]}`;
    }
    if (document.getElementById("max-price-display")) {
      document.getElementById("max-price-display").textContent = `$${value[1]}`;
    }
  });
}

// Initialize App
function initApp() {
  loadProducts();
  loadCart();

  // Initialize any sliders or carousels
  initSlider();
}

// Load Products
async function loadProducts() {
  try {
    // In a real app, this would be an API call
    // For now, we'll load from the JSON file
    const response = await fetch("/assets/data/products.json");
    const data = await response.json();

    if (data && data.products) {
      state.products = data.products;
      state.filteredProducts = [...state.products];
      renderProducts();
    }
  } catch (error) {
    console.error("Error loading products:", error);
    // Fallback to hardcoded products if loading fails
    state.products = [
      {
        id: 1,
        name: "Modern Laptop Pro",
        price: 1299.99,
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
        description:
          "Powerful laptop with the latest processor and stunning display.",
        featured: true,
        new: false,
      },
      // Add a few more products as fallback
      {
        id: 2,
        name: "Wireless Headphones",
        price: 249.99,
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description:
          "Premium wireless headphones with active noise cancellation.",
        featured: true,
        new: false,
      },
      {
        id: 6,
        name: "Running Shoes",
        price: 129.99,
        category: "footwear",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        description:
          "Lightweight running shoes with excellent support and cushioning.",
        featured: true,
        new: false,
      },
    ];

    state.filteredProducts = [...state.products];
    renderProducts();

    showMessage(
      "Failed to load all products. Showing limited selection.",
      "error"
    );
  }
}

// Load Cart from localStorage
function loadCart() {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
      updateCartDisplay();
    }
  } catch (error) {
    console.error("Error loading cart:", error);
    showMessage("Failed to load your shopping cart.", "error");
  }
}

// Save Cart to localStorage
function saveCart() {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
}

// Add Product to Cart
function addToCart(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart();
  updateCartDisplay();
  showMessage(`${product.name} added to your cart!`, "success");
}

// Update Cart Item Quantity
function updateCartQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cartItem = state.cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = quantity;
    saveCart();
    updateCartDisplay();
  }
}

// Remove Item from Cart
function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartDisplay();
  showMessage("Item removed from your cart.", "info");
}

// Update Cart Display
function updateCartDisplay() {
  // Update cart count in header
  if (cartCount) {
    const totalItems = state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cartCount.textContent = totalItems;
    cartCount.classList.toggle("hidden", totalItems === 0);
  }

  // Update cart page if we're on it
  if (cartItemsContainer) {
    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="text-center">Your cart is empty.</p>';
      if (cartTotal) cartTotal.textContent = "0.00";
      return;
    }

    let cartHtml = "";
    let totalPrice = 0;

    state.cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      cartHtml += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p class="product-price">$${item.price.toFixed(2)}</p>
            <div class="quantity-control">
              <button class="btn-sm" onclick="updateCartQuantity(${item.id}, ${
        item.quantity - 1
      })">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="btn-sm" onclick="updateCartQuantity(${item.id}, ${
        item.quantity + 1
      })">+</button>
            </div>
          </div>
          <div class="cart-item-actions">
            <p class="item-total">$${itemTotal.toFixed(2)}</p>
            <button class="btn-sm" onclick="removeFromCart(${
              item.id
            })">Remove</button>
          </div>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = cartHtml;
    if (cartTotal) cartTotal.textContent = totalPrice.toFixed(2);
  }
}

// Render Products
function renderProducts() {
  if (!productGrid) return;

  if (state.filteredProducts.length === 0) {
    productGrid.innerHTML =
      '<p class="text-center">No products found matching your criteria.</p>';
    return;
  }

  let productsHtml = "";

  state.filteredProducts.forEach((product) => {
    productsHtml += `
      <div class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
          <button class="btn" onclick="addToCart(${
            product.id
          })">Add to Cart</button>
        </div>
      </div>
    `;
  });

  productGrid.innerHTML = productsHtml;
}

// Filter Products
function filterProducts() {
  state.filteredProducts = state.products.filter((product) => {
    // Category filter
    if (
      state.filters.category !== "all" &&
      product.category !== state.filters.category
    ) {
      return false;
    }

    // Price range filter
    if (
      product.price < state.filters.minPrice ||
      product.price > state.filters.maxPrice
    ) {
      return false;
    }

    // Search filter
    if (
      state.filters.search &&
      !product.name.toLowerCase().includes(state.filters.search) &&
      !product.description.toLowerCase().includes(state.filters.search)
    ) {
      return false;
    }

    return true;
  });

  renderProducts();
}

// Sort Products
function sortProducts(sortBy) {
  switch (sortBy) {
    case "price-low-high":
      state.filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      state.filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name-a-z":
      state.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-z-a":
      state.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  renderProducts();
}

// Show Message (Toast Notification)
function showMessage(message, type = "info") {
  // Check if toast container exists, if not create it
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <p>${message}</p>
    </div>
  `;

  // Add toast to container
  toastContainer.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add("toast-hide");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Initialize Slider
function initSlider() {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".dot");
  let currentIndex = 0;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the current slide and activate the corresponding dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  // Auto advance slides
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);

  // Click event for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });
}

// Make functions available globally
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

function performSearch() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const resultsContainer = document.getElementById("search-results");

  if (!resultsContainer) return;

  // Check if query is empty
  if (query === "") {
    resultsContainer.innerHTML = "";
    resultsContainer.style.display = "none";
    return;
  }

  // Filter products based on search query
  const filteredProducts = state.products.filter((product) => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });

  // Display results
  if (filteredProducts.length === 0) {
    resultsContainer.innerHTML = '<p class="text-center">No results found</p>';
  } else {
    let html = '<div class="search-results-header">';
    html += `<h3>${filteredProducts.length} result${
      filteredProducts.length !== 1 ? "s" : ""
    } found</h3>`;
    html +=
      '<button class="close-search" aria-label="Close search"><i class="fas fa-times"></i></button>';
    html += "</div>";
    html += '<div class="search-results-grid">';

    filteredProducts.forEach((product) => {
      html += `
        <div class="search-result-item">
          <img src="${product.image}" alt="${
        product.name
      }" class="search-result-img">
          <div class="search-result-info">
            <h4>${product.name}</h4>
            <p class="search-result-price">$${product.price.toFixed(2)}</p>
            <p class="search-result-category">${product.category}</p>
            <div class="search-result-actions">
              <a href="pages/product.html?id=${
                product.id
              }" class="btn btn-sm">View Details</a>
              <button class="btn btn-sm add-to-cart" data-id="${
                product.id
              }">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
    });

    html += "</div>";
    resultsContainer.innerHTML = html;

    // Add event listener to close button
    const closeButton = resultsContainer.querySelector(".close-search");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        resultsContainer.innerHTML = "";
        resultsContainer.style.display = "none";
        searchInput.value = "";
      });
    }

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = resultsContainer.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.dataset.id);
        addToCart(productId);
      });
    });
  }

  // Show results container
  resultsContainer.style.display = "block";
}

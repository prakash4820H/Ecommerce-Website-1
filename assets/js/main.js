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
    state.filters.search = searchInput.value.trim().toLowerCase();
    filterProducts();
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
      },
      {
        id: 2,
        name: "Wireless Noise-Cancelling Headphones",
        price: 249.99,
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description:
          "Premium wireless headphones with active noise cancellation.",
      },
      {
        id: 3,
        name: "Smart Fitness Watch",
        price: 199.99,
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
        description:
          "Track your fitness goals with this smart watch featuring heart rate monitoring.",
      },
      {
        id: 4,
        name: "Designer T-Shirt",
        price: 49.99,
        category: "clothing",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        description: "Premium cotton t-shirt with modern design.",
      },
      {
        id: 5,
        name: "Slim Fit Jeans",
        price: 79.99,
        category: "clothing",
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
        description: "Comfortable slim fit jeans perfect for any occasion.",
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
      },
      {
        id: 7,
        name: "Mechanical Keyboard",
        price: 149.99,
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1595225476474-57ff36594559?auto=format&fit=crop&w=600&q=80",
        description:
          "Tactile mechanical keyboard with RGB backlighting for gaming and typing.",
      },
      {
        id: 8,
        name: "Smart Home Speaker",
        price: 199.99,
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=600&q=80",
        description:
          "Voice-controlled smart speaker with premium sound quality.",
      },
      {
        id: 9,
        name: "Winter Jacket",
        price: 149.99,
        category: "clothing",
        image:
          "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80",
        description:
          "Warm and stylish winter jacket with water-resistant outer shell.",
      },
      {
        id: 10,
        name: "Leather Wallet",
        price: 59.99,
        category: "accessories",
        image:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        description:
          "Genuine leather wallet with multiple card slots and cash compartment.",
      },
      {
        id: 11,
        name: "Wireless Earbuds",
        price: 129.99,
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?auto=format&fit=crop&w=600&q=80",
        description:
          "True wireless earbuds with long battery life and crystal clear sound.",
      },
      {
        id: 12,
        name: "Casual Sneakers",
        price: 89.99,
        category: "footwear",
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
        description:
          "Stylish and comfortable casual sneakers for everyday wear.",
      },
    ];

    state.filteredProducts = [...state.products];
    renderProducts();
  } catch (error) {
    console.error("Error loading products:", error);
    showMessage("Failed to load products. Please try again later.", "error");
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

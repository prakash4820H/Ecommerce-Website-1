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
  initScrollToTop();
  initMobileMenuOverlay();
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
    // Get the value of the range slider
    const value = this.value;
    // Default to minimum value
    const minPrice = 0;
    // Parse the max value as a number
    const maxPrice = parseInt(value, 10) || 1000;

    // Update the display elements
    if (document.getElementById("min-price-display")) {
      document.getElementById("min-price-display").textContent = `$${minPrice}`;
    }
    if (document.getElementById("max-price-display")) {
      document.getElementById("max-price-display").textContent = `$${maxPrice}`;
    }

    // Update the filter state
    state.filters.minPrice = minPrice;
    state.filters.maxPrice = maxPrice;

    // Apply filtering
    filterProducts();
  });
}

// Initialize filter elements
function initFilters() {
  // Initialize range sliders
  const minRangeSlider = document.querySelector(".min-price-range");
  const maxRangeSlider = document.querySelector(".max-price-range");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");

  if (minRangeSlider && maxRangeSlider) {
    // Update range sliders based on input values
    minPriceInput.addEventListener("input", function () {
      minRangeSlider.value = this.value;
      updateSliderTrack();
      filterProducts();
    });

    maxPriceInput.addEventListener("input", function () {
      maxRangeSlider.value = this.value;
      updateSliderTrack();
      filterProducts();
    });

    // Update input values based on range sliders
    minRangeSlider.addEventListener("input", function () {
      const minVal = parseInt(this.value);
      const maxVal = parseInt(maxRangeSlider.value);

      if (minVal > maxVal) {
        this.value = maxVal;
        minPriceInput.value = maxVal;
      } else {
        minPriceInput.value = minVal;
      }

      updateSliderTrack();
      filterProducts();
    });

    maxRangeSlider.addEventListener("input", function () {
      const minVal = parseInt(minRangeSlider.value);
      const maxVal = parseInt(this.value);

      if (maxVal < minVal) {
        this.value = minVal;
        maxPriceInput.value = minVal;
      } else {
        maxPriceInput.value = maxVal;
      }

      updateSliderTrack();
      filterProducts();
    });

    // Function to update the slider track appearance
    function updateSliderTrack() {
      const minVal = parseInt(minRangeSlider.value);
      const maxVal = parseInt(maxRangeSlider.value);
      const track = document.querySelector(".slider-track");

      if (track) {
        const min = parseInt(minRangeSlider.min);
        const max = parseInt(minRangeSlider.max);
        const minPercent = ((minVal - min) / (max - min)) * 100;
        const maxPercent = ((maxVal - min) / (max - min)) * 100;

        track.style.background = `linear-gradient(to right, #ddd ${minPercent}%, var(--primary-color) ${minPercent}%, var(--primary-color) ${maxPercent}%, #ddd ${maxPercent}%)`;
      }
    }

    // Initialize slider track
    updateSliderTrack();
  }

  // Add event listeners to filter checkboxes and radio buttons
  const filterCheckboxes = document.querySelectorAll(
    '.checkbox-container input[type="checkbox"]'
  );
  const filterRadios = document.querySelectorAll(
    '.rating-container input[type="radio"]'
  );

  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      // If the "All Categories" or "All Brands" checkbox is checked, uncheck the other options
      if (checkbox.value === "all") {
        const name = checkbox.getAttribute("name");
        if (checkbox.checked) {
          document
            .querySelectorAll(`input[name="${name}"]:not([value="all"])`)
            .forEach((cb) => {
              cb.checked = false;
            });
        }
      } else {
        // If any other option is checked, uncheck the "All" option
        const name = checkbox.getAttribute("name");
        if (checkbox.checked) {
          const allOption = document.querySelector(
            `input[name="${name}"][value="all"]`
          );
          if (allOption) {
            allOption.checked = false;
          }
        }
      }

      filterProducts();
    });
  });

  filterRadios.forEach((radio) => {
    radio.addEventListener("change", filterProducts);
  });

  // Reset filters button
  const resetFiltersBtn = document.getElementById("reset-filters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetFilters);
  }

  // Apply filters button (for mobile)
  const applyFiltersBtn = document.querySelector(".apply-filters-btn");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      const filterContainer = document.getElementById("filter-container");
      if (filterContainer) {
        filterContainer.classList.remove("show");
      }
    });
  }
}

// Reset all filters to default values
function resetFilters() {
  // Reset category checkboxes
  const allCategoryCheckbox = document.querySelector(
    'input[name="category"][value="all"]'
  );
  if (allCategoryCheckbox) {
    allCategoryCheckbox.checked = true;
    document
      .querySelectorAll('input[name="category"]:not([value="all"])')
      .forEach((cb) => {
        cb.checked = false;
      });
  }

  // Reset brand checkboxes
  const allBrandCheckbox = document.querySelector(
    'input[name="brand"][value="all"]'
  );
  if (allBrandCheckbox) {
    allBrandCheckbox.checked = true;
    document
      .querySelectorAll('input[name="brand"]:not([value="all"])')
      .forEach((cb) => {
        cb.checked = false;
      });
  }

  // Reset rating radios
  document.querySelectorAll('input[name="rating"]').forEach((radio) => {
    radio.checked = false;
  });

  // Reset discount checkboxes
  document.querySelectorAll('input[name="discount"]').forEach((cb) => {
    cb.checked = false;
  });

  // Reset price range
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const minRangeSlider = document.querySelector(".min-price-range");
  const maxRangeSlider = document.querySelector(".max-price-range");

  if (minPriceInput && maxPriceInput && minRangeSlider && maxRangeSlider) {
    minPriceInput.value = 0;
    maxPriceInput.value = 1000;
    minRangeSlider.value = 0;
    maxRangeSlider.value = 1000;

    // Update slider track
    const track = document.querySelector(".slider-track");
    if (track) {
      track.style.background = `linear-gradient(to right, #ddd 0%, var(--primary-color) 0%, var(--primary-color) 100%, #ddd 100%)`;
    }
  }

  // Apply filters
  filterProducts();
}

// Initialize App
function initApp() {
  loadProducts();
  loadCart();

  // Initialize any sliders or carousels
  initSlider();

  // Initialize filters
  initFilters();
}

// Load Products
async function loadProducts() {
  try {
    // Show loading state if product grid exists
    if (productGrid) {
      productGrid.innerHTML =
        '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p>Loading products...</p></div>';
    }

    // Determine the correct path to products.json based on the current location
    const isHomePage =
      window.location.pathname.endsWith("/") ||
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "" ||
      window.location.pathname === "/index.html";

    const productsPath = isHomePage
      ? "assets/data/products.json"
      : "../assets/data/products.json";

    // In a real app, this would be an API call
    // For now, we'll load from the JSON file with a path that works both locally and when deployed
    const response = await fetch(productsPath);

    // Check if response is ok
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data && data.products) {
      state.products = data.products;
      state.filteredProducts = [...state.products];
      renderProducts();

      // Update product count if element exists
      const productCount = document.getElementById("product-count");
      if (productCount) {
        productCount.textContent = state.products.length;
      }
    } else {
      throw new Error("Invalid product data format");
    }
  } catch (error) {
    console.error("Error loading products:", error);

    // Show error message in product grid if it exists
    if (productGrid) {
      productGrid.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <p>Failed to load products. Please try again later.</p>
          <button class="btn btn-sm" onclick="loadProducts()">Retry</button>
        </div>
      `;
    }

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
  const productName = product.title || product.name;
  showMessage(`${productName} added to your cart!`, "success");
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

  // Show loading state
  productGrid.innerHTML =
    '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p>Loading products...</p></div>';

  if (state.filteredProducts.length === 0) {
    productGrid.innerHTML =
      '<p class="text-center">No products found matching your criteria.</p>';
    return;
  }

  let productsHtml = "";

  state.filteredProducts.forEach((product) => {
    const name = product.name || product.title;
    // Calculate discount price if applicable
    let displayPrice = product.price;
    let oldPrice = "";
    if (product.discount && product.discount > 0) {
      const discountedPrice = product.price * (1 - product.discount / 100);
      oldPrice = `<span class="old-price">$${product.price.toFixed(2)}</span>`;
      displayPrice = discountedPrice;
    }

    // Generate rating stars
    let ratingStars = "";
    if (product.rating) {
      ratingStars = '<div class="product-rating">';
      // Full stars
      for (let i = 1; i <= Math.floor(product.rating); i++) {
        ratingStars += '<i class="fas fa-star"></i>';
      }
      // Half star if needed
      if (product.rating % 1 >= 0.5) {
        ratingStars += '<i class="fas fa-star-half-alt"></i>';
      }
      // Empty stars
      for (let i = Math.ceil(product.rating); i < 5; i++) {
        ratingStars += '<i class="far fa-star"></i>';
      }
      ratingStars += "</div>";
    }

    // Add product badges (new, discount)
    let badges = "";
    if (product.new) {
      badges += '<span class="product-badge new-badge">New</span>';
    }
    if (product.discount && product.discount > 0) {
      badges += `<span class="product-badge discount-badge">-${product.discount}%</span>`;
    }

    productsHtml += `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-container">
          <img src="${product.image}" alt="${name}" class="product-img">
          ${badges}
        </div>
        <div class="product-info">
          <h3 class="product-title">${name}</h3>
          <div class="product-meta">
            <p class="product-price">${oldPrice}$${displayPrice.toFixed(2)}</p>
            ${ratingStars}
          </div>
          <p class="product-brand">${product.brand || ""}</p>
          <p class="product-description">${product.description}</p>
          <div class="product-actions">
            <button class="btn add-to-cart-btn" onclick="addToCart(${
              product.id
            })">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <button class="btn-sm wishlist-btn" aria-label="Add to Wishlist">
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  productGrid.innerHTML = productsHtml;
}

// Filter Products
function filterProducts() {
  state.filteredProducts = state.products.filter((product) => {
    // Category filter (using checkbox)
    const categoryCheckboxes = document.querySelectorAll(
      'input[name="category"]:checked'
    );
    if (categoryCheckboxes.length > 0) {
      // If "All Categories" is checked, don't filter by category
      const allCategoriesChecked = Array.from(categoryCheckboxes).some(
        (cb) => cb.value === "all"
      );
      if (!allCategoriesChecked) {
        // Get all selected categories
        const selectedCategories = Array.from(categoryCheckboxes).map(
          (cb) => cb.value
        );
        if (!selectedCategories.includes(product.category)) {
          return false;
        }
      }
    }

    // Brand filter (using checkbox)
    const brandCheckboxes = document.querySelectorAll(
      'input[name="brand"]:checked'
    );
    if (brandCheckboxes.length > 0) {
      // If "All Brands" is checked, don't filter by brand
      const allBrandsChecked = Array.from(brandCheckboxes).some(
        (cb) => cb.value === "all"
      );
      if (!allBrandsChecked) {
        // Get all selected brands
        const selectedBrands = Array.from(brandCheckboxes).map(
          (cb) => cb.value
        );
        if (!selectedBrands.includes(product.brand.toLowerCase())) {
          return false;
        }
      }
    }

    // Rating filter (using radio)
    const ratingRadio = document.querySelector('input[name="rating"]:checked');
    if (ratingRadio) {
      const minRating = parseInt(ratingRadio.value, 10);
      if (product.rating < minRating) {
        return false;
      }
    }

    // Discount filter (using checkbox)
    const discountCheckboxes = document.querySelectorAll(
      'input[name="discount"]:checked'
    );
    if (discountCheckboxes.length > 0) {
      const selectedDiscounts = Array.from(discountCheckboxes).map((cb) =>
        parseInt(cb.value, 10)
      );
      // Check if product has at least the minimum discount from any selected options
      const hasRequiredDiscount = selectedDiscounts.some(
        (minDiscount) => product.discount >= minDiscount
      );
      if (!hasRequiredDiscount) {
        return false;
      }
    }

    // Price range filter
    const minPrice = document.getElementById("min-price")
      ? parseFloat(document.getElementById("min-price").value) || 0
      : state.filters.minPrice;

    const maxPrice = document.getElementById("max-price")
      ? parseFloat(document.getElementById("max-price").value) || 1000
      : state.filters.maxPrice;

    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    // Search filter
    if (
      state.filters.search &&
      !(product.title || product.name || "")
        .toLowerCase()
        .includes(state.filters.search.toLowerCase()) &&
      !(product.description || "")
        .toLowerCase()
        .includes(state.filters.search.toLowerCase()) &&
      !(product.category || "")
        .toLowerCase()
        .includes(state.filters.search.toLowerCase()) &&
      !(product.brand || "")
        .toLowerCase()
        .includes(state.filters.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Update product count display
  const productCount = document.getElementById("product-count");
  if (productCount) {
    productCount.textContent = state.filteredProducts.length;
  }

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
    const name = product.title || product.name || "";
    return (
      name.toLowerCase().includes(query) ||
      (product.category || "").toLowerCase().includes(query) ||
      (product.description || "").toLowerCase().includes(query)
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
      const productName = product.title || product.name;
      html += `
        <div class="search-result-item">
          <img src="${
            product.image
          }" alt="${productName}" class="search-result-img">
          <div class="search-result-info">
            <h4>${productName}</h4>
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

// Initialize scroll to top button
function initScrollToTop() {
  // Create the button if it doesn't exist
  if (!document.querySelector(".scroll-to-top")) {
    const scrollBtn = document.createElement("div");
    scrollBtn.className = "scroll-to-top";
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    });
  }
}

// Initialize mobile menu overlay
function initMobileMenuOverlay() {
  // Create overlay element if it doesn't exist
  if (!document.querySelector(".mobile-menu-overlay")) {
    const overlay = document.createElement("div");
    overlay.className = "mobile-menu-overlay";
    document.body.appendChild(overlay);

    // When mobile menu button is clicked
    if (mobileMenuBtn) {
      const originalClickHandler = mobileMenuBtn.onclick;

      mobileMenuBtn.onclick = function (e) {
        // Toggle overlay active class
        overlay.classList.toggle("active");

        // Call original handler if it exists
        if (originalClickHandler) {
          originalClickHandler.call(this, e);
        }
      };

      // Close menu when overlay is clicked
      overlay.addEventListener("click", () => {
        navLinks.classList.remove("active");
        overlay.classList.remove("active");

        const icon = mobileMenuBtn.querySelector("i");
        if (icon.classList.contains("fa-times")) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }

        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    }
  }
}

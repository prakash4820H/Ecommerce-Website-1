/* Product Data */
const products = [
  {
    id: 1,
    name: "THIS™ Isn't Chicken Thighs",
    price: 6.99,
    image:
      "https://downshiftology.com/wp-content/uploads/2019/02/Crispy-Baked-Chicken-Thighs-main.jpg",
    description: "Delicious, plant-based chicken thighs that taste real.",
    category: "chicken"
  },
  {
    id: 2,
    name: "THIS™ Isn't Bacon",
    price: 6.49,
    image:
      "https://www.allrecipes.com/thmb/tnXjQLBtzLNLfi7KEIuOrVzKbWs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/158727-bacon-for-the-family-or-a-crowd-beauty-DDMFS-071-d1cd1e76787b4374b3d046d50b709c83.jpeg",
    description: "Crispy, smoky, plant-based bacon strips.",
    category: "bacon"
  },
  {
    id: 3,
    name: "THIS™ Isn't Sausage",
    price: 6.79,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
    description: "Savory, spicy plant-based sausages.",
    category: "sausage"
  },
  {
    id: 4,
    name: "THIS™ Isn't Beef Burger",
    price: 7.0,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    description: "Juicy, flavorful burger that redefines taste.",
    category: "burger"
  }
  // Additional products can be added here following the same structure.
];

/* Global Variables */
let cart = [];
let wishlist = [];

/* Create Product Card HTML */
function createProductCard(product) {
  return `
    <div class="product-card animate-on-scroll">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>£${product.price.toFixed(2)}</p>
      <button class="add-to-cart" onclick="handleAddToCart(this, ${product.id})">Add to Cart</button>
      <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">Add to Wishlist</button>
      <button class="btn" onclick="openProductModal(${product.id})">View Details</button>
    </div>
  `;
}

/* Display Products in a Container */
function displayProducts(containerId, productArray) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = productArray.map(createProductCard).join("");
    observeAnimations(); // reapply observer for new elements
  }
}

/* Filter Products */
function filterProducts(category) {
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  displayProducts("all-products", filtered);
}

/* Add to Cart with Animation Feedback */
function handleAddToCart(button, productId) {
  addToCart(productId);
  button.classList.add("added");
  setTimeout(() => button.classList.remove("added"), 500);
}

/* Add Product to Cart */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  let cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
  alert(`${product.name} added to cart!`);
}

/* Toggle Wishlist */
function toggleWishlist(productId) {
  const index = wishlist.findIndex(item => item.id === productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    alert("Removed from wishlist!");
  } else {
    const product = products.find(p => p.id === productId);
    wishlist.push(product);
    alert("Added to wishlist!");
  }
  // Optionally update wishlist display here.
}

/* Product Details Modal */
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  const modalBody = document.getElementById("modal-body");
  if (modalBody) {
    modalBody.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}" style="width:100%;height:auto;">
      <p>${product.description}</p>
      <p>Price: £${product.price.toFixed(2)}</p>
      <!-- Placeholder video demo -->
      <video controls width="100%">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
    document.getElementById("product-modal").style.display = "flex";
  }
}

/* Close Modal */
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

/* Update Cart Display */
function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  if (cartContainer) {
    cartContainer.innerHTML = cart
      .map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div>
            <h4>${item.name}</h4>
            <p>£${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      `)
      .join("");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cart-total").innerText = total.toFixed(2);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Remove from Cart */
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

/* Intersection Observer for Scroll Animations */
let observer;
function observeAnimations() {
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });
  document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
}

/* Initialize on DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
  // Load saved cart from local storage
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  // Load products on respective pages
  if (document.getElementById("all-products")) {
    displayProducts("all-products", products);
  }
  if (document.getElementById("featured-products")) {
    displayProducts("featured-products", products.slice(0, 8));
  }
  if (document.getElementById("extended-products")) {
    displayProducts("extended-products", products);
  }

  updateCart();
  observeAnimations();
});

/* Hero Slider Functionality */
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slider .slide");
const dots = document.querySelectorAll(".slider-dots .dot");

function showSlide(index) {
  if (slides.length === 0) return;
  slides[currentSlide].classList.remove("active");
  if (dots[currentSlide]) dots[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");
}

setInterval(() => {
  const nextSlide = (currentSlide + 1) % slides.length;
  showSlide(nextSlide);
}, 5000);

/* Live Chat Widget */
function toggleChat() {
  const chatBox = document.getElementById("chat-box");
  if (chatBox.style.display === "flex") {
    chatBox.style.display = "none";
  } else {
    chatBox.style.display = "flex";
  }
}

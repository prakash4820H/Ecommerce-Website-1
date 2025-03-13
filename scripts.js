/* Product Data with 28 products */
const products = [
  {
    id: 1,
    name: "THIS™ Isn't Chicken Thighs",
    price: 6.99,
    image: "https://downshiftology.com/wp-content/uploads/2019/02/Crispy-Baked-Chicken-Thighs-main.jpg",
    description: "Delicious, plant-based chicken thighs that taste real.",
    category: "chicken"
  },
  {
    id: 2,
    name: "THIS™ Isn't Bacon",
    price: 6.49,
    image: "https://www.allrecipes.com/thmb/tnXjQLBtzLNLfi7KEIuOrVzKbWs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/158727-bacon-for-the-family-or-a-crowd-beauty-DDMFS-071-d1cd1e76787b4374b3d046d50b709c83.jpeg",
    description: "Crispy, smoky, plant-based bacon strips.",
    category: "bacon"
  },
  {
    id: 3,
    name: "THIS™ Isn't Sausage",
    price: 6.79,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
    description: "Savory, spicy plant-based sausages.",
    category: "sausage"
  },
  {
    id: 4,
    name: "THIS™ Isn't Beef Burger",
    price: 7.00,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    description: "Juicy, flavorful burger that redefines taste.",
    category: "burger"
  },
  {
    id: 5,
    name: "THIS™ Isn't Meatballs",
    price: 6.99,
    image: "https://www.flavcity.com/wp-content/uploads/2018/06/meatballs-tomato-sauce.jpg",
    description: "Tasty plant-based meatballs that pack a punch.",
    category: "meatballs"
  },
  {
    id: 6,
    name: "THIS™ Isn't Nuggets",
    price: 6.49,
    image: "https://www.lemontreedwelling.com/wp-content/uploads/2021/03/crispy-chicken-nuggets-featured.jpg",
    description: "Crispy and delicious nuggets made from plants.",
    category: "nuggets"
  },
  {
    id: 7,
    name: "THIS™ Isn't Roast",
    price: 6.79,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
    description: "A perfect roast for family dinners, reimagined.",
    category: "roast"
  },
  {
    id: 8,
    name: "THIS™ Isn't Steak",
    price: 7.00,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80",
    description: "Succulent plant-based steak that satisfies your cravings.",
    category: "steak"
  },
  {
    id: 9,
    name: "THIS™ Isn't Kebab",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80",
    description: "Flavorful and tender kebabs redefined for plant lovers.",
    category: "kebab"
  },
  {
    id: 10,
    name: "THIS™ Isn't Jerky",
    price: 6.49,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpTzfgGJziZr_hSfBRsNJjaYYmS2rQoVal2A&s",
    description: "A high-protein, chewy jerky made entirely from plants.",
    category: "jerky"
  },
  {
    id: 11,
    name: "THIS™ Isn't Pulled Pork",
    price: 6.79,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    description: "Melt-in-your-mouth pulled pork, now plant-based.",
    category: "pulled"
  },
  {
    id: 12,
    name: "THIS™ Isn't Lamb Chops",
    price: 7.00,
    image: "https://www.seriouseats.com/thmb/7krlJdfnpXB53aqHg-vBSHjiDPc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfectly-grilled-lamb-rib-or-loin-chops-recipe-hero-03-262fe2defc7c491688cb2d363dad3446.JPG",
    description: "Savor the taste of lamb with a sustainable twist.",
    category: "lamb"
  },
  {
    id: 13,
    name: "THIS™ Isn't Hot Dog",
    price: 6.99,
    image: "https://potatorolls.com/wp-content/uploads/2020/10/Basic-Hot-Dogs-960x640.jpg",
    description: "All the flavor of a classic hot dog in a plant-based form.",
    category: "hotdog"
  },
  {
    id: 14,
    name: "THIS™ Isn't Ribs",
    price: 6.49,
    image: "https://www.allrecipes.com/thmb/IWVelWahUb2gQxixWJC2N-HXp0k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/22469-Barbecue-Ribs-ddmfs-2x1-210-e799db142f594b00bb317bb357d0971c.jpg",
    description: "Finger-licking good ribs that are completely meat-free.",
    category: "ribs"
  },
  {
    id: 15,
    name: "THIS™ Isn't Burger Patty",
    price: 6.79,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
    description: "The perfect patty to create a gourmet plant-based burger.",
    category: "burger"
  },
  {
    id: 16,
    name: "THIS™ Isn't Sausage Roll",
    price: 7.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwpzxhnGRgE7kZ-bAh0_KNQNDh-xlFsbEQPg&s",
    description: "A savory snack that's perfect on the go.",
    category: "sausage roll"
  },
  {
    id: 17,
    name: "THIS™ Isn't Meatloaf",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
    description: "Comfort food redefined with a plant-based twist.",
    category: "meatloaf"
  },
  {
    id: 18,
    name: "THIS™ Isn't Deli Slices",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80",
    description: "Perfect for sandwiches and wraps, our deli slices are a game changer.",
    category: "deli"
  },
  {
    id: 19,
    name: "THIS™ Isn't Meat Crumbles",
    price: 6.79,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80",
    description: "Ideal for topping salads, pizzas, or pastas.",
    category: "crumbles"
  },
  {
    id: 20,
    name: "THIS™ Isn't Shreds",
    price: 7.00,
    image: "https://www.southernliving.com/thmb/RzX4eCIQUpQvnj-qQcyw2FwSUWk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Southern-Living_Shredded_Chicken_516-098e6399ff4a45cda9bcb7fe3a720b03.jpg",
    description: "Versatile shreds that work in a variety of dishes.",
    category: "shreds"
  },
  {
    id: 21,
    name: "THIS™ Isn't Filet",
    price: 6.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoa5TbiwJfR4hGDZtdHWAjorhCmSLu0n_A7A&s",
    description: "Premium, tender filets that redefine luxury in plant-based cuisine.",
    category: "filet"
  },
  {
    id: 22,
    name: "THIS™ Isn't Pot Pie",
    price: 6.49,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSTuSK-8gPrwH7h9PPL22hvSRB9bpaM4YVIQ&s",
    description: "Hearty and comforting, our pot pie is a full meal in every bite.",
    category: "potpie"
  },
  {
    id: 23,
    name: "THIS™ Isn't Casserole",
    price: 6.79,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5O1JLrAepd6wJFITSh5YU2oeHeOiLGiB4Q&s",
    description: "A delicious, home-style casserole that’s both hearty and healthy.",
    category: "casserole"
  },
  {
    id: 24,
    name: "THIS™ Isn't Tacos",
    price: 7.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1nHG02s92DPIjxyRlhseB3Tg9Q7xSdBpyCQ&s",
    description: "Spice up your meal time with these flavorful tacos.",
    category: "tacos"
  },
  {
    id: 25,
    name: "THIS™ Isn't Quesadilla",
    price: 6.99,
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/01/quesadilla.jpg",
    description: "A melty, cheesy delight that's completely plant-based.",
    category: "quesadilla"
  },
  {
    id: 26,
    name: "THIS™ Isn't Pasta Bolognese",
    price: 6.49,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK4eOu6izSAmIDDQaj6V4O7b4zI85A4BIPbQ&s",
    description: "Rich and savory sauce served over al dente pasta.",
    category: "pasta"
  },
  {
    id: 27,
    name: "THIS™ Isn't Curry",
    price: 6.79,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
    description: "A spicy, aromatic curry that will warm your heart.",
    category: "curry"
  },
  {
    id: 28,
    name: "THIS™ Isn't Stir-Fry",
    price: 7.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxEeNajhrGJcoGgbUcrrCP-w2Q81GVdV8L6A&s",
    description: "A quick and healthy stir-fry packed with flavor.",
    category: "stirfry"
  }
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
    observeAnimations(); // Reapply observer for new elements
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

  // Load products on respective pages:
  // For Products Page:
  if (document.getElementById("all-products")) {
    displayProducts("all-products", products);
  }
  // For Home Page: Featured (first 8) and Extended (all)
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

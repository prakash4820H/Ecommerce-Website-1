// Auth related functions
// Check if we're on the production domain
const isProduction =
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1";

// Use the appropriate API URL based on environment
const API_URL = "http://localhost:5000/api"; // Your local development server

// Toast notification function
function showToast(message, type = "info") {
  const toastContainer =
    document.querySelector(".toast-container") || createToastContainer();

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icon =
    type === "success"
      ? "check-circle"
      : type === "error"
      ? "exclamation-circle"
      : "info-circle";

  toast.innerHTML = `
    <i class="fas fa-${icon} toast-icon"></i>
    <div class="toast-content">
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  toastContainer.appendChild(toast);

  // Show toast with a slight delay for animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Auto-remove after 5 seconds
  const timeout = setTimeout(() => {
    removeToast(toast);
  }, 5000);

  // Add close button functionality
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    clearTimeout(timeout);
    removeToast(toast);
  });

  return toast;
}

function removeToast(toast) {
  toast.classList.remove("show");

  // Remove from DOM after animation completes
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.className = "toast-container";
  document.body.appendChild(container);
  return container;
}

// Login function
async function login(email, password, rememberMe = false) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store auth token in localStorage or sessionStorage based on "remember me"
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("authToken", data.token);
    storage.setItem("userId", data.userId);

    if (rememberMe) {
      localStorage.setItem("userEmail", email);
    } else {
      localStorage.removeItem("userEmail");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
}

// Logout function
function logout() {
  // Clear auth data
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  sessionStorage.removeItem("userId");

  // Redirect to login page
  window.location.href = "/pages/login.html";
}

// Check if user is logged in
function isLoggedIn() {
  return !!(
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  );
}

// Get saved credentials (for "Remember me" feature)
function getSavedCredentials() {
  return {
    email: localStorage.getItem("userEmail") || "",
  };
}

// Register function
async function register(userData) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
}

// Request password reset
async function requestPasswordReset(email) {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send password reset email");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Password reset request error:", error);
    return { success: false, error: error.message };
  }
}

// Reset password with token
async function resetPassword(token, newPassword) {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reset password");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, error: error.message };
  }
}

// Get current user data
async function getCurrentUser() {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, log user out
        logout();
        return null;
      }
      throw new Error("Failed to get user data");
    }

    return await response.json();
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

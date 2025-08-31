document.addEventListener("DOMContentLoaded", () => {
  // --- STATE MANAGEMENT & DATA ---
  const getFromStorage = (key, defaultValue = []) =>
    JSON.parse(localStorage.getItem(key)) || defaultValue;
  const saveToStorage = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));

  let state = {
    products: getFromStorage("products", [
      {
        id: 1,
        name: "Wireless Noise Cancelling Headphones",
        price: 99.99,
        rating: 4.5,
        image: "https://placehold.co/400x400/F90/FFF?text=Headphones",
        reviews: [],
      },
      {
        id: 2,
        name: "Smartwatch with Fitness Tracker",
        price: 129.5,
        rating: 4.7,
        image: "https://placehold.co/400x400/3498db/FFF?text=Smartwatch",
        reviews: [],
      },
      {
        id: 3,
        name: "Portable Bluetooth Speaker",
        price: 45.0,
        rating: 4.8,
        image: "https://placehold.co/400x400/2ecc71/FFF?text=Speaker",
        reviews: [],
      },
      {
        id: 4,
        name: "4K Ultra HD Smart TV 55-inch",
        price: 499.99,
        rating: 4.6,
        image: "https://placehold.co/400x400/e74c3c/FFF?text=Smart+TV",
        reviews: [],
      },
      {
        id: 5,
        name: "Ergonomic Office Chair",
        price: 180.0,
        rating: 4.3,
        image: "https://placehold.co/400x400/9b59b6/FFF?text=Chair",
        reviews: [],
      },
      {
        id: 6,
        name: "Electric Coffee Grinder",
        price: 29.95,
        rating: 4.9,
        image: "https://placehold.co/400x400/f1c40f/FFF?text=Grinder",
        reviews: [],
      },
      {
        id: 7,
        name: "Robot Vacuum Cleaner",
        price: 279.0,
        rating: 4.4,
        image: "https://placehold.co/400x400/1abc9c/FFF?text=Vacuum",
        reviews: [],
      },
      {
        id: 8,
        name: "Digital Air Fryer",
        price: 89.99,
        rating: 4.7,
        image: "https://placehold.co/400x400/d35400/FFF?text=Air+Fryer",
        reviews: [],
      },
      {
        id: 9,
        name: "Professional Gaming Mouse",
        price: 55.5,
        rating: 4.8,
        image: "https://placehold.co/400x400/c0392b/FFF?text=Mouse",
        reviews: [],
      },
      {
        id: 10,
        name: "Mechanical Keyboard",
        price: 75.0,
        rating: 4.6,
        image: "https://placehold.co/400x400/8e44ad/FFF?text=Keyboard",
        reviews: [],
      },
      {
        id: 11,
        name: "Yoga Mat with Carrying Strap",
        price: 25.0,
        rating: 4.5,
        image: "https://placehold.co/400x400/27ae60/FFF?text=Yoga+Mat",
        reviews: [],
      },
      {
        id: 12,
        name: "Insulated Water Bottle",
        price: 19.99,
        rating: 4.9,
        image: "https://placehold.co/400x400/2980b9/FFF?text=Bottle",
        reviews: [],
      },
      {
        id: 13,
        name: "Hardcover Fiction Bestseller",
        price: 15.99,
        rating: 4.8,
        image: "https://placehold.co/400x400/e67e22/FFF?text=Book",
        reviews: [],
      },
      {
        id: 14,
        name: "Scented Candle Set",
        price: 32.0,
        rating: 4.6,
        image: "https://placehold.co/400x400/34495e/FFF?text=Candles",
        reviews: [],
      },
      {
        id: 15,
        name: "Organic Green Tea Bags",
        price: 12.5,
        rating: 4.7,
        image: "https://placehold.co/400x400/16a085/FFF?text=Tea",
        reviews: [],
      },
      {
        id: 16,
        name: "Men's Classic Leather Wallet",
        price: 39.99,
        rating: 4.5,
        image: "https://placehold.co/400x400/7f8c8d/FFF?text=Wallet",
        reviews: [],
      },
      {
        id: 17,
        name: "HD Webcam for Streaming",
        price: 69.99,
        rating: 4.4,
        image: "https://placehold.co/400x400/f39c12/FFF?text=Webcam",
        reviews: [],
      },
      {
        id: 18,
        name: "Portable Power Bank 20000mAh",
        price: 49.99,
        rating: 4.7,
        image: "https://placehold.co/400x400/2c3e50/FFF?text=Power+Bank",
        reviews: [],
      },
      {
        id: 19,
        name: "Set of 3 Resistance Bands",
        price: 14.99,
        rating: 4.8,
        image: "https://placehold.co/400x400/95a5a6/FFF?text=Bands",
        reviews: [],
      },
      {
        id: 20,
        name: "Smart LED Light Bulb",
        price: 18.0,
        rating: 4.6,
        image: "https://placehold.co/400x400/bdc3c7/FFF?text=Bulb",
        reviews: [],
      },
    ]),
    users: getFromStorage("users", [
      { name: "Owner", email: "owner@amazon.com", password: "password" },
    ]),
    currentUser: getFromStorage("currentUser", null),
    cart: getFromStorage("cart", []),
  };

  // --- DOM ELEMENTS ---
  const pages = document.querySelectorAll(".page");
  const productGrid = document.getElementById("product-grid");
  const cartCountElement = document.getElementById("cart-count");
  const toast = document.getElementById("toast-notification");

  // --- ROUTER / NAVIGATION ---
  const navigate = (path) => {
    const [pageId, queryString] = path.split("?");
    const params = new URLSearchParams(queryString);

    pages.forEach((p) => p.classList.remove("active"));

    const targetPage = document.getElementById(`page-${pageId.substring(1)}`);
    if (targetPage) {
      targetPage.classList.add("active");
      window.scrollTo(0, 0);

      // Load page-specific content
      switch (pageId) {
        case "#home":
          showHomePage();
          break;
        case "#product":
          showProductPage(params.get("id"));
          break;
        case "#cart":
          showCartPage();
          break;
        case "#profile":
          showProfilePage();
          break;
      }
    } else {
      document.getElementById("page-home").classList.add("active");
      showHomePage();
    }
  };

  // --- PAGE RENDERERS ---
  const showHomePage = (productsToShow = state.products) => {
    productGrid.innerHTML = "";
    productsToShow.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className =
        "bg-white rounded-lg shadow-md p-4 flex flex-col product-card";
      productCard.innerHTML = `
                    <a href="#product?id=${
                      product.id
                    }" class="nav-link product-image-container flex-grow">
                        <img src="${product.image}" alt="${
        product.name
      }" class="w-full h-48 object-cover rounded-t-lg mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">${
                          product.name
                        }</h3>
                    </a>
                    <div class="flex items-center my-2">
                        ${generateStarRating(product.rating)}
                        <span class="text-sm text-gray-600 ml-2">${
                          product.rating
                        }</span>
                    </div>
                    <p class="text-2xl font-bold text-gray-900 mb-4">$${product.price.toFixed(
                      2
                    )}</p>
                    <button data-product-id="${
                      product.id
                    }" class="add-to-cart-btn mt-auto w-full bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded hover:bg-yellow-500 transition duration-300">Add to Cart</button>
                `;
      productGrid.appendChild(productCard);
    });
  };

  const showProductPage = (productId) => {
    const product = state.products.find((p) => p.id == productId);
    const pageElement = document.getElementById("page-product");
    if (!product) {
      pageElement.innerHTML = `<h2 class="text-2xl font-bold text-center">Product not found.</h2> <a href="#home" class="nav-link text-blue-600 text-center block mt-4">Go back home</a>`;
      return;
    }
    pageElement.innerHTML = `
                <div class="bg-white p-6 rounded-lg shadow-xl">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img src="${product.image}" alt="${
      product.name
    }" class="w-full h-auto object-cover rounded-lg shadow-md">
                        </div>
                        <div>
                            <h2 class="text-3xl font-bold mb-2">${
                              product.name
                            }</h2>
                            <div class="flex items-center mb-4">
                                ${generateStarRating(product.rating)}
                                <span class="text-gray-600 ml-3">${
                                  product.rating
                                } stars (${
      product.reviews.length
    } reviews)</span>
                            </div>
                            <p class="text-3xl font-bold text-gray-800 mb-4">$${product.price.toFixed(
                              2
                            )}</p>
                            <p class="text-gray-600 mb-6">This is a placeholder description. Experience premium quality and unmatched performance with this top-rated product.</p>
                            <button data-product-id="${
                              product.id
                            }" class="add-to-cart-btn w-full bg-yellow-400 text-gray-800 font-bold py-3 px-4 rounded hover:bg-yellow-500 transition duration-300">Add to Cart</button>
                        </div>
                    </div>
                    <div class="mt-8 border-t pt-6">
                        <h3 class="text-2xl font-bold mb-4">Customer Reviews</h3>
                        <div id="review-section" class="space-y-4 comment-section pr-2 mb-6"></div>
                        <div id="review-form-container"></div>
                    </div>
                </div>
            `;
    renderReviews(productId);
    renderReviewForm(productId);
  };

  const showCartPage = () => {
    const pageElement = document.getElementById("page-cart");
    if (state.cart.length === 0) {
      pageElement.innerHTML = `
                    <div class="bg-white p-8 rounded-lg shadow-xl text-center">
                        <h2 class="text-2xl font-bold mb-4">Your Amazon Cart is empty.</h2>
                        <p class="text-gray-600 mb-6">Check your Saved for later items, or <a href="#home" class="nav-link text-blue-600 hover:underline">continue shopping</a>.</p>
                    </div>`;
      return;
    }

    let subtotal = 0;
    const cartItemsHTML = state.cart
      .map((item) => {
        const product = state.products.find((p) => p.id === item.id);
        if (!product) return "";
        subtotal += product.price * item.quantity;
        return `
                    <div class="flex items-center justify-between border-b py-4">
                        <div class="flex items-center">
                            <img src="${product.image}" alt="${
          product.name
        }" class="w-24 h-24 object-cover rounded-md mr-4">
                            <div>
                                <h4 class="font-semibold">${product.name}</h4>
                                <p class="text-green-600 text-sm">In Stock</p>
                                <button data-product-id="${
                                  product.id
                                }" class="remove-from-cart-btn text-red-500 hover:underline text-sm mt-1">Remove</button>
                            </div>
                        </div>
                        <div class="flex items-center">
                             <input type="number" min="1" value="${
                               item.quantity
                             }" data-product-id="${
          product.id
        }" class="quantity-input w-16 text-center border rounded-md mr-4 p-1">
                            <p class="font-bold text-lg">$${(
                              product.price * item.quantity
                            ).toFixed(2)}</p>
                        </div>
                    </div>
                `;
      })
      .join("");

    pageElement.innerHTML = `
                <div class="bg-white p-8 rounded-lg shadow-xl">
                    <h2 class="text-3xl font-bold mb-6">Shopping Cart</h2>
                    <div class="cart-items">${cartItemsHTML}</div>
                    <div class="text-right mt-6">
                        <h3 class="text-xl font-bold">Subtotal (${state.cart.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )} items): <span class="text-red-700">$${subtotal.toFixed(
      2
    )}</span></h3>
                        <button class="mt-4 bg-yellow-500 text-gray-800 font-bold py-2 px-6 rounded hover:bg-yellow-600">Proceed to checkout</button>
                    </div>
                </div>
            `;
  };

  const showProfilePage = () => {
    const pageElement = document.getElementById("page-profile");
    if (!state.currentUser) {
      pageElement.innerHTML = `<div class="bg-white p-8 rounded-lg shadow-xl text-center"><h2 class="text-2xl font-bold">Please <a href="#login" class="nav-link text-blue-600">login</a> to see your profile.</h2></div>`;
      return;
    }

    const isOwner = state.currentUser.email === "owner@amazon.com";

    let profileContent = `
                <div class="bg-white p-8 rounded-lg shadow-xl">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-3xl font-bold">Welcome, ${state.currentUser.name}</h2>
                        <button id="logout-btn" class="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">Logout</button>
                    </div>
                    <p><strong>Email:</strong> ${state.currentUser.email}</p>
                </div>
            `;

    if (isOwner) {
      profileContent += `
                    <div class="bg-white p-8 rounded-lg shadow-xl mt-8">
                        <h3 class="text-2xl font-bold mb-4">Owner Dashboard: Manage Products</h3>
                        
                        <!-- Add Product Form -->
                        <form id="add-product-form" class="mb-8 p-4 border rounded-md bg-gray-50">
                            <h4 class="text-xl font-semibold mb-2">Add New Product</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" id="new-product-name" placeholder="Product Name" required class="p-2 border rounded">
                                <input type="number" id="new-product-price" placeholder="Price" step="0.01" required class="p-2 border rounded">
                                <input type="text" id="new-product-image" placeholder="Image URL" required class="p-2 border rounded">
                                <input type="number" id="new-product-rating" placeholder="Rating (1-5)" step="0.1" min="1" max="5" required class="p-2 border rounded">
                            </div>
                            <button type="submit" class="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Add Product</button>
                        </form>
                        
                        <!-- Product List -->
                        <h4 class="text-xl font-semibold mb-2">Existing Products</h4>
                        <div id="owner-product-list" class="space-y-2"></div>
                    </div>
                `;
    }

    pageElement.innerHTML = profileContent;
    if (isOwner) renderOwnerProductList();
  };

  // --- COMPONENT RENDERERS ---
  const generateStarRating = (rating, isInput = false, productId = null) => {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      const starClass =
        i <= rating
          ? "fas fa-star text-yellow-500"
          : "far fa-star text-yellow-500";
      if (isInput) {
        stars += `<i class="${starClass} cursor-pointer star-input" data-value="${i}" data-product-id="${productId}"></i>`;
      } else {
        stars += `<i class="${starClass}"></i>`;
      }
    }
    return `<div class="flex">${stars}</div>`;
  };

  const renderReviews = (productId) => {
    const product = state.products.find((p) => p.id == productId);
    const reviewSection = document.getElementById("review-section");
    if (!product || product.reviews.length === 0) {
      reviewSection.innerHTML =
        '<p class="text-gray-500">No reviews yet. Be the first!</p>';
      return;
    }
    reviewSection.innerHTML = product.reviews
      .map(
        (review) => `
                <div class="bg-gray-100 p-4 rounded-lg">
                    <div class="flex justify-between items-center">
                        <p class="font-bold text-gray-800">${
                          review.userName
                        }</p>
                        ${generateStarRating(review.rating)}
                    </div>
                    <p class="text-gray-600 mt-1">${review.text}</p>
                    <p class="text-xs text-gray-400 mt-1">${new Date(
                      review.timestamp
                    ).toLocaleString()}</p>
                </div>
            `
      )
      .join("");
  };

  const renderReviewForm = (productId) => {
    const container = document.getElementById("review-form-container");
    if (state.currentUser) {
      container.innerHTML = `
                    <form id="review-form" class="p-4 border rounded-md bg-gray-50">
                        <h4 class="text-xl font-semibold mb-2">Write a review</h4>
                        <div class="mb-2">
                            <label class="font-medium">Your Rating:</label>
                            <div id="rating-input" class="text-2xl" data-rating="0">
                                ${generateStarRating(0, true, productId)}
                            </div>
                        </div>
                        <textarea id="review-text" class="w-full p-2 border border-gray-300 rounded-md" rows="3" placeholder="Share your thoughts..." required></textarea>
                        <button type="submit" class="mt-2 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Submit Review</button>
                    </form>
                `;
    } else {
      container.innerHTML = `<p class="text-gray-600">You must be <a href="#login" class="nav-link text-blue-600 hover:underline">logged in</a> to post a review.</p>`;
    }
  };

  const renderOwnerProductList = () => {
    const listElement = document.getElementById("owner-product-list");
    listElement.innerHTML = state.products
      .map(
        (p) => `
                <div class="flex justify-between items-center p-2 border rounded">
                    <span>${p.name}</span>
                    <button data-product-id="${p.id}" class="remove-product-btn bg-red-500 text-white text-xs font-bold py-1 px-2 rounded hover:bg-red-600">Remove</button>
                </div>
            `
      )
      .join("");
  };

  // --- ACTIONS & LOGIC ---
  const updateCartCount = () => {
    cartCountElement.textContent = state.cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  };

  const showToastNotification = (message, isError = false) => {
    toast.textContent = message;
    toast.className = `fixed bottom-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300 ${
      isError ? "bg-red-500" : "bg-green-500"
    }`;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("opacity-0"), 2000);
    setTimeout(() => {
      toast.classList.add("hidden");
      toast.classList.remove("opacity-0");
    }, 2300);
  };

  const addToCart = (productId) => {
    const existingItem = state.cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      state.cart.push({ id: productId, quantity: 1 });
    }
    saveToStorage("cart", state.cart);
    updateCartCount();
    showToastNotification("Item added to cart!");
  };

  const removeFromCart = (productId) => {
    state.cart = state.cart.filter((item) => item.id !== productId);
    saveToStorage("cart", state.cart);
    updateCartCount();
    showCartPage(); // Re-render the cart page
    showToastNotification("Item removed from cart.", true);
  };

  const updateCartQuantity = (productId, quantity) => {
    const item = state.cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        saveToStorage("cart", state.cart);
        updateCartCount();
        showCartPage();
      }
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    if (state.users.find((user) => user.email === email)) {
      alert("User with this email already exists!");
      return;
    }
    state.users.push({ name, email, password });
    saveToStorage("users", state.users);
    alert("Account created! Please sign in.");
    window.location.hash = "#login";
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const user = state.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      state.currentUser = user;
      saveToStorage("currentUser", user);
      updateNavUI();
      window.location.hash = "#home";
      document.getElementById("login-form-element").reset();
    } else {
      alert("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    state.currentUser = null;
    localStorage.removeItem("currentUser");
    updateNavUI();
    window.location.hash = "#home";
  };

  const handleAddReview = (e, productId) => {
    e.preventDefault();
    const rating = parseInt(
      document.getElementById("rating-input").dataset.rating
    );
    const text = document.getElementById("review-text").value;
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }
    const newReview = {
      userName: state.currentUser.name,
      rating,
      text,
      timestamp: new Date().toISOString(),
    };
    const product = state.products.find((p) => p.id == productId);
    product.reviews.push(newReview);
    // Recalculate average rating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = (totalRating / product.reviews.length).toFixed(1);

    saveToStorage("products", state.products);
    showProductPage(productId); // Re-render
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const name = document.getElementById("new-product-name").value;
    const price = parseFloat(
      document.getElementById("new-product-price").value
    );
    const image = document.getElementById("new-product-image").value;
    const rating = parseFloat(
      document.getElementById("new-product-rating").value
    );

    const newProduct = {
      id: Date.now(), // Simple unique ID
      name,
      price,
      image,
      rating,
      reviews: [],
    };

    state.products.unshift(newProduct);
    saveToStorage("products", state.products);
    showProfilePage(); // Re-render profile page
    document.getElementById("add-product-form").reset();
    showToastNotification("Product added successfully!");
  };

  const handleRemoveProduct = (productId) => {
    if (confirm("Are you sure you want to remove this product?")) {
      state.products = state.products.filter((p) => p.id !== productId);
      saveToStorage("products", state.products);
      showProfilePage();
      showToastNotification("Product removed.", true);
    }
  };

  const updateNavUI = () => {
    if (state.currentUser) {
      document.getElementById("auth-links").classList.add("hidden");
      document.getElementById("user-greeting").classList.remove("hidden");
      document.getElementById(
        "greeting-message"
      ).textContent = `Hello, ${state.currentUser.name}`;
    } else {
      document.getElementById("auth-links").classList.remove("hidden");
      document.getElementById("user-greeting").classList.add("hidden");
    }
  };

  // --- EVENT LISTENERS ---
  document.body.addEventListener("click", (e) => {
    // Navigation links
    if (e.target.closest(".nav-link")) {
      e.preventDefault();
      window.location.hash = e.target.closest(".nav-link").getAttribute("href");
    }
    // Add to cart buttons
    if (e.target.closest(".add-to-cart-btn")) {
      const productId = parseInt(
        e.target.closest(".add-to-cart-btn").dataset.productId
      );
      addToCart(productId);
    }
    // Remove from cart button
    if (e.target.closest(".remove-from-cart-btn")) {
      const productId = parseInt(
        e.target.closest(".remove-from-cart-btn").dataset.productId
      );
      removeFromCart(productId);
    }
    // Logout button
    if (e.target.id === "logout-btn") {
      handleLogout();
    }
    // Star rating input
    if (e.target.matches(".star-input")) {
      const ratingValue = e.target.dataset.value;
      const ratingContainer = e.target.parentElement;
      ratingContainer.dataset.rating = ratingValue; // Store rating
      ratingContainer.innerHTML = generateStarRating(
        ratingValue,
        true,
        e.target.dataset.productId
      );
    }
    // Remove product button (owner)
    if (e.target.matches(".remove-product-btn")) {
      const productId = parseInt(e.target.dataset.productId);
      handleRemoveProduct(productId);
    }
  });

  document.body.addEventListener("submit", (e) => {
    if (e.target.id === "login-form-element") handleLogin(e);
    if (e.target.id === "signup-form-element") handleSignup(e);
    if (e.target.id === "review-form") {
      const productId = document.querySelector(".star-input").dataset.productId;
      handleAddReview(e, productId);
    }
    if (e.target.id === "add-product-form") handleAddProduct(e);
  });

  document.body.addEventListener("change", (e) => {
    if (e.target.matches(".quantity-input")) {
      const productId = parseInt(e.target.dataset.productId);
      const quantity = parseInt(e.target.value);
      updateCartQuantity(productId, quantity);
    }
  });

  document.getElementById("search-button").addEventListener("click", () => {
    const searchTerm = document
      .getElementById("search-input")
      .value.toLowerCase();
    const filteredProducts = state.products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
    navigate("#home");
    showHomePage(filteredProducts);
  });

  document.getElementById("search-input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      document.getElementById("search-button").click();
    }
  });

  window.addEventListener("hashchange", () =>
    navigate(window.location.hash || "#home")
  );

  // --- INITIALIZATION ---
  navigate(window.location.hash || "#home");
  updateCartCount();
  updateNavUI();
});

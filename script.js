const products = [
  {
    name: "Samsung Galaxy",
    url: "images/samsung_galaxy.png",
    type: "smartphones",
    price: 399.99,
  },
  {
    name: "Sony Playstation 5",
    url: "images/playstation_5.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/cannon_eos_camera.png",
    type: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "images/sony_a7_camera.png",
    type: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "images/lg_tv.png",
    type: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "images/nintendo_switch.png",
    type: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "images/xbox_series_x.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "images/samsung_tv.png",
    type: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "images/google_pixel.png",
    type: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "images/sony_zv1f_camera.png",
    type: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "images/toshiba_tv.png",
    type: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "images/iphone_14.png",
    type: "smartphones",
    price: 999.99,
  },
];

// DOM Elements
const ProductsWrapper = document.getElementById("Products-Wrapper");
const checkboxes = document.querySelectorAll(".check");
const Filterscontainer = document.getElementById("Filters-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsList = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");
const cartCountdown = document.getElementById("cart-countt");

let cartItems = [];
const Productelements = [];

// Open/Close Sidebar
openCartBtn.addEventListener("click", () =>
  cartSidebar.classList.remove("translate-x-full")
);
closeCartBtn.addEventListener("click", () =>
  cartSidebar.classList.add("translate-x-full")
);

// Create product elements
products.forEach((product) => {
  const Productelement = createProductElement(product);
  Productelements.push({ product, el: Productelement });
  ProductsWrapper.appendChild(Productelement);
});

function createProductElement(product) {
  const Productelement = document.createElement("div");
  Productelement.className = "item space-y-2";
  Productelement.innerHTML = `
    <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
      <img src=${product.url} alt=${
    product.name
  } class="w-full h-full object-cover" />
      <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0 cursor-pointer">
        Add to cart
      </button>
    </div>
    <p class="text-xl">${product.name}</p>
    <strong>$${product.price.toLocaleString()}</strong>
  `;

  Productelement.querySelector(".status").addEventListener("click", () =>
    updateCart(product, Productelement)
  );

  return Productelement;
}

// Add/Remove product from cart
function updateCart(product, element) {
  const btn = element.querySelector(".status");

  if (cartItems.includes(product)) {
    // Remove
    cartItems = cartItems.filter((p) => p !== product);
    btn.textContent = "Add to cart";
    btn.classList.remove("bg-red-600");
    btn.classList.add("bg-black");
  } else {
    // Add
    cartItems.push(product);
    btn.textContent = "Remove from cart";
    btn.classList.remove("bg-black");
    btn.classList.add("bg-red-600");
  }

  cartCount.textContent = cartItems.length;
  cartCount.style.display = cartItems.length ? "block" : "none";

  renderCartSidebar();
}

// Render Cart Sidebar
function renderCartSidebar() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cartItems.forEach((product) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-800 p-2 rounded mb-1";
    li.innerHTML = `
      <span>${product.name}</span>
      <span>$${product.price.toLocaleString()}</span>
      <button class="remove-btn bg-red-600 px-2 rounded ml-2">x</button>
    `;

    li.querySelector(".remove-btn").addEventListener("click", () => {
      cartItems = cartItems.filter((p) => p !== product);

      // Update main grid button
      const prodEl = Productelements.find((pe) => pe.product === product).el;
      const btn = prodEl.querySelector(".status");
      btn.textContent = "Add to cart";
      btn.classList.remove("bg-red-600");
      btn.classList.add("bg-black");

      cartCountdown.textContent = cartItems.length;
      cartCountdown.style.display = cartItems.length ? "block" : "none";

      renderCartSidebar();
    });

    cartItemsList.appendChild(li);
    total += product.price;
  });

  cartTotalEl.textContent = total.toLocaleString();
}

// Filter Products
Filterscontainer.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const checkedCategories = Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.id.toLowerCase());

  Productelements.forEach(({ product, el }) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm);
    const categoryMatch =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.type.toLowerCase());

    if (nameMatch && categoryMatch) el.classList.remove("hidden");
    else el.classList.add("hidden");
  });
}

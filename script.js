
// Productos de ejemplo
const products = [
  {
    id: 1,
    name: "Pack Psicoandino Básico",
    description: "Un combo de productos digitales para comenzar tu tienda demo.",
    price: 14990,
    tag: "Digital"
  },
  {
    id: 2,
    name: "Ilustración Conceptual",
    description: "Ejemplo de servicio creativo que podrías vender desde tu web.",
    price: 29990,
    tag: "Servicio"
  },
  {
    id: 3,
    name: "Plantilla HTML",
    description: "Código base de un landing page para campañas o productos.",
    price: 9990,
    tag: "Código"
  },
  {
    id: 4,
    name: "Sesión de Asesoría",
    description: "Una hora de asesoría online de ejemplo (puede ser cualquier servicio).",
    price: 39990,
    tag: "Asesoría"
  }
];

const productGrid = document.getElementById("product-grid");
const cartToggle = document.getElementById("cart-toggle");
const cartPanel = document.getElementById("cart-panel");
const cartClose = document.getElementById("cart-close");
const cartBackdrop = document.getElementById("cart-backdrop");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];

// Render productos
function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <div class="card-tag">${p.tag}</div>
        <h3 class="card-title">${p.name}</h3>
        <p class="card-desc">${p.description}</p>
      </div>
      <div class="card-footer">
        <div class="card-price">$${p.price.toLocaleString("es-CL")}</div>
        <button class="card-btn" data-id="${p.id}">Agregar</button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Listeners para los botones
  productGrid.querySelectorAll(".card-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    const product = products.find((p) => p.id === productId);
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  // Cantidad total
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;

  // Total precio
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  cartTotal.textContent = "$" + totalPrice.toLocaleString("es-CL");

  // Items
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    const p = document.createElement("p");
    p.className = "empty-cart";
    p.textContent = "Tu carrito está vacío.";
    cartItemsContainer.appendChild(p);
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span class="cart-item-title">${item.name}</span>
      <span class="cart-item-qty">x${item.qty}</span>
      <button class="cart-item-remove" data-id="${item.id}">Quitar</button>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartItemsContainer.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      removeFromCart(id);
    });
  });
}

function openCart() {
  cartPanel.classList.add("open");
  cartBackdrop.classList.add("visible");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartBackdrop.classList.remove("visible");
}

// Eventos básicos
cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío. Agrega algún producto para simular una compra.");
    return;
  }

  const resumen = cart
    .map((item) => `${item.qty} x ${item.name}`)
    .join("\n");

  alert(
    "Aquí podrías abrir un formulario o WhatsApp.\n\nResumen de ejemplo:\n" +
      resumen
  );
});

// Init
renderProducts();
updateCartUI();

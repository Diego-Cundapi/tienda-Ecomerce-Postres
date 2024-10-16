import { Cart } from "./cart.js";
import { Product } from "./product.js";
import { actualizarCarrito } from "./_actualizarCarrito.js";

const carrito = new Cart();

let products = [
  new Product(
    "Waffle",
    "Waffle with Berries",
    6.5,
    "../assets/images/image-waffle-desktop.jpg"
  ),
  new Product(
    "Vanilla Bean Crème Brûlée",
    "Crème Brûlée",
    7.0,
    "../assets/images/image-creme-brulee-desktop.jpg"
  ),
  new Product(
    "Macaron",
    "Macaron Mix of Five",
    8.0,
    "../assets/images/image-macaron-desktop.jpg"
  ),
  new Product(
    "Tiramisu",
    "Classic Tiramisu",
    5.5,
    "../assets/images/image-tiramisu-desktop.jpg"
  ),
  new Product(
    "Baklava",
    "Pistachio Baklava",
    4.0,
    "../assets/images/image-baklava-desktop.jpg"
  ),
  new Product(
    "Pie",
    "Lemon Meringue Pie",
    5.0,
    "../assets/images/image-meringue-desktop.jpg"
  ),
  new Product(
    "Cake",
    "Red Velvet Cake",
    4.5,
    "../assets/images/image-cake-desktop.jpg"
  ),
  new Product(
    "Brownie",
    "Salted Caramel Brownie",
    4.5,
    "../assets/images/image-brownie-desktop.jpg"
  ),
  new Product(
    "Panna Cotta",
    "Vanilla Panna Cotta",
    6.5,
    "../assets/images/image-panna-cotta-desktop.jpg"
  ),
];

const productList = document.querySelector("#product-list");
const carritoContent = document.querySelector("#carrito");
const contadorCarrito = document.createElement("h2");
contadorCarrito.className = "contador-carrito";
contadorCarrito.textContent = `Tu carrito (0)`;
carritoContent.append(contadorCarrito);

function updateCartUI() {
  actualizarCarrito(carrito, carritoContent, contadorCarrito);
}

// Agregar el listener al carrito
carrito.addListener(updateCartUI);

// Inicializar la UI del carrito
updateCartUI();

actualizarCarrito(carrito, carritoContent, contadorCarrito);

products.forEach((product) => {
  // Crear los elementos para cada producto
  const article = document.createElement("article");
  article.classList.add("product-article");

  const figure = document.createElement("figure");
  figure.classList.add("article-figure");

  const img = document.createElement("img");
  img.classList.add("figure-img");
  img.src = product.image;
  img.alt = product.name;

  const figcaption = document.createElement("figcaption");
  figcaption.classList.add("figure-figcaption");

  const button = document.createElement("button");
  button.classList.add("figcaption-button");
  button.innerHTML = `<i class="fas fa-shopping-cart"></i> Agregar al carrito`;

  const name = document.createElement("p");
  name.classList.add("figcaption-name");
  name.textContent = product.name;

  const description = document.createElement("h2");
  description.classList.add("figcaption-description");
  description.textContent = product.description;

  const price = document.createElement("p");
  price.classList.add("figcaption-price");
  price.textContent = `$${product.price.toFixed(2)}`;

  // Nodos del aside
  button.addEventListener("click", (event) => {
    event.preventDefault();
    carrito.addProductCart(product);
    const totalProductos = carrito.products.length;
    contadorCarrito.textContent = `tu carrito(${totalProductos})`;
    actualizarCarrito(carrito, carritoContent, contadorCarrito);
  });

  // Estructurar los elementos creados
  figcaption.append(button, name, description, price);
  figure.append(img, figcaption);
  article.append(figure);

  // Agregar el producto al contenedor principal
  productList.append(article);
});

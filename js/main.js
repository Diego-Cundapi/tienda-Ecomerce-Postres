import { Cart } from "./cart.js";
import { Product } from "./product.js";

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
const figureCarrito = document.createElement("figure");
const figcaptionCarrito = document.createElement("figcaption");

const sectionCarrito = document.createElement('section');
sectionCarrito.className = 'sectionCarrito';
const sectionDetails = document.createElement('div');
sectionDetails.className = 'sectionDetails';
const detailsNombre = document.createElement('p');
const detailsDiv = document.createElement('div');
detailsDiv.className = 'detailsDiv';
const spanCantidad = document.createElement('span');
spanCantidad.className = 'spanCantidad';
const spanPrecioUnitario = document.createElement('span');
spanPrecioUnitario.className = 'spanPrecios';
const spanPrecioTotal = document.createElement('span');
spanPrecioTotal.className = 'spanPrecioTotal';
const sectionCancelar = document.createElement('div');
sectionCancelar.className = 'sectionCancelar';
const CancelarButton = document.createElement('button');
const circleXmark = document.createElement('i');
circleXmark.className = 'fa-regular fa-circle-xmark';


// Si carrito esta vacio
if (carrito.products.length === 0) {
  figureCarrito.className = "carrito-vacio";
  figcaptionCarrito.className = "figure-caption";
  const imgCarrito = document.createElement("img");
  imgCarrito.src = "assets/images/illustration-empty-cart.svg";
  imgCarrito.alt = "carrito vacio";
  const parrafoCarrito = document.createElement("p");
  parrafoCarrito.textContent = "Tus productos añadidos apareceran aqui";

  figcaptionCarrito.append(parrafoCarrito);
  figureCarrito.append(imgCarrito, figcaptionCarrito);
} else {
    contadorCarrito.textContent = `Tu carrito (${JSON.parse(localStorage.getItem('products')).length})`;
    carrito.products.forEach(product => {
        console.log(product);
        detailsNombre.textContent = `${product[0].description}`;
        spanCantidad.textContent = `x${product[1]}`;
        spanPrecioUnitario.textContent = `@ $${product[0].price}`;
        spanPrecioTotal.textContent = `${product[1]*product[0].price}`;
        CancelarButton.
    });
    detailsDiv.append(spanCantidad, spanPrecioUnitario, spanPrecioTotal);
    sectionCarrito.append(detailsNombre,detailsDiv);
}
carritoContent.append(contadorCarrito, figureCarrito,sectionCarrito);


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
  button.addEventListener("click", () => {
    carrito.addProductCart(product);
    const totalProductos = carrito.products.length;
    contadorCarrito.textContent = `tu carrito(${totalProductos})`;
  });

  // Estructurar los elementos creados
  figcaption.append(button, name, description, price);
  figure.append(img, figcaption);
  article.append(figure);

  // Agregar el producto al contenedor principal
  productList.append(article);
});

import { Cart } from "./cart.js";

const carrito2 = new Cart();
export function actualizarCarrito(carrito, carritoContent, contadorCarrito) {
  // Limpiar el contenido del carrito antes de actualizar
  while (carritoContent.firstChild) {
    carritoContent.removeChild(carritoContent.firstChild);
  }

  // Agregar el contador del carrito en la parte superior
  let suma = 0;
  carrito.products.forEach((product) => {
    suma += product[1];
  });
  // contadorCarrito.textContent = `Tu carrito (${carrito.products.length})`;
  contadorCarrito.textContent = `Tu carrito (${suma})`;
  carritoContent.append(contadorCarrito);

  carrito.products.forEach((product) => {
    const sectionCarrito = document.createElement("section");
    sectionCarrito.className = "sectionCarrito";

    const sectionDetails = document.createElement("div");
    sectionDetails.className = "sectionDetails";

    const detailsNombre = document.createElement("p");
    detailsNombre.textContent = `${product[0].description}`;

    const infoDiv = document.createElement("div");
    infoDiv.className = "infoDiv";

    const spanCantidad = document.createElement("span");
    spanCantidad.className = "spanCantidad";
    spanCantidad.textContent = `x${product[1]}`;

    const spanPrecioUnitario = document.createElement("span");
    spanPrecioUnitario.className = "spanPrecios";
    spanPrecioUnitario.textContent = `@ $${product[0].price.toFixed(2)}`;

    const spanPrecioTotal = document.createElement("span");
    spanPrecioTotal.className = "spanPrecioTotal";
    spanPrecioTotal.textContent = `$${(product[1] * product[0].price).toFixed(
      2
    )}`;

    const sectionCancelar = document.createElement("div");
    sectionCancelar.className = "sectionCancelar";

    // Aquí integramos el SVG con la etiqueta <object>
    const CancelarButton = document.createElement("button");
    const svgIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgIcon.setAttribute("fill", "none");
    svgIcon.setAttribute("stroke", "currentColor");
    svgIcon.setAttribute("viewBox", "0 0 20 20");
    svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgIcon.setAttribute("aria-hidden", "true");
    svgIcon.classList.add("svg-icon");

    // Crear el círculo
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", "10");
    circle.setAttribute("cy", "10");
    circle.setAttribute("r", "8");
    circle.setAttribute("stroke", "currentColor");
    circle.setAttribute("fill", "transparent");
    circle.setAttribute("stroke-width", "2");

    // Crear la equis
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("clip-rule", "evenodd");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute(
      "d",
      "M8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
    );

    // Añadir los elementos creados al SVG
    svgIcon.appendChild(circle);
    svgIcon.appendChild(path);

    // Añadir el SVG al botón
    CancelarButton.append(svgIcon);

    CancelarButton.addEventListener('click', (event) =>{
      carrito2.deleteProductCart(product);
    });

    infoDiv.append(spanCantidad, spanPrecioUnitario, spanPrecioTotal);
    sectionDetails.append(detailsNombre, infoDiv);
    sectionCancelar.append(CancelarButton);
    sectionCarrito.append(sectionDetails, sectionCancelar);

    carritoContent.append(sectionCarrito);
  });

  const totalContent = document.createElement("div");
  totalContent.className = "totalContent";

  const totalText = document.createElement("p");
  totalText.className = "totalText";

  const totalPrice = document.createElement("p");
  totalPrice.className = "totalPrice";
}

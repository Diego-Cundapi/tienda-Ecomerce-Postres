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

    CancelarButton.addEventListener("click", () => {
      carrito.deleteProductCart(product);
    });

    infoDiv.append(spanCantidad, spanPrecioUnitario, spanPrecioTotal);
    sectionDetails.append(detailsNombre, infoDiv);
    sectionCancelar.append(CancelarButton);
    sectionCarrito.append(sectionDetails, sectionCancelar);

    carritoContent.append(sectionCarrito);
  });

  // implementacion del precio total del carrito
  const totalContent = document.createElement("div");
  totalContent.className = "totalContent";

  const totalText = document.createElement("p");
  totalText.className = "totalText";

  const totalPrice = document.createElement("p");
  totalPrice.className = "totalPrice";

  const contentMessage = document.createElement("div");
  contentMessage.className = "contentMessage";
  const message = document.createElement("p");
  message.className = "message";
  // Crear un parser para el SVG
  const parser = new DOMParser();
  const svgText = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/>
  </svg>
`;
  const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  // Añadir el SVG y el texto al mensaje
  message.appendChild(svgElement);
  message.appendChild(
    document.createTextNode(" This is a carbon-neutral delivery")
  );
  let sumador = 0;
  carrito.products.forEach((product) => {
    sumador += product[0].price * product[1];
  });
  totalText.textContent = "Order Total";
  totalPrice.textContent = `$${sumador.toFixed(2)}`;

  contentMessage.append(message);
  totalContent.append(totalText, totalPrice);
  carritoContent.append(totalContent, contentMessage);
}

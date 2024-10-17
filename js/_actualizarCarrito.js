// Función que crea un elemento de producto para el carrito o modal
function crearElementoProducto(product) {
  const sectionCarrito = document.createElement("section");
  sectionCarrito.className = "sectionCarrito";

  const sectionDetails = document.createElement("div");
  sectionDetails.className = "sectionDetails";

  const detailsNombre = document.createElement("p");
  detailsNombre.textContent = product[0].description;

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

  infoDiv.append(spanCantidad, spanPrecioUnitario, spanPrecioTotal);
  sectionDetails.append(detailsNombre, infoDiv);
  sectionCarrito.append(sectionDetails);

  return sectionCarrito;
}

// Función para actualizar el carrito
export function actualizarCarrito(carrito, carritoContent, contadorCarrito) {
  // Limpiar el contenido del carrito antes de actualizar
  while (carritoContent.firstChild) {
    carritoContent.removeChild(carritoContent.firstChild);
  }

  // Actualizar el contador del carrito
  const totalItems = carrito.products.reduce(
    (sum, product) => sum + product[1],
    0
  );
  contadorCarrito.textContent = `Tu carrito (${totalItems})`;
  carritoContent.append(contadorCarrito);

  // Si el carrito está vacío
  if (carrito.products.length === 0) {
    const figureCarrito = document.createElement("figure");
    figureCarrito.className = "carrito-vacio";

    const imgCarrito = document.createElement("img");
    imgCarrito.setAttribute("src", "assets/images/illustration-empty-cart.svg");
    imgCarrito.setAttribute("alt", "carrito vacio");

    const figCaption = document.createElement("figcaption");
    figCaption.className = "figure-caption";

    const captionText = document.createElement("p");
    captionText.textContent = "Tus productos añadidos aparecerán aquí";

    figCaption.append(captionText);
    figureCarrito.append(imgCarrito, figCaption);
    carritoContent.append(figureCarrito);
    
  } else {
    
    // Mostrar los productos en el carrito
    carrito.products.forEach((product) => {
      const sectionCarrito = crearElementoProducto(product);

      // Botón de cancelar producto
      const sectionCancelar = document.createElement("div");
      sectionCancelar.className = "sectionCancelar";

      const CancelarButton = document.createElement("button");

      // Crear SVG de forma segura
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

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("clip-rule", "evenodd");
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute("fill", "currentColor");
      path.setAttribute(
        "d",
        "M8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
      );

      svgIcon.append(circle, path);
      CancelarButton.append(svgIcon);

      CancelarButton.addEventListener("click", () =>
        carrito.deleteProductCart(product)
      );

      sectionCancelar.append(CancelarButton);
      sectionCarrito.append(sectionCancelar);

      carritoContent.append(sectionCarrito);
    });

    // Agregar el total del carrito
    const totalContent = crearTotalContent(carrito);
    carritoContent.append(totalContent);

    // Botón para confirmar la orden
    const containerBotom = document.createElement("button");
    containerBotom.className = "containerBotom";
    containerBotom.textContent = "Confirm Order";

    // Evento para abrir el modal con los productos y el total
    const modalSection = document.createElement("section");
    modalSection.className = "modalSection";

    containerBotom.addEventListener("click", function () {
      const modalContainer = document.createElement("div");
      modalContainer.className = "modalContainer";

      const modalMessage = document.createElement("div");
      modalMessage.className = "modalMessage";

      const title = document.createElement("h1");
      title.className = "messageTitle";
      title.textContent = "Order Confirmed";

      const paragraph = document.createElement("p");
      paragraph.className = "messageParrafo";
      paragraph.textContent = "We hope you enjoy your food!";

      modalMessage.append(title, paragraph);

      const divProducts = document.createElement("div");
      divProducts.className = "divProducts";

      carrito.products.forEach((product) => {
        const divContainer = document.createElement("div");
        divContainer.className = "producto-container";
        modalSection.classList.add("modalShow");

        const imgProduct = document.createElement("img");
        imgProduct.src = product[0].image;
        imgProduct.alt = product[0].name;
        imgProduct.className = "producto-imagen";

        if (carrito.products.length > 3) {
          divProducts.style.overflowY = "scroll";
        }

        const productoModal = crearElementoProducto(product);
        divContainer.append(imgProduct, productoModal);

        divProducts.append(divContainer);
      });

      // Agregar el totalContent dentro de divProducts
      divProducts.append(crearTotalContent(carrito));

      // Botón para iniciar una nueva orden
      const btnNewOrder = document.createElement("button");
      btnNewOrder.className = "btnNewOrder";
      btnNewOrder.textContent = "Start New Order";
      btnNewOrder.addEventListener("click", function (event) {
        event.preventDefault();
        carrito.clearCart();
        while (modalSection.firstChild) {
          modalSection.removeChild(modalSection.firstChild);
        }

        document.getElementsByClassName("modalSection")[0].remove();
        // console.log(document.getElementsByClassName('modalSection')[0]);
        // window.location.href = 'index.html'; // Redirecciona a index.html
      });

      // Agregar productos y total en el modal
      modalContainer.append(modalMessage, divProducts, btnNewOrder);

      // Cargar el SVG de manera segura
      fetch("assets/images/icon-order-confirmed.svg")
        .then((response) => response.text())
        .then((svgText) => {
          const parser = new DOMParser();
          const svgElement = parser.parseFromString(
            svgText,
            "image/svg+xml"
          ).documentElement;
          modalContainer.prepend(svgElement);
        })
        .catch(console.error);

      modalSection.append(modalContainer);
      document.body.append(modalSection);

      // Forzar reflujo para garantizar que se aplique la transición
      modalContainer.offsetHeight;
      modalContainer.classList.add("showModal");
    });

    carritoContent.append(containerBotom);
  }
}

// Función auxiliar para crear el elemento totalContent
function crearTotalContent(carrito) {
  const totalContent = document.createElement("div");
  totalContent.className = "totalContent";

  const totalText = document.createElement("p");
  totalText.textContent = "Order Total";

  const totalPrice = document.createElement("p");
  totalPrice.className = "totalPrice";
  const total = carrito.products.reduce(
    (sum, product) => sum + product[0].price * product[1],
    0
  );
  totalPrice.textContent = `$${total.toFixed(2)}`;

  totalContent.append(totalText, totalPrice);
  return totalContent;
}

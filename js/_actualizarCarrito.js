export function actualizarCarrito(carrito, carritoContent, contadorCarrito) {
  // Limpiar el contenido del carrito antes de actualizar
  while (carritoContent.firstChild) {
    carritoContent.removeChild(carritoContent.firstChild);
  }

  // Agregar el contador del carrito en la parte superior
  let suma = 0;
  carrito.products.forEach(product => {
    suma+= product[1]
   console.log(suma);
  })
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
    spanPrecioTotal.textContent = `$${(product[1] * product[0].price).toFixed(2)}`;

    const sectionCancelar = document.createElement("div");
    sectionCancelar.className = "sectionCancelar";

    // Aquí integramos el SVG con la etiqueta <object>
    const CancelarButton = document.createElement("button");
    const svgIcon = document.createElement("object");
    svgIcon.setAttribute("type", "image/svg+xml");
    svgIcon.setAttribute("data", "assets/images/icon-remove-item.svg");
    svgIcon.className = "svg-icon";
    CancelarButton.append(svgIcon);

    infoDiv.append(spanCantidad, spanPrecioUnitario, spanPrecioTotal);
    sectionDetails.append(detailsNombre, infoDiv);
    sectionCancelar.append(CancelarButton);
    sectionCarrito.append(sectionDetails, sectionCancelar);

    carritoContent.append(sectionCarrito); 
  });
}

const formulario = document.querySelector("#formularioProducto");
const nombreProducto = document.querySelector("#nombreProducto");
const precioProducto = document.querySelector("#precioProducto");
const categoriaProducto = document.querySelector("#categoriaProducto");

const previewNombre = document.querySelector("#previewNombre");
const previewCategoria = document.querySelector("#previewCategoria");
const mensajeEstado = document.querySelector("#mensajeEstado");
const productosLista = document.querySelector("#productosLista");
const contadorProductos = document.querySelector("#contadorProductos");
const historialEventos = document.querySelector("#historialEventos");

let totalProductos = 0;

// ==========================================
// TODO 1: Escuchar el evento input del campo nombreProducto.
// ==========================================
nombreProducto.addEventListener("input", function () {
    previewNombre.textContent = nombreProducto.value.trim() || "Nombre del producto";
});

// ==========================================
// TODO 2: Escuchar el evento change del select categoriaProducto.
// ==========================================
categoriaProducto.addEventListener("change", function () {
    previewCategoria.textContent = categoriaProducto.value || "Categoría";
});

// ==========================================
// TODO 3: Escuchar el evento keydown del documento.
// ==========================================
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        mensajeEstado.textContent = "";
    }
});

// ==========================================
// TODO 4: Escuchar el evento submit del formulario.
// ==========================================
formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = nombreProducto.value.trim();
    const precio = parseFloat(precioProducto.value);
    const categoria = categoriaProducto.value;

    if (!nombre || isNaN(precio) || !categoria) {
        mensajeEstado.textContent = " Por favor, completa todos los campos.";
        mensajeEstado.style.color = "red";
        return;
    }

    const nuevoProducto = { nombre, precio, categoria };

    // TODO 5: Crear la tarjeta en la interfaz
    crearTarjetaProducto(nuevoProducto);

    // TODO 6: Emitir el evento personalizado
    const evento = new CustomEvent("producto:agregado", {
        detail: nuevoProducto
    });
    document.dispatchEvent(evento);

    formulario.reset();
    previewNombre.textContent = "Nombre del producto";
    previewCategoria.textContent = "Categoría";
    mensajeEstado.textContent = " ¡Producto agregado con éxito!";
    mensajeEstado.style.color = "green";
});

// ==========================================
// TODO 5: Crear una función crearTarjetaProducto(producto).
// ==========================================
function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-producto"); 

    const h3 = document.createElement("h3");
    h3.textContent = producto.nombre;

    const pCategoria = document.createElement("p");
    pCategoria.innerHTML = `<strong>Categoría:</strong> ${producto.categoria}`;

    const pPrecio = document.createElement("p");
    pPrecio.innerHTML = `<strong>Precio:</strong> $${producto.precio.toFixed(2)}`;

    // Botón para eliminar (Cumple con el Reto Opcional de forma limpia)
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn-eliminar");
    
    botonEliminar.addEventListener("click", function () {
        tarjeta.remove(); // Solo elimina la tarjeta visual de la lista
        
        // Añade un aviso limpio al historial
        const itemHistorial = document.createElement("p");
        itemHistorial.textContent = ` Tarjeta de "${producto.nombre}" removida de la vista.`;
        historialEventos.prepend(itemHistorial);
    });

    tarjeta.append(h3, pCategoria, pPrecio, botonEliminar);
    productosLista.append(tarjeta);
}

// ==========================================
// TODO 7: Escuchar el evento personalizado "producto:agregado".
// ==========================================
document.addEventListener("producto:agregado", function (event) {
    const { nombre, precio, categoria } = event.detail;

    // Aumenta el contador tal cual pide la guía de resultados esperados
    totalProductos++;
    contadorProductos.textContent = totalProductos;

    // Registra en el historial que el evento personalizado fue emitido
    const itemHistorial = document.createElement("p");
    const horaActual = new Date().toLocaleTimeString();
    itemHistorial.textContent = `[${horaActual}] Se emitió "producto:agregado" para: ${nombre}`;
    
    historialEventos.prepend(itemHistorial);
});
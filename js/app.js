//Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaDeProductos = document.querySelector("#lista-productos");

registrarEventListener();
function registrarEventListener() {
    // Agregar un producto al presionar el botón "agregar al carrito"
    listaDeProductos.addEventListener("click", agregarProducto);
}


// Funciones
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito") ) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        console.log(productoSeleccionado);

        leerDatosProducto(productoSeleccionado);
    }
}

// Lee el contendio del HTML al que cliquamos y muestra la información del producto
function leerDatosProducto(producto) {
    console.log(producto);

    // Objeto con el contenido del producto
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("h4").textContent,
        precio: producto.querySelector(".precio span").textContent,
        id: producto.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    console.log(infoProducto)
}
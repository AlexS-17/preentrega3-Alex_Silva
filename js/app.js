//Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaDeProductos = document.querySelector("#lista-productos");
let articulosCarrito = [];

registrarEventListener();
function registrarEventListener() {
    // Agregar un producto al presionar el botón "agregar al carrito"
    listaDeProductos.addEventListener("click", agregarProducto);

    // Elimina productos del carrito
    carrito.addEventListener("click", eliminarProducto);

    // Muestra los productos del local storage
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito") ) || []; 

        carritoHTML();
    })

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = []; // Reseteamos el array

        limpiarHTML(); // Eliminamos todo el HTML
    })
}


// Funciones
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        console.log(productoSeleccionado);

        leerDatosProducto(productoSeleccionado);
    }
}

// Elimina un producto del carrito
function eliminarProducto(e) {
    console.log(e.target.classList);
    if (e.target.classList.contains("borrar-producto")) {
        const productoId = e.target.getAttribute("data-id");

        // Elimiina del array de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Lee el contendio del HTML al que cliquamos y muestra la información del producto
function leerDatosProducto(producto) {
    //console.log(producto);

    // Objeto con el contenido del producto
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("h4").textContent,
        precio: producto.querySelector(".precio span").textContent,
        id: producto.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // Revisa si un elemento ya se agregó al carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        // Si el producto ya fue agregado al carrito, actualizamos la cantidad
        const producto = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; // Retorna el objeto actualizado
            } else {
                return producto; // Retorna los objetos que no han sido duplicados
            }
        });
        articulosCarrito = [...producto]
    } else {
        // Agregamos el producto al carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }


    console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el carrito en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach((producto) => {
        const { imagen, titulo, precio, cantidad, id } = producto;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}" > X </a>
            </td>
        `;

        // Agrega el HTML del carrito al tbody
        contenedorCarrito.appendChild(row)
    })

    // Agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// Elimina los productos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
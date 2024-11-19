import Producto from "./Producto.js" 

// //creo los objetos dentro de un array para los productos.
// const productos = [
//     new Producto ('Mate Imperial Negro', 8500),
//     new Producto ('Mate Imperial Rosa', 8500),
//     new Producto ('Mate Seleccion Argentina', 5500),
//     new Producto ('Mate Camionero Verde', 15000)
// ]

// // creo el array para el carrito
// const carrito = [
//     //esta vacio, pero se pueden ir agregando productos.
// ]

// //funcion para filtrar en un rango de precios
// function filtroRangoPrecio (){
//     alert("Estas por filtrar productos por el precio")
//     let banderaPrecioMinFiltro = false
//     let banderaPrecioMaxFiltro = false
//     let precioMinimo
//     let precioMaximo
//     do{
//         precioMinimo = parseFloat(prompt("Ingresa el precio minimo: "))
//         if (precioMinimo < 0 || isNaN(precioMinimo)){
//             alert("El precio minimo debe ser un numero mayor o igual 0")
//         }else{
//             banderaPrecioMinFiltro = true
//         }
//     }while(!banderaPrecioMinFiltro)
//     do{
//         precioMaximo = parseFloat(prompt("Ingresa el precio maximo: "))
//         if (precioMaximo <= precioMinimo || isNaN(precioMaximo)){
//             alert("El precio maximo debe ser un numero mayor al precio minimo")
//         }else{
//             banderaPrecioMaxFiltro = true
//         }
//     }while(!banderaPrecioMaxFiltro)
//     if (productos.length !== 0){ // Si el arreglo no esta vacio ejecuta el bloque de codigo
//         console.log("Estos son los productos en el rango de precio: " + "($" + precioMinimo + " - $" + precioMaximo + ")")
//         let productosFiltrados = false //pongo una bandera para validar si muestra productos o no en ese rango
//         for(let i = 0; i < productos.length; i++){
//             if (productos[i].precio <= precioMaximo && productos[i].precio >= precioMinimo){
//                 console.table(productos[i])
//                 productosFiltrados = true
//             }
//         }
//         if(!productosFiltrados){// si no esta vacio pero no hay productos dentro del rango imprime este console.log
//             console.log("No hay productos en el rango especificado")
//         }
//     }else{ // si el arreglo esta vacio imprime este console.log
//         console.log("No hay productos disponibles")
//     }
// }

// //funcion para mostrar todos los productos disponibles
// function mostrarProductos(){
//     console.log("Estos son los productos: ")
//     console.table(productos)
// }

// // funcion para agregar un nuevo producto usando el constructor y entradas del usuario. Esto va a ser solo para el administrador de la pagina en un futuro
// function crearNuevoProducto(){
//     alert ("Estas por agregar un nuevo producto")
//     let banderaNombre = false
//     let banderaPrecio = false
//     let nombreTemp
//     let precioTemp
//     do{
//         let nombrePrompt = prompt("Ingresa el nombre del producto: ")
//         if (nombrePrompt === ""){ // si nombre esta vacio ejecuta el alert
//             alert("El nombre no puede estar vacio")
//         }else{
//             banderaNombre = true
//             nombreTemp = nombrePrompt
//         }
//     }while(!banderaNombre)
//     do{
//         let precioPrompt = parseFloat(prompt ("Ingresa el precio del producto: "))
//         if (precioPrompt <= 0 || isNaN(precioPrompt) ){ // si precio es menor o igual a 0 o si precio no es un numero ejecuta el alert
//             alert("El precio debe ser un numero mayor a 0")
//         }else{
//             banderaPrecio = true
//             precioTemp = precioPrompt
//         }
//     }while(!banderaPrecio)
//     productos.push(new Producto (nombreTemp, precioTemp))
//     console.log("Producto agregado con exito!")
//     console.table(productos)
// }

// //funcion para calcular el total del carrito
// function calcularTotalCarrito(){
//     let totalCarrito = 0
//     if(carrito.length !== 0){
//         for(let producto of carrito){
//             totalCarrito += producto.precio
//         }
//     }
//     console.log("Total: " + totalCarrito.toFixed(2)) // para que tenga 2 decimales
// }

// //funcion para agregar un producto al carrito por ahora con un indice, luego va a ser con el boton agregar al carrito
// function agregarProductoCarrito() {
//     alert("Estas por agregar un nuevo producto al carrito")
//     mostrarProductos()
//     let indiceTemp = parseInt(prompt("Ingresa el indice del producto que deseas agregar: "))
//     if (indiceTemp >= 0 && indiceTemp < productos.length) {
//         carrito.push(productos[indiceTemp])
//         console.log("Producto agregado al carrito: ")
//         console.table(carrito)
//     } else {
//         console.log("Indice invalido, no se pudo agregar el producto al carrito.")
//     }
// }

// //funcion para quitar un producto del carrito
// function quitarProductoCarrito(){
//     if(carrito.length !== 0){
//         alert("Estas por sacar un producto de tu carrito")
//         console.table(carrito)
//         let indiceTemp = parseInt(prompt("Ingresa el indice del producto que deseas quitar: "))
//         if (indiceTemp >= 0 && indiceTemp < carrito.length) {
//             carrito.splice(indiceTemp, 1)
//             console.log("Producto quitado del carrito")
//         } else {
//             console.log("Indice invalido, no se pudo quitar el producto del carrito")
//         }
//     }else{
//         alert("El carrito esta vacio")
//     }   
// }

// //funcion para mostrar todos los productos del carrito
// function mostrarCarrito(){
//     console.log("---Tu Carrito---")
//     if(carrito.length !== 0){
//         console.table(carrito)
//     }else{
//         console.log("No hay productos en tu carrito")
//     }
//     calcularTotalCarrito()
// }

// //funcion para cambiar el nombre de un producto
// function cambiarNombreProducto(producto){
//     let banderaNombreInt = false
//     do{
//         let nombreProductoTemp = prompt("Ingresa el nuevo nombre del producto: ")
//         if (nombreProductoTemp === ""){ // si nombre esta vacio ejecuta el alert
//             alert("El nombre no puede estar vacio")
//         }else{
//             banderaNombreInt = true
//             producto.cambiarNombre(nombreProductoTemp)
//         }
//     }while(!banderaNombreInt)
//     console.log("Producto actualizado")
// }

// //funcion para cambiar el precio de un producto
// function cambiarPrecioProducto(producto){
//     let banderaPrecioInt = false
//     do{
//         let precioProductoTemp = parseFloat(prompt("Ingresa el nuevo precio del producto: "))
//         if (precioProductoTemp <= 0 || isNaN(precioProductoTemp)){  // si precio es menor o igual a 0 o si precio no es un numero ejecuta el alert
//             alert("El precio debe ser un numero mayor a 0")
//         }else{
//             banderaPrecioInt = true
//             producto.cambiarPrecio(precioProductoTemp)
//         }
//     }while(!banderaPrecioInt)
//     console.log("Producto actualizado")
// }

// //funcion para vaciar el carrito
// function vaciarCarrito(){
//     //cual es mas conveniente usar, asignarle un nuevo arreglo vacio, cambiar la longitud a 0 o hacer un splice(0)?
// }

// //funcion para eliminar un producto
// function eliminarProducto(){
//     if(productos.length !== 0){
//         alert("Estas por eliminar un producto")
//         console.table(productos)
//         let indiceTemp = parseInt(prompt("Ingresa el indice del producto que deseas eliminar: "))
//         if (indiceTemp >= 0 && indiceTemp < productos.length) {
//             productos.splice(indiceTemp, 1)
//             console.log("Producto eliminado con exito")
//             console.table(productos)
//         } else {
//             console.log("Indice invalido, no se pudo eliminar el producto")
//         }
//     }else{
//         alert("No hay productos")
//     }   
// }

// // constante con las opciones del menu para que se muestre en el prompt del do-while
// const opciones = "------------------------MENU DE OPCIONES------------------------\n 1-Filtrar producto por precio\n 2-Crear un producto nuevo\n 3-Agregar un producto al carrito\n 4-Ver tu carrito\n 5-Quitar producto del carrito\n 6-Eliminar un producto\n 7-Ver productos\n 8-Modificar el nombre de un producto\n 9-Modificar el precio de un producto\n 10-Salir\n"
// let booleanoWhile = true
// // Este do-while con su switch es temporal, pero es para mantener el flujo del programa para una correcta visualizacion desde la consola para esta entrega
// do{
//     let opcionMenu = parseInt(prompt(opciones + "Selecciona una opcion e ingresa el numero de la misma: "))
//     switch(opcionMenu){
//         case 1:
//             filtroRangoPrecio()
//             break
//         case 2:
//             crearNuevoProducto()
//             break
//         case 3:
//             agregarProductoCarrito()
//             break
//         case 4:
//             mostrarCarrito()
//             break
//         case 5:
//             quitarProductoCarrito()
//             break
//         case 6:
//             eliminarProducto()
//             break
//         case 7:
//             mostrarProductos()
//             break
//         case 8:
//             mostrarProductos()
//             alert("Estas por actualizar el nombre de un producto")
//             let indiceProdModNombre = parseInt(prompt("Coloca el indice del producto a modificar su nombre: "))
//             console.log("Producto seleccionado: " + indiceProdModNombre);
//             if(indiceProdModNombre < 0 || indiceProdModNombre > productos.length-1 || isNaN(indiceProdModNombre)){
//                 alert("El indice que proporcionaste no es valido")
//             }else{
//                 cambiarNombreProducto(productos[indiceProdModNombre])
//             }
//             break
//         case 9:
//             mostrarProductos()
//             alert("Estas por actualizar el precio de un producto")
//             let indiceProdModPrecio = parseInt(prompt("Coloca el indice del producto a modificar su precio: "))
//             console.log("Producto seleccionado: " + indiceProdModPrecio);
//             if(indiceProdModPrecio < 0 || indiceProdModPrecio > productos.length-1 || isNaN(indiceProdModPrecio)){
//                 alert("El indice que proporcionaste no es valido")
//             }else{
//                 cambiarPrecioProducto(productos[indiceProdModPrecio])
//             }
//             break
//         case 10:
//             booleanoWhile = false
//             console.log("Saliendo...");
//             break
//         default:
//             console.log("Opcion no valida, ingresa otra")
//             break
//     }
// }while(booleanoWhile)

// Entrega 4

// const productosCarrito = document.getElementsByClassName('productos-carrito-pago')
// const botonAgregarCarrito = document.getElementsByClassName('boton-productos')
// const imagenProducto = document.getElementsByClassName('imagen-producto')
// const nombreProducto = document.getElementsByClassName('nombre-producto')
// const precioProducto = document.getElementsByClassName('precio-producto')

// botonAgregarCarrito.addEventListener('click', ()=>{
//     console.log("Hola")
//     agregarProductoCarrito()
// })

// function agregarProductoCarrito(){
//     const productoCarrito = document.createElement('div')
//     productoCarrito.classList.add('producto-interno-carrito')

//     const imagenProductoNuevo = imagenProducto
//     imagenProductoNuevo = document.createElement('img')
//     imagenProductoNuevo.classList.add('imagen-producto-interno')
    
//     const nombreProductoNuevo = nombreProducto
//     nombreProductoNuevo = document.createElement('h3')
//     nombreProductoNuevo.classList.add('nombre-producto-interno')

//     const precioProductoNuevo = precioProducto
//     precioProductoNuevo = document.createElement('p')
//     precioProductoNuevo.classList.add('precio-producto-interno')

//     const eliminarProductoNuevo = document.createElement('button')
//     eliminarProductoNuevo.classList.add('eliminar-producto-interno')

//     eliminarProductoNuevo.addEventListener('click', () =>{
//         productosCarrito.removeChild(productoCarrito)
//     }) 

//     productoCarrito.appendChild(imagenProducto)
//     productoCarrito.appendChild(nombreProductoNuevo)
//     productoCarrito.appendChild(precioProductoNuevo)
//     productoCarrito.appendChild(eliminarProductoNuevo)
//     productosCarrito.appendChild(productoCarrito)
// }

// // Selecciona todos los botones "Agregar al carrito"
// const botonesAgregarCarrito = document.querySelectorAll('.boton-productos');
// console.log(botonesAgregarCarrito);
// // Selecciona el contenedor donde se agregarán los productos en el carrito
// const productosCarrito = document.querySelector('.productos-carrito-pago');

// // Asignar eventos de clic a cada botón
// botonesAgregarCarrito.forEach((boton) => {
//     boton.addEventListener('click', () => {
//         // Encuentra el contenedor del producto relacionado al botón
//         const producto = boton.closest('.producto-unitario');
//         console.log("hola")
//         if (!producto) {
//             console.error('No se encontró un contenedor .producto-unitario para el botón:', this);
//             return;
//         }
//         // Agrega el producto al carrito
//         agregarProductoCarrito(producto);
//     });
// });

// // Función para agregar un producto al carrito
// function agregarProductoCarrito(producto) {
//     // Crear contenedor del producto en el carrito
//     const productoCarrito = document.createElement('div');
//     productoCarrito.classList.add('producto-interno-carrito');

//     // Extraer y clonar datos del producto
//     const imagenProductoNuevo = document.createElement('img');
//     imagenProductoNuevo.classList.add('imagen-producto-interno');
//     imagenProductoNuevo.src = producto.querySelector('.imagen-producto').src;

//     const nombreProductoNuevo = document.createElement('p');
//     nombreProductoNuevo.classList.add('nombre-producto-interno');
//     nombreProductoNuevo.textContent = producto.querySelector('.nombre-producto').textContent;

//     const precioProductoNuevo = document.createElement('h3');
//     precioProductoNuevo.classList.add('precio-producto-interno');
//     precioProductoNuevo.textContent = producto.querySelector('.precio-producto').textContent;

//     const eliminarProductoNuevo = document.createElement('button');
//     eliminarProductoNuevo.classList.add('eliminar-producto-interno');
//     eliminarProductoNuevo.textContent = 'Eliminar';

//     // Evento para eliminar el producto del carrito
//     eliminarProductoNuevo.addEventListener('click', () => {
//         productoCarrito.remove();
//     });

//     // Agregar elementos al contenedor del producto en el carrito
//     productoCarrito.appendChild(imagenProductoNuevo);
//     productoCarrito.appendChild(nombreProductoNuevo);
//     productoCarrito.appendChild(precioProductoNuevo);
//     productoCarrito.appendChild(eliminarProductoNuevo);

//     // Agregar el producto al contenedor del carrito
//     productosCarrito.appendChild(productoCarrito);
// }

const toastContainer = document.getElementById('toastContainer');

// Escuchar clics en todos los botones "Agregar al carrito"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton-productos')) {
        // Encuentra el contenedor del producto correspondiente
        const producto = event.target.closest('.producto-unitario');

        // Obtiene los datos del producto
        const nombreProducto = producto.querySelector('.nombre-producto').textContent;
        const precioProducto = producto.querySelector('.precio-producto').textContent;
        const imagenProducto = producto.querySelector('.imagen-producto').src;

        // Generar un ID único para el toast
        const toastId = `toast-${Date.now()}`;

        // Crear el HTML del toast dinámicamente
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="${imagenProducto}" class="rounded me-2" alt="Imagen del producto" style="width: 30px; height: 30px;">
                    <strong class="me-auto">${nombreProducto}</strong>
                    <small class="text-muted">Ahora</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${nombreProducto} ha sido agregado al carrito por ${precioProducto}.
                </div>
            </div>
        `;

        // Añadir el nuevo toast al contenedor
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);

        // Inicializar el toast (Bootstrap necesita esto para hacerlo interactivo)
        const toastElement = document.getElementById(toastId);
        const toastInstance = new bootstrap.Toast(toastElement,{
            delay: 3000
        });

        // Mostrar el toast
        toastInstance.show();
    }
});

// Selecciona todos los botones "Agregar al carrito"
const botonesAgregarCarrito = document.querySelectorAll('.boton-productos');
console.log(botonesAgregarCarrito);

// Asignar eventos de clic a cada botón
botonesAgregarCarrito.forEach((boton) => {
    boton.addEventListener('click', () => {
        // Encuentra el contenedor del producto relacionado al botón
        const producto = boton.closest('.producto-unitario');

        const imagen = producto.querySelector('.imagen-producto').src
        const nombre = producto.querySelector('.nombre-producto').textContent
        const precio = parseFloat(producto.querySelector('.precio-producto').textContent.replace('$', '').trim()); // Eliminar el símbolo $ y convertir a número

        // Crear un objeto con los detalles del producto
        const productoNuevo = new Producto (imagen, nombre, precio) 


        // Obtener el carrito del localStorage, o un array vacío si no existe
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Agregar el producto al carrito
        carrito.push(productoNuevo)

        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        console.log("Producto agregado al carrito", productoNuevo);
    });
});


// Recuperar el carrito desde localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Seleccionar el contenedor donde se agregarán los productos del carrito
const productosCarrito = document.querySelector('.productos-carrito-pago')
const precioCarrito = document.getElementById('precio-carrito-total')

// Verificar si hay productos en el carrito
if (carrito.length > 0) {
    carrito.forEach((producto) => {
        // Crear un contenedor para cada producto en el carrito
        const productoCarrito = document.createElement('div');
        productoCarrito.classList.add('producto-interno-carrito');

        // Crear y agregar la imagen del producto
        const imagenProducto = document.createElement('img');
        imagenProducto.classList.add('imagen-producto-interno');
        imagenProducto.src = producto.imagen;
        productoCarrito.appendChild(imagenProducto);

        // Crear y agregar el nombre del producto
        const nombreProducto = document.createElement('p');
        nombreProducto.classList.add('nombre-producto-interno');
        nombreProducto.textContent = producto.nombre;
        productoCarrito.appendChild(nombreProducto);

        // Crear y agregar el precio del producto
        const precioProducto = document.createElement('h3');
        precioProducto.classList.add('precio-producto');

        // Crear el span para el símbolo del precio
        const simboloPrecio = document.createElement('span');
        simboloPrecio.classList.add('simbolo-precio');
        simboloPrecio.textContent = '$';  // Agregar el símbolo de precio

        // Crear el span para el valor del precio
        const valorPrecio = document.createElement('span');
        valorPrecio.classList.add('valor-precio');
        valorPrecio.textContent = parseInt(producto.precio);  // Agregar el valor del precio

        // Agregar los spans al contenedor del precio
        precioProducto.appendChild(simboloPrecio);
        precioProducto.appendChild(valorPrecio);

        // Agregar el contenedor del precio al contenedor del producto
        productoCarrito.appendChild(precioProducto);


        // Crear el botón de eliminar con el icono 'delete' dentro
        const eliminarProducto = document.createElement('button');
        eliminarProducto.classList.add('eliminar-producto-interno');
        
        // Crear el span con la clase para el icono
        const spanIcon = document.createElement('span');
        spanIcon.classList.add('material-symbols-outlined');
        spanIcon.textContent = 'delete'; // Esto pone el ícono 'delete' dentro del span

        // Agregar el span al botón
        eliminarProducto.appendChild(spanIcon);

        // Evento para eliminar el producto del carrito
        eliminarProducto.addEventListener('click', () => {
            // Eliminar el producto del carrito en localStorage
            const index = carrito.indexOf(producto);
            if (index > -1) {
                carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                productoCarrito.remove();
                console.log("Producto eliminado del carrito");
                calcularTotalCarrito()
            }
        });

        // Agregar el botón de eliminación al contenedor del producto
        productoCarrito.appendChild(eliminarProducto);

        // Agregar el producto al contenedor del carrito
        productosCarrito.appendChild(productoCarrito);
    });
}


function calcularTotalCarrito(){
    let totalCarrito = 0;
    if (carrito.length !== 0) {
        for (let producto of carrito) {
            totalCarrito += parseFloat(producto.precio)  // Sumar los precios de los productos en el carrito
        }
        precioCarrito.textContent = "$" + totalCarrito;  // Mostrar el total con 2 decimales
    } else {
        precioCarrito.textContent = "$0";  // Si no hay productos, mostrar $0
    }
}



function filtroRangoPrecio() {
    const precioMinimo = document.getElementById('rango-precio-min');
    const precioMaximo = document.getElementById('rango-precio-max');
    const productos = document.querySelectorAll('.producto-unitario');

    const productosOriginales = Array.from(productos).map(producto => {
        return {
            producto: producto,
            displayOriginal: window.getComputedStyle(producto).display
        };
    });
    // Obtener los valores de los inputs
    const precioMinimoValor = parseFloat(precioMinimo.value);
    const precioMaximoValor = parseFloat(precioMaximo.value);

    // Validación de precios
    if (isNaN(precioMinimoValor) || precioMinimoValor < 0) {
        alert("El precio mínimo debe ser un número mayor o igual a 0");
        return
    }
    else if (isNaN(precioMaximoValor) || precioMaximoValor <= precioMinimoValor) {
        alert("El precio máximo debe ser un número mayor al precio mínimo");
        return
    }

    // Filtrar productos
    let productosFiltrados = false
    const productosVisibles = []

    // Restaurar la visibilidad de todos los productos antes de filtrar nuevamente
    productosOriginales.forEach(item => {
        item.producto.style.display = item.displayOriginal; // Restauramos el display original
    });

    productos.forEach(producto => {
        const precioProducto = parseFloat(producto.querySelector('.precio-producto').textContent.replace('$', ''));
        const nombreProducto = producto.querySelector('.nombre-producto').textContent;
        const imagenProducto = producto.querySelector('.imagen-producto').getAttribute('src');

        if (precioProducto >= precioMinimoValor && precioProducto <= precioMaximoValor) {
            producto.style.visibility = 'visible'; // Mostrar el producto dentro del rango de precio
            const productoObj = new Producto(imagenProducto, nombreProducto, precioProducto);
            productosVisibles.push(productoObj)
            productosFiltrados = true;
        } else {
            producto.style.display = 'none' // Ocultar los productos fuera del rango
        }
    });

    precioMinimo.value = '';
    precioMaximo.value = '';

    if (!productosFiltrados) {
        console.log("No hay productos en el rango especificado");
    } else { 
                console.table(productosVisibles);
    }
}

calcularTotalCarrito()

// Escuchar el evento de clic en el botón de aplicar filtro
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('aplicar-rango-precio').addEventListener('click', (e) => {
        e.preventDefault();
        filtroRangoPrecio();
    });
});



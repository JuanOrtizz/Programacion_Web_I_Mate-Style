import Producto from "./Producto.js" 


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
// funcion para modificar la informacion del pago
let mdpPagoRealizado = sessionStorage.getItem('mdp')
const emailPagoRealizado = sessionStorage.getItem('email')
const totalPagoRealizado = sessionStorage.getItem('totalPago')

const emailElemento = document.getElementById('email-pago-realizado')
const mdpElemento = document.getElementById('mdp-pago-realizado')
const totalElemento = document.getElementById('total-pago-realizado')


document.addEventListener('DOMContentLoaded', () => {
    const contenedorPagoRealizado = document.querySelector('.contenedor-compra-realizada')
    console.log('contenedorPagoRealizado:', contenedorPagoRealizado)

    emailElemento.textContent = emailPagoRealizado

    if(mdpPagoRealizado === 2){
        mdpPagoRealizado = "Debito"
    }else{
        mdpPagoRealizado = "Credito"
    }
    mdpElemento.textContent = mdpPagoRealizado

    totalElemento.textContent = totalPagoRealizado
})

const precioMinimo = document.getElementById('rango-precio-min')
const precioMaximo = document.getElementById('rango-precio-max')
const productos = document.querySelectorAll('.producto-unitario')

const productosOriginales = Array.from(productos).map(producto => {
    return {
        producto: producto,
        displayOriginal: window.getComputedStyle(producto).display
    }
})

function filtroRangoPrecio() {
    // Obtener los valores de los inputs
    const precioMinimoValor = parseFloat(precioMinimo.value)
    const precioMaximoValor = parseFloat(precioMaximo.value)

    // Validación de precios
    if (isNaN(precioMinimoValor) || precioMinimoValor < 0) {
        alert("El precio mínimo debe ser un número mayor o igual a 0")
        return
    }
    else if (isNaN(precioMaximoValor) || precioMaximoValor <= precioMinimoValor) {
        alert("El precio máximo debe ser un número mayor al precio mínimo")
        return
    }

    // Filtrar productos
    let productosFiltrados = false
    const productosVisibles = []

    // Restaurar la visibilidad de todos los productos antes de filtrar nuevamente
    productosOriginales.forEach(item => {
        item.producto.style.display = item.displayOriginal // Restauramos el display original
    })

    productos.forEach(producto => {
        const precioProducto = parseFloat(producto.querySelector('.precio-producto').textContent.replace('$', ''))
        const nombreProducto = producto.querySelector('.nombre-producto').textContent
        const imagenProducto = producto.querySelector('.imagen-producto').getAttribute('src')

        if (precioProducto >= precioMinimoValor && precioProducto <= precioMaximoValor) {
            producto.style.visibility = 'visible' // Mostrar el producto dentro del rango de precio
            const productoObj = new Producto(imagenProducto, nombreProducto, precioProducto);
            productosVisibles.push(productoObj)
            productosFiltrados = true
        } else {
            producto.style.display = 'none' // Ocultar los productos fuera del rango
        }
    });

    precioMinimo.value = ''
    precioMaximo.value = ''

    if (!productosFiltrados) {
        console.log("No hay productos en el rango especificado")
    } else { 
                console.table(productosVisibles)
    }
}

// Escuchar el evento de clic en el botón de aplicar filtro
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('aplicar-rango-precio').addEventListener('click', (e) => {
        e.preventDefault()
        filtroRangoPrecio()
    })
})

const toastContainer = document.getElementById('toastContainer')

// Escuchar clics en todos los botones "Agregar al carrito"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton-productos')) {
        // Encuentra el contenedor del producto correspondiente
        const producto = event.target.closest('.producto-unitario')

        // Obtiene los datos del producto
        const nombreProducto = producto.querySelector('.nombre-producto').textContent
        const precioProducto = producto.querySelector('.precio-producto').textContent
        const imagenProducto = producto.querySelector('.imagen-producto').src

        // Generar un ID único para el toast
        const toastId = `toast-${Date.now()}`

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
        `

        // Añadir el nuevo toast al contenedor
        toastContainer.insertAdjacentHTML('beforeend', toastHTML)

        // Inicializar el toast (Bootstrap necesita esto para hacerlo interactivo)
        const toastElement = document.getElementById(toastId)
        const toastInstance = new bootstrap.Toast(toastElement,{
            delay: 3000
        })

        // Mostrar el toast
        toastInstance.show()
    }
});

// Selecciona todos los botones "Agregar al carrito"
const botonesAgregarCarrito = document.querySelectorAll('.boton-productos')
console.log(botonesAgregarCarrito)

// Asignar eventos de clic a cada botón
botonesAgregarCarrito.forEach((boton) => {
    boton.addEventListener('click', () => {
        // Encuentra el contenedor del producto relacionado al botón
        const producto = boton.closest('.producto-unitario')

        const imagen = producto.querySelector('.imagen-producto').src
        const nombre = producto.querySelector('.nombre-producto').textContent
        const precio = parseFloat(producto.querySelector('.precio-producto').textContent.replace('$', '').trim()) // Eliminar el símbolo $ y convertir a número

        // Crear un objeto con los detalles del producto
        const productoNuevo = new Producto (imagen, nombre, precio) 


        // Obtener el carrito del localStorage, o un array vacío si no existe
        let carrito = JSON.parse(localStorage.getItem('carrito')) || []

        // Agregar el producto al carrito
        carrito.push(productoNuevo)

        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito))

        console.log("Producto agregado al carrito", productoNuevo)
    })
})


// Recuperar el carrito desde localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || []

// Seleccionar el contenedor donde se agregarán los productos del carrito
const productosCarrito = document.querySelector('.productos-carrito-pago')
const precioCarrito = document.getElementById('precio-carrito-total')

// Verificar si hay productos en el carrito
if (carrito.length > 0) {
    carrito.forEach((producto) => {
        // Crear un contenedor para cada producto en el carrito
        const productoCarrito = document.createElement('div')
        productoCarrito.classList.add('producto-interno-carrito')

        // Crear y agregar la imagen del producto
        const imagenProducto = document.createElement('img')
        imagenProducto.classList.add('imagen-producto-interno')
        imagenProducto.src = producto.imagen
        productoCarrito.appendChild(imagenProducto)

        // Crear y agregar el nombre del producto
        const nombreProducto = document.createElement('p')
        nombreProducto.classList.add('nombre-producto-interno')
        nombreProducto.textContent = producto.nombre
        productoCarrito.appendChild(nombreProducto)

        // Crear y agregar el precio del producto
        const precioProducto = document.createElement('h3')
        precioProducto.classList.add('precio-producto')

        // Crear el span para el símbolo del precio
        const simboloPrecio = document.createElement('span')
        simboloPrecio.classList.add('simbolo-precio')
        simboloPrecio.textContent = '$'  // Agregar el símbolo de precio

        // Crear el span para el valor del precio
        const valorPrecio = document.createElement('span')
        valorPrecio.classList.add('valor-precio')
        valorPrecio.textContent = parseInt(producto.precio)  // Agregar el valor del precio

        // Agregar los spans al contenedor del precio
        precioProducto.appendChild(simboloPrecio)
        precioProducto.appendChild(valorPrecio)

        // Agregar el contenedor del precio al contenedor del producto
        productoCarrito.appendChild(precioProducto)

        // Crear el botón de eliminar con el icono 'delete' dentro
        const eliminarProducto = document.createElement('button')
        eliminarProducto.classList.add('eliminar-producto-interno')
        
        // Crear el span con la clase para el icono
        const spanIcon = document.createElement('span')
        spanIcon.classList.add('material-symbols-outlined')
        spanIcon.textContent = 'delete' // Esto pone el ícono 'delete' dentro del span

        // Agregar el span al botón
        eliminarProducto.appendChild(spanIcon)

        // Evento para eliminar el producto del carrito
        eliminarProducto.addEventListener('click', () => {
            // Eliminar el producto del carrito en localStorage
            const index = carrito.indexOf(producto)
            if (index > -1) {
                carrito.splice(index, 1)
                localStorage.setItem('carrito', JSON.stringify(carrito))
                productoCarrito.remove()
                console.log("Producto eliminado del carrito")
                calcularTotalCarrito()
            }
        });

        // Agregar el botón de eliminación al contenedor del producto
        productoCarrito.appendChild(eliminarProducto)

        // Agregar el producto al contenedor del carrito
        productosCarrito.appendChild(productoCarrito)
    });
}


function calcularTotalCarrito(){
    let totalCarrito = 0
    if (carrito.length !== 0) {
        for (let producto of carrito) {
            totalCarrito += parseFloat(producto.precio)  // Sumar los precios de los productos en el carrito
        }
        precioCarrito.textContent = "$" + totalCarrito // Mostrar el total con 2 decimales
    } else {
        precioCarrito.textContent = "$0"  // Si no hay productos, mostrar $0
    }
}

calcularTotalCarrito()
//funcion para mostrar el error en un input si hay datos invalidos
function mostrarError(input, mensaje) {
    let errorMensaje = input.nextElementSibling; // Busca el siguiente elemento donde mostrar el error

    if (!errorMensaje || !errorMensaje.classList.contains('error-text')) {
        // Si no existe el mensaje de error, lo creamos
        errorMensaje = document.createElement('div');
        errorMensaje.className = 'error-text';
        input.parentNode.insertBefore(errorMensaje, input.nextSibling);
    }

    errorMensaje.textContent = mensaje;
}

// funcion para dejar de mostrar el mensaje de error
function ocultarError(input) {
    const errorMensaje = input.nextElementSibling;
    if (errorMensaje && errorMensaje.classList.contains('error-text')) {
        errorMensaje.remove(); // Elimina el mensaje de error si existe
    }
}

// tomamos los input del form numero de datos personales
const nombreFormulario = document.getElementById('nombre-form')
const emailFormulario = document.getElementById('email-form')
const telefonoFormulario = document.getElementById('telefono-form')
const dniFormulario = document.getElementById('dni-form')
const botonEnviar = document.getElementById('boton-comprar')

// tomamos los input del form de datos de la tarjeta
const formaPagoFormulario = document.getElementById('forma-de-pago')
const cuotasFormulario = document.getElementById('cuotas-form')
const numTarjetaFormulario = document.getElementById('nro-tarjeta-form')
const nombreTitularFormulario = document.getElementById('nombre-tarjeta-form')
const fechaVencimientoFormulario = document.getElementById('fecha-ven-form')
const cvcTarjetaFormulario = document.getElementById('cvc')

// funcion para evitar que agregue caracteres de mas de lo permitido
const maxLongitudDNI = 8
const maxLongitudTelefono = 11
const maxLongitudTarjeta = 19
const maxLongitudCVC = 3
dniFormulario.addEventListener('input', () => {
        let valor = dniFormulario.value
        // evita que se ingresen más de los 8 caracteres
        if (valor.length > maxLongitudDNI) {
            dniFormulario.value = valor.substring(0, maxLongitudDNI)
        }
    })

telefonoFormulario.addEventListener('input', () => {
        let valor = telefonoFormulario.value
        // evita que se ingresen más de los 10 caracteres
        if (valor.length > maxLongitudTelefono) {
            telefonoFormulario.value = valor.substring(0, maxLongitudTelefono)
        }
})

numTarjetaFormulario.addEventListener('input', () => {
    let valor = numTarjetaFormulario.value;
    // elimina todo lo que no sea un numero, negando poner letras por ejemplo
    valor = valor.replace(/\D/g, "");
    // pone un guion cada 4 numeros
    if (valor.length > 4) {
        valor = valor.replace(/(\d{4})(?=\d)/g, "$1-");
    }
    // le pongo el limite contando los guines
    if (valor.length > maxLongitudTarjeta) {
        valor = valor.substring(0, maxLongitudTarjeta);
    }
    numTarjetaFormulario.value = valor;
})

cvcTarjetaFormulario.addEventListener('input', () => {
    let valor = cvcTarjetaFormulario.value
    // evita que se ingresen más de los 10 caracteres
    if (valor.length > maxLongitudCVC) {
        cvcTarjetaFormulario.value = valor.substring(0, maxLongitudCVC)
    }
})

// funciones para verificar que un input cumpla con los requisitos

// funcion para verificar si no esta vacio el input
function inputVacio(texto) {
    if (texto.trim() === "") { // le borro los espacios al principio y al final y verifico si esta vacio
        return true
    } else {
        return false 
    }
}

// funcion para verificar si contiene unicamente letras
function inputLetras(texto) {
    const patron = /^[a-zA-Z\s]+$/ // patron regex para comprabar esto con el test
    return patron.test(texto)
}

//funcion para verificar si es un mail valido
function inputEmail(texto){
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // patron regex para comprabar esto con el test 
    return patron.test(texto)
}

// funcion para verificar si es un numero valido
function inputTelefono(texto){
    if(texto.length < 10 || texto.length > 11){ // sin el + 54
        return false
    }
    else{
        return true
    }
}

// funcion para verificar si el DNI es valido
function inputDni(texto){
    if(texto.length != 8 ){ //si no es igual a 8 la longitud
        return false
    }
    else{
        return true
    }
}

// funcion para verificar si selecciono una opcion en forma de pago y cuotas
function selectOpciones(opcionSeleccionada){
    if(opcionSeleccionada === "0" ){ //si es = 0 es que no selecciono
        return false
    }
    else{
        return true
    }
}

// funcion para verificar si el numero de tarjeta es valido
function inputNumTarjeta(texto){
    if(texto.length != 19 ){ //si no es igual a 19 la longitud
        return false
    }
    else{
        return true
    }
}

// funcion para verificar si la fecha de vencimiento es valida
function inputFecha(fecha){
    const hoy = new Date(); 
    const fechaVencimiento = new Date(fecha); 
    if(fechaVencimiento < hoy){
        return false
    }
    else{
        return true
    }
}

// funcion para verificar si el cvc es valido
function inputCVC(texto){
    if(texto.length != 3 ){ //si no es igual a 19 la longitud
        return false
    }
    else{
        return true
    }
}

botonEnviar.addEventListener('click', () => {
    
    // valida los datos del cliente
    let formularioValido = true

    // valida el nombre
    const nombre = nombreFormulario.value
    if(!inputVacio(nombre)){
        if (!inputLetras(nombre)) {
            nombreFormulario.classList.add('input-error'); // Agrega una clase de error al input
            mostrarError(nombreFormulario, "El nombre solo debe contener letras.")
            formularioValido = false
        } else {
            nombreFormulario.classList.remove('input-error'); // Remueve la clase de error si es válido
            ocultarError(nombreFormulario)
        }
    }else{
        nombreFormulario.classList.add('input-error'); // Agrega una clase de error al input
        mostrarError(nombreFormulario, "El nombre no puede estar vacio.")
        formularioValido = false
    }
    
    //valida el email
    const email = emailFormulario.value
    if(!inputVacio(email)){
        if(!inputEmail(email)){
            emailFormulario.classList.add('input-error'); // Agrega una clase de error al input
            mostrarError(emailFormulario, "El email proporcionado no es valido, verificalo.")
            formularioValido = false
        } else {
            emailFormulario.classList.remove('input-error') // Remueve la clase de error si es válido
            ocultarError(emailFormulario)
        }
    }else{
        emailFormulario.classList.add('input-error'); // Agrega una clase de error al input
        mostrarError(emailFormulario, "El email no puede estar vacio.")
        formularioValido = false
    }
    
    // valida el telefono
    const telefono = telefonoFormulario.value
    if(!inputVacio(telefono)){
        if(!inputTelefono(telefono)){
            telefonoFormulario.classList.add('input-error') // Agrega una clase de error al input
            mostrarError(telefonoFormulario, "El numero de telefono debe contener 10/11 caracteres en total")
            formularioValido = false
        } else {
            telefonoFormulario.classList.remove('input-error') // Remueve la clase de error si es válido
            ocultarError(telefonoFormulario)
        }
    }else{
        telefonoFormulario.classList.add('input-error'); // Agrega una clase de error al input
        mostrarError(telefonoFormulario, "El numero de telefono no puede estar vacio.")
        formularioValido = false
    }
    
    //valida el dni
    const dni = dniFormulario.value
    if(!inputVacio(dni)){
        if(!inputDni(dni)){
            dniFormulario.classList.add('input-error') // Agrega una clase de error al input
            mostrarError(dniFormulario, "El DNI debe contener 8 numeros.")
            formularioValido = false
        } else {
            dniFormulario.classList.remove('input-error') // Remueve la clase de error si es válido
            ocultarError(dniFormulario)
        }
    }else{
        dniFormulario.classList.add('input-error'); // Agrega una clase de error al input
        mostrarError(dniFormulario, "El DNI no puede estar vacio.")
        formularioValido = false
    }

    //valida los datos de la tarjeta
    // valida la forma de pago
    const formaPago = formaPagoFormulario.value
    if (!selectOpciones(formaPago)) {
        formaPagoFormulario.classList.add('input-error') // Agrega una clase de error al select
        mostrarError(formaPagoFormulario, "Elegi una opcion.")
        formularioValido = false
    } else {
        formaPagoFormulario.classList.remove('input-error') // Remueve la clase de error si es válido
        ocultarError(formaPagoFormulario);
    }

        // valida las cuotas
        const cuotas = cuotasFormulario.value
        if (!selectOpciones(cuotas)) {
            cuotasFormulario.classList.add('input-error') // Agrega una clase de error al select
            mostrarError(cuotasFormulario, "Elegi una opcion.")
            formularioValido = false
        } else {
            cuotasFormulario.classList.remove('input-error') // Remueve la clase de error si es válido
            ocultarError(cuotasFormulario);
        }

    // valida el num de tarjeta
    const numTarj = numTarjetaFormulario.value
    if(!inputVacio(numTarj)){
        if(!inputNumTarjeta(numTarj)){
            numTarjetaFormulario.classList.add('input-error') // Agrega una clase de error al input
            mostrarError(numTarjetaFormulario, "El numero de tarjeta debe contener 16 numeros")
            formularioValido = false
        } else {
            numTarjetaFormulario.classList.remove('input-error') // Remueve la clase de error si es válido
            ocultarError(numTarjetaFormulario)
        }
    }else{
        numTarjetaFormulario.classList.add('input-error'); // Agrega una clase de error al input
        mostrarError(numTarjetaFormulario, "El numero de tarjeta no puede estar vacio.")
        formularioValido = false
    }

    // valida el nombre del titular
    const nombreTitular = nombreTitularFormulario.value
    if(!inputVacio(nombreTitular)){
        if (!inputLetras(nombreTitular)) {
            nombreTitularFormulario.classList.add('input-error'); // Agrega una clase de error al input
            mostrarError(nombreTitularFormulario, "El nombre solo debe contener letras.")
            formularioValido = false
        } else {
            nombreTitularFormulario.classList.remove('input-error'); // Remueve la clase de error si es válido
            ocultarError(nombreTitularFormulario)
        }
    }else{
        nombreTitularFormulario.classList.add('input-error'); // Agrega una clase de error al input
        mostrarError(nombreTitularFormulario, "El nombre no puede estar vacio.")
        formularioValido = false
    }

    // valida la fecha de vencimiento a ver si no esta vencida
    const fechaVenc = fechaVencimientoFormulario.value
    if(!inputVacio(fechaVenc)){
        if (!inputFecha(fechaVenc)) {
            fechaVencimientoFormulario.classList.add('input-error') // Agrega una clase de error al input
            mostrarError(fechaVencimientoFormulario, "La tarjeta esta vencida.")
            formularioValido = false
        } else {
            fechaVencimientoFormulario.classList.remove('input-error') // Remueve la clase de error si es válido
            ocultarError(fechaVencimientoFormulario)
        }
    }else{
        fechaVencimientoFormulario.classList.add('input-error'); // Agrega una clase de error al input
        mostrarError(fechaVencimientoFormulario, "La fecha de vencimiento no puede estar vacia.")
        formularioValido = false
    }

    // valida el cvc de la tarjeta
    const cvc = cvcTarjetaFormulario.value
    if(!inputVacio(cvc)){
        if (!inputCVC(cvc)) {
            cvcTarjetaFormulario.classList.add('input-error')// Agrega una clase de error al input
            mostrarError(cvcTarjetaFormulario, "El CVC debe contener 3 numeros.")
            formularioValido = false
        } else {
            cvcTarjetaFormulario.classList.remove('input-error') // Remueve la clase de error si es válido
            ocultarError(cvcTarjetaFormulario)
        }
    }else{
        cvcTarjetaFormulario.classList.add('input-error'); // Agrega una clase de error al input
        mostrarError(cvcTarjetaFormulario, "El CVC no puede estar vacio.")
        formularioValido = false
    }

    if (formularioValido) {
        // guarda los datos en el sessionStorage
        sessionStorage.setItem('email', emailFormulario.value);
        sessionStorage.setItem('mdp', formaPagoFormulario.value);
        sessionStorage.setItem('totalPago', precioCarrito.textContent);
        // si no hay datos erroneos redirecciona a este html
        window.location.href = 'pago_realizado.html'
    }
})



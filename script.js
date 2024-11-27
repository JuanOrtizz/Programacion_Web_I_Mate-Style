import Producto from "./Producto.js" 
import Carrito from "./Carrito.js" 

//DOM PARA EL PAGO_REALIZADO.HTML
// funcion para modificar la informacion del pago
// recupero los valores del sessionStorage
let mdpPagoRealizado = sessionStorage.getItem('mdp')
const emailPagoRealizado = sessionStorage.getItem('email')
const totalPagoRealizado = sessionStorage.getItem('totalPago')

// recupero los elementos desde el HTML donde se van a agregar los datos del session storage
const emailElemento = document.getElementById('email-pago-realizado')
const mdpElemento = document.getElementById('mdp-pago-realizado')
const totalElemento = document.getElementById('total-pago-realizado')

// agrego un evento cuando cargue el dom
document.addEventListener('DOMContentLoaded', () => {
    // si ninguno de los elementos es null recien ejecuta esto.
    if(emailElemento && mdpElemento && totalElemento){
        //asigno los datos
        emailElemento.textContent = emailPagoRealizado

        if(mdpPagoRealizado === "1"){
            mdpPagoRealizado = "Debito"
        }else if(mdpPagoRealizado === "2"){
            mdpPagoRealizado = "Credito"
        }
        mdpElemento.textContent = mdpPagoRealizado

        totalElemento.textContent = totalPagoRealizado
    }
    
})

// MANEJO DE LA PESTAÑANA PANTALLA_CARGA_COMPRA.HTML
// funcion asincrona para obtener las frases de una api de mockAPI que cree yo.
async function cargarApiFrases() {
    fetch("https://67474f1a38c8741641d64755.mockapi.io/frases")
    .then(response => response.json())
    .then(data =>
        {const frases = data.map(item => item.frase) // utiliza map
        crearFraseDeCompra(frases)
        }
    )    
}

// funcion para crear la frase de compra
function crearFraseDeCompra(frases){
    // traigo el contenedor de la frase
    const contenedorFrase = document.getElementById('contenedor-frase')
    if(contenedorFrase){
        if (frases.length > 0) {
            // toma una frase aleatoria
            const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)] // uso la clase math para que ponga una frase random de las 5 que hay, cada vez que se realiza una compra
            const frase = document.createElement('p')
            frase.textContent = fraseAleatoria
        
            // agrego la frase al contenedor
            contenedorFrase.appendChild(frase)
        }
    }
}

// MANEJO DE LAS PESTAÑAS MATES.HTML, BOMBILLAS.HTML, TERMOS.HTML Y ACCESORIOS.HTML
// funcion asincrona que permite cargar TODOS los objetos en el DOM 
async function cargarJson(){
    // obtengo con fetch las respuesta del json
    const respuesta = await fetch("./api/productos.json")
    // lo paso a json
    const productos = await respuesta.json()

    // detecta la categoria por la localizacion del path/direccion de la pestaña, lo hice con ayuda de investigacion realizada en stackoverflow y chatgpt
    const categoria = window.location.pathname.split('/').pop().split('.').shift()

    //obtengo del html el contenedor donde los voy a agregar a los productos
    const contenedorProductosJson = document.querySelector('.contenedor-de-productos')

    // filtra los productos por la categoria que son (mates, bombillas, termos, accesorios)
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria) // uso filter

    // si hay productos, los agrega al contenedor correspondiente
    if (productosFiltrados.length > 0) {
        console.log(productosFiltrados) // imprimo por consola los productos para visualizar que si cargan desde aca y no desde el html
        crearContenedoresProductosJson(productosFiltrados, contenedorProductosJson)
    }
}

// funcion para crear los productos en el DOM
function crearContenedoresProductosJson(productosFiltrados, contenedorProductosJson){
    productosFiltrados.forEach((producto) =>{
        // por cada producto crea su card que tenian antes en el html
        const contenedorIndividual = document.createElement('div')
        contenedorIndividual.classList.add('producto-unitario')
        contenedorIndividual.innerHTML = 
        `<img class="imagen-producto" src="${producto.imagen}" alt="${producto.nombre}">
        <p class="nombre-producto">${producto.nombre}</p>
        <h3 class="precio-producto">$${producto.precio}</h3>
        <button class="boton-productos" type="submit">Agregar al carrito</button>
        `
        // lo agrego al contenedor pasado por parametros
        contenedorProductosJson.appendChild(contenedorIndividual)

        // FUNCIONALIDAD DE AGREGAR AL CARRITO, AGREGANDOLO EL PRODUCTO AL CARRITO DE PRODUCTOS EN CARRITO_PAGO.HTML
        // selecciono todos los botones Agregar al carrito
        const botonAgregarCarrito = contenedorIndividual.querySelector('.boton-productos')

        // asigno el evento de clic a todos los botones agregar al carrito
        botonAgregarCarrito.addEventListener('click', () => {
            // encuentro el contenedor del producto que se hizo clic
            const producto = botonAgregarCarrito.closest('.producto-unitario')

            // guardo sus datos 
            const imagen = producto.querySelector('.imagen-producto').src
            const nombre = producto.querySelector('.nombre-producto').textContent
            const precio = parseFloat(producto.querySelector('.precio-producto').textContent.replace('$', '').trim()) //le elimino el símbolo $ y  convierto a numero

            // crea un objeto producto 
            const productoNuevo = new Producto (imagen, nombre, precio) 

            carrito.agregar(productoNuevo)

            // imprime por consola que se agrego el producto alc arrito
            console.log("Producto agregado al carrito", productoNuevo)
        })
    })  
}

// EVENTO AL CARGAR EL DOM PARA QUE CARGUE LOS PRODUCTOS ESTATICOS QUE ESTABAN EN EL HTML, AHORA DESDE UN JSON USANDO FETCH. ADEMAS TAMBIEN CARGA LA FRASE DE COMPRA, SIEMPRE Y CUANDO ESTE DISPONIBLE SU CONTENEDOR
document.addEventListener('DOMContentLoaded', () =>{
    cargarJson()
    cargarApiFrases()
})

//DOM PARA LAS PAGINAS DE PRODUCTOS (mates.html, bombillas.html, accesorios.html, termos.html)
//FILTRAR POR PRECIO LOS PRODUCTOS
// tomo los precios ingresados por el usuario en el input y todos los productos con el querySelectorAll
const precioMinimo = document.getElementById('rango-precio-min')
const precioMaximo = document.getElementById('rango-precio-max')
// tomo el contenedor de productos, para modificarlo si no hay productos en el rango del precio, accedo al indice 0 que es el unico elemento en la pagina con esta clase
const contenedorProductos = document.getElementsByClassName('contenedor-de-productos')[0]

// funcion para cargar los productos filtrados por precio usando filter.
async function cargarJsonFiltradoPrecio (precioMinimoValor, precioMaximoValor){
    // obtengo con fetch las respuesta del json
    const respuesta = await fetch("./api/productos.json")
    // lo paso a json
    const productos = await respuesta.json()

    // detecta la categoria por la localizacion del path/direccion de la pestaña, lo hice con ayuda de investigacion realizada en stackoverflow y chatgpt
    const categoria = window.location.pathname.split('/').pop().split('.').shift()

    // obtengo del html el contenedor donde los voy a agregar a los productos
    const contenedorProductosJson = document.querySelector('.contenedor-de-productos')

    // filtra los productos por la categoria que son (mates, bombillas, termos, accesorios) y ahora ademas por el rango de precio, que ingreso el usuario
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria && producto.precio >= precioMinimoValor && producto.precio <= precioMaximoValor)

    // si hay productos, los agrega y los imprime por consola en formato table
    if (productosFiltrados.length > 0) {
        crearContenedoresProductosJson(productosFiltrados, contenedorProductosJson)
        console.table(productosFiltrados)
    }else{
        // si no hay productos filtrados, imprime por consola lo siguiente
        console.log("No hay productos en el rango especificado")
        const textoAgregar = document.createElement('h3')
        if(isNaN(precioMinimoValor)){
            precioMinimoValor = 0
        }
        if(isNaN(precioMaximoValor)){
            precioMaximoValor = 0
        }
        textoAgregar.textContent = "No hay productos en el rango de precio: " + "$" +precioMinimoValor + " - $" + precioMaximoValor
        textoAgregar.classList.add('texto-filtro-sin-productos')
        contenedorProductos.appendChild(textoAgregar)
    } 
}

// funcion para filtrar por precios
function filtroRangoPrecio() {
    // obtengo los valores de los inputs pasandolos a float/decimal
    let precioMinimoValor = parseFloat(precioMinimo.value)
    let precioMaximoValor = parseFloat(precioMaximo.value)

    // si ya hay un mensaje que no hay productos en ese rango de precio lo elimina
    const mensajeFiltro = document.querySelector('.texto-filtro-sin-productos')
    if (mensajeFiltro) {
        mensajeFiltro.remove() // elimina el mensaje existente si lo hay
    }

    // valido los precios y en este unico caso lanzo modales para indicar el error.
    if (isNaN(precioMinimoValor) || precioMinimoValor < 0) {
        funcionInternaFiltroPreciosModales("El precio mínimo debe ser igual o mayor a 0")
    }
    else if (isNaN(precioMaximoValor) || precioMaximoValor <= precioMinimoValor) {
        funcionInternaFiltroPreciosModales("El precio máximo debe ser un número mayor al precio mínimo")
    }

    // vacio el contenido del contenedor de los productos
    contenedorProductos.innerHTML = ''

    // cargo los productos siendo filtrados por el rango de precios y creandolos de nuevo en el dom
    cargarJsonFiltradoPrecio(precioMinimoValor, precioMaximoValor)

    // vacia los input al hacer clic en el del precio minimo
    precioMinimo.addEventListener('click', () =>{
            precioMinimo.value = '' 
            precioMaximo.value = ''
    })
}

// funcion interna para mostrar los modales en los errores de inputs de filtros
function funcionInternaFiltroPreciosModales(mensaje){
    const modalElement = document.getElementById("exampleModal")
    const modal = new bootstrap.Modal(modalElement)
    const bodyModal = document.querySelector('.modal-body')
    const parrafoModal = document.createElement('p')
    bodyModal.innerHTML = ''
    parrafoModal.textContent = mensaje
    bodyModal.appendChild(parrafoModal)
    modal.show()

    const botonModal = document.getElementById('boton-modal')
    if(botonModal){
        botonModal.addEventListener('click', () =>{
            modal.hide()
        })
}
}

// ahora agrego el evento al boton para filtrar donde escucha el evento de clic en el boton y aplica la funcion de arriba, ademas de prevenir que se envie el formulario
document.addEventListener('DOMContentLoaded', () => {
    // si ninguno de los elementos es null recien ejecuta esto.
    if(precioMinimo && precioMaximo){
        document.getElementById('aplicar-rango-precio').addEventListener('click', (e) => {
            e.preventDefault()
            filtroRangoPrecio()
        })
    }
})

// AGREGAR AL CARRITO, POPUP/TOAST CON BOOTSTRAP
// esto lo hice con bootstrap y un poco de ayuda de chatgpt ya que no funcionaba bien el toast, ya que se superponian al modificarle el nombre de la card que se mostraba
const toastContainer = document.getElementById('toastContainer')

// agrego el evento clic en todos los botones Agregar al carrito de cada aproducto
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton-productos')) {
        // asigno el contenedor del producto correspondiente
        const producto = event.target.closest('.producto-unitario')

        // obtiene los datos del producto que se hizo clic y los guarda
        const nombreProducto = producto.querySelector('.nombre-producto').textContent
        const precioProducto = producto.querySelector('.precio-producto').textContent
        const imagenProducto = producto.querySelector('.imagen-producto').src

        // esto genera un id unico para cada toast para poder mostrarlos uno encima del otro
        const toastId = `toast-${Date.now()}`

        // aca asignamos que cree el toast con la estructura html
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

        // añado el toast al contenedor
        toastContainer.insertAdjacentHTML('beforeend', toastHTML)

        // inicializo el toast como pide bootsrap y le pongo que dure 3 segundos en la apntalla
        const toastElement = document.getElementById(toastId)
        const toastInstance = new bootstrap.Toast(toastElement,{
            delay: 3000
        })

        // ahora lo muestra, cada vez que se hace clic
        toastInstance.show()
    }
})


//AGREGA LOS ELEMENTOS DEL CARRITO GUARDADO EN EL LOCALSTORAGE EN LA SECCION PRODUCTOS DEL CARRITO_PAGO.HTML
const carrito = new Carrito()
// selecciono el contenedor donde se agregan los productos del carrito y tambien el precio total del carrito para ir actualizandolo
const productosCarrito = document.querySelector('.productos-carrito-pago')
const precioCarrito = document.getElementById('precio-carrito-total')

document.addEventListener('DOMContentLoaded', () => {
    // si ninguno de los elementos es null recien ejecuta esto.
    if(productosCarrito && precioCarrito){
        // si hay productos en el carrito, hace lo siguiente
        if (carrito.productos.length > 0) {
            carrito.productos.forEach((producto) => {
                // creo un contenedor para cada producto en el carrito que esta con los estilos ya en el styles.css
                const productoCarrito = document.createElement('div')
                productoCarrito.classList.add('producto-interno-carrito')
        
                // creo y agrego la imagen del producto
                const imagenProducto = document.createElement('img')
                imagenProducto.classList.add('imagen-producto-interno')
                imagenProducto.src = producto.imagen
                productoCarrito.appendChild(imagenProducto)
        
                // creo y agrego el nombre del producto
                const nombreProducto = document.createElement('p')
                nombreProducto.classList.add('nombre-producto-interno')
                nombreProducto.textContent = producto.nombre
                productoCarrito.appendChild(nombreProducto)
        
                // creo y agrego el precio del producto
                const precioProducto = document.createElement('h3')
                precioProducto.classList.add('precio-producto')
        
                // creo el span para el simbolo del precio
                const simboloPrecio = document.createElement('span')
                simboloPrecio.classList.add('simbolo-precio')
                simboloPrecio.textContent = '$' 
        
                // creo  el span para el precio
                const valorPrecio = document.createElement('span')
                valorPrecio.classList.add('valor-precio')
                valorPrecio.textContent = parseInt(producto.precio) 
        
                // agrego los spans al contenedor del precio
                precioProducto.appendChild(simboloPrecio)
                precioProducto.appendChild(valorPrecio)
        
                // agrego el contenedor del precio al contenedor del producto
                productoCarrito.appendChild(precioProducto)

                // creo los botones para ver el stock y manipular el mismo 
                const botonesStock = document.createElement('div')
                botonesStock.classList.add('cantidad-stock')

                const botonRestarStock = document.createElement('button')
                const botonSumarStock = document.createElement('button')
                botonRestarStock.textContent = "-"
                botonSumarStock.textContent = "+"


                // creo el numero de cantidad de stock en el carrito
                const cantidadProducto = document.createElement('p')
                cantidadProducto.textContent = producto.cantidad
                
                // agrego en orden
                botonesStock.appendChild(botonRestarStock)
                botonesStock.appendChild(cantidadProducto)
                botonesStock.appendChild(botonSumarStock)

                // agrego los botones al contenedor
                productoCarrito.appendChild(botonesStock)

                // creo el boton de eliminar con el icono delete dentro
                const eliminarProducto = document.createElement('button')
                eliminarProducto.classList.add('eliminar-producto-interno')
                
                // creo el span con la clase para el icono
                const spanIcon = document.createElement('span')
                spanIcon.classList.add('material-symbols-outlined')
                spanIcon.textContent = 'delete' // pone el icono 'delete' dentro del span
        
                // agrego el span al boton
                eliminarProducto.appendChild(spanIcon)
        
                // evento para eliminar el producto del carrito al hacer clic en el boton donde tiene el span con el icono
                eliminarProducto.addEventListener('click', () => {
                    // elimino el producto del carrito en localStorage
                        carrito.eliminar(producto)
                        productoCarrito.remove()
                        precioCarrito.textContent = "$" + carrito.calcularTotalCarrito() // actualiza el total del carrito 
                })
                
                // evento para sumar la cantidad del producto en el carrito 
                botonSumarStock.addEventListener('click', ()=>{
                    sumarProducto(producto, cantidadProducto)
                    precioCarrito.textContent = "$" + carrito.calcularTotalCarrito() // actualiza el total del carrito 
                })

                // evento para restar la cantidad del producto en el carrito
                botonRestarStock.addEventListener('click', ()=>{
                    restarProducto(producto, cantidadProducto, productoCarrito)
                    precioCarrito.textContent = "$" + carrito.calcularTotalCarrito() // actualiza el total del carrito 
                })
        
                // agrego el botón de eliminacion al contenedor del producto
                productoCarrito.appendChild(eliminarProducto)
        
                // agrego el producto al contenedor del carrito finalmente
                productosCarrito.appendChild(productoCarrito)
            })
        }
    }
})

function sumarProducto(producto, cantidadElemento){
    producto.cantidad++ // aumenta en uno la cantidad en el objeto producto
    cantidadElemento.textContent = producto.cantidad // actualiza la cantidad en el DOM
    carrito.guardar() // guarda de nuevo la cantidad en el localstorage
}

function restarProducto(producto, cantidadElemento, productoCarrito){
    if (producto.cantidad > 1) {
        producto.cantidad-- // Decrementa la cantidad en el objeto producto
        cantidadElemento.textContent = producto.cantidad // actualiza la cantidad en el DOM
        carrito.guardar()// guarda la cantidad seteada en el localstorage
    }else if (producto.cantidad <= 1){ // si es menor o igual a 1 lo elimina a todo el contenedor del producto, similar al span con el simbolo borrar
        carrito.eliminar(producto)
        productoCarrito.remove()
        carrito.guardar()
    }
}

// ejecutamos la funcion 
// si el elemento no es null ejecuta esto
if(precioCarrito){
    precioCarrito.textContent = "$" + carrito.calcularTotalCarrito()
}

//funcion para mostrar el error en un input si hay datos invalidos que recibe el input y el mensaje de error
function mostrarError(input, mensaje) {
    let errorMensaje = input.nextElementSibling // busca el elemento donde mostrar el error

    if (!errorMensaje || !errorMensaje.classList.contains('error-text')) {
        // si no existe el mensaje de error, lo creo y le asigna las clases y el contenedor definidos en el styles.css
        errorMensaje = document.createElement('div')
        errorMensaje.className = 'error-text'
        input.parentNode.insertBefore(errorMensaje, input.nextSibling)
    }

    errorMensaje.textContent = mensaje
}

// funcion para dejar de mostrar el mensaje de error
function ocultarError(input) {
    const errorMensaje = input.nextElementSibling
    if (errorMensaje && errorMensaje.classList.contains('error-text')) {
        errorMensaje.remove() // elimina el mensaje de error si existe
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

// eventos para evitar que se agreguen mas caracteres de lo permitido
const maxLongitudDNI = 8
const maxLongitudTelefono = 11
const maxLongitudTarjeta = 19
const maxLongitudCVC = 3
// si ninguno de los elementos es null recien ejecuta esto.
if(dniFormulario && telefonoFormulario && numTarjetaFormulario && cvcTarjetaFormulario){
    dniFormulario.addEventListener('input', () => {
        let valor = dniFormulario.value
        // evita que se ingresen más de los 8 caracteres permitidos
        if (valor.length > maxLongitudDNI) {
            dniFormulario.value = valor.substring(0, maxLongitudDNI)
        }
    })

    telefonoFormulario.addEventListener('input', () => {
            let valor = telefonoFormulario.value
            // evita que se ingresen más de los 11 caracteres permitidos
            if (valor.length > maxLongitudTelefono) {
                telefonoFormulario.value = valor.substring(0, maxLongitudTelefono)
            }
    })

    numTarjetaFormulario.addEventListener('input', () => {
        let valor = numTarjetaFormulario.value
        // elimina todo lo que no sea un numero, negando poner letras por ejemplo
        valor = valor.replace(/\D/g, "")
        // pone un guion cada 4 numeros
        if (valor.length > 4) {
            valor = valor.replace(/(\d{4})(?=\d)/g, "$1-")
        }
        // le pongo el limite contando los guiones
        if (valor.length > maxLongitudTarjeta) {
            valor = valor.substring(0, maxLongitudTarjeta)
        }
        numTarjetaFormulario.value = valor
    })

    cvcTarjetaFormulario.addEventListener('input', () => {
        let valor = cvcTarjetaFormulario.value
        // evita que se ingresen más de los 10 caracteres
        if (valor.length > maxLongitudCVC) {
            cvcTarjetaFormulario.value = valor.substring(0, maxLongitudCVC)
        }
    })
}

// funciones para verificar que un input cumpla con los requisitos

// funcion para verificar si no esta vacio el input
function inputVacio(texto) {
    return texto.trim() === "" // le borro los espacios al principio y al final y verifico si esta vacio
}

// funcion para verificar si contiene unicamente letras
function inputLetras(texto) {
    const patron = /^[a-zA-Z\s]+$/ // patron regex para comprabar esto con el test
    return patron.test(texto)
}

//funcion para verificar si es un mail valido
function inputEmail(texto){
    const patron = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // patron regex para comprabar esto con el test 
    return patron.test(texto)
}

// funcion para verificar si es un numero valido
function inputTelefono(texto){
    return texto.length >= 10 && texto.length <= 11 // sin el + 54
}

// funcion para verificar si el DNI es valido
function inputDni(texto){
    return texto.length == 8 //si no es igual a 8 la longitud
}

// funcion para verificar si selecciono una opcion en forma de pago y cuotas
function selectOpciones(opcionSeleccionada){
    return opcionSeleccionada !== "0" //si es = 0 es que no selecciono
}

// funcion para verificar si el numero de tarjeta es valido
function inputNumTarjeta(texto){
    return texto.length == 19 //si no es igual a 19 la longitud contando los guiones que se ponen automaticamente
}

// funcion para verificar si la fecha de vencimiento es valida
function inputFecha(fecha){
    const hoy = new Date() //guarda la fecha de hoy en una constante
    const fechaVencimiento = new Date(fecha) // guarda la fecha pasada por parametros en una constante, con tipo date
    return fechaVencimiento > hoy // si la fecha recibida por parametros es menor a la de hoy retorna false
}

// funcion para verificar si el cvc es valido
function inputCVC(texto){
    return texto.length == 3 //si no es igual a 3 la longitud
}

// funciones para validar los input con las funciones que verifican si todo esta bien
function validarNombre(nombre){
    if(!inputVacio(nombre)){
        if (!inputLetras(nombre)) {
            nombreFormulario.classList.add('input-error') // agrega la clase de error al input
            mostrarError(nombreFormulario, "El nombre solo debe contener letras.")
            return false
        } else {
            nombreFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
            ocultarError(nombreFormulario)
            return true
        }
    }else{
        nombreFormulario.classList.add('input-error') // agrega una clase de error al input
        mostrarError(nombreFormulario, "El nombre no puede estar vacio.")
        return false
    }
}

function validarEmail(email){
        if(!inputVacio(email)){
            if(!inputEmail(email)){
                emailFormulario.classList.add('input-error') // agrega una clase de error al input
                mostrarError(emailFormulario, "El email proporcionado no es valido, verificalo.")
                return false
            } else {
                emailFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
                ocultarError(emailFormulario)
                return true
            }
        }else{
            emailFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(emailFormulario, "El email no puede estar vacio.")
            return false
        }
}

function validarTelefono(telefono){
    if(!inputVacio(telefono)){
        if(!inputTelefono(telefono)){
            telefonoFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(telefonoFormulario, "El numero de telefono debe contener 10/11 caracteres en total")
            return false
        } else {
            telefonoFormulario.classList.remove('input-error') //  elimina la clase de error si es valido y estaba 
            ocultarError(telefonoFormulario)
            return true
        }
    }else{
        telefonoFormulario.classList.add('input-error') // agrega una clase de error al input
        mostrarError(telefonoFormulario, "El numero de telefono no puede estar vacio.")
        return false
    }
}

function validarDni(dni){
    if(!inputVacio(dni)){
        if(!inputDni(dni)){
            dniFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(dniFormulario, "El DNI debe contener 8 numeros.")
            return false
        } else {
            dniFormulario.classList.remove('input-error')// elimina la clase de error si es valido y estaba 
            ocultarError(dniFormulario)
            return true
        }
    }else{
        dniFormulario.classList.add('input-error') // agrega una clase de error al input
        mostrarError(dniFormulario, "El DNI no puede estar vacio.")
        return false
    }
}

function validarFormaPago(formaPago){
    if (!selectOpciones(formaPago)) {
        formaPagoFormulario.classList.add('input-error') // agrega una clase de error al select
        mostrarError(formaPagoFormulario, "Elegi una opcion.")
        return false
    } else {
        formaPagoFormulario.classList.remove('input-error')// elimina la clase de error si es valido y estaba 
        ocultarError(formaPagoFormulario)
        return true
    }
}

function validarCuotas(cuotas){
    if (!selectOpciones(cuotas)) {
        cuotasFormulario.classList.add('input-error') // agrega una clase de error al select
        mostrarError(cuotasFormulario, "Elegi una opcion.")
        return false
    } else {
        cuotasFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
        ocultarError(cuotasFormulario)
        return true
    }
}

function validarNumTarjeta(numTarj){
    if(!inputVacio(numTarj)){
        if(!inputNumTarjeta(numTarj)){
            numTarjetaFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(numTarjetaFormulario, "El numero de tarjeta debe contener 16 numeros")
            return false
        } else {
            numTarjetaFormulario.classList.remove('input-error')// elimina la clase de error si es valido y estaba 
            ocultarError(numTarjetaFormulario)
            return true
        }
    }else{
        numTarjetaFormulario.classList.add('input-error') // agrega una clase de error al input
        mostrarError(numTarjetaFormulario, "El numero de tarjeta no puede estar vacio.")
        return false
    }
}

function validarNombreTitular(nombreTitular){
    if(!inputVacio(nombreTitular)){
        if (!inputLetras(nombreTitular)) {
            nombreTitularFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(nombreTitularFormulario, "El nombre solo debe contener letras.")
            return false
        } else {
            nombreTitularFormulario.classList.remove('input-error')// elimina la clase de error si es valido y estaba 
            ocultarError(nombreTitularFormulario)
            return true
        }
    }else{
        nombreTitularFormulario.classList.add('input-error') // agrega una clase de error al input
        mostrarError(nombreTitularFormulario, "El nombre no puede estar vacio.")
        return false
    }
}

function validarFechaVenc(fechaVenc){
    if(!inputVacio(fechaVenc)){
        if (!inputFecha(fechaVenc)) {
            fechaVencimientoFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(fechaVencimientoFormulario, "La tarjeta esta vencida.")
            return false
        } else {
            fechaVencimientoFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
            ocultarError(fechaVencimientoFormulario)
            return true
        }
    }else{
        fechaVencimientoFormulario.classList.add('input-error') // agrega una clase de error al input
        mostrarError(fechaVencimientoFormulario, "La fecha de vencimiento no puede estar vacia.")
        return false
    }
}

function validarCvc(cvc){
    if(!inputVacio(cvc)){
        if (!inputCVC(cvc)) {
            cvcTarjetaFormulario.classList.add('input-error')// agrega una clase de error al input
            mostrarError(cvcTarjetaFormulario, "El CVC debe contener 3 numeros.")
            return false
        } else {
            cvcTarjetaFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
            ocultarError(cvcTarjetaFormulario)
            return true
        }
    }else{
        cvcTarjetaFormulario.classList.add('input-error') // agrega una clase de error al input
        mostrarError(cvcTarjetaFormulario, "El CVC no puede estar vacio.")
        return false
    }
}

// FUNCION PRINCIPAL DE VALIDACION
function validarFormulario() {
    let formularioValido = true

    // valida el nombre
    const nombre = nombreFormulario.value
    if (!validarNombre(nombre)) formularioValido = false

    // valida el email
    const email = emailFormulario.value
    if (!validarEmail(email)) formularioValido = false

    // valida el telefono
    const telefono = telefonoFormulario.value
    if (!validarTelefono(telefono)) formularioValido = false

    // valida el DNI
    const dni = dniFormulario.value
    if (!validarDni(dni)) formularioValido = false

    // valida la forma de pago
    const formaPago = formaPagoFormulario.value
    if (!validarFormaPago(formaPago)) formularioValido = false

    // valida las cuotas
    const cuotas = cuotasFormulario.value
    if (!validarCuotas(cuotas)) formularioValido = false

    // valida el numero de tarjeta
    const numTarj = numTarjetaFormulario.value
    if (!validarNumTarjeta(numTarj)) formularioValido = false

    // valida el nombre del titular
    const nombreTitular = nombreTitularFormulario.value
    if (!validarNombreTitular(nombreTitular)) formularioValido = false

    // valida la fecha de vencimiento
    const fechaVenc = fechaVencimientoFormulario.value
    if (!validarFechaVenc(fechaVenc)) formularioValido = false

    // valida el CVC
    const cvc = cvcTarjetaFormulario.value
    if (!validarCvc(cvc)) formularioValido = false

    // retorna el booleano
    return formularioValido
}

// EVENTO PARA ENVIAR LOS FORMULARIOS
// si el elemento no es null recien carga este evento
if(botonEnviar){
    botonEnviar.addEventListener('click', () => {
        // declaro la constante si el formulario es valido interactua con el if
        const formularioValido = validarFormulario()

        // si el formulario es valido, es decir mantiene el valor true, guarda los datos que se van a usar en otro html(pago_realizado.html) y redirecciona a este.
        if (formularioValido) {
            // si el carrito esta vacio muetra un modal avisando que el carrito esta vacio, eliminando el alert
            if (carrito.productos.length === 0) {
                console.log("El carrito está vacio")
                const modalElement = document.getElementById("exampleModal")
                if(modalElement){
                    const modal = new bootstrap.Modal(document.getElementById("exampleModal"))
                    modal.show()

                    const botonModal = document.getElementById('boton-modal')
                    if(botonModal){
                        botonModal.addEventListener('click', () =>{
                            modal.hide()
                        })
                    }
                }
            } else {// si no esta vacio realiza la compra y hace lo siguiente
                // guarda los datos en el sessionStorage
                sessionStorage.setItem('email', emailFormulario.value)
                sessionStorage.setItem('mdp', formaPagoFormulario.value)
                sessionStorage.setItem('totalPago', precioCarrito.textContent)
    
                //vacio el carrito
                carrito.vaciarCarrito()
    
                // elimino los productos del DOM
                const productosCarrito = document.querySelectorAll('.producto-carrito') 
                productosCarrito.forEach(productoCarrito => {
                    productoCarrito.remove() // elimina cada producto del carrito en el DOM
                })
                
                // imprime por consola esto
                console.log("Compra realizada")
            
                // actualizar el total del carrito 
                precioCarrito.textContent = "$" + carrito.calcularTotalCarrito()
    
                // si no hay datos erroneos redirecciona a este html
                window.location.href = 'pantalla_carga_compra.html'
            }
        }
    })
}

const barraProgreso = document.querySelector('.progress-bar')
if (barraProgreso){
    // declaro una variable para el progreso de la barra de bootstrap
    let progreso = 0

    const tiempoIncremento = 50 // tiempo entre cada incremento en milisegundos
    let tiempoTotal = 5000 // tiempo total que son 5 segundos
    
    const incremento = 100 / (tiempoTotal / tiempoIncremento) // calculo el incremento 

    let intervalo = setInterval(actualizarProgresoBarra, tiempoIncremento) // declaro el intervalo con la funcion de abajo

    function actualizarProgresoBarra() {
        if (progreso < 100) { // si el progreso es menor a 100 ejecuta esto
            progreso += incremento
            barraProgreso.style.width = progreso + '%' // actualiza el ancho de la barra
            barraProgreso.setAttribute('aria-valuenow', progreso) // actualiza el valor de aria-valuenow de la barra de bootstrap
        } else{ // si el progreso es igual o mayor a 100
            clearInterval(intervalo) // limpia el intervalo
            // redirige a la pagina de pago_realizado.html despues de medio segundo de completar el progreso, asi el dom carga correctamente la barra al 100
            setTimeout(() => {
                window.location.href = 'pago_realizado.html'
            }, 500)
        }
    }   
}
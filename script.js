import Producto from "./Producto.js" 

//FUNCIONES QUE SE AGREGARAN CUANDO EXISTA EL PANEL ADMIN
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

// //funcion para cambiar el nombre de un producto  Esto va a ser solo para el administrador de la pagina en un futuro
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

// //funcion para cambiar el precio de un producto  Esto va a ser solo para el administrador de la pagina en un futuro
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

// //funcion para eliminar un producto  Esto va a ser solo para el administrador de la pagina en un futuro
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
    if(emailElemento, mdpElemento, totalElemento){
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

//DOM PARA LAS PAGINAS DE PRODUCTOS (mates.html, bombillas.html, accesorios.html, termos.html)
//FILTRAR POR PRECIO LOS PRODUCTOS
// tomo los precios ingresados por el usuario en el input y todos los productos con el querySelectorAll
const precioMinimo = document.getElementById('rango-precio-min')
const precioMaximo = document.getElementById('rango-precio-max')
const productos = document.querySelectorAll('.producto-unitario')
// tomo el contenedor de productos, para modificarlo si no hay productos en el rango del precio, accedo al indice 0 que es el unico elemento en la pagina con esta clase
const contenedorProductos = document.getElementsByClassName('contenedor-de-productos')[0]

// esto lo realice guiandome de una web donde amplie la informacion para como hacer para ocultar los productos que no estan dentro de ese rango, y
// llevo a cabo esto para guardar el display que usan para despues recuperarlo.
const productosOriginales = Array.from(productos).map(producto => {
    return {
        producto: producto,
        displayOriginal: window.getComputedStyle(producto).display
    }
})

// funcion para filtrar por precios
function filtroRangoPrecio() {
    // obtengo los valores de los inputs pasandolos a float/decimal
    let precioMinimoValor = parseFloat(precioMinimo.value)
    let precioMaximoValor = parseFloat(precioMaximo.value)

    //  si ya hay un mensaje que no hay productos en ese rango de precio lo elimina
    const mensajeFiltro = document.querySelector('.texto-filtro-sin-productos');
    if (mensajeFiltro) {
        mensajeFiltro.remove(); // Elimina el mensaje existente si lo hay
    }

    // valido los precios y en este unico caso en todo el simulador doy alerts. Ya que si no se genera una UX mala y molesta para el usuario
    if (isNaN(precioMinimoValor) || precioMinimoValor < 0) {
        alert("El precio mínimo debe ser un número mayor o igual a 0")
    }
    else if (isNaN(precioMaximoValor) || precioMaximoValor <= precioMinimoValor) {
        alert("El precio máximo debe ser un número mayor al precio mínimo")
    }

    // filtro productos, agregando una variable bandera y un array como esta solicitado en la actividad
    let productosFiltrados = false
    const productosVisibles = []

    // antes de volver a filtrar recupero el display que tenian todos los productos antes de filtrar nuevamente, tal como mencione mas arriba.
    productosOriginales.forEach(item => {
        item.producto.style.display = item.displayOriginal // restauro el display original
    })

    // bucle for each de los productos donde va guardando el precio, nombre e imagen de cada uno y si el precio es el filtrado lo agrega al array que declare arriba
    productos.forEach(producto => {
        // guardo por cada producto su informacion
        const precioProducto = parseFloat(producto.querySelector('.precio-producto').textContent.replace('$', ''))
        const nombreProducto = producto.querySelector('.nombre-producto').textContent
        const imagenProducto = producto.querySelector('.imagen-producto').getAttribute('src')

        // si ese producto tiene un precio entre el rango, muestra el producto y lo agrega al array para poder mostrarlo
        if (precioProducto >= precioMinimoValor && precioProducto <= precioMaximoValor) {
            producto.style.visibility = 'visible' // muestra el producto dentro del rango de precio
            const productoObj = new Producto(imagenProducto, nombreProducto, precioProducto) // crea un objeto Producto, utilizando la clase Producto.js, tal como solicita la entrega
            productosVisibles.push(productoObj) // agrega el producto al array
            productosFiltrados = true // coloca la bandera en true, para notificar que por lo menos hay 1 producto filtrado 
        } else {
            producto.style.display = 'none' // si no esta en el rango, lo oculta del html
        }
    })

    // vacia los input 
    precioMinimo.addEventListener('click', () =>{
            precioMinimo.value = '' 
            precioMaximo.value = ''
    })


    // si no hay productos filtrados, al menos uno, imprime por consola lo siguiente y si no, imprime un console table de los productos
    if (!productosFiltrados) {
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
    } else { 
        console.table(productosVisibles)
    }
}

// ahora agrego el evento al boton para filtrar donde escucha el evento de clic en el boton y aplica la funcion de arriba, ademas de prevenir que se envie el formulario
document.addEventListener('DOMContentLoaded', () => {
    // si ninguno de los elementos es null recien ejecuta esto.
    if(precioMinimo, precioMaximo){
        document.getElementById('aplicar-rango-precio').addEventListener('click', (e) => {
            e.preventDefault()
            filtroRangoPrecio()
        })
    }
})

// AGREGAR AL CARRITO, POPUP/TOAST CON BOOTSTRAP
// esto lo hice con bootstrap y un poco de ayuda de chatgpt ya que no funcionaba bien el toast, ya que se superponian al modificarle el nombre de la card que se mostraba
const toastContainer = document.getElementById('toastContainer')

// agrego el evento clic en todos los botones Agregar al carrito de cad aproducto
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

// AGREGAR AL CARRITO, AGREGANDOLO AL CARRITO DE PRODUCTOS DEW CARRITO_PAGO.HTML
// selecciono todos los botones Agregar al carrito
const botonesAgregarCarrito = document.querySelectorAll('.boton-productos')
console.log(botonesAgregarCarrito)

// asigno el evento de clic a todos los botones agregar al carrito
botonesAgregarCarrito.forEach((boton) => {
    boton.addEventListener('click', () => {
        // encuentro el contenedor del producto que se hizo clic
        const producto = boton.closest('.producto-unitario')

        // guardo sus datos 
        const imagen = producto.querySelector('.imagen-producto').src
        const nombre = producto.querySelector('.nombre-producto').textContent
        const precio = parseFloat(producto.querySelector('.precio-producto').textContent.replace('$', '').trim()) //le elimino el símbolo $ y  convierto a numero

        // crea un objeto producto 
        const productoNuevo = new Producto (imagen, nombre, precio) 

        // obtengo el carrito del localStorage si es que ya hay, o un arreglo vacio si no existe
        let carrito = JSON.parse(localStorage.getItem('carrito')) || []

        // agrego el producto que cree al carrito
        carrito.push(productoNuevo)

        // y vuelvo a guardar el carrito en el localStorage para que se mantenga por mas que se cierre la pagina
        localStorage.setItem('carrito', JSON.stringify(carrito))

        // imprime por consola que se agrego el producto alc arrito
        console.log("Producto agregado al carrito", productoNuevo)
    })
})


//AGREGA LOS ELEMENTOS DEL CARRITO GUARDADO EN EL LOCALSTORAGE EN LA SECCION PRODUCTOS DEL CARRITO_PAGO.HTML
// recupero el carrito desde localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || []

// selecciono el contenedor donde se agregan los productos del carrito y tambien el precio total del carrito para ir actualizandolo
const productosCarrito = document.querySelector('.productos-carrito-pago')
const precioCarrito = document.getElementById('precio-carrito-total')

document.addEventListener('DOMContentLoaded', () => {
    // si ninguno de los elementos es null recien ejecuta esto.
    if(productosCarrito, precioCarrito){
        // si hay productos en el carrito, hace lo siguiente
        if (carrito.length > 0) {
            carrito.forEach((producto) => {
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
                    const index = carrito.indexOf(producto)
                    if (index > -1) {
                        carrito.splice(index, 1)
                        localStorage.setItem('carrito', JSON.stringify(carrito))
                        productoCarrito.remove()
                        console.log("Producto eliminado del carrito")
                        calcularTotalCarrito() // actualiza el total del carrito 
                    }
                })
        
                // agrego el botón de eliminacion al contenedor del producto
                productoCarrito.appendChild(eliminarProducto)
        
                // agrego el producto al contenedor del carrito finalmente
                productosCarrito.appendChild(productoCarrito)
            })
        }
    }
})

// funcion para calcular el total del carrito
function calcularTotalCarrito(){
    let totalCarrito = 0
    if (carrito.length !== 0) {
        for (let producto of carrito) {
            totalCarrito += parseFloat(producto.precio)  // suma los precios de los productos en el carrito
        }
        precioCarrito.textContent = "$" + totalCarrito // muestra el total con 2 decimales
    } else {
        precioCarrito.textContent = "$0"  // si no hay productos muestra $0
    }
}

// ejecutamos la funcion 
// si el elemento no es null ejecuta esto
if(precioCarrito){
    calcularTotalCarrito()
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
if(dniFormulario, telefonoFormulario, numTarjetaFormulario, cvcTarjetaFormulario){
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
    if(texto.length != 19 ){ //si no es igual a 19 la longitud contando los guiones que se ponen automaticamente
        return false
    }
    else{
        return true
    }
}

// funcion para verificar si la fecha de vencimiento es valida
function inputFecha(fecha){
    const hoy = new Date() //guarda la fecha de hoy en una constante
    const fechaVencimiento = new Date(fecha) // guarda la fecha pasada por parametros en una constante, con tipo date
    if(fechaVencimiento < hoy){ // si la fecha recibida por parametros es menor a la de hoy retorna false
        return false
    }
    else{
        return true
    }
}

// funcion para verificar si el cvc es valido
function inputCVC(texto){
    if(texto.length != 3 ){ //si no es igual a 3 la longitud
        return false
    }
    else{
        return true
    }
}

// EVENTO PARA ENVIAR LOS FORMULARIOS
// si el elemento no es null recien carga este evento
if(botonEnviar){
    botonEnviar.addEventListener('click', () => {
    
        // valida los datos del cliente
        let formularioValido = true
    
        // valida el nombre
        const nombre = nombreFormulario.value
        if(!inputVacio(nombre)){
            if (!inputLetras(nombre)) {
                nombreFormulario.classList.add('input-error') // agrega la clase de error al input
                mostrarError(nombreFormulario, "El nombre solo debe contener letras.")
                formularioValido = false
            } else {
                nombreFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
                ocultarError(nombreFormulario)
            }
        }else{
            nombreFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(nombreFormulario, "El nombre no puede estar vacio.")
            formularioValido = false
        }
        
        //valida el email
        const email = emailFormulario.value
        if(!inputVacio(email)){
            if(!inputEmail(email)){
                emailFormulario.classList.add('input-error') // agrega una clase de error al input
                mostrarError(emailFormulario, "El email proporcionado no es valido, verificalo.")
                formularioValido = false
            } else {
                emailFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
                ocultarError(emailFormulario)
            }
        }else{
            emailFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(emailFormulario, "El email no puede estar vacio.")
            formularioValido = false
        }
        
        // valida el telefono
        const telefono = telefonoFormulario.value
        if(!inputVacio(telefono)){
            if(!inputTelefono(telefono)){
                telefonoFormulario.classList.add('input-error') // agrega una clase de error al input
                mostrarError(telefonoFormulario, "El numero de telefono debe contener 10/11 caracteres en total")
                formularioValido = false
            } else {
                telefonoFormulario.classList.remove('input-error') //  elimina la clase de error si es valido y estaba 
                ocultarError(telefonoFormulario)
            }
        }else{
            telefonoFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(telefonoFormulario, "El numero de telefono no puede estar vacio.")
            formularioValido = false
        }
        
        //valida el dni
        const dni = dniFormulario.value
        if(!inputVacio(dni)){
            if(!inputDni(dni)){
                dniFormulario.classList.add('input-error') // agrega una clase de error al input
                mostrarError(dniFormulario, "El DNI debe contener 8 numeros.")
                formularioValido = false
            } else {
                dniFormulario.classList.remove('input-error')// elimina la clase de error si es valido y estaba 
                ocultarError(dniFormulario)
            }
        }else{
            dniFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(dniFormulario, "El DNI no puede estar vacio.")
            formularioValido = false
        }
    
        //valida los datos de la tarjeta
        // valida la forma de pago
        const formaPago = formaPagoFormulario.value
        if (!selectOpciones(formaPago)) {
            formaPagoFormulario.classList.add('input-error') // agrega una clase de error al select
            mostrarError(formaPagoFormulario, "Elegi una opcion.")
            formularioValido = false
        } else {
            formaPagoFormulario.classList.remove('input-error')// elimina la clase de error si es valido y estaba 
            ocultarError(formaPagoFormulario)
        }
    
            // valida las cuotas
            const cuotas = cuotasFormulario.value
            if (!selectOpciones(cuotas)) {
                cuotasFormulario.classList.add('input-error') // agrega una clase de error al select
                mostrarError(cuotasFormulario, "Elegi una opcion.")
                formularioValido = false
            } else {
                cuotasFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
                ocultarError(cuotasFormulario)
            }
    
        // valida el num de tarjeta
        const numTarj = numTarjetaFormulario.value
        if(!inputVacio(numTarj)){
            if(!inputNumTarjeta(numTarj)){
                numTarjetaFormulario.classList.add('input-error') // agrega una clase de error al input
                mostrarError(numTarjetaFormulario, "El numero de tarjeta debe contener 16 numeros")
                formularioValido = false
            } else {
                numTarjetaFormulario.classList.remove('input-error')// elimina la clase de error si es valido y estaba 
                ocultarError(numTarjetaFormulario)
            }
        }else{
            numTarjetaFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(numTarjetaFormulario, "El numero de tarjeta no puede estar vacio.")
            formularioValido = false
        }
    
        // valida el nombre del titular
        const nombreTitular = nombreTitularFormulario.value
        if(!inputVacio(nombreTitular)){
            if (!inputLetras(nombreTitular)) {
                nombreTitularFormulario.classList.add('input-error') // agrega una clase de error al input
                mostrarError(nombreTitularFormulario, "El nombre solo debe contener letras.")
                formularioValido = false
            } else {
                nombreTitularFormulario.classList.remove('input-error')// elimina la clase de error si es valido y estaba 
                ocultarError(nombreTitularFormulario)
            }
        }else{
            nombreTitularFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(nombreTitularFormulario, "El nombre no puede estar vacio.")
            formularioValido = false
        }
    
        // valida la fecha de vencimiento a ver si no esta vencida
        const fechaVenc = fechaVencimientoFormulario.value
        if(!inputVacio(fechaVenc)){
            if (!inputFecha(fechaVenc)) {
                fechaVencimientoFormulario.classList.add('input-error') // agrega una clase de error al input
                mostrarError(fechaVencimientoFormulario, "La tarjeta esta vencida.")
                formularioValido = false
            } else {
                fechaVencimientoFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
                ocultarError(fechaVencimientoFormulario)
            }
        }else{
            fechaVencimientoFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(fechaVencimientoFormulario, "La fecha de vencimiento no puede estar vacia.")
            formularioValido = false
        }
    
        // valida el cvc de la tarjeta
        const cvc = cvcTarjetaFormulario.value
        if(!inputVacio(cvc)){
            if (!inputCVC(cvc)) {
                cvcTarjetaFormulario.classList.add('input-error')// agrega una clase de error al input
                mostrarError(cvcTarjetaFormulario, "El CVC debe contener 3 numeros.")
                formularioValido = false
            } else {
                cvcTarjetaFormulario.classList.remove('input-error') // elimina la clase de error si es valido y estaba 
                ocultarError(cvcTarjetaFormulario)
            }
        }else{
            cvcTarjetaFormulario.classList.add('input-error') // agrega una clase de error al input
            mostrarError(cvcTarjetaFormulario, "El CVC no puede estar vacio.")
            formularioValido = false
        }
    
        // si el formulario es valido, es decir mantiene el valor true, guarda los datos que se van a usar en otro html(pago_realizado.html) y redirecciona a este.
        if (formularioValido) {
            if (carrito.length === 0) {
                // si el carrito esta vacio, mostramos el alert indicando que no puede comprar nada jajaj
                alert("El carrito esta vacio.")
            } else {// si no realiza la compra y hace lo siguiente
                // guarda los datos en el sessionStorage
                sessionStorage.setItem('email', emailFormulario.value)
                sessionStorage.setItem('mdp', formaPagoFormulario.value)
                sessionStorage.setItem('totalPago', precioCarrito.textContent)
    
                //vacio el carrito
                localStorage.removeItem('carrito')  // elimina el carrito completo de localStorage
    
                // elimino los productos del DOM
                const productosCarrito = document.querySelectorAll('.producto-carrito') 
                productosCarrito.forEach(productoCarrito => {
                    productoCarrito.remove() // elimina cada producto del carrito en el DOM
                })
                
                // imprime por consola esto
                console.log("Compra realizada")
            
                // actualizar el total del carrito 
                calcularTotalCarrito()
    
                // si no hay datos erroneos redirecciona a este html
                window.location.href = 'pago_realizado.html'
            }
        }
    })
}
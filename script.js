import Producto from "./Producto.js" 

//creo los objetos dentro de un array para los productos.
const productos = [
    new Producto ('Mate Imperial Negro', 8500),
    new Producto ('Mate Imperial Rosa', 8500),
    new Producto ('Mate Seleccion Argentina', 5500),
    new Producto ('Mate Camionero Verde', 15000)
]

// creo el array para el carrito
const carrito = [
    //esta vacio, pero se pueden ir agregando productos.
]

//funcion para filtrar en un rango de precios
function filtroRangoPrecio (){
    alert("Estas por filtrar productos por el precio")
    let banderaPrecioMinFiltro = false
    let banderaPrecioMaxFiltro = false
    let precioMinimo
    let precioMaximo
    do{
        precioMinimo = parseFloat(prompt("Ingresa el precio minimo: "))
        if (precioMinimo < 0 || isNaN(precioMinimo)){
            alert("El precio minimo debe ser un numero mayor o igual 0")
        }else{
            banderaPrecioMinFiltro = true
        }
    }while(!banderaPrecioMinFiltro)
    do{
        precioMaximo = parseFloat(prompt("Ingresa el precio maximo: "))
        if (precioMaximo <= precioMinimo || isNaN(precioMaximo)){
            alert("El precio maximo debe ser un numero mayor al precio minimo")
        }else{
            banderaPrecioMaxFiltro = true
        }
    }while(!banderaPrecioMaxFiltro)
    if (productos.length !== 0){ // Si el arreglo no esta vacio ejecuta el bloque de codigo
        console.log("Estos son los productos en el rango de precio: " + "($" + precioMinimo + " - $" + precioMaximo + ")")
        let productosFiltrados = false //pongo una bandera para validar si muestra productos o no en ese rango
        for(let i = 0; i < productos.length; i++){
            if (productos[i].precio <= precioMaximo && productos[i].precio >= precioMinimo){
                console.table(productos[i])
                productosFiltrados = true
            }
        }
        if(!productosFiltrados){// si no esta vacio pero no hay productos dentro del rango imprime este console.log
            console.log("No hay productos en el rango especificado")
        }
    }else{ // si el arreglo esta vacio imprime este console.log
        console.log("No hay productos disponibles")
    }
}

//funcion para mostrar todos los productos disponibles
function mostrarProductos(){
    console.log("Estos son los productos: ")
    console.table(productos)
}

// funcion para agregar un nuevo producto usando el constructor y entradas del usuario. Esto va a ser solo para el administrador de la pagina en un futuro
function crearNuevoProducto(){
    alert ("Estas por agregar un nuevo producto")
    let banderaNombre = false
    let banderaPrecio = false
    let nombreTemp
    let precioTemp
    do{
        let nombrePrompt = prompt("Ingresa el nombre del producto: ")
        if (nombrePrompt === ""){ // si nombre esta vacio ejecuta el alert
            alert("El nombre no puede estar vacio")
        }else{
            banderaNombre = true
            nombreTemp = nombrePrompt
        }
    }while(!banderaNombre)
    do{
        let precioPrompt = parseFloat(prompt ("Ingresa el precio del producto: "))
        if (precioPrompt <= 0 || isNaN(precioPrompt) ){ // si precio es menor o igual a 0 o si precio no es un numero ejecuta el alert
            alert("El precio debe ser un numero mayor a 0")
        }else{
            banderaPrecio = true
            precioTemp = precioPrompt
        }
    }while(!banderaPrecio)
    productos.push(new Producto (nombreTemp, precioTemp))
    console.log("Producto agregado con exito!")
    console.table(productos)
}

//funcion para calcular el total del carrito
function calcularTotalCarrito(){
    let totalCarrito = 0
    if(carrito.length !== 0){
        for(let producto of carrito){
            totalCarrito += producto.precio
        }
    }
    console.log("Total: " + totalCarrito.toFixed(2)) // para que tenga 2 decimales
}

//funcion para agregar un producto al carrito por ahora con un indice, luego va a ser con el boton agregar al carrito
function agregarProductoCarrito() {
    alert("Estas por agregar un nuevo producto al carrito")
    mostrarProductos()
    let indiceTemp = parseInt(prompt("Ingresa el indice del producto que deseas agregar: "))
    if (indiceTemp >= 0 && indiceTemp < productos.length) {
        carrito.push(productos[indiceTemp])
        console.log("Producto agregado al carrito: ")
        console.table(carrito)
    } else {
        console.log("Indice invalido, no se pudo agregar el producto al carrito.")
    }
}

//funcion para quitar un producto del carrito
function quitarProductoCarrito(){
    if(carrito.length !== 0){
        alert("Estas por sacar un producto de tu carrito")
        console.table(carrito)
        let indiceTemp = parseInt(prompt("Ingresa el indice del producto que deseas quitar: "))
        if (indiceTemp >= 0 && indiceTemp < carrito.length) {
            carrito.splice(indiceTemp, 1)
            console.log("Producto quitado del carrito")
        } else {
            console.log("Indice invalido, no se pudo quitar el producto del carrito")
        }
    }else{
        alert("El carrito esta vacio")
    }   
}

//funcion para mostrar todos los productos del carrito
function mostrarCarrito(){
    console.log("---Tu Carrito---")
    if(carrito.length !== 0){
        console.table(carrito)
    }else{
        console.log("No hay productos en tu carrito")
    }
    calcularTotalCarrito()
}

//funcion para cambiar el nombre de un producto
function cambiarNombreProducto(producto){
    let banderaNombreInt = false
    do{
        let nombreProductoTemp = prompt("Ingresa el nuevo nombre del producto: ")
        if (nombreProductoTemp === ""){ // si nombre esta vacio ejecuta el alert
            alert("El nombre no puede estar vacio")
        }else{
            banderaNombreInt = true
            producto.cambiarNombre(nombreProductoTemp)
        }
    }while(!banderaNombreInt)
    console.log("Producto actualizado")
}

//funcion para cambiar el precio de un producto
function cambiarPrecioProducto(producto){
    let banderaPrecioInt = false
    do{
        let precioProductoTemp = parseFloat(prompt("Ingresa el nuevo precio del producto: "))
        if (precioProductoTemp <= 0 || isNaN(precioProductoTemp)){  // si precio es menor o igual a 0 o si precio no es un numero ejecuta el alert
            alert("El precio debe ser un numero mayor a 0")
        }else{
            banderaPrecioInt = true
            producto.cambiarPrecio(precioProductoTemp)
        }
    }while(!banderaPrecioInt)
    console.log("Producto actualizado")
}

//funcion para vaciar el carrito
function vaciarCarrito(){
    //cual es mas conveniente usar, asignarle un nuevo arreglo vacio, cambiar la longitud a 0 o hacer un splice(0)?
}

//funcion para eliminar un producto
function eliminarProducto(){
    if(productos.length !== 0){
        alert("Estas por eliminar un producto")
        console.table(productos)
        let indiceTemp = parseInt(prompt("Ingresa el indice del producto que deseas eliminar: "))
        if (indiceTemp >= 0 && indiceTemp < productos.length) {
            productos.splice(indiceTemp, 1)
            console.log("Producto eliminado con exito")
            console.table(productos)
        } else {
            console.log("Indice invalido, no se pudo eliminar el producto")
        }
    }else{
        alert("No hay productos")
    }   
}

// constante con las opciones del menu para que se muestre en el prompt del do-while
const opciones = "------------------------MENU DE OPCIONES------------------------\n 1-Filtrar producto por precio\n 2-Crear un producto nuevo\n 3-Agregar un producto al carrito\n 4-Ver tu carrito\n 5-Quitar producto del carrito\n 6-Eliminar un producto\n 7-Ver productos\n 8-Modificar el nombre de un producto\n 9-Modificar el precio de un producto\n 10-Salir\n"
let booleanoWhile = true
// Este do-while con su switch es temporal, pero es para mantener el flujo del programa para una correcta visualizacion desde la consola para esta entrega
do{
    let opcionMenu = parseInt(prompt(opciones + "Selecciona una opcion e ingresa el numero de la misma: "))
    switch(opcionMenu){
        case 1:
            filtroRangoPrecio()
            break
        case 2:
            crearNuevoProducto()
            break
        case 3:
            agregarProductoCarrito()
            break
        case 4:
            mostrarCarrito()
            break
        case 5:
            quitarProductoCarrito()
            break
        case 6:
            eliminarProducto()
            break
        case 7:
            mostrarProductos()
            break
        case 8:
            mostrarProductos()
            alert("Estas por actualizar el nombre de un producto")
            let indiceProdModNombre = parseInt(prompt("Coloca el indice del producto a modificar su nombre: "))
            console.log("Producto seleccionado: " + indiceProdModNombre);
            if(indiceProdModNombre < 0 || indiceProdModNombre > productos.length-1 || isNaN(indiceProdModNombre)){
                alert("El indice que proporcionaste no es valido")
            }else{
                cambiarNombreProducto(productos[indiceProdModNombre])
            }
            break
        case 9:
            mostrarProductos()
            alert("Estas por actualizar el precio de un producto")
            let indiceProdModPrecio = parseInt(prompt("Coloca el indice del producto a modificar su precio: "))
            console.log("Producto seleccionado: " + indiceProdModPrecio);
            if(indiceProdModPrecio < 0 || indiceProdModPrecio > productos.length-1 || isNaN(indiceProdModPrecio)){
                alert("El indice que proporcionaste no es valido")
            }else{
                cambiarPrecioProducto(productos[indiceProdModPrecio])
            }
            break
        case 10:
            booleanoWhile = false
            console.log("Saliendo...");
            break
        default:
            console.log("Opcion no valida, ingresa otra")
            break
    }
}while(booleanoWhile)
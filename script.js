// Dar un alert con la bienvenida a la pagina
alert("Bienvenido")

//creo los objetos dentro de un array para los productos.
let productos = [
    new Producto ('Mate Imperial Negro', 8500),
    new Producto ('Mate Imperial Rosa', 8500),
    new Producto ('Mate Seleccion Argentina', 5500),
    new Producto ('Mate Camionero Verde', 15000)
]

// creo el array para el carrito
let carrito = [
    //esta vacio, pero se pueden ir agregando productos.
]

//funcion para filtrar en un rango de precios
function filtroRangoPrecio (precioMinimo, precioMaximo){
    if (productos.length !== 0){ // Si el arreglo no esta vacio ejecuta el bloque de codigo
        console.log("Estos son los productos en el rango de precio: ")
        let productosFiltrados = false //pongo una bandera para validar si muestra productos o no en ese rango
        for(let i = 0; i < productos.length; i++){
            if (productos[i].precio <= precioMaximo && productos[i].precio >= precioMinimo){
                console.log(productos[i].imprimirInformacion())
                productosFiltrados = true
            }
        }
        if(!productosFiltrados){// si no esta vacio pero no hay productos dentro del rango imprime este console.log
            console.log("No hay productos en el rango especificado")
        }
    }else{ // si el arreglo esta vacio imprime este console.log
        console.log("No hay objetos en esta seccion.")
    }
}

// funcion para agregar un nuevo producto usando el constructor y entradas del usuario. Esto va a ser solo para el administrador de la pagina en un futuro
function crearNuevoProducto(){
    alert ("Estas por agregar un nuevo producto")
    let nombreTemp = prompt("Ingresa el nombre del producto: ")
    let precioTemp = parseInt(prompt ("Ingresa el precio del producto: "))
    productos.push(new Producto (nombreTemp, precioTemp))
    console.log("Producto agregado con exito!")
}

// funcion para agregar un producto al carrito por ahora con un indice, luego va a ser con el boton agregar al carrito
function agregarProductoCarrito() {
    alert("Estas por agregar un nuevo producto al carrito");
    console.log("Estos son los productos: ");
    let contador = 0;
    for (let i of productos) {
        console.log("[" + contador + "] " + i.imprimirInformacion());
        contador++;
    }
    let indiceTemp = parseInt(prompt("Ingresa el indice del producto que deseas agregar: "));
    if (indiceTemp >= 0 && indiceTemp < productos.length) {
        carrito.push(productos[indiceTemp]);
        console.log("Producto agregado al carrito: " + productos[indiceTemp].imprimirInformacion());
    } else {
        console.log("Indice invalido, no se pudo agregar el producto al carrito.");
    }
}

// Funcion para mostrar todos los productos del carrito
function mostrarCarrito(){
    console.log("---Tu Carrito---")
    if(carrito.length !== 0){
        for(let productoCarrito of carrito){
            console.log(productoCarrito.imprimirInformacion())
        }
    }else{
        console.log("No hay productos en tu carrito")
    }
}

let booleanoWhile = true
// Este do-while con su switch es temporal, pero es para mantener el flujo del programa para una correcta visualizacion desde la consola para esta entrega
do{
    console.log("---Menu de Opciones---")
    console.log("1-Filtrar producto por precio")
    console.log("2-Crear un producto nuevo")
    console.log("3-Agregar un producto al carrito")
    console.log("4-Ver tu carrito")
    console.log("5-Salir")
    let opcionMenu = parseInt(prompt("Selecciona una opcion e ingresa el numero de la misma: "))
    switch(opcionMenu){
        case 1:
            alert("Estas por filtrar productos por el precio")
            let precioMinimo = parseInt(prompt("Ingresa el precio minimo: "))
            let precioMaximo = parseInt(prompt ("Ingresa el precio maximo: "))
            filtroRangoPrecio(precioMinimo, precioMaximo)
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
            booleanoWhile = false
            break
        default:
            console.log("Opcion no valida, ingresa otra")
            break
    }
}while(booleanoWhile)
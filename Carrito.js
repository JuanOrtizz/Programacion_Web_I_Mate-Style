class Carrito {
    constructor() {
        // Intenta cargar el carrito desde localStorage, si no existe, inicializa con un array vacío
        this.productos = JSON.parse(localStorage.getItem("carrito")) || []
    }

    // Guarda los productos en localStorage
    guardar() {
        localStorage.setItem("carrito", JSON.stringify(this.productos))
    }

    // Función para agregar productos al carrito
    agregar(producto) 
    {
        const productoExistente = this.productos.find(p => p.nombre === producto.nombre)
        if(productoExistente){
            productoExistente.cantidad++
        }else{
            this.productos.push(producto)    
        }
        this.guardar()  // Guarda automaticamente después de agregar un producto o actualziar el stock      
    }

    eliminar(producto){
        // elimino el producto del carrito en localStorage
        const index = this.productos.findIndex(p => p.nombre === producto.nombre && p.precio === producto.precio && p.imagen === producto.imagen)
        if (index > -1) {
            this.productos.splice(index, 1)
            this.guardar()
            console.log("Producto eliminado del carrito")
        }
    }

    vaciarCarrito(){
        localStorage.removeItem("carrito")  // Elimina la clave carrito del localStorage
        this.productos = [] // vacia el array de productos
    }

    // funcion para calcular el total del carrito
    calcularTotalCarrito(){
        let totalCarrito = 0
        return this.productos
        .reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
        .toFixed(2) // retorna el total con 2 decimales y si esta vacio retorna 0.00
    }

}

export default Carrito
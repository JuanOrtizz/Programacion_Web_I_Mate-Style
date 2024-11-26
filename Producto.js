class Producto{ // creo la clase producto, para manejar de forma mas modular el codigo.
    constructor(imagen, nombre, precio){
        this.imagen = imagen
        this.nombre = nombre
        this.precio = precio
        this.cantidad = 1
    }

    imprimirInformacion(){
        return "Nombre del producto: " + this.nombre + ", Precio del producto: $" +this.precio + "Imagen: " + this.imagen + this.cantidad
    }

    // actua como un set de nombre
    cambiarNombre(nombre){
        this.nombre = nombre
    }

    // actua como un set de precio
    cambiarPrecio(precio){
        this.precio = precio
    }
}

export default Producto
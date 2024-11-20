class Producto{ // creo la clase producto, para manejar de forma mas modular el codigo.
    constructor(imagen, nombre, precio){
        this.imagen = imagen
        this.nombre = nombre
        this.precio = precio
    }

    imprimirInformacion(){
        return "Nombre del producto: " + this.nombre + ", Precio del producto: $" +this.precio + "Imagen: " + this.imagen
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
//Una consulta es si hay herencia en JS, y si es posible utilizarla, para cada tipo de producto, para asi diferenciar mas especificamente cada uno de estos
// por ejemplo Mate, Bombilla, Termo, Accesorio, y que queda una de ellas hereden de Producto
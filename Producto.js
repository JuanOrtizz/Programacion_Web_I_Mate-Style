class Producto{ // creo la clase producto, para manejar de forma mas modular el codigo.
    constructor(nombre, precio){
        this.nombre = nombre
        this.precio = precio
    }
    imprimirInformacion(){
        return "Nombre del producto: " + this.nombre + ", Precio del producto: $" +this.precio
    }
}

//Una consulta es si hay herencia en JS, y si es posible utilizarla, para cada tipo de producto, para asi diferenciar mas especificamente cada uno de estos
// por ejemplo Mate, Bombilla, Termo, Accesorio, y que queda una de ellas hereden de Producto
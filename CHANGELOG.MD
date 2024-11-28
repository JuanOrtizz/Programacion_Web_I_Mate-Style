# Changelog

Este archivo documenta los cambios realizados en el proyecto, organizados por entregas y parciales. Se clasifica en **features** (nuevas funcionalidades), **releases** (entregas importantes) y **backports** (ajustes o mejoras aplicadas a entregas anteriores).

---

## [Feature/cuarta-entrega] - 27-11-2024
### Añadido
- Se agrego manejo del DOM, eventos y el almacenamiento en storage (localStorage y sessionStorage).
- Se agrego la funcionalidad de filtrado de productos por precio. Modificando el DOM
- Se agregaron popups/toasts al agregar un producto al carrito. Esta desarrollado con el componente bootstrap pero con algunas modificaciones en el JS.
- Se agrego la funcionalidad de agregar productos dentro del carrito. Ademas, se va actualizando el precio final del carrito cada vez que se agregan o eliminan productos
- Se agrego la validacion del formulario de compra y validacion del carrito (comprueba si esta vacio).
- Se agrego la modificacion del DOM en la pestaña compra realizada para actualizarlo con los datos cargados por el usuario en el formulario de compra.

### Cambiado
- Se modificaron funciones para que en interactuen mediante elementos HTML y no por prompts.
- Se modificaron archivos HTML para el funcionamiento de elementos de bootstrap.
- Se modifico el archivo styles.css para un mejor diseño.

### Corregido
- Solucionado la interrupcion del flujo de la app por los prompts y alerts.
- Problemas menores de visualización en dispositivos móviles.

---

## [Feature/tercer-entrega] - 29-10-2024
### Añadido
- Integración de JS en la pagina.
- Se añadieron funciones para realizar filtrados de productos, agregar productos, eliminar productos, etc. en un archivo script.js.
- Se creo una clase Producto en un archivo Producto.js
- Se capturan mensajes por prompt y se le da informacion al usuario mediante alerts, ademas de mostrar por consola otras funcionalidades.

---

## [Backport/primer-parcial] - 21-10-2024
### Añadido
- Se realiza para tener todos los cambios de release/primer-parcial en la rama de desarrollo (develop).

---

## [Release/primer-parcial] - 21-10-2024
### Añadido
- Instale la biblioteca Bootstrap, colocando los links en todos los archivos .HTML, para que apliquen los estilos y funcionalidades con JS.
- Introduje un carrusel con imágenes con información importante y el eslogan de la empresa en el INDEX.HTML.
- Agregue un Iframe en INDEX.HTML con un vídeo de como un artesano realiza los mates que la empresa vende.
- Se agrego una tabla en INDEX.HTML utilizando Grid system de Bootstrap (container, row y col)

### Cambiado
- Modificaciones en archivos .HTML y para organizar mejor el codigo.
- Modificacion en el archivo styles.css para mejorar el diseño responsive (por ejemplo los header en pantallas mas chicas) y otras cuestiones.

### Corregido
- Problemas menores de visualización en dispositivos móviles.

### Eliminado
- Se borraron algunas lineas que ya no se iban a utilizar gracias a la libreria bootstrap en styles.css.

---

## [Feature/segunda-entrega] - 02-10-2024
### Añadido
- Se realizo el diseño de cada pagina HTML usando display flex y grid. Ademas de otros diseños para mejorar la UI y asi la UX de los usuarios.
- Se implementaron Media-Queries para que la app sea responsive en distintos dispositivos.

### Cambiado
- Actualización del HTML de las páginas para unificar los header, nav y algunas otras etiquetas.

---

## [Feature/primer-entrega] - 10-09-2024
### Añadido
- Cree todas las paginas con su estructura con sus respectivas imágenes, donde se pueden ver la función y objetivo de cada parte del código en el mismo.
- Se creo el archivo README.md donde tiene la documentacion principal de la aplicacion junto con su prototipo realizado en figma.
# Changelog

Este archivo documenta los cambios realizados en el proyecto, organizados por entregas y parciales. Se clasifica en **features** (nuevas funcionalidades que son las entregas de las actividades obligatorias), **releases** (entregas importantes, que son los parciales) y **backports** (para implementar lo realizado en los releases (parciales) en la rama de desarrollo (develop)).

---

## [**Release/segundo-parcial**] - **Pendiente**

### **Añadido**
- Productos obtenidos desde un archivo local `productos.json` en la carpeta `api/`, reemplazando los datos previamente integrados en el HTML. Funciones `async` con `await` cargan y filtran datos dinámicamente en el DOM.  
- Filtrado por rango de precios mediante `filter`. Los precios ingresados por el usuario actualizan el DOM con los resultados desde `productos.json`.  
- Frases dinámicas desde MockAPI para mejorar la experiencia de compra. Una barra de progreso simula la confirmación de compra antes de redirigir al usuario a la página de confirmación con los datos del formulario. Las frases se seleccionan aleatoriamente con `map` y funciones matemáticas.  
- Nueva página `pantalla_carga_compra.html` con componentes Bootstrap. Se modifica dinámicamente el DOM para mostrar frases de MockAPI.  
- Reglas en el repositorio: Bloqueo de `push` directos a `develop` y `master`. Solo se permiten `pull requests` con al menos un revisor aprobado.  
- Nuevo directorio `api/` con `pull_request_template.md` como plantilla para las pull requests.  
- Creado `changelog.md` para documentar entregas realizadas.

### **Cambiado**
- Mejoras en diseño de `styles.css`.  
- Eliminados productos integrados en los archivos HTML, ahora gestionados desde el JSON.  
- Ajustes en HTML para mejor interacción con el DOM.  

### **Corregido**
- Problemas menores de visualización en dispositivos móviles.

---

## [**Feature/cuarta-entrega**] - 2024-11-27

### **Añadido**
- Manejo del DOM, eventos y almacenamiento en `localStorage` y `sessionStorage`.
- Filtrado de productos por precio. Modificación dinámica del DOM.
- Popups/toasts al agregar un producto al carrito. Utiliza el componente Bootstrap con algunas modificaciones en el JS.
- Funcionalidad de agregar productos al carrito, con actualización del precio final en el carrito al agregar o eliminar productos.
- Validación del formulario de compra y validación del carrito (verifica si está vacío).
- Modificación del DOM en la pestaña "Compra realizada" para actualizarlo con los datos cargados por el usuario en el formulario de compra.

### **Cambiado**
- Funciones modificadas para interactuar mediante elementos HTML en lugar de `prompts`.
- Archivos HTML actualizados para el correcto funcionamiento de los elementos de Bootstrap.
- Estilos en `styles.css` modificados para mejorar el diseño.

### **Corregido**
- Solucionada la interrupción del flujo de la app debido a los `prompts` y `alerts`.
- Solucionados problemas menores de visualización en dispositivos móviles.

---

## [**Feature/tercer-entrega**] - 2024-10-29

### **Añadido**
- Integración de JavaScript en la página.
- Funciones para realizar filtrados de productos, agregar y eliminar productos, etc., en `script.js`.
- Creación de la clase `Producto` en `Producto.js`.
- Captura de mensajes mediante `prompt` y comunicación al usuario a través de `alerts`, además de mostrar información en la consola.

---

## [**Backport/primer-parcial**] - 2024-10-21

### **Añadido**
- Sincronización de todos los cambios de `release/primer-parcial` en la rama de desarrollo `develop`.

---

## [**Release/primer-parcial**] - 2024-10-21

### **Añadido**
- Instalación de la biblioteca Bootstrap y vinculación de los archivos CSS y JS en los archivos `.HTML`.
- Introducción de un carrusel con imágenes en `INDEX.HTML` con información importante y el eslogan de la empresa.
- Inclusión de un `iframe` en `INDEX.HTML` con un video.
- Agregada una tabla en `INDEX.HTML` utilizando el Grid system de Bootstrap (`container`, `row`, `col`).

### **Cambiado**
- Modificaciones en los archivos `.HTML` para organizar mejor el código.
- Modificación de `styles.css` para mejorar el diseño responsive, especialmente para pantallas más pequeñas.

### **Corregido**
- Problemas menores de visualización en dispositivos móviles.

### **Eliminado**
- Eliminación de líneas de código innecesarias gracias a la implementación de Bootstrap.

---

## [**Feature/segunda-entrega**] - 2024-10-02

### **Añadido**
- Diseño de cada página HTML utilizando `display: flex` y `grid`, con mejoras en la UI y UX para facilitar la navegación.
- Implementación de Media Queries para hacer la aplicación responsive en diferentes dispositivos.

### **Cambiado**
- Actualización del HTML para unificar los `header`, `nav` y algunas etiquetas.

---

## [**Feature/primer-entrega**] - 2024-09-10

### **Añadido**
- Creación de todas las páginas con su estructura y las imágenes correspondientes, detallando la función y objetivo de cada parte del código.
- Creación del archivo `README.md` con la documentación principal de la aplicación y su prototipo realizado en Figma.

---
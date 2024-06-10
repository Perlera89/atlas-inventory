# **Módulo de Inventario**

---

## **Ruta /auth/Inventory (Sin productos)**

### **Elementos interactivos**

- Button: Add product

### **Pasos de uso:**

- Dar click en el boton de Add product, para agregar un nuevo producto al sistema

## **Ruta /auth/Inventory/Add**

### **Elementos interactivos**

- Button: Retrodceder: Redirecciona a: /auth/Inventory
- Check: On sale: Identifica que este en venta
- Check: Lock: bloquea el producto
- Button: Discard: Limpia los datos de la pantalla
- Button: Save product: Guarda el producto con todos sus datos
- Index: Name: Escribe el nombre del producto
- Index: Code: Escribe el codigo del producto
- Index: Stock: Escribe la cantidad de prodcuto a guardar
- Index: Purchase price: Escribe el precio de compra del producto
- Index: Sale price: Escribe el precio de venta del producto
- Index: Minimum price: Escribe el precio minimo de venta
- Index: IVA: Escribe la cantidad de iva del producto
- Index: Minimum stock: Escribe la alerta de minimo de producto en inventario
- List: Category: Escribe o selecciona una categoria para el producto
- List: Area: Escribe o selecciona una area para el producto
- List: Brand: Escribe o selecciona una marca para el producto
- List: Tags: Escribe o selecciona una etiqueta para el producto
- List: Type: Escribe o selecciona un tipo de producto
- Image: Inserte o cargue una imagen del producto
- Text: Description: Escriba una descripcion del producto
- Text: Safety info: Escriba informacion de seguridad del producto

### **Pasos de uso:**

- En la seccion de “Product Details” Se escribiran los datos de “Name” Nombre del producto, “Code”, codigo del producto, “Stock” Que sera cantidad de productos que se ingresaran en el inventario
- En la seccion “General”, Se escribiran los datos para “Purchase price” el cual sera el precio de compra del producto, “Sale price” el cual habra que digitar el precio de venta del producto, “Minimum price” el cual habra que digitar un minimo de precio de venta del producto el cual puede ser por distintos sucesos, “IVA” el cual sera un valor agregado hacia los productos, “Minimum stock” El cual sera un aviso para cuando se este acabando el producto en el sistema.
- En “Product Category” Se seleccionaran o escribiran los datos en “Category” el cual sera para darle una categoria al producto, “Brand” el cual sera la marca del producto, “Area” el cual sera el area en el que se encontrara el producto dentro de la tienda, “Tags” los cuales seran  etiquetas del producto.
- En la seccion “Product type” se escribira o seleccionara una etiqueta el cual sea acorde al tipo de producto que se este ingresando
- En “Product images” Se cargara o subira una imagen alusiva al producto que se vaya a agregar
- En “Product Extra”, se escribira en “Description” una descripcion acorde al tipo de producto que ingresara, en “Safety info” sera ingresada la informacion de seguridad acorde al producto que se agregara.

## **Ruta /auth/Inventory (con productos)**

### **Elementos interactivos**

- Button: Add product: para agregar nuevo producto
- Index: Search product: para buscar un producto
- List: Select filters: para seleccionar las listas desplegables de filtros
- Button: Select: selecciona entre ver en lista o cuadricula los productos
- Button: Product: ingresa al producto para realizar alguna accion.

### **Pasos de uso:**

- Dar click en el boton de Add product, para agregar un nuevo producto al sistema
- Dar click en el apartado de buscar producto para poder digitar ya sea el nombre o algun dato sobre este
- Dar click en Select filters para desplegar los distintos filtros que tiene para buscar los productos
- Seleccion de productos, puedes dar click en un producto para acceder a este, dentro de este podras editar los datos del producto o eliminarlo.

## **Ruta /auth/Inventory/(Numero de ID)**

### **Elementos interactivos**

- Button: Retrodceder: Redirecciona a: /auth/Inventory
- Check: On sale: Identifica que este en venta
- Check: Lock: bloquea el producto
- Button: Discard: Limpia los datos de la pantalla
- Button: Save product: Guarda el producto con todos sus datos
- Index: Name: Escribe o edite el nombre del producto
- Index: Code: Escribe o edite el codigo del producto
- Index: Stock: Escribe o edite la cantidad de prodcuto a guardar
- Index: Purchase price: Escribe o edite el precio de compra del producto
- Index: Sale price: Escribe o edite el precio de venta del producto
- Index: Minimum price: Escribe o edite el precio minimo de venta
- Index: IVA: Escribe o edite la cantidad de iva del producto
- Index: Minimum stock: Escribe  o edite la alerta de minimo de producto en inventario
- List: Category: Escribe o selecciona o edite una categoria para el producto
- List: Area: Escribe o selecciona o edite una area para el producto
- List: Brand: Escribe o selecciona o edite una marca para el producto
- List: Tags: Escribe o selecciona o edite una etiqueta para el producto
- List: Type: Escribe o selecciona o edite un tipo de producto
- Image: Inserte o cargue o edite una imagen del producto
- Text: Description: Escriba o edite una descripcion del producto
- Text: Safety info: Escriba o edite informacion de seguridad del producto

### **Pasos de uso:**

- En la seccion de “Product Details” Se escribiran los datos de “Name” Nombre del producto, “Code”, codigo del producto, “Stock” Que sera cantidad de productos que se ingresaran en el inventario o editados
- En la seccion “General” se podran editar, Se escribiran los datos para “Purchase price” el cual sera el precio de compra del producto, “Sale price” el cual habra que digitar el precio de venta del producto, “Minimum price” el cual habra que digitar un minimo de precio de venta del producto el cual puede ser por distintos sucesos, “IVA” el cual sera un valor agregado hacia los productos, “Minimum stock” El cual sera un aviso para cuando se este acabando el producto en el sistema.
- En “Product Category” se podran edtiar:  Se seleccionaran o escribiran los datos en “Category” el cual sera para darle una categoria al producto, “Brand” el cual sera la marca del producto, “Area” el cual sera el area en el que se encontrara el producto dentro de la tienda, “Tags” los cuales seran  etiquetas del producto.
- En la seccion “Product type” se escribiran editaran: o seleccionara una etiqueta el cual sea acorde al tipo de producto que se este ingresando
- En “Product images” Se cargara o subira o editara una imagen alusiva al producto que se vaya a agregar
- En “Product Extra”, se editaran, se escribira en “Description” una descripcion acorde al tipo de producto que ingresara, en “Safety info” sera ingresada la informacion de seguridad acorde al producto que se agregara
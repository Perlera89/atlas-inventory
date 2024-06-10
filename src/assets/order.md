# **Módulo de Ordenes**

---

## **Ruta /auth/orders/**

- Button “Add sale point” Agregas una nueva sucursal de venta
- Index “Search sale point” buscas una sucursal de venta
- List “Select filters” seleccionas distintos filtros para buscar una sala de venta
- Box “Sucursal” aparece la sucursal de venta creada
- Button “Open” Redirecciona a **/auth/orders/1**

### **Elementos interactivos**

- Al ingresar al “board” tenemos en la parte superior el boton “Add sale point” con el cual podremos crear multiples puntos de ventas para tener varios pedidos a la vez 
- Luego tenemos las secciones de busquedas y filtros los cuales nos ayudaran a localizar los distintos tipos de ventas
- En la seccion de la pantalla en medio, tenemos las sucursales creadas, las cuales tiene los botones de “To close” y “Open” con este podremos aceeder a la sucursal deseada

### **Pasos de uso:**

## **Ruta /auth/orders/1(ID)**

### **Elementos interactivos**

- Button: Delete: Elimina los productos de las ordenes
- Button: “New Order” Con este se creara una nueva orden
- Index : “Search product” Escribe un texto relacionado con una orden que quieras buscar
- Button: “Stock” Seleccionar los productos a agregar en la orden
- Button: “Client” Selecciona el cliente que tendra la orden
- Button: “Play” Ejecuta la validacion de la orden
- Buttons: “Numerics” Digite valores de los productos
- Button: “QTY” Digita la cantidad de producto
- Button: “Dsc” Digita el descuento para el producto
- Button: “Price” Digita el precio del producto
- List: “Payment method” Selecciona los metodos de pago
- Text: “Note” Escriba una nota para la orden
- Buttons: “Numerics” Numeros del 0 al 9 y “.” con los cuales se digitara la cantidad de dinero en efectivo
- Button “Validate” valida la orden que se creara
- Button “Download invoice” Descargas el pdf sobre tu orden

### **Pasos de uso:**

- Con la sucursal creada, tendremos muchas opciones y ventanas para comenzar, tenemos el apartado del carrito: El cual despliega una “Order list” donde se mostraran los productos, el nombre de la orden, la fecha de creacion, el cliente de la orden, los productos y el monto de venta
- Luego tenemos los botones de “Eliminar” el cual eliminara los productos seleccionados de la parte derecha de la pantalla, que se agregan a la parte izquierda, donde se esta creando la orden
- El boton “New Order” Sirve para crear una nueva orden, por defecto este esta activado cuando entramos a la pantalla
- En la seccion de la derecha de la pantalla tenemos un apartado para buscar productos los cuales estan agregados en la parte de abajo, junto con su nombre, stock en invetario y  precio y la foto de cada producto, siempre se mostraran todos los productos y cuando se este realizando la busqueda solo apareceran los que sean relacionados con la busqueda
- En la seccion de la izquierda tenemos la orden, donde se ingresan los productos, solo dandoles un clik y estos apareceran en la lista de la orde, los precios y los impuestos de estos se generaran automaticamente e iran incrementando acorde a como se agregen mas productos
- En la seccion de abajo de las ordenes tenemos 3 pequeñas secciones, la primera un menu desplegable donde aparecen los distintos tipos de clientes, aqui tenemos un pequeño buscador para encontrar al cliente solicitado, luego tenemos un boton de “Pay” que es para realizar el pago, y por ultimo una seccion numerica donde digitaremos los precios de los productos, descuentos, cantidades, y precios, estos pueden usarse en caso de ejecutar el sistema desde una tablet…
- En la seccion de “Pay” se nos despliega la seccion de order validation, donde seleccionamos si los usuarios pagaran, con efectivo, con tarjeta de credito o debido, luego veremos la informacion del cliente, un sumario acorde al total que agregaremos, una nota y por ultimo el boton de confirmar, a la derecha de esto tenemos el total de la venta, y abjo unos botones donde nosotros digitaremos la cantidad de dinero, con esto se nos habilita para realizar la confirmacion de pago y luego nos generara otro botn, llamado “Download invoice” el cual nos genera un pdf como comprobante de la orden
# **Módulo de Clientes**

---

## **Ruta /auth/clients (Sin clientes)**

### **Elementos interactivos**

- Button: Add clients

### **Pasos de uso:**

- Dar click en el boton de Add clients, para agregar un nuevo cliente al sistema

## **Ruta /auth/clients/add**

### **Elementos interactivos**

- Button: Back: Redirecciona /auth/clients
- Button: Save client: Guarda el cliente
- Button: Discard: Limpia los datos de pantalla
- Index: First name: Escribe el nombre del cliente
- Index: Last name: Escribe el apellido del cliente
- Index: DUI: Escribe el Documento Unico de Identidad del cliente
- List: Department: Escribe o selecciona el departamento del cliente
- List: Disctric: Escribe o selecciona el distrito del cliente
- List: City: Escribe o selecciona la ciudad del cliente
- Index: Email: Escribe el Correo electronico del cliente
- Index: Phone number: Escribe el numero telefonico del cliente
- Text: Relevant info: Escribe alguna informacion relevante del cliente, opcional

### **Pasos de uso:**

- En la seccion “Personal information”, se escribiran los siguientes datos: “First name” el cual sera el nombre del cliente, “Last name” el cual sera el apellido del cliente, “DUI” el cual sera el documento unico de identidad del cliente
- En la seccion “Address”, Se escribiran o seleccionaran los distintos elementos a llenar: “Department” sera el departamento de residencia del cliente, “District” sera el distrito de residencia del cliente, “City” sera el nombre de la ciudad donde reside el cliente.
- En la seccion “Contact” se escribiran los datos de contacto del cliente los cuales seran: “Email” El cual sera un correo electronico del cliente, “Phone number” el cual sera un numero de contacto del cliente, “Relevant info” sera una informacion importante que se podra digitar acerca del cliente
- En el boton de “Discard” sirve para limpiar todos los datos de pantalla
- El boton de “Save client” guardar los datos del cliente creado y redireccionara a la pantalla de clientes.

## **Ruta /auth/clients (Con clientes)**

### **Elementos interactivos**

- Button: Add clients
- Index: Search: Escriba un dato del cliente a buscar
- List: Clients: Dar click en un cliente para ver sus datos

### **Pasos de uso:**

- Dar click en el boton de Add clients, para agregar un nuevo clients al sistema
- Dar click en la seccion de buscar cliente, el cual se puede encotnrar por cualquier dato que coincida con este
- Listado de los clientes, aqui podremos ver todos los clientes ingresados en orden de lista, donde al dar click en alguno, este lo abrira en otra seccion donde podremos editarlos o eliminaros

## **Ruta /auth/clients/(Numero de ID)**

### **Elementos interactivos**

- Button: Back: Redirecciona /auth/clients
- Button: Save client: Guarda el cliente
- Button: Delete: Elimina el cliente
- Index: First name: Escribe o edita el nombre del cliente
- Index: Last name: Escribe o edita el apellido del cliente
- Index: DUI: Escribe o edita el Documento Unico de Identidad del cliente
- List: Department: Escribe o selecciona o edita el departamento del cliente
- List: Disctric: Escribe o selecciona o edita el distrito del cliente
- List: City: Escribe o selecciona o edita la ciudad del cliente
- Index: Email: Escribe o edita el Correo electronico del cliente
- Index: Phone number: Escribe o edita el numero telefonico del cliente
- Text: Relevant info: Escribe o edita alguna informacion relevante del cliente, opcional

### **Pasos de uso:**

- En la seccion “Personal information”, se escribiran o editaran los siguientes datos: “First name” el cual sera el nombre del cliente, “Last name” el cual sera el apellido del cliente, “DUI” el cual sera el documento unico de identidad del cliente
- En la seccion “Address”, Se escribiran o seleccionarano editaran  los distintos elementos a llenar: “Department” sera el departamento de residencia del cliente, “District” sera el distrito de residencia del cliente, “City” sera el nombre de la ciudad donde reside el cliente.
- En la seccion “Contact” se escribiran o editaran los datos de contacto del cliente los cuales seran: “Email” El cual sera un correo electronico del cliente, “Phone number” el cual sera un numero de contacto del cliente, “Relevant info” sera una informacion importante que se podra digitar acerca del cliente
- En el boton de “Delete” sera para eliminar el cliente
- El boton de “Save client” guardar los datos del cliente creado y redireccionara a la pantalla de clientes.
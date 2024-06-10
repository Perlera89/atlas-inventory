# **Módulo de Empleados**

---

## **Ruta /auth/employees (Sin empleados)**

### **Elementos interactivos**

- Button: Add employee

### **Pasos de uso:**

- Dar click en el boton de Add employees, para agregar un nuevo empleado al sistema.

## **Ruta /auth/employees/add**

### **Elementos interactivos**

- Button: Back: Redirecciona /auth/employees
- Button: Save employee: Guarda el empleado
- Button: Discard: Limpia los datos de pantalla
- Index: First name: Escribe el nombre del empleado
- Index: Last name: Escribe el apellido del empleado
- Index: DUI: Escribe el Documento Unico de Identidad del empleado.
- List: Position: Escribe o selecciona una posicion de trabajo del empleado.
- List: Genere: Selecciona un genero del empleado
- Index: Salary: Escribe el salario del empleado
- List: Department: Escribe o selecciona el departamento del empleado.
- List: Disctric: Escribe o selecciona el distrito del empleado
- List: City: Escribe o selecciona la ciudad del empleado
- Index: Email: Escribe el Correo electronico del empleado
- Index: Phone number: Escribe el numero telefonico del empleado.
- Index: User name: Escribe el nombre del usuario que utilizara el empleado
- Index: Password: Escribe la contraseña que utilizara el empelado.

### **Pasos de uso:**

- En la seccion “Personal information”, se escribiran los siguientes datos: “First name” el cual sera el nombre del empleado, “Last name” el cual sera el apellido del empleado, “DUI” el cual sera el documento unico de identidad del empleado, “Position” El cual sera la posicion de trabajo del empleado, “Genere” para identificar el genero del empleado, “Salary” para digitar el salario que ganara el empelado.
- En la seccion “Address”, Se escribiran o seleccionaran los distintos elementos a llenar: “Department” sera el departamento de residencia del empleado, “District” sera el distrito de residencia del empelado, “City” sera el nombre de la ciudad donde reside el empleado.
- En la seccion “Contact” se escribiran los datos de contacto del empleado los cuales seran: “Email” El cual sera un correo electronico del empleado, “Phone number” el cual sera un numero de contacto del empleado.
- En la seccion “User information” se escribiran los datos del usuario que tendra acceso el empleado, “Username” sera el nombre que utilizara el empleado para entrar al sistema, “Password” sera la contraseña de usuario del empleado
- En el boton de “Discard” sirve para limpiar todos los datos de pantalla
- El boton de “Save Employee” guardar los datos del empleado creado y redireccionara a la pantalla de empleado

## **Ruta /auth/employees (Con empleados)**

### **Elementos interactivos**

- Button: Add Employee
- Index: Search: Escriba un dato del empleado a buscar
- List: Clients: Dar click en un cliente para ver sus datos

### **Pasos de uso:**

- Dar click en el boton de Add employee, para agregar un nuevo empleados al sistema
- Dar click en la seccion de buscar empleados el cual se puede encotnrar por cualquier dato que coincida con este
- Listado de los empleados, aqui podremos ver todos los empleados ingresados en orden de lista, donde al dar click en alguno, este lo abrira en otra seccion donde podremos editarlos o eliminaros

## **Ruta /auth/employees/(Numero de ID)**

### **Elementos interactivos**

- Button: Back: Redirecciona /auth/employees
- Button: Save employee: Guarda el empleado
- Button: Delete: elimina al empleado seleccionado
- Index: First name: Escribe  o edita el nombre del empleado
- Index: Last name: Escribe o edita  el apellido del empleado
- Index: DUI: Escribe  o edita el Documento Unico de Identidad del empleado
- List: Position: Escribe o selecciona  o edita una posicion de trabajo del empleado
- List: Genere: Selecciona un genero del empleado
- Index: Salary: Escribe o edita  el salario del empleado
- List: Department: Escribe o selecciona o edita  el departamento del empleado
- List: Disctric: Escribe o selecciona o edita el distrito del empleado
- List: City: Escribe o selecciona  o edita la ciudad del empleado
- Index: Email: Escribe  o edita el Correo electronico del empleado
- Index: Phone number: Escribe o edita el numero telefonico del empleado
- Index: User name: Escribe el nombre del usuario que utilizara el empleado
- Index: Password: Escribe o edita la contraseña que utilizara el empelado

### **Pasos de uso:**

- En la seccion “Personal information”, se escribiran  o editaran los siguientes datos: “First name” el cual sera el nombre del empleado, “Last name” el cual sera el apellido del empleado, “DUI” el cual sera el documento unico de identidad del empleado, “Position” El cual sera la posicion de trabajo del empleado, “Genere” para identificar el genero del empleado, “Salary” para digitar el salario que ganara el empelado.
- En la seccion “Address”, Se escribiran o seleccionaran o editaran los distintos elementos a llenar: “Department” sera el departamento de residencia del empleado, “District” sera el distrito de residencia del empelado, “City” sera el nombre de la ciudad donde reside el empleado.
- En la seccion “Contact” se escribiran o editaran los datos de contacto del empleado los cuales seran: “Email” El cual sera un correo electronico del empleado, “Phone number” el cual sera un numero de contacto del empleado.
- En la seccion “User information” se escribiran o editaran los datos del usuario que tendra acceso el empleado, “Username” sera el nombre que utilizara el empleado para entrar al sistema, “Password” sera la contraseña de usuario del empleado
- En el boton de “Delete” eliminara el empleado que este seleccionado.
- El boton de “Save Employee” guardar los datos del empleado creado y redireccionara a la pantalla de empleado
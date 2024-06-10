# **Módulo de Autenticación**

---

## **Ruta /auth/login**

### **Elementos interactivos**

- Input: Email address: Escribir el correo electrónico previamente creado.
- Input: Password: Escribir la contraseña previamente creada. 
- Button: “Login” Inicia sesión en el sistema\n
- Button: “Register”: Redirecciona a la ruta /auth/register 

### **Pasos de uso:**

- Ingresar correo electrónico, si el correo electrónico ya fue registrado el sistema alertará que ya existe.
- Ingresar Contraseña, si la contraseña es mal escrita, el sistema alertará de un error en esta
- Dar click en el botón de registro, si todos los datos fueron validados, el sistema alertará de un inicio de sesión válido.

## **Ruta /auth/register**

## **Elementos interactivos:**

- Input: Username: Escribir el nombre de usuario
- Input: Email address: Escribir el correo electrónico para el usuario
- Input: Password: Escribir una contraseña para el usuario
- Input: Confirm Password: Escribir la misma contraseña para crear el usuario
- Button: Create an account: Crea el usuario dentro del sistema
- Button: Sign in: Redirecciona a la ruta /auth/login
- Button: Login: Redirecciona a la ruta /auth/login

### **Pasos de uso:**

- Escribir un nombre para el usuario, el cual sea propio de la persona
- Escribir la dirección de correo electronico segun una cuneta que el usuario tenga, si este ya esta registrado en el sistema, este alertara de su existencia
- Escribir una contraseña para el usuario, si esta no lleva alguna de las caracterisicas solicitadas por el sistema, este alertara de su ausencia
- Escribir la misma contraseña para la confirmación de nuevo.
- Dar clik en el botón de “Create an account” para crear el usuario nuevo
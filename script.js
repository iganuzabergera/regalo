// --- CONFIGURACIÓN DE CLAVES ---
const claveSecreta = "marta"; // Clave que inicia el contador (Cámbiala si quieres)
const claveMaestra = "acceso-rapido"; // Clave para saltar el contador

// La URL de tu página final
const urlSorpresaFinal = "tesoro.html"; 
const urlAccesoRapido = "tesoro.html?skip=true"; 

function verificarContraseña() {
    
    // 1. Obtén la entrada del usuario y la limpia/convierte a minúsculas para chequeo
    // NOTA: ELIMINAMOS .toLowerCase() AQUÍ para probar la clave secreta tal cual está definida, 
    // y aplicamos .toLowerCase() a la clave maestra para flexibilidad.
    let entradaUsuario = document.getElementById("casillaClave").value.trim();

    // 2. Elemento donde mostramos el mensaje
    const elementoError = document.getElementById("mensajeError");
    elementoError.style.color = "#ff4444"; // Color por defecto (rojo)

    // 3. Lógica Condicional (Chequeo de Claves)

    if (entradaUsuario === claveSecreta) {
        // CASO 1: CLAVE NORMAL CORRECTA (INICIA EL CONTADOR)
        elementoError.textContent = "¡Clave Correcta! Iniciando la cuenta regresiva...";
        elementoError.style.color = "#00cc00"; // Verde
        
        setTimeout(() => {
             // Redirige a la página del Tesoro (inicio normal)
             window.location.href = urlSorpresaFinal; 
        }, 1000); 

    } else if (entradaUsuario.toLowerCase() === claveMaestra) {
        // CASO 2: CLAVE MAESTRA CORRECTA (SALTA EL CONTADOR)
        elementoError.textContent = "¡ACCESO MAESTRO CONCEDIDO! Saltando a la sorpresa final...";
        elementoError.style.color = "#007bff"; // Azul especial
        
        setTimeout(() => {
             // Redirige a la página del Tesoro con un parámetro para saltar
             window.location.href = urlAccesoRapido; 
        }, 1000); 

    } else {
        // CASO 3: CLAVE INCORRECTA
        elementoError.textContent = "Clave incorrecta. ¡Revisa la pista y vuelve a intentarlo!";
    }
}
```

### 🎯 Explicación de la Corrección:

La corrección clave fue **eliminar el `.toLowerCase()`** de la variable `entradaUsuario` cuando se declara:

```javascript
let entradaUsuario = document.getElementById("casillaClave").value.trim();
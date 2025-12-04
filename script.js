// --- CONFIGURACIÓN DE CLAVES ---
const claveSecreta = "Marta"; // Clave que inicia el contador
const claveMaestra = "rapido"; // <<-- ¡NUEVA CLAVE PARA SALTAR EL CONTADOR!
// --- CONFIGURACIÓN DE CLAVES ---

// La URL de tu página final (la que se muestra al terminar el contador)
// NOTA: Esta es la URL de GitHub Pages + /tesoro.html
const urlSorpresaFinal = "tesoro.html"; 
const urlAccesoRapido = "tesoro.html?skip=true"; // URL que usará la clave maestra

function verificarContraseña() {
    
    // 3. Obtén la entrada del usuario y la limpia
    let entradaUsuario = document.getElementById("casillaClave").value.trim().toLowerCase();

    // 4. Lógica Condicional
    if (entradaUsuario === claveSecreta) {
        // CASO 1: CLAVE NORMAL (INICIA EL CONTADOR)
        document.getElementById("mensajeError").textContent = "Clave Correcta! Iniciando la cuenta regresiva...";
        document.getElementById("mensajeError").style.color = "#00cc00"; 
        
        setTimeout(() => {
             // Redirige a la página del Tesoro (inicio normal)
             window.location.href = urlSorpresaFinal; 
        }, 1000); 

    } else if (entradaUsuario === claveMaestra) {
        // CASO 2: CLAVE MAESTRA (SALTA EL CONTADOR)
        document.getElementById("mensajeError").textContent = "¡ACCESO MAESTRO CONCEDIDO! Saltando a la sorpresa final...";
        document.getElementById("mensajeError").style.color = "#007bff"; // Azul para acceso especial
        
        setTimeout(() => {
             // Redirige a la página del Tesoro con un parámetro para saltar
             window.location.href = urlAccesoRapido; 
        }, 1000); 

    } else {
        // CASO 3: CLAVE INCORRECTA
        document.getElementById("mensajeError").textContent = "Clave incorrecta. ¡Revisa la pista y vuelve a intentarlo!";
        document.getElementById("mensajeError").style.color = "#ff4444"; 
    }
}
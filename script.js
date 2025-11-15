function verificarContraseña() {
    // CAMBIA ESTO por tu clave secreta (asegúrate de que las minúsculas coincidan)
    const claveSecreta = "MartaFernandez"; 
    
    // Obtener el valor introducido por el usuario
    let entradaUsuario = document.getElementById("casillaClave").value.trim(); // .trim() elimina espacios

    // Obtener el elemento para mostrar el error
    const elementoError = document.getElementById("mensajeError");

    // Lógica Condicional
    if (entradaUsuario.toLowerCase() === claveSecreta.toLowerCase()) {
        // CLAVE CORRECTA: Redirige a la página de la sorpresa
        elementoError.textContent = "¡Clave Correcta! Cargando sorpresa...";
        elementoError.style.color = "#00cc00"; // Verde

        // Redirige a la página del Tesoro dentro del mismo proyecto
        setTimeout(() => {
             window.location.href = "tesoro.html"; 
        }, 1000); // Espera 1 segundo antes de redirigir (para ver el mensaje de éxito)

    } else {
        // CLAVE INCORRECTA: Muestra un mensaje de error
        elementoError.textContent = "Clave incorrecta. ¡Revisa la pista y vuelve a intentarlo!";
        elementoError.style.color = "#ff4444"; // Rojo
    }

}

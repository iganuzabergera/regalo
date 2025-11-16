// AÑADE ESTE CÓDIGO A UN NUEVO ARCHIVO LLAMADO contador.js

// Paso 1: Mapear los días especiales a sus recuerdos
const recuerdosEspeciales = {
    // CLAVE: El número del día | VALOR: El objeto con la info
    "1": { img: "14-12-2024.jpg", texto: "¡Día 50! Nuestra primera escapada a la playa. ¡Qué frío hacía!", duracion: 4000 },
    "40":{img: "22-01-2025.jpg",duracion: 4000},
    "57": { img: "08-02-2025.3.jpg", texto: "Día 120: La noche de pizza y peli que terminó siendo la mejor.", duracion: 4000 },
    "58": { img: "09-02-2025.jpg", texto: "Día 200: El recuerdo de nuestro primer viaje de Navidad, me encantó.", duracion: 4000 },
    "80": { img: "03-03-2025.jpg", texto: "puta", duracion: 4000 },
    "81": { img: "04-03-2025.jpg", texto: "pua", duracion: 4000 },
    "133": { img: "25-04-2025.2.jpg", texto: "pa", duracion: 4000 },
    "199": { img: "30-06-2025.jpg", texto: "loca", duracion: 4000 },
    "230": { img: "31-07-2025.jpg", texto: "loa", duracion: 4000 },
    "231": { img: "01-08-2025.1.jpg", texto: "lo", duracion: 4000 },
    "232": { img: "02-08-2025.4.jpg", texto: "lol", duracion: 4000 },
    "231": { img: "10-09-2025.jpg", texto: "lola", duracion: 4000 },
    "295": { img: "04-10-2025.1.jpg", texto: "lolita", duracion: 4000 },
 // AÑADE MÁS DÍAS Y FOTOS AQUÍ (recuerda subir estas imágenes a GitHub)
};

const diaFinal = 365;
let diaActual = 1;
let intervaloContador;

const displayContador = document.getElementById('contador-display');
const displayMemoria = document.getElementById('memoria-display');
const contenidoFinal = document.getElementById('contenido-final');
const seccionContador = document.getElementById('contador-seccion');

// Función principal para iniciar y controlar el conteo
function iniciarContador() {
    // Ocultar el contenido final al inicio
    contenidoFinal.style.display = 'none';
    seccionContador.style.display = 'block';

    intervaloContador = setInterval(() => {
        // 1. Verificar si hay que PAUSAR para un recuerdo
        if (recuerdosEspeciales[diaActual]) {
            clearInterval(intervaloContador); // Detener el contador
            mostrarRecuerdo(recuerdosEspeciales[diaActual]);
            
            // Reanudar el contador después de la duración de la pausa
            setTimeout(() => {
                displayMemoria.innerHTML = ''; // Limpiar el recuerdo
                iniciarContador(); // Reanudar el intervalo
                diaActual++; // Y pasar al siguiente día
            }, recuerdosEspeciales[diaActual].duracion);
            
        } else if (diaActual > diaFinal) {
            // 2. Verificar si el conteo HA TERMINADO
            clearInterval(intervaloContador);
            finalizarConteo();
            return;
        } else {
            // 3. CONTINUAR el conteo normal
            displayContador.textContent = `Día ${diaActual}`;
            diaActual++;
        }
    }, 50); // Velocidad del conteo (50ms hace que suba rápido, ajusta si quieres más lento)
}

// Función para mostrar la imagen y el texto
function mostrarRecuerdo(recuerdo) {
    displayMemoria.innerHTML = `
        <div class="memoria-pausa">
            <h3>¡Memoria Especial del Día ${diaActual}!</h3>
            <img src="${recuerdo.img}" alt="Recuerdo del día ${diaActual}">
            <p>${recuerdo.texto}</p>
        </div>
    `;
}

// Función que se ejecuta cuando se llega al día 365
function finalizarConteo() {
    displayContador.textContent = `¡365 Días Juntos!`;
    displayContador.style.color = '#ff69b4'; // Cambia de color al terminar
    
    // Ocultar la sección del contador y mostrar el contenido final
    seccionContador.style.display = 'none';
    contenidoFinal.style.display = 'block';
}

// Iniciar el conteo al cargar la página
window.onload = iniciarContador;
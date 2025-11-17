// --- CONFIGURACIÓN DE DATOS (PERSONALIZA ESTO) ---

// Paso 1: Mapear los días especiales a sus recuerdos
const recuerdosEspeciales = {
    // CLAVE: El número del día | VALOR: El objeto con la info
    // Asegúrate de que las imágenes estén subidas a GitHub (ej: "14-12-2024.jpg")
    "1": { img: "14-12-2024.jpg", texto: "¡Día 1! Empezamos esta increíble aventura juntos. ¡A por más!", duracion: 4000, titulo: "Nuestro Comienzo" },
    "40": { img: "22-01-2025.jpg", texto: "Día 40: Primeros momentos inolvidables. Gracias por estar aquí.", duracion: 4000, titulo: "40 Días de Felicidad" },
    "57": { img: "08-02-2025.3.jpg", texto: "Día 57: La noche de pizza y peli que terminó siendo la mejor.", duracion: 4000, titulo: "Nuestra Noche Perfecta" },
    "80": { img: "03-03-2025.jpg", texto: "Eres la mejor persona que he conocido. Te amo.", duracion: 4000, titulo: "Amor Genuino" },
    "133": { img: "25-04-2025.2.jpg", texto: "Primer viaje a la montaña. ¡Qué vistas y qué compañía!", duracion: 4000, titulo: "Aventuras Juntos" },
    "199": { img: "30-06-2025.jpg", texto: "Recordando esa cena que salió mal pero que nos hizo reír tanto.", duracion: 4000, titulo: "Risas Inolvidables" },
    "231": { img: "01-08-2025.1.jpg", texto: "La celebración más sencilla es la que más me gustó.", duracion: 4000, titulo: "Momentos Íntimos" },
    "295": { img: "04-10-2025.1.jpg", texto: "Sigues siendo mi persona favorita. Te quiero.", duracion: 4000, titulo: "¡Te amo mucho!" },
    "365": { img: "foto-final-1.jpg", texto: "¡Llegamos al final! Pero este es solo el comienzo. Te amo.", duracion: 7000, titulo: "🎉 ¡Feliz Aniversario! 🎉" },
};

const diaFinal = 365;
let diaActual = 1;
let intervaloContador; 
let carruselIntervalo; 

// --- CONFIGURACIÓN DEL CARRUSEL RÁPDO ---
let indiceCarrusel = 0; 
const imagenesCarrusel = 20; 
const duracionCarrusel = 100; // 100ms por foto

// Variables globales para los elementos del DOM (serán inicializadas en DOMContentLoaded)
let displayContador;
let contenidoFinal;
let seccionContador;
let carruselFondo;
let memoriaRecuerdo;
let tituloRecuerdo;
let textoRecuerdo;


// Función para cambiar a la siguiente foto del carrusel
function actualizarCarrusel() {
    // Ciclo para ir de 1 a 20
    indiceCarrusel = (indiceCarrusel % imagenesCarrusel) + 1; 

    // Corrección para asegurar el formato 'carrusel-01.jpg'
    const indice = indiceCarrusel < 10 ? `0${indiceCarrusel}` : `${indiceCarrusel}`;
    const nombreArchivo = `carrusel-${indice}.jpg`;
    
    // Aplica la imagen de fondo
    carruselFondo.style.backgroundImage = `url('${nombreArchivo}')`;
}

// 1. Inicia la rotación rápida de las 20 fotos
function iniciarCarruselFondo() {
    memoriaRecuerdo.style.display = 'none';

    // Ejecuta la primera foto inmediatamente (Soluciona el problema del blanco)
    actualizarCarrusel(); 

    // Luego, configura el intervalo para la rotación
    carruselIntervalo = setInterval(actualizarCarrusel, duracionCarrusel); 
}

// 2. Función principal para el conteo de días
function iniciarConteoPrincipal() {
    contenidoFinal.style.display = 'none'; 
    seccionContador.style.display = 'block';

    // INICIAR EL CARRUSEL RÁPIDO
    iniciarCarruselFondo(); 

    intervaloContador = setInterval(() => {
        
        if (recuerdosEspeciales[diaActual]) {
            clearInterval(intervaloContador); 
            clearInterval(carruselIntervalo); 
            
            mostrarRecuerdo(recuerdosEspeciales[diaActual]);
            
            // Reanudar el contador y el carrusel después de la duración de la pausa
            setTimeout(() => {
                memoriaRecuerdo.style.display = 'none';
                
                // Reiniciar el ciclo de conteo (que reinicia el carrusel)
                iniciarConteoPrincipal(); 
                diaActual++; 
            }, recuerdosEspeciales[diaActual].duracion);
            
        } else if (diaActual > diaFinal) {
            clearInterval(intervaloContador);
            clearInterval(carruselIntervalo);
            finalizarConteo();
            return;
        } else {
            // CORRECCIÓN SINCRONIZACIÓN: Mostrar el día ANTES de incrementar
            displayContador.textContent = `Día ${diaActual}`;
            diaActual++;
        }
    }, 50); // Velocidad del conteo
}

// 3. Función para mostrar la imagen y el texto especial
function mostrarRecuerdo(recuerdo) {
    
    const imagenURL = recuerdo.img; 

    // 1. Detener el Carrusel en la Foto de Recuerdo del Día
    carruselFondo.style.backgroundImage = `url('${imagenURL}')`;
    carruselFondo.style.filter = 'brightness(0.5)'; // Oscurece ligeramente el fondo

    // 2. Llenar el contenido del Recuerdo (¡El texto va DENTRO, debajo de la imagen conceptual!)
    tituloRecuerdo.textContent = recuerdo.titulo || `¡Recuerdo del Día ${diaActual}!`;
    textoRecuerdo.textContent = recuerdo.texto;
    
    // 3. Mostrar la caja del Recuerdo
    memoriaRecuerdo.style.display = 'flex'; 
}

// 4. Función de finalización (¡Muestra la página final correctamente!)
function finalizarConteo() {
    displayContador.textContent = `¡365 Días Juntos!`;
    displayContador.style.color = '#ff69b4';
    
    // Ocultar la sección entera del contador
    seccionContador.style.display = 'none';
    
    // Mostrar el contenido final
    contenidoFinal.style.display = 'block';
}

// --- ARRANQUE INICIAL (El Listener de Eventos más seguro) ---

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las variables DOM una vez que el documento está listo
    displayContador = document.getElementById('contador-display');
    contenidoFinal = document.getElementById('contenido-final');
    seccionContador = document.getElementById('contador-seccion');
    carruselFondo = document.getElementById('carrusel-fondo');
    memoriaRecuerdo = document.getElementById('memoria-recuerdo');
    tituloRecuerdo = document.getElementById('titulo-recuerdo');
    textoRecuerdo = document.getElementById('texto-recuerdo');

    // Inicia el proceso de conteo y carrusel
    iniciarConteoPrincipal(); 
});
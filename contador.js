// --- CONFIGURACIÓN DE DATOS (PERSONALIZA ESTO) ---

// Paso 1: Mapear los días especiales a sus recuerdos
const recuerdosEspeciales = {
    // CLAVE: El número del día | VALOR: El objeto con la info
    "1": { img: "14-12-2024.jpg", texto: "Gracias por venir a Pamplona y 'ayudarme' a dar el paso", duracion: 4000,},
    "40": { img: "22-01-2025.jpg", texto: "Gracias por todas las videollamadas", duracion: 4000,},
    "57": { img: "08-02-2025.3.jpg", texto: "Aqui por Barcelona, segunda vez que nos veiamos", duracion: 4000,},
    "58": { img: "09-02-2025.jpg", texto: "De camino a la estacion, cada reencuentro tiene su despedida", duracion: 4000,},
    "80": { img: "03-03-2025.jpg", texto: "Gracias por los paseos por fatima despues de haber rezado a la Virgen", duracion: 4000,},
    "133": { img: "25-04-2025.2.jpg", texto: "De nuevo por Barna, que planazo fue ver a la gente correr", duracion: 4000, },
    "199": { img: "30-06-2025.jpg", texto: "Los dias de la universidad de verano...", duracion: 4000,},
    "231": { img: "31-07-2025.jpg", texto: "Ya de viaje por Francia", duracion: 4000, },
    "232": { img: "01-08-2025.1.jpg", texto: "La mejor peregrinacion de todas", duracion: 4000, },
    "232": { img: "02-08-2025.4.jpg", texto: "Una de las fotos que mas me gusta", duracion: 4000, },
    "271": { img: "10-09-2025.jpg", texto: "Y vuelta a las videollamadas", duracion: 4000, },
    "295": { img: "04-10-2025.1.jpg", texto: "En esta foto sales guapisima", duracion: 4000,},
    "365": { img: "carrusel-01.jpg", texto: "Y al final no fue todo una tonteria", duracion: 5500, titulo: "Feliz aniversario Marta, te quiero" },
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

// Función para precargar imágenes del carrusel (Soluciona el arranque lento)
function precargarCarrusel() {
    for (let i = 1; i <= imagenesCarrusel; i++) {
        const indice = i < 10 ? `0${i}` : `${i}`;
        const img = new Image();
        img.src = `carrusel-${indice}.jpg`; 
    }
}

// Función para cambiar a la siguiente foto del carrusel
function actualizarCarrusel() {
    indiceCarrusel = (indiceCarrusel % imagenesCarrusel) + 1; 
    const indice = indiceCarrusel < 10 ? `0${indiceCarrusel}` : `${indiceCarrusel}`;
    const nombreArchivo = `carrusel-${indice}.jpg`;
    
    carruselFondo.style.backgroundImage = `url('${nombreArchivo}')`;
}

// 1. Inicia la rotación rápida de las 20 fotos
function iniciarCarruselFondo() {
    memoriaRecuerdo.style.display = 'none';

    actualizarCarrusel(); // Ejecuta la primera foto inmediatamente
    carruselIntervalo = setInterval(actualizarCarrusel, duracionCarrusel); 
}

// 2. Lógica del Bucle (Sacada del setInterval para controlarla mejor)
function manejarBucle() { 
        displayContador.textContent = `Día ${diaActual}`;

        if (recuerdosEspeciales[diaActual]) {
        // --- PAUSA INICIADA ---
        clearInterval(intervaloContador); 
        clearInterval(carruselIntervalo); 
        
        mostrarRecuerdo(recuerdosEspeciales[diaActual]);
        
        // Reanudar el contador y el carrusel después de la duración de la pausa
        setTimeout(() => {
            memoriaRecuerdo.style.display = 'none';
            
            // ¡CORRECCIÓN FINAL!: Incrementamos el día AQUÍ
            diaActual++; 
            
            // Reiniciar el bucle de temporizador
            iniciarConteoPrincipal(); 
            
        }, recuerdosEspeciales[diaActual].duracion);
        
    } else if (diaActual > diaFinal) {
        // Verificar FINAL
        clearInterval(intervaloContador);
        clearInterval(carruselIntervalo);
        finalizarConteo();
        return;
    } else {
        // --- BUCLE NORMAL ---
        // 1. Muestra el día actual
        
        
        // 2. Pasa al día siguiente (Para la próxima ejecución del bucle)
        diaActual++; 
    }
}
// 3. Función principal para el conteo de días (Ahora solo inicia el setInterval)
function iniciarConteoPrincipal() {
    contenidoFinal.style.display = 'none'; 
    seccionContador.style.display = 'block';

    // INICIAR EL CARRUSEL RÁPIDO
    iniciarCarruselFondo(); 

    // Iniciar el bucle principal que chequea el día
    intervaloContador = setInterval(manejarBucle, 50); 
}

// 4. Función para mostrar la imagen y el texto especial
function mostrarRecuerdo(recuerdo) {
    
    const imagenURL = recuerdo.img; 

    // 1. Detener el Carrusel en la Foto de Recuerdo del Día
    carruselFondo.style.backgroundImage = `url('${imagenURL}')`;
   
    
    // 2. Llenar el contenido del Recuerdo
    tituloRecuerdo.textContent = recuerdo.titulo;
    textoRecuerdo.textContent = recuerdo.texto;
    
    // 3. Mostrar la caja del Recuerdo
    memoriaRecuerdo.style.display = 'flex'; 
}

// 5. Función de finalización (¡Muestra la página final correctamente!)
function finalizarConteo() {
    displayContador.textContent = `¡365 Días Juntos!`;
    displayContador.style.color = '#ff69b4';
    
    // Ocultar la sección entera del contador
    seccionContador.style.display = 'none';
    
    // Mostrar el contenido final
    contenidoFinal.style.display = 'block';
    mostrarModal();
}

// --- ARRANQUE INICIAL (El Listener de Eventos más seguro) ---

// Precarga antes de que el DOM esté listo
precargarCarrusel(); 

// --- FUNCIONES DEL MODAL DE AVISO ---

function mostrarModal() {
    // Muestra el modal al cambiar la clase
    const modal = document.getElementById('aviso-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function cerrarModal() {
    // Oculta el modal al hacer clic en la X o el botón
    const modal = document.getElementById('aviso-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Asegúrate de que el navegador conozca la función al cerrar el modal


// --- FUNCIONES DE NAVEGACIÓN ---

function mostrarCarta() {
    const contenidoFinal = document.getElementById('contenido-final');
    const seccionCarta = document.getElementById('seccion-carta');
    
    // Oculta la página principal y muestra la carta
    contenidoFinal.style.display = 'none';
    seccionCarta.style.display = 'block';
    
    // Opcional: Ocultamos el punto rojo una vez que se lee
    document.querySelector('.punto-nuevo').style.display = 'none';
}

function volverAContenidoFinal() {
    const contenidoFinal = document.getElementById('contenido-final');
    const seccionCarta = document.getElementById('seccion-carta');
    
    // Oculta la carta y muestra la página principal
    seccionCarta.style.display = 'none';
    contenidoFinal.style.display = 'block';
}

// Hacemos las funciones globales para que funcionen con el onclick en el HTML
window.mostrarCarta = mostrarCarta;
window.volverAContenidoFinal = volverAContenidoFinal;
window.cerrarModal = cerrarModal; // Hace la función global

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
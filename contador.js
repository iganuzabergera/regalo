// --- CONFIGURACIÓN DE DATOS (PERSONALIZA ESTO) ---

// Paso 1: Mapear los días especiales a sus recuerdos
const recuerdosEspeciales = {
    // CLAVE: El número del día | VALOR: El objeto con la info
    // Asegúrate de que las imágenes estén subidas a GitHub
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

};

const diaFinal = 365;
let diaActual = 1;
let intervaloContador; // Controla el avance del día
let carruselIntervalo; // Controla el cambio de fotos del carrusel

// --- CONFIGURACIÓN DEL CARRUSEL RÁPDO ---
let indiceCarrusel = 0; 
const imagenesCarrusel = 20; // Total de imágenes definidas en style.css (01 a 20)
const duracionCarrusel = 100; // 100ms por foto, para efecto rápido

// Elementos del DOM (Asegúrate que coincidan con tesoro.html)
const displayContador = document.getElementById('contador-display');
const contenidoFinal = document.getElementById('contenido-final');
const seccionContador = document.getElementById('contador-seccion');
const carruselFondo = document.getElementById('carrusel-fondo');
const memoriaRecuerdo = document.getElementById('memoria-recuerdo');
const imagenRecuerdo = document.getElementById('imagen-recuerdo');
const tituloRecuerdo = document.getElementById('titulo-recuerdo');
const textoRecuerdo = document.getElementById('texto-recuerdo');


// --- LÓGICA DEL CARRUSEL Y CONTEO ---

// 1. Inicia la rotación rápida de las 20 fotos
function iniciarCarruselFondo() {
    carruselFondo.style.display = 'block';
    memoriaRecuerdo.style.display = 'none';

    carruselIntervalo = setInterval(() => {
        
        // Ciclo para ir de 1 a 20
        indiceCarrusel = (indiceCarrusel % imagenesCarrusel) + 1; 

        // Crea el nombre del archivo (carrusel-01.jpg, carrusel-10.jpg)
        const nombreArchivo = indiceCarrusel < 10 ? `carrusel-0${indiceCarrusel}.jpg` : `carrusel-${indiceCarrusel}.jpg`;
        
        // Aplica la imagen de fondo (el código CSS que usa @keyframes ya no es necesario con esto, pero no interfiere)
        carruselFondo.style.backgroundImage = `url('${nombreArchivo}')`;
        
    }, duracionCarrusel); 
}

// 2. Función principal para el conteo de días
function iniciarContador() {
    contenidoFinal.style.display = 'none';
    seccionContador.style.display = 'block';
    displayContador.style.display = 'block'; // Asegura que el número se vea

    // INICIAR EL CARRUSEL RÁPIDO
    iniciarCarruselFondo(); 

    intervaloContador = setInterval(() => {
        
        // A. Verificar PAUSA (Día Especial)
        if (recuerdosEspeciales[diaActual]) {
            clearInterval(intervaloContador); // Detiene el contador de días
            clearInterval(carruselIntervalo); // Detiene el carrusel rápido en la foto actual
            
            mostrarRecuerdo(recuerdosEspeciales[diaActual]);
            
            // Reanudar el contador y el carrusel después de la duración de la pausa
            setTimeout(() => {
                memoriaRecuerdo.style.display = 'none'; // Oculta la caja de recuerdo
                displayContador.style.display = 'block'; // Muestra el número de día de nuevo
                
                iniciarContador(); // Reinicia el ciclo de conteo (que reinicia el carrusel)
                diaActual++; // Pasa al siguiente día
            }, recuerdosEspeciales[diaActual].duracion);
            
        // B. Verificar FINAL
        } else if (diaActual > diaFinal) {
            clearInterval(intervaloContador);
            clearInterval(carruselIntervalo);
            finalizarConteo();
            return;
        } else {
            // C. CONTINUAR conteo normal
            displayContador.textContent = `Día ${diaActual}`;
            diaActual++;
        }
    }, 50); // Velocidad del conteo
}

// 3. Función para mostrar la imagen y el texto especial
function mostrarRecuerdo(recuerdo) {
    
    // 1. Detener el Carrusel en la Foto de Recuerdo del Día
    // Esta línea reemplaza la imagen de fondo del carrusel por la foto del recuerdo
    carruselFondo.style.backgroundImage = `url('${recuerdo.img}')`;
    carruselFondo.style.filter = 'brightness(0.5)'; // Oscurece el fondo para que el texto destaque
    
    // 2. Ocultar el Número del Día
    displayContador.style.display = 'none'; 
    
    // 3. Llenar el contenido del Recuerdo
    imagenRecuerdo.src = recuerdo.img; // La imagen es visible dentro de la caja de recuerdo
    tituloRecuerdo.textContent = recuerdo.titulo || `¡Recuerdo del Día ${diaActual}!`;
    textoRecuerdo.textContent = recuerdo.texto;
    
    // 4. Mostrar la caja del Recuerdo encima del fondo
    memoriaRecuerdo.style.display = 'flex'; // Usamos flex para centrar el contenido (debe ir en CSS)
    memoriaRecuerdo.style.flexDirection = 'column';
    memoriaRecuerdo.style.justifyContent = 'center';
    memoriaRecuerdo.style.alignItems = 'center';
    
    // Aseguramos que la imagen dentro del recuerdo se vea (aunque esté detrás, lo hacemos por seguridad)
    imagenRecuerdo.style.display = 'block'; 
}

// 4. Función de finalización
function finalizarConteo() {
    displayContador.textContent = `¡365 Días Juntos!`;
    displayContador.style.color = '#ff69b4';
    
    // Ocultar el carrusel detenido y el número
    seccionContador.style.display = 'none';
    
    // Mostrar el contenido final
    contenidoFinal.style.display = 'block';
}

// Iniciar el conteo al cargar la página
window.onload = iniciarContador;
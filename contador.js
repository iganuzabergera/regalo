// --- CONFIGURACIÓN DE DATOS (PERSONALIZA ESTO) ---

// Paso 1: Mapear los días especiales a sus recuerdos
const recuerdosEspeciales = {
    // CLAVE: El número del día | VALOR: El objeto con la info
    // ¡IMPORTANTE! Asegúrate de que todas estas imágenes están subidas a GitHub
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
let intervaloContador; // Controla el avance del día
let carruselIntervalo; // Controla el cambio de fotos del carrusel

// --- CONFIGURACIÓN DEL CARRUSEL RÁPDO ---
let indiceCarrusel = 0; 
const imagenesCarrusel = 20; // Total de imágenes (de carrusel-01.jpg a carrusel-20.jpg)
const duracionCarrusel = 100; // 100ms por foto, para efecto rápido

// Elementos del DOM
const displayContador = document.getElementById('contador-display');
const contenidoFinal = document.getElementById('contenido-final');
const seccionContador = document.getElementById('contador-seccion');
const carruselFondo = document.getElementById('carrusel-fondo');
const memoriaRecuerdo = document.getElementById('memoria-recuerdo');
const imagenRecuerdo = document.getElementById('imagen-recuerdo');
const tituloRecuerdo = document.getElementById('titulo-recuerdo');
const textoRecuerdo = document.getElementById('texto-recuerdo');


// --- LÓGICA DEL CARRUSEL Y CONTEO ---

// Función para cambiar a la siguiente foto del carrusel (EVITA EL BLANCO)
function actualizarCarrusel() {
    // Ciclo para ir de 1 a 20
    indiceCarrusel = (indiceCarrusel % imagenesCarrusel) + 1; 

    // Corrección para asegurar el formato 'carrusel-01.jpg' hasta 'carrusel-20.jpg'
    const nombreArchivo = indiceCarrusel < 10 ? `carrusel-0${indiceCarrusel}.jpg` : `carrusel-${indiceCarrusel}.jpg`;
    
    // Aplica la imagen de fondo
    carruselFondo.style.backgroundImage = `url('${nombreArchivo}')`;
    carruselFondo.style.filter = 'none'; // Asegura que no esté oscurecido
}

// 1. Inicia la rotación rápida de las 20 fotos
function iniciarCarruselFondo() {
    carruselFondo.style.display = 'block';
    memoriaRecuerdo.style.display = 'none';

    // Ejecuta la primera foto inmediatamente para evitar el blanco
    actualizarCarrusel(); 

    // Luego, configura el intervalo para el resto
    carruselIntervalo = setInterval(actualizarCarrusel, duracionCarrusel); 
}

// 2. Función principal para el conteo de días
function iniciarContador() {
    contenidoFinal.style.display = 'none';
    seccionContador.style.display = 'block';
    displayContador.style.display = 'block'; 

    // INICIAR EL CARRUSEL RÁPIDO
    iniciarCarruselFondo(); 

    intervaloContador = setInterval(() => {
        
        // A. Verificar PAUSA (Día Especial)
        if (recuerdosEspeciales[diaActual]) {
            clearInterval(intervaloContador); // Detiene el contador de días
            clearInterval(carruselIntervalo); // Detiene el carrusel rápido
            
            mostrarRecuerdo(recuerdosEspeciales[diaActual]);
            
            // Reanudar el contador y el carrusel después de la duración de la pausa
            setTimeout(() => {
                memoriaRecuerdo.style.display = 'none'; // Oculta la caja de recuerdo
                displayContador.style.display = 'block'; // Muestra el número de día de nuevo
                carruselFondo.style.filter = 'none'; // Quita el oscurecimiento
                
                iniciarContador(); 
                diaActual++; 
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
    
    const imagenURL = recuerdo.img; 

    // 1. Detener el Carrusel y usar la foto del recuerdo como fondo
    carruselFondo.style.backgroundImage = `url('${imagenURL}')`;
    carruselFondo.style.filter = 'brightness(0.5)'; // Oscurece el fondo para que el texto destaque
    
    // 2. Ocultar el Número del Día
    displayContador.style.display = 'none'; 
    
    // 3. Llenar y mostrar el contenido del Recuerdo
    imagenRecuerdo.src = imagenURL; 
    tituloRecuerdo.textContent = recuerdo.titulo || `¡Recuerdo del Día ${diaActual}!`;
    textoRecuerdo.textContent = recuerdo.texto;
    
    // Mostrar la caja del Recuerdo (con flexbox para centrar)
    memoriaRecuerdo.style.display = 'flex'; 
    memoriaRecuerdo.style.opacity = 1; // Usamos la opacidad de CSS
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
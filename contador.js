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
let intervaloContador; // Controla el avance del día
let carruselIntervalo; // Controla el cambio de fotos del carrusel

// --- CONFIGURACIÓN DEL CARRUSEL RÁPDO ---
let indiceCarrusel = 0; 
const imagenesCarrusel = 20; 
const duracionCarrusel = 100; // 100ms por foto, para efecto rápido

// Elementos del DOM
const displayContador = document.getElementById('contador-display');
const contenidoFinal = document.getElementById('contenido-final');
const seccionContador = document.getElementById('contador-seccion');
const carruselFondo = document.getElementById('carrusel-fondo');
const memoriaRecuerdo = document.getElementById('memoria-recuerdo'); // La caja de recuerdo
const tituloRecuerdo = document.getElementById('titulo-recuerdo');
const textoRecuerdo = document.getElementById('texto-recuerdo');


// --- LÓGICA DEL CARRUSEL Y CONTEO ---

// Función para cambiar a la siguiente foto del carrusel (EVITA EL BLANCO)
function actualizarCarrusel() {
    // Ciclo para ir de 1 a 20
    indiceCarrusel = (indiceCarrusel % imagenesCarrusel) + 1; 

    // Corrección para asegurar el formato 'carrusel-01.jpg' hasta 'carrusel-20.jpg'
    const nombreArchivo = indiceCarrusel < 10 ? `carrusel-0${indiceCarrusel}.jpg` : `carrusel-${indiceCarrusel}.jpg`;
    
    // Aplica la imagen de fondo (Causa el cambio brusco deseado)
    carruselFondo.style.backgroundImage = `url('${nombreArchivo}')`;
    carruselFondo.style.filter = 'none'; // Asegura que no esté oscuro
}

// 1. Inicia la rotación rápida de las 20 fotos
function iniciarCarruselFondo() {
    // 1. Oculta el recuerdo para que solo se vea el carrusel
    memoriaRecuerdo.style.display = 'none';

    // 2. Ejecuta la primera foto inmediatamente (Soluciona el problema del blanco)
    actualizarCarrusel(); 

    // 3. Configura el intervalo para la rotación
    carruselIntervalo = setInterval(actualizarCarrusel, duracionCarrusel); 
}

// 2. Función principal para el conteo de días
function iniciarContador() {
    // CORRECCIÓN: Asegura que la página final esté OCULTA al inicio
    contenidoFinal.style.display = 'none'; 
    seccionContador.style.display = 'block';

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
                // Ocultar el recuerdo
                memoriaRecuerdo.style.display = 'none';
                // Quita el oscurecimiento del fondo
                carruselFondo.style.filter = 'none';
                
                // Reiniciar el ciclo
//Este código en JavaScript se utiliza para crear un lienzo (canvas) en una página web, 
//configurar su contexto 2D y definir un arreglo llamado "particles" para almacenar información sobre partículas. 

const canvas = document.getElementById("particleCanvas");
//Obtiene el elemento canvas del documento HTML mediante su identificador y lo almacena en la constante canvas.
const ctx = canvas.getContext("2d"); //el contexto 2D del canvas, se almacena en la constante ctx.
canvas.width = window.innerWidth; //permite que el lienzo ocupe todo el ancho visible en la pantalla.canvas.height = window.innerHeight; //permitiendo que el lienzo se extienda por toda la altura visible en la pantalla.
canvas.height = window.innerHeight; //permitiendo que el lienzo se extienda por toda la altura visible en la pantalla.

const particles = []; //Crea un arreglo vacío llamado "particles" que se utilizará para almacenar información sobre 
//las partículas que se dibujarán en el lienzo.

//La clase se utiliza para representar partículas que pueden tener posición, tamaño, color 
//y velocidad en dos dimensiones (horizontal y vertical).
class Particle {  
    // Constructor de la clase
    constructor(x, y, size, color) {
        // Propiedades de la partícula: posición (x, y), tamaño, color
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        // Propiedades de velocidad en las dimensiones x e y
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    // La función update se utiliza para modificar las propiedades de una partícula en función de su velocidad y tamaño
    update() {
        // Actualiza la posición de la partícula según su velocidad en las dimensiones x e y
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Verifica si el tamaño de la partícula es mayor que 0.2
        // y reduce el tamaño en 0.1 si es cierto
        if (this.size > 0.2) this.size -= 0.1;
    }

     //La función draw se utiliza para dibujar una partícula en un lienzo HTML utilizando el contexto 2D (ctx)
     draw() {
        // Establece el color de relleno del contexto con el color de la partícula
        ctx.fillStyle = this.color;
        // Establece el color del trazo (borde) del contexto en negro
        ctx.strokeStyle = "black";
        // Establece el ancho del trazo del contexto en 2 píxeles
        ctx.lineWidth = 2;
        // Inicia un nuevo trazo
        ctx.beginPath();
        // Dibuja un arco en el lienzo que representa la partícula
        // Los parámetros son: x, y, radio, ángulo inicial, ángulo final
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Cierra el trazo
        ctx.closePath();
        // Rellena el interior del arco con el color de relleno especificado
        ctx.fill();
        // Dibuja el borde del arco con el color y ancho de trazo especificados
        ctx.stroke();
    }
}

function createParticle(e) {
    // Obtiene las coordenadas del evento de clic o posición del mouse
    const xPos = e.x;
    const yPos = e.y;
    
    // Genera un tamaño aleatorio para la partícula en el rango [5, 35)
    const size = Math.random() * 30 + 5;

    // Genera un color aleatorio en formato RGB
    const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;

     // Crea una nueva instancia de la clase Particle con las propiedades calculadas
    const particle = new Particle(xPos, yPos, size, color);
     // Agrega la nueva partícula al arreglo de partículas
    particles.push(particle);
}

function animateParticles() {
    // Limpia el lienzo borrando el contenido
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Itera sobre todas las partículas en el arreglo
   for (let i = 0; i < particles.length; i++) {

       // Actualiza las propiedades de la partícula (posición, tamaño, etc.)
       particles[i].update();

       // Dibuja la partícula en el lienzo
       particles[i].draw();
   }

   // Solicita al navegador que programe la próxima ejecución de la función animateParticles
   // para crear una animación continua
   requestAnimationFrame(animateParticles);
}

//Este código utiliza dos funciones en conjunto para crear una interacción de partículas en 
//respuesta al movimiento del ratón en una página web
//Cuando se detecta un movimiento del ratón, se llama a la función createParticle.
document.addEventListener("mousemove", createParticle);
animateParticles();
//Llama a la función animateParticles, que se encargará de iniciar y mantener la animación 
//continua de las partículas en el lienzo. Esta función probablemente contiene un bucle que utiliza 
requestAnimationFrame //para mantener la animación en curso.
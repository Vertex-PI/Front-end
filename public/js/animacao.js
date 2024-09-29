const elementosAnimar = document.querySelectorAll('.animar');

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('ativar-animacao');
    } else {
      entrada.target.classList.remove('ativar-animacao');
    }
  });
}, { threshold: 0.1 }); 


elementosAnimar.forEach((elemento) => {
  observer.observe(elemento);
});

/* animação tela principal */

// Array de palavras que serão exibidas dinamicamente no efeito de digitação
const words = ['Energia', 'Recursos', 'Gastos', 'Consumo'];  

// Índice da palavra atual sendo digitada do array 'words'
let currentIndex = 0;  

// Indica se o efeito está apagando os caracteres (true) ou digitando (false)
let isDeleting = false;  

// Índice do caractere atual dentro da palavra
let charIndex = 0;  

// Seleciona o elemento HTML com a classe 'dynamic-word', onde as palavras serão exibidas
const wordElement = document.querySelector('.dynamic-word');  

// Função que controla o efeito de digitação
function typeEffect() {
    // Obtém a palavra atual do array 'words' de acordo com o 'currentIndex'
    const currentWord = words[currentIndex];  

    // Se o efeito estiver apagando (isDeleting == true)
    if (isDeleting) {
        // Remove um caractere da palavra atual e atualiza o conteúdo do elemento HTML
        wordElement.textContent = currentWord.substring(0, charIndex - 1);
        
        // Decrementa o índice do caractere para continuar apagando
        charIndex--;  

        // Se todos os caracteres da palavra forem apagados
        if (charIndex === 0) {
            // Altera o estado para digitar a próxima palavra
            isDeleting = false;  
            // Move para a próxima palavra no array 'words' (circularmente)
            currentIndex = (currentIndex + 1) % words.length;  
        }
    } else {
        // Caso não esteja apagando, adiciona um caractere e atualiza o conteúdo do elemento HTML
        wordElement.textContent = currentWord.substring(0, charIndex + 1);
        
        // Incrementa o índice do caractere para continuar digitando
        charIndex++;  

        // Se a palavra inteira foi digitada
        if (charIndex === currentWord.length) {
            // Define o estado para iniciar o processo de apagar após uma pausa
            isDeleting = true;  
            // Pausa de 1 segundo antes de começar a apagar
            setTimeout(typeEffect, 1000);  
            return;  // Encerra a função para aguardar o timeout antes de apagar
        }
    }

    // Define a velocidade do efeito, 150ms para digitar e 150ms para apagar
    const speed = isDeleting ? 150 : 150;

    // Chama a função 'typeEffect' novamente após o intervalo definido por 'speed'
    setTimeout(typeEffect, speed);  
}

// Inicia o efeito de digitação após uma pausa de 2 segundos
setTimeout(typeEffect, 2000);  
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

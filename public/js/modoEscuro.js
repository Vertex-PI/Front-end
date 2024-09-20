const btn = document.getElementById('modo-escuro-btn');
const body = document.body;

btn.addEventListener('click', () => {
  body.classList.toggle('modo-escuro');
  
  if (body.classList.contains('modo-escuro')) {
    btn.innerHTML = '🌙'; 
    btn.classList.remove('modo-claro');
    btn.classList.add('modo-escuro');
  } else {
    btn.innerHTML = '🌞';
    btn.classList.remove('modo-escuro');
    btn.classList.add('modo-claro');
  }
});

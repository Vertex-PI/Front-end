const menuHamburguer = document.getElementById('menu-hamburguer');
const menuLateral = document.getElementById('menu-lateral');
const fecharMenu = document.getElementById('fechar-menu');

menuHamburguer.addEventListener('click', function() {
  menuLateral.classList.add('aberto');
});

fecharMenu.addEventListener('click', function() {
  menuLateral.classList.remove('aberto');
});

document.addEventListener('click', function(event) {
  if (!menuLateral.contains(event.target) && !menuHamburguer.contains(event.target)) {
    menuLateral.classList.remove('aberto');
  }
});

function levarParaOutraPagina(){
  window.location = 'pages/login.html';
}
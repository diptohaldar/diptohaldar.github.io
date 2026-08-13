const header=document.querySelector('.topbar');
const menu=document.querySelector('.menu');
menu?.addEventListener('click',()=>header.classList.toggle('nav-open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('nav-open')));

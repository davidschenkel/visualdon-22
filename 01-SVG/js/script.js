// Quelques fonctions utilitaires
function domForEach(selector, callback) {
  document.querySelectorAll(selector).forEach(callback);
}
function domOn(selector, event, callback, options) {
  document.querySelectorAll(selector).forEach(element => element.addEventListener(event, callback, options));
}



// changer la couleur du rectangle et du cercle animé quand on clique dessus
domOn('#changeColor', 'click', evt => {

let maxVal = 0xFFFFFF; // 16777215
let randomNumber = Math.random() * maxVal; 
randomNumber = Math.floor(randomNumber);
let randColor = randomNumber.toString(16);

  const el = evt.currentTarget;
  if (el.style.fill === 'red') {
    el.style.fill = `#${randColor}`;
  }
  else el.style.fill = 'red';

  const element = document.getElementById('color');
  
  if (element.style.fill === 'red') {
    element.style.fill = `#${randColor}`;
  }
  else element.style.fill = 'red';
});




// changer la taille du cercle extérieur au passage de la souris
domOn('#changeSize', 'mouseover', event => {
  event.currentTarget.style.r ='80';
  

})




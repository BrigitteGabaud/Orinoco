// Récupère et convertit les données au format JSON qui sont dans le local storage en objet Javascript (true = le panier existe), OU crée un objet (false = le panier est vide)
function getPanier() {
  console.log('are you here ?');
  return JSON.parse(localStorage.getItem("panier")) || {};
}

// Convertit l'objet javascript en objet JSON et envoie dans local storage
function savePanier(panier = {}) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

// Récupère tous les teddies
const request = new XMLHttpRequest();
const method = "GET";
const teddiesUrl = "http://localhost:3000/api/teddies";
 //const teddiesUrl = "https://ab-p5-api.herokuapp.com/api/teddies";

function getAllTeddies(){

    request.onreadystatechange = function() {
    
    if (this.readyState === 4 && this.status === 200){ 
        response = JSON.parse(this.response);
        
        renderTeddies(response)
    } else {
        console.log("statut " + this.status);
    }
    }
request.open(method, teddiesUrl); 
request.send();
}

// const teddyUrl = "http://localhost:3000/api/teddies";

// // Récupère le teddy sélectionné
// function getTeddy() {
//   request.onreadystatechange = function () {
//     console.log(this);
//     if (this.readyState === 4 && this.status === 200) {
//       response = JSON.parse(this.response);
//       console.log(response);
//       addTitle(response);
//       addImage(response);
//       addDescription(response);
//       addPrice(response);
//     } else {
//       console.log("statut " + this.status);
//     }
//   };
//   request.open(method, teddyUrl);
//   request.send();
// }

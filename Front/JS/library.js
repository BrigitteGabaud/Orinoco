// Récupère et convertit les données au format JSON qui sont dans le local storage en objet Javascript (true = le panier existe), OU crée un objet (false = le panier est vide)
function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) || {};
}

// Convertit l'objet javascript en objet JSON et envoie dans local storage
function savePanier(panier = {}) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

// Récupère tous les teddies ou affiche le statut de la requête
const request = new XMLHttpRequest();
const method = "GET";
const teddiesUrl = "http://localhost:3000/api/teddies";

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



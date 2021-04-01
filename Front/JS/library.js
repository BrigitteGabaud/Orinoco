// Récupère et convertit les données au format JSON qui sont dans le local storage en objet Javascript (true = le panier existe), OU crée un objet (false = le panier est vide)
function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) || {};
}

// Convertit l'objet javascript en objet JSON et envoie dans local storage
function savePanier(panier = {}) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

const request = new XMLHttpRequest();
const method = "GET";
const url = ': http://localhost:3000/api/teddies/GET';



request.onreadystatechange = function(event){
    if(this.readyState === 4 && this.status === 200) {
        console.log(JSON.parse(this.responseText));
    } else {
        consle.log("statut "+ this.status);
    }
}
request.open(method, url);
request.send();
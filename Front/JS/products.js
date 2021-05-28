// Renvoi un objet contenant les inforamtions sur l'url de la page
const presentLocation = window.location.href;
// Divise la chaine de l'url et renvoi un tableau contenant l'id de l'ourson
const splitUrl = presentLocation.split("id=");
// Cible l'id de l'ourson dans le tableau
const teddyId = splitUrl[1];

// Récupère les données d'un ourson à partir de son id
async function getTeddy() {
  let url = `http://localhost:3000/api/teddies/${teddyId}`;
 
  await fetch(url)
    // Convertit l'objet JSON en objet javascript
    .then((teddyBeforeParse) => teddyBeforeParse.json())
    // Ajoute les données de l'ourson
    .then((teddyAfterParse) => {
      addTitle(teddyAfterParse);
      addImage(teddyAfterParse);
      addDescription(teddyAfterParse);
      addColor(teddyAfterParse);
      addPrice(teddyAfterParse);
    })
    // Affiche un message si erreur
    .catch((err) => console.log("Erreur " + err));
}

// *** Ajoute le titre de l'ourson ***
function addTitle(teddy) {
  const title = document.createElement("h1");
  title.id = "productH1";
  title.innerText = `${teddy.name}`;
  // Ajoute le titre avant l'article
  parentContainer.insertBefore(title, article);
}

// *** Ajoute l'image de l'ourson ***
function addImage(teddy) {
  const image = document.createElement("img");
  image.classList.add("col-md-6");
  image.id = "product-image";
  image.setAttribute("src", `${teddy.imageUrl}`);
  image.setAttribute("alt", `${teddy.name}`);
  article.appendChild(image);
}

// *** Ajoute la description de l'ourson ***
function addDescription(teddy) {
  addDiv.classList.add("col-md-6");
  addDiv.innerHTML = `
    <p id= "details">${teddy.description} </p>`;
  article.appendChild(addDiv);
}

const addDiv = document.createElement("div");

// *** Ajoute les couleurs de l'ourson ***
function addColor(teddy) { 
  const select = document.createElement("select");
  select.id = "selectColor";
  select.classList.add("form-control");
  addDiv.appendChild(select);
  /* créé le small en cas de non sélection de couleur*/
  const small = document.createElement('small');
  addDiv.appendChild(small);

  /* créé la 1ere ligne des options de couleurs*/
  const placeHolder = document.createElement("option");
  placeHolder.innerText = "Couleur de votre ourson";
  placeHolder.disabled = true;
  placeHolder.selected = true;
  select.appendChild(placeHolder);
  
  /* Itère dans le tableau teddy.colors */
  teddy.colors.forEach(function (color) {
    const option = document.createElement('option');
    option.innerText = color;
    option.value = color;
    select.appendChild(option);
  })
}

// *** Ajoute le prix de l'ourson ***
function addPrice(teddy) {
  const price = document.createElement("h2");
  price.innerText = `${(teddy.price) / 100} €`;
  addDiv.appendChild(price);
  btn.innerHTML = `Ajouter au panier`;
  btn.classList.add("btn", "btn-block");
  btn.id = "add-btn";
  btn.value = "Generate a table";
  addDiv.appendChild(btn);

  /* Ecoute l'evt click et appelle la fonction addToCart */
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    addToCart(teddy);
  });
}

const container = document.getElementById("productContainer");
const article = document.getElementById("product-details");
const parentContainer = article.parentNode;
const btn = document.createElement("button");
let selectedColor = document.getElementById("selectColor");

// Récupère et ajoute les données dans le local storage
let dataLocalStorage = JSON.parse(localStorage.getItem("panier"));

// *** Ajoute et sauvegarde les données de l'ourson dans le local storage ***
function addToCart(teddy){
  // Récupère la valeur de select
  teddy.selectedColor = document.querySelector("select").value;

  // Cible l'élément après selectColor
  let small = document.querySelector("small");

  // Vérifie si une couleur a été selectionnée/ajoute au local storage/envoie vers page panier
  if (teddy.selectedColor == "Couleur de votre ourson") {
    // Ajoute le texte et la couleur dans small
    small.innerHTML = "Veuillez sélectionner une couleur";
    small.classList.add("text-danger");
  } else {
    
    // Récupère la fonction getPanier dans library.js 
    const panier = getPanier();
    // Si un ourson avec son id et sa couleur se trouve dans le panier
    if (panier[`${teddy._id}_${teddy.selectedColor}`]) {
      // incrementer de un (évite d'écraser le premier ourson)
      panier[`${teddy._id}_${teddy.selectedColor}`].quantity++;
    } else {
      //initialise la quantité d'oursons à 1
      teddy.quantity = 1;
      // Ajoute les données de l'ourson selectionné dans l'objet'
      panier[`${teddy._id}_${teddy.selectedColor}`] = teddy;
    }
    // Convertit l'objet javascript en objet JSON et envoie dans local storage
    savePanier(panier);
    // Dirige vers la page du panier
    window.location.href = "../Html/shopping_cart.html";
  }
};

getTeddy();


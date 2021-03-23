// *** Ajoute le titre de l'ourson ***
function addTitle(teddy) {
  const title = document.createElement("h1");
  title.innerText = teddy.title;
  parentContainer.insertBefore(title, article);
  console.log(title);
}  

// *** Ajoute l'image de l'ourson ***
function addImage(teddy) {
  const image = document.createElement("img");
  image.classList.add("col-md-6");
  image.setAttribute("src", teddy.image);
  image.setAttribute("alt", "Lucien l'ours tout doux");
  console.log(teddy.image);
  article.appendChild(image);
  console.log(image);
}

// *** Ajoute la description de l'ourson ***
function addDescription(teddy) {
  addDiv.classList.add("col-md-6");
  addDiv.innerHTML = `
    <p id= "details">${teddy.description} </p>
    <select id="selectColor"
    class="form-control">
        <option value = "Couleur de votre ourson">Couleur de votre ourson</option>
        <option value="marron">Marron</option>
        <option value="blanc">Blanc</option>
        <option value="gris">Gris</option>
    </select>
    <small></small>`;
  article.appendChild(addDiv);
}



// *** Ajoute le prix de l'ourson ***
function addPrice(teddy) {
  const price = document.createElement("h2");
  price.innerText = teddy.price;
  addDiv.appendChild(price);
  btn.innerHTML = `Ajouter au panier`;
  btn.classList.add("btn", "btn-block");
  btn.id = "add-btn";
  btn.value = "Generate a table";
  addDiv.appendChild(btn);

}


class Teddy { 
    constructor (id, title, description, price, image){
        this._id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this.selectedColor = null;
    }
}

const teddy1 = new Teddy(
    1, 
    `Lucien l'ours tout doux`, 
    `Agréable au toucher, 45 cm`, 
    `26,90 €`, 
    `../images/teddy_1.jpg`,
    `marron`
)

const container = document.getElementById("productContainer");
const article = document.getElementById("product-details");
const parentContainer = article.parentNode;
const addDiv = document.createElement("div");
const btn = document.createElement("button");

addTitle(teddy1);
addImage(teddy1);
addDescription(teddy1);
addPrice(teddy1);

const addToCart = document.getElementById("add-btn");

// --- Récupère et ajoute au panier l'article sélectionné ---
addToCart.addEventListener("click", (event) => {
  // Annule le comportement par défaut
  event.preventDefault();
  teddy1.selectedColor = document.querySelector("select").value;
  // Récupère et convertit les données au format JSON qui sont dans le local storage en objet Javascript
  let dataLocalStorage = JSON.parse(localStorage.getItem("panier"));

  // Si il y a des données dans local storage, les envoie dans 
  if(dataLocalStorage != null) {
    // Ajoute le nouvel ourson selectionné dans le tableau ci-dessous
    dataLocalStorage.push(teddy1);
    // Convertit objet javascript en objet JSON et envoie dans local storage
    localStorage.setItem("panier", JSON.stringify(dataLocalStorage));
  } else {
    // Création d'un tableau vide
    dataLocalStorage = [];
    // Pousse les données de l'ourson selectionné dans le tableau
    dataLocalStorage.push(teddy1);
    localStorage.setItem("panier", JSON.stringify(dataLocalStorage));
  }

  // --- Vérifie si une couleur a été selectionnée ---
  addToCart.onclick = (event) => {
    event.preventDefault();
    
    // Cible l'élément après selectColor
    let small = selectColor.nextElementSibling;

    if(selectColor.value == "Couleur de votre ourson") {
      // Ajoute le texte et la couleur dans small
      small.innerHTML = "Veuillez sélectionner une couleur";
      small.classList.add("text-danger");
    } else {
      // Dirige vers la page du panier
      window.location.href = "shopping_cart.html";
    }
  }; 
})

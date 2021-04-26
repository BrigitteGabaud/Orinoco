// Récupération du body et du tbody
let body = document.getElementsByTagName("body");
let tableBody = document.querySelector("tbody");

function deleteTfoot() {
  // Récupère le tableau
  const table = document.getElementById("table");
  // Récupère le tfoot
  const tFoot = document.getElementById("tFoot");
  // Récupère la div du bouton de validation
  const validationButtonDiv = document.getElementById("validationButton");
  // Récupère le bouton de validation
  const validationBtn = document.getElementById("validation-btn");
  // supprime le tfoot
  table.removeChild(tFoot);
  //Supprime le bouton validation
  validationButtonDiv.removeChild(validationBtn);
}

function verifyBasket() {
  let panier = getPanier();
  // Crée  un tableau vide 
  let basketElements = [];

  for(let element in panier) {
    // Récupère le prix de chaque ourson dans le panier
    const unitPrice = panier[element].price / 100;
    // Pousse le prix untitaire dans le panier
    basketElements.push(unitPrice);
  }
  if (basketElements!= 0) {
    // Récupère le container
    const shoppingCartContainer = document.getElementById("shop-tab-container");
    // Récupère le paragraphe
    const emptyShoppingCart = document.getElementById("empty-shopping-cart");
    // Supprime le paragraphe
    shoppingCartContainer.removeChild(emptyShoppingCart);
  } else {
    deleteTfoot();
  }
}
verifyBasket(getPanier());

// Génère le tableau contenant les articles sélectionnés
function generateTable(data) {
  // Création des éléments du tableau
  for (const productIdentifier in data) {
    // Génère un objet contenant les data
    const product = data[productIdentifier];;
    // Crée une ligne contenant les informations de l'ourson
    let tr = document.createElement("tr");
    tr.dataset.productIdentifier = productIdentifier;
    tr.innerHTML = `
    <td>
        <a href="products.html">
          <img
              id="${product._id}"
              src="${product.imageUrl}"
              width="120"
              height="100"
              alt="Votre produit" 
          />
        </a>
    </td>
    <td class="responsive-thumbnails">
        ${product.name}
    </td>
    <td class="responsive-thumbnails">${product.selectedColor}</td>
    <td class="responsive-thumbnails">
      <div id="counter">
        <div class="product-quantity-subtract">
          <button class="minus">-</button>
        </div>
        <div>
          <p class="product-quantity-input">${product.quantity}</p>
        </div>
        <div class="product-quantity-add">
          <button class="plus">+</button>
        </div>
      </div>
    </td>
    <td class="responsive-thumbnails">En stock</td>
    <td class="responsive-thumbnails productPrice">${(product.price / 100) * product.quantity } €</td>`;
    tableBody.appendChild(tr);
  }
}
generateTable(getPanier());

const decrement = document.getElementsByClassName("minus");
const increment = document.getElementsByClassName("plus");
const tab = document.getElementById("tab");
// Récupère et convertit les données au format JSON qui sont dans le local storage en objet Javascript (true = le panier existe), OU crée un objet (false = le panier est vide)
const panier = getPanier();

// Boucle permettant de diminuer la quantité d'oursons
for (let element of decrement) {
  // Ecoute l'évènement au clic
  element.addEventListener("click", (e) => {
    // Récupère élément ciblé = bouton
    const button = e.target;
    // Récupère counter dans l'arbre
    const counter = button.parentNode.parentNode;
    // Récupère le seul élément contenu dans le tableau d'élt (puisque getElementsByClassname retourne un tableau)
    const productQuantityInput = counter.getElementsByClassName(
      "product-quantity-input"
    )[0];
    // Remonte dans l'arbre pour sélectionner tr
    const tr = counter.parentNode.parentNode;
    // Ajoute un dataset afin de pouvoir cibler l'élément
    const productIdentifier = tr.dataset.productIdentifier;
    // Récupère l'html de productQuantityInput
    let count = productQuantityInput.innerHTML;
    count--;
    // Récupère la fonction getPanier
    const panier = getPanier();
    // décrémente la qantité de l'élement récupéré
    panier[productIdentifier].quantity--;
    // Récupère le html de Product Qunatity Input
    productQuantityInput.innerHTML = count;

    if (count < 1) {
    // Récupère tbody
    const tBody = document.querySelector("tbody");
    // Supprime l'enfant de tbody = tr
    tBody.removeChild(tr);
    // Supprime du panier lélement ciblé
    delete panier[productIdentifier];
     deleteTfoot()
    }
    // Convertit l'objet javascript en objet JSON et envoie dans local storage
    savePanier(panier);
    
    // Récupère le prix dans le panier et le divise par 100
    const unitPrice = panier[productIdentifier].price / 100;
    // Multiplie le prix par la quantité de teddies
    const totalPrice = unitPrice * count;
    // Récupère dans le tr l'élément 0 du tableau
    const totalPriceContainer = tr.getElementsByClassName("productPrice")[0];
    // Insère le prix sur la page
    totalPriceContainer.innerText = totalPrice + " €";
    generateSubTotal(getPanier());
  });
}

// Boucle permettant d'augmenter la quantité d'oursons
for (let element of increment) {
  element.addEventListener("click", (e) => {
    // Cible bouton +
    const button = e.target;
    // Cible compteur général
    const counter = button.parentNode.parentNode;
    // Sélectionne l'input de la quantité
    const productQuantityInput = counter.getElementsByClassName(
      "product-quantity-input"
    )[0];
    // Remonte dans l'arbre pour sélectionner tr
    const tr = counter.parentNode.parentNode;
    // Ajoute un dataset afin de pouvoir cibler l'élément
    const productIdentifier = tr.dataset.productIdentifier;
    // Récupère le html d'input
    let count = productQuantityInput.innerHTML;
    count++;
    productQuantityInput.innerHTML = count;
    // Récupère et ajoute les données dans le local storage
    getPanier();
    // Incrémente la quantité de l'élément ciblé
    panier[productIdentifier].quantity++;
    // Convertit l'objet javascript en objet JSON et envoie dans local storage
    savePanier(panier);
    // Récupère le prix dans le panier et le divise par 100
    const unitPrice = panier[productIdentifier].price / 100;
    // Multiplie le prix par la quantité de teddies
    const totalPrice = unitPrice * count;
    // Récupère dans le tr l'élément 0 du tableau
    const totalPriceContainer = tr.getElementsByClassName("productPrice")[0];
    // Insère le prix sur la page
    totalPriceContainer.innerText = totalPrice + " €";
    generateSubTotal(getPanier());
  });
}

function generateSubTotal() {
  let panier = getPanier();
  // Crée un tableau vide pour accueillir les sous-totaux
  let eachSubTotal = [];

  for(let element in panier) {
    // Récupère le prix de chaque ourson dans le panier
    const unitPrice = panier[element].price / 100;
    // Récupère la quantité de chaque ourson présent dans le panier
    const productQuantity = panier[element].quantity;
    // Multilie le prix unitaire par la quantité
    const totalPrice = unitPrice * productQuantity;
    // Pousse les sous totaux dans le tableau vide
    eachSubTotal.push(totalPrice);
    // Additionne les sous-totaux
    const totalBasket = eachSubTotal.reduce((a, b) => a + b, 0);

    // Récupère le td contenant le sous-total
    const tdSubTotal = document.getElementsByClassName("sm-center subTotal")[0];
    tdSubTotal.innerText = totalBasket + " €";

    // Récupère le td contenant le total
    const total = document.getElementsByClassName("sm-center total")[0];
    total.innerText = totalBasket + " €";
  } 
}
generateSubTotal(getPanier());







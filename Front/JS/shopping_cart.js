async function getTeddies() {
  let url = `http://localhost:3000/api/teddies`;

  await fetch(url)
    .then((teddyBeforeParse) => teddyBeforeParse.json())

    .then((teddyAfterParse) => {
      
      console.table(teddyAfterParse);
    })
    .catch((err) => console.log("Erreur " + err));
}

// Récupération du body et du tbody
let body = document.getElementsByTagName("body");
let tableBody = document.querySelector("tbody");

// Génère le tableau contenant les articles sélectionnés
function generateTable(data) {
  // Création des éléments du tableau
  for (const productIdentifier in data) {
    // Génère un objet contenant les data
    const product = data[productIdentifier];
    console.log(product);
    // Crée une ligne contenant les informations de l'ourson
    let tr = document.createElement("tr");
    tr.dataset.productIdentifier = productIdentifier;
    console.log(productIdentifier);
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
    console.log(count);
    count--;
    // Récupère la fonction getPanier
    // = Récupère et convertit les données au format JSON qui sont dans le local storage en objet Javascript (true = le panier existe), OU crée un objet (false = le panier est vide)
    const panier = getPanier();
    // décrémente la qantité de l'élement récupéré
    panier[productIdentifier].quantity--;
    // Récupère le html de PQI
    productQuantityInput.innerHTML = count;
    if (count < 1) {
      // Récupère tbody
      const tBody = document.querySelector("tbody");
      // Supprime l'enfant de tbody = tr
      tBody.removeChild(tr);
      // Supprime du panier lélement ciblé
      delete panier[productIdentifier];
    }
    // Convertit l'objet javascript en objet JSON et envoie dans local storage
    savePanier(panier);
    if(count > 1) {
      // Récupère le prix dans le panier et le divise par 100
      const unitPrice = panier[productIdentifier].price / 100;
      // Multiplie le prix par la quantité de teddies
      const totalPrice = unitPrice * count;
      // Récupère dans le tr l'élément 0 du tableau
      const totalPriceContainer = tr.getElementsByClassName("productPrice")[0];
      // Insère le prix sur la page
      totalPriceContainer.innerText = totalPrice + " €";
    }
  });
}

// Boucle permettant d'augmenter la quantité d'oursons
for (let element of increment) {
  element.addEventListener("click", (e) => {
    const button = e.target;
    console.log(button);
    const counter = button.parentNode.parentNode;
    console.log(counter);
    const productQuantityInput = counter.getElementsByClassName(
      "product-quantity-input"
    )[0];
    console.log(productQuantityInput);
    // Remonte dans l'arbre pour sélectionner tr
    const tr = counter.parentNode.parentNode;
    console.log(tr);
    const productIdentifier = tr.dataset.productIdentifier;
    let count = productQuantityInput.innerHTML;
    count++;

    productQuantityInput.innerHTML = count;
    // Récupère et ajoute les données dans le local storage
    const panier = getPanier();
    // Incrémente la quantité de lémément ciblé
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
    // // Récupère le td contenant le sous-total
    // const tdSubTotal = document.getElementsByClassName("sm-center subTotal")[0];
    // console.log(tdSubTotal);
    // tdSubTotal.innerText = totalPrice + " €";
    // // Récupère le td contenant le total
    // const total = document.getElementsByClassName("sm-center total")[0];
    // console.log(total);
    // total.innerText = totalPrice + "€";
  });
}

// function generateSubTotal(data) {
//   const subTotalLign = td.getElementsByClassName('subTotal');
//   console.log(subTotal);
// }
// generateTable();



// Récupération du body et du tbody
let body = document.getElementsByTagName("body");
let tableBody = document.querySelector("tbody");

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

// Génère le tableau contenant les articles sélectionnés
function generateTable(data) {
  // Création des éléments du tableau
  //data.forEach(function(product)
  for (const productIdentifier in data) {
    const product = data[productIdentifier];
    console.log(product);
    // Crée une ligne contentant les informations de l'ourson
    let tr = document.createElement("tr");
    tr.dataset.productIdentifier = productIdentifier;
    tr.innerHTML = `
    <td>
        <a href="products.html">
          <img
              id="${product._id}"
              src="${product.image}"
              width="120"
              height="100"
              alt="Votre produit" 
          />
        </a>
    </td>
    <td class="responsive-thumbnails">
        ${product.title}
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
    <td class="responsive-thumbnails">${product.price}</td>`;
    console.log(product);
    tableBody.appendChild(tr);
  }
}
generateTable(getPanier());

const decrement = document.getElementsByClassName("minus");
console.log(decrement);
const increment = document.getElementsByClassName("plus");
console.log(increment);
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
  });
}

for (let element of increment) {
  element.addEventListener("click", (e) => {
    const button = e.target;
    const counter = button.parentNode.parentNode;
    const productQuantityInput = counter.getElementsByClassName(
      "product-quantity-input"
    )[0];
    // Remonte dans l'arbre pour sélectionner tr
    const tr = counter.parentNode.parentNode;
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
  });
}


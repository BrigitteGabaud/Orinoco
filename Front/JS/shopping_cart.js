// Récupère et ajoute les données dans le local storage
let dataLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(dataLocalStorage);


// Récupération du body et du tbody
let body = document.getElementsByTagName("body");
let tableBody = document.querySelector("tbody");

// Génère le tableau contenant les articles sélectionnés
function generateTable(data) {
 
  // Création des éléments du tableau
  data.forEach(function(product) {
    // Crée une ligne contentant les informations de l'ourson
   const tr = document.createElement("tr");
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
    <td class="responsive-thumbnails">1</td>
    <td class="responsive-thumbnails">En stock</td>
    <td class="responsive-thumbnails">${product.price}</td>`;
    tableBody.appendChild(tr);
  })
  
}
generateTable(dataLocalStorage) price.appendChild(deleteBtn)
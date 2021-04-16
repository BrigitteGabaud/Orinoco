// Appelle la fonction récupérant tous les teddies
const getTeddies = getAllTeddies();

// Récupère le container dans le Html
const container = document.querySelector("ul.container");

// Génère l'élément de la liste contenant les informations de chaque teddy
function renderTeddies() {
  response.forEach(function (teddy) {
   
    const teddyX = document.createElement("li");
    teddyX.classList.add("section");
    teddyX.id = "teddy" + `${teddy._id}`;
    teddyX.innerHTML = `
          <article class="row">
            <div class="col-md-6">
              <a href="products.html?id=${teddy._id}">
                <img
                  src=${teddy.imageUrl}  alt=${teddy.imageUrl}
                  class="img-fluid" />
              </a>
            </div>
            <div class="col-md-6 text-center text-md-left">
              <a href="products.html?id=${teddy._id}">
                  <h3 class="title">${teddy.name}</h3>
              </a>
              <p>${teddy.description}</p>
              <h4 class="price">${(teddy.price) / 100} €</h4>
              <a href="products.html?id=${teddy._id}" class="btn btn-block"
                >Plus d'informations</a>
            </div>
          </article>`;
    container.appendChild(teddyX);
  });
}




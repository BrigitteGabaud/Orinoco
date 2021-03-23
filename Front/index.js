function takeTeddy() {
  const teddies = [
    {
      _id: 1,
      title: `Lucien l'ours tout doux`,
      description: `Agréable au toucher, 45 cm`,
      price: `26,90 €`,
      image: `"../images/teddy_1.jpg"`,
    },
    {
      _id: 2,
      title: `Marguerite l'oursonne joyeuse`,
      description: `Dès la naissance, 30cm`,
      price: `23,50 €`,
      image: `"../images/teddy_2.jpg"`,
    },
    {
      _id: 3,
      title: `Clémence l'oursonne et son bébé Zoé`,
      description: `Agréable au toucher, 45 cm`,
      price: `39,90 €`,
      image: `"../images/teddy_3.jpg"`,
    },
    {
      _id: 4,
      title: `Harry l'ourson câlin`,
      description: `Idéale pour jouer, 50 cm`,
      price: `26,90 €`,
      image: `"../images/teddy_4.jpg"`,
    },
    {
      _id: 5,
      title: `Shy l'ourson timide`,
      description: `Parfait pour réconforter ! , 25 cm`,
      price: `24,50 €`,
      image: `"../images/teddy_5.jpg"`,
    },
  ];

  const container = document.querySelector("ul.container");
  console.log(container);

  // Génère l'élément de la liste contenant les informations de chaque teddy
  teddies.forEach(function (teddy) {
    const teddyX = document.createElement("li");
    teddyX.classList.add("section");
    teddyX.id = "teddy" + teddy._id;
    teddyX.innerHTML = `
          <article class="row">
            <div class="col-md-6">
              <a href="products.html?id=${teddy._id}">
                <img
                  src=${teddy.image}  alt="Lucien l'ours tout doux"
                  class="img-fluid" />
              </a>
            </div>
            <div class="col-md-6 text-center text-md-left">
              <a href="products.html?id=${teddy._id}">
                  <h3 class="title">${teddy.title}</h3>
              </a>
              <p>${teddy.description}</p>
              <h4 class="price">${teddy.price}</h4>
              <a href="products.html?id=${teddy._id}" class="btn btn-block"
                >Plus d'informations</a>
            </div>
          </article>`;
    container.appendChild(teddyX);
  });
}

takeTeddy();


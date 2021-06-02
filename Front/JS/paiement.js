const form = document.querySelector('#paiement');

// ***** CONTROLE NOM ******
//Ecoute la modification du nom
form.lastName.addEventListener('input', function() {
  validLastName(this);
});

const validLastName = function(inputLastName){
  
  // Création Regexp pour validation nom
  let lastNameRegexp = new RegExp(/^[a-zA-Z]{3,20}\s*[a-zA-Z]{2,20}$/, "g");
  // Test de la regexp
  let testLastName = lastNameRegexp.test(inputLastName.value);
  let br = inputLastName.nextElementSibling;
  let small = br.nextElementSibling;

  if (testLastName) {
    small.innerHTML = "Nom valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Nom non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
}


// ***** CONTROLE PRENOM ******
//Ecoute la modification du prenom
form.firstName.addEventListener('input', function() {
  validFirstName(this);
});

const validFirstName = function (inputFirstName) {

  // Création Regexp pour validation prenom
  let firstNameRegexp = new RegExp(/^[a-zA-Z]{3,20}\s*[a-zA-Z]{2,20}$/, "g");
  // Test de la regexp
  let testFirstName = firstNameRegexp.test(inputFirstName.value);
  let br = inputFirstName.nextElementSibling;
  let small = br.nextElementSibling;

  if (testFirstName) {
    small.innerHTML = "Prénom valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Prénom non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// ***** CONTROLE EMAIL ******
// Ecoute la modification de l'email
form.email.addEventListener('input', function() {
    validEmail(this);
});

const validEmail = function(inputEmail){
  
    // Création Regexp pour validation email
    let emailRegexp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.][a-z]{2,10}$', 'g');
    // Test de la regexp
    let testEmail = emailRegexp.test(inputEmail.value);
    let br = inputEmail.nextElementSibling;
    let small = br.nextElementSibling;

    if(testEmail) {
        small.innerHTML = "Adresse email valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        return true;
    } else {
        small.innerHTML = "Adresse mail non valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        return false;
    }
}

// ***** CONTROLE CODE POSTAL ******
// Ecoute la modification du code postal
form.postalCode.addEventListener('input', function() {
    validPostalCode(this);
});

const validPostalCode = function (inputPostalCode) {
  // Création Regexp pour validation code postal
  let postalCodeRegexp = new RegExp(/[0-9]{5}/g);
  // Test de la regexp
  let testPostalCode = postalCodeRegexp.test(inputPostalCode.value);
  let br = inputPostalCode.nextElementSibling;
  let small = br.nextElementSibling;
  // Si testCodePostal = true
  if (testPostalCode) {
    small.innerHTML = "Code postal valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Code postal non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// ***** CONTROLE VILLE ******
// Ecoute la modification de la ville
form.city.addEventListener('input', function() {
    validCity(this);
});

const validCity = function (inputCity) {
  // Création Regexp pour validation ville
  let cityRegexp = new RegExp(/^[a-zA-Z]{3,20}$/,'g');
  // Test de la regexp
  let testCity = cityRegexp.test(inputCity.value);
  let br = inputCity.nextElementSibling;
  let small = br.nextElementSibling;
  // Si testCity = true
  if (testCity) {
    small.innerHTML = "Nom de ville valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Nom de ville non valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// Ecoute la soumission du formulaire
form.addEventListener('submit', function(e) {
  e.preventDefault();
    if (
      validLastName(form.lastName) &&
      validFirstName(form.firstName) &&
      validEmail(form.email) &&
      validPostalCode(form.postalCode) &&
      validCity(form.city)
    ) {
      form.submit;
    } 
});

// ************* GESTION DES DONNEES FORMULAIRE ************ //

// Récupération du bouton validation de commande
let getSubmitButton = document.querySelector(" #validation-button");

// Ecoute de l'envoi du formulaire
getSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();

  // Récupère les valeurs du formulaire
  const contact = {
    lastName: document.getElementById("lastName").value,
    firstName: document.getElementById("firstName").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,

    city: document.getElementById("city").value,
  };

  // Met les valeurs du contact dans le local storage
  localStorage.setItem("contact", JSON.stringify(contact));

  // Créé un tableau vide
  let products = [];

  // Récupère l'Id des produits présents dans le local storage
  function getProductsIdInLocalStorage() {
    // Récupère le contenu du panier présent dans le local storage
    let panier = getPanier();

    for (let element in panier) {
      // Récupère l'id de chaque ourson dans le panier
      const getProductsId = panier[element]._id;
      // Pousse l'id dans le tableau
      products.push(getProductsId);
    }
  }
  getProductsIdInLocalStorage();

  // Met les valeurs du formulaire et du panier dans un objet à envoyer vers le serveur
  const toSend = {
    products,
    contact,
  };

  

  // Envoi l'objet toSend vers le serveur
  const url = "http://localhost:3000/api/teddies/order";

  const serverExchange = fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // Convertit l'objet javascript en chaîne json
    body: JSON.stringify(toSend),
  });

  let orderId

  serverExchange
    // Convertit l'objet JSON en objet javascript
    .then((responseBeforeParse) => responseBeforeParse.json())
    .then((responseAfterParse) => {
      // Récupère l'orderId retourné par le serveur
      orderId = responseAfterParse.orderId,
      // Envoie L'orderId dans le local Storage
      localStorage.setItem("orderId",JSON.stringify(orderId));
    }).then(
    // Dirige vers la page du panier
      (window.location.href = "../Html/confirmation_order.html")
    )
    // Affiche un message si erreur
    .catch((err) => console.log("Erreur " + err));
});

// ---------- Conserve le contenu du local storage dans les champs du formulaire ------ //

// Prend la key dans le local storage et la met dans une variable
const dataLocalStorage =localStorage.getItem("contact");

// Convertit la chaine de caractères en objet javascript OU crée un objet vide
const dataLocalStorageObject = JSON.parse(dataLocalStorage) || {};

// Met les values du local storage dans les champs du form Ou crée une chaine de caractères vide
function setLocalStorageDataInInputs(input) {
  document.querySelector(`#${input}`).value = dataLocalStorageObject[input] || "";
};

setLocalStorageDataInInputs("firstName");
setLocalStorageDataInInputs("lastName");
setLocalStorageDataInInputs("email");
setLocalStorageDataInInputs("address");
setLocalStorageDataInInputs("postalCode");
setLocalStorageDataInInputs("city");





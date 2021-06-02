// *** Récupère la key contact dans le local Storage et la convertit en objet js *** //
function getContact() {
    return JSON.parse(localStorage.getItem("contact"));
}
getContact();

// *** Récupère la key orderId dans le local Storage et la converti en objet js *** //
function getOrderId() {
  // S'il n'y a pas de orderId dans le local storage: crée une nouvelle erreur
  if (localStorage.getItem("orderId") == undefined) {
    throw new Error("Une erreur est survenue");
  } return JSON.parse(localStorage.getItem("orderId"));
}
try {
  let contact = getContact();
  let orderId = getOrderId();
} catch (error) {
  let confirmMessage = document.getElementById("confirm-message");
  confirmMessage.innerHTML = error;
}

// Crée un tableau vide pour accueillir les sous-totaux
let eachSubTotal = [];

// *** Génère le sous-total et total en fonction du panier *** //
function generateSubTotal() {
  let panier = getPanier();

  for (let element in panier) {
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

  }
}
generateSubTotal(getPanier());

// *** Génère dynamiquement le message de confirmation de commande *** //
function confirmationOrderMessage() {
    let confirmMessage = document.getElementById("confirm-message");
    confirmMessage.innerHTML = `
    <p id="confirm-paragraph">
        Merci ${contact.firstName} ${contact.lastName}, votre commande <strong> n° ${orderId} </strong> <br/> d'un montant de <strong> ${eachSubTotal} € </strong> a
        été passée avec succès !<br/> <br/>
        Vous recevrez un mail de confirmation dans quelques instants.
    </p> `;
}
confirmationOrderMessage();
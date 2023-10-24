//https://www.npmjs.com/
window.onload = function () {
    const mainContainer = document.getElementsByClassName('main-payment')[0];
    const userInfoContainer = document.getElementById('user-info');
    const productList = document.getElementById('product-list');
  const totalElement = document.getElementById('total');
  const subtotalElement = document.getElementById('subtotal-amount');
  const deliveryElement = document.getElementById('delivery-amount');
  const cancelButton = document.getElementById('cancel-btn');

  console.log(getLSContent("total"));

    function setLSContent(lsContent, key = "products") {
        localStorage.setItem(key, JSON.stringify(lsContent));
      }
    
      function getLSContent(key = "products") {
        // get contents from local storage.
        // if nothing is there, create an empty array
        const lsContent = JSON.parse(localStorage.getItem(key)) || [];
        return lsContent;
      }
    
      function setSSContent(ssContent, key = "userInfo") {
        sessionStorage.setItem(key, JSON.stringify(ssContent));
      }
    
      function getSSContent(key = "userInfo") {
        const ssContent = JSON.parse(sessionStorage.getItem(key)) || [];
        return ssContent;
      }

    //Vérification de l'existence et non-nullité des produits, (sous-total, livraison, total), et infoUtil
    //Redirection vers panier si pas d'infos
    function checkInfo() {
    
        const lsProducts = getLSContent(); 
        const lsTotal = getLSContent("total");
        const userInfo = getSSContent();
        const productsExists = (lsProducts !== null) && (localStorage.getItem("products") != null);
        const totalExists = (lsTotal !== null) && (localStorage.getItem("total") != null);
        const userInfoExists = (userInfo !== null) && (sessionStorage.getItem("userInfo") != null);


        if (!productsExists || !totalExists || !userInfoExists) {
            //mainContainer.innerHTML = "Erreur. Retour au panier...";
            //mainContainer.classList.remove("main-payment");
            //mainContainer.classList.add("error-container");
            //alert("Erreur. Vous allez être redirigé vers le panier");
            //window.location.replace("./panier.html");
        } else if (productsExists && totalExists && userInfoExists) {
            displayUserInfo();
            displayProducts();
            //displayTotal();
            console.log("Informations validées", );
            return true;
        }

    }

    //Affichage des infos
    function displayProducts() {
      //productList
      const lsContent = getLSContent();
      let productsTextCode = "";
      lsContent.forEach((product, index) => {
        productsTextCode = `<li class="product-element" data-id=${product.id} data-category=${product.category}
        <div><img src="${product.image}" alt="${product.name}"></div>
        <div class="name-product">${product.name}</div>
        <div class="qt-product">${product.quantity}</div> 
        <div><span class="prices">${product.price}</span>€</div>        
        </li>
        
        `; 
        productList.innerHTML += productsTextCode;   
      }); 
    }

    function displayUserInfo() {
      //productList
      const ssContent = getSSContent();
      let infoTextCode = "";
        infoTextCode = `
        <p>Prénom : <span>${ssContent.prenom}</span></p>
        <p>Nom : <span>${ssContent.nom}</span></p>
        <p>Adresse : <span>${ssContent.adresse}</span></p>
        <p>Ville : <span>${ssContent.ville}</span></p>
        <p>Département : <span>${ssContent.departement}</span></p>
        <p>Téléphone : <span>${ssContent.telephone}</span></p>
        <p>Ville : <span>${ssContent.ville}</span></p>
        `; 
        userInfoContainer.innerHTML += infoTextCode;   
     
    }



    function updateCartTotal() {
      // var productRows = document.getElementsByClassName('products');
      // var priceElements = document.getElementsByClassName('prices');
      // var quantityElements = document.getElementsByClassName('qt-product');
      // var totalElement = document.getElementById("total");
      const orderContainer = document.querySelector('.order-container');
      const lsContent = getLSContent('total');
      if (localStorage.getItem("total") != null) {
      deliveryElement.textContent = lsContent.delivery+'€';
      subtotalElement.textContent = lsContent.subtotal+'€';
      totalElement.textContent = lsContent.total+'€';
      }

  
    }
  
    function formatPrice(priceElement) { //prend un node en paramètre
      let formattedPrice = parseFloat(priceElement.innerText.replace('€', ''));
      formattedPrice = parseFloat(priceElement.innerText.replace(',', '.'));
      return formattedPrice.toFixed(2);   //retourne un string qui est un nombre à 2 dixièmes
    }
  



    //EVENEMENTS - ETC _________________________________________________________________________________________

    if (document.readyState != 'loading') {
        console.log("Loading");
        checkInfo();            //Contient displayProducts, displayUserInfo(), displayTotal (sub, livr, total)
        updateCartTotal();
        
      }

      cancelButton.addEventListener('click', function () {
        location.href = './panier.html';
      });

      

}

window.onload = function () {
    //Version locale
    let quantityElements = document.getElementsByClassName('card__quantity');
    let addOneQuantityButtons = document.getElementsByClassName('plus-btn');
    let minusOneQuantityButtons = document.getElementsByClassName('minus-btn');
    let cardElements = document.getElementsByClassName('card grid');
    let addToCartButtons = document.getElementsByClassName('card__btn');
    let productsContainer = document.getElementsByClassName('grid-catalogue grid')[0];
    let filtersBar = document.getElementById("filters-bar");
    const categoryFilters = document.querySelectorAll('.category-filters');
    const typeFilters = document.querySelectorAll('.type-filters');
    const minPriceFilter = document.getElementById('min-filter');
    const maxPriceFilter = document.getElementById('max-filter');
    const categoryContainer = document.getElementById('categoryContainer');
    const typeContainer = document.getElementById('typeContainer');

    //console.log("LSContent", getLSContent());

    //Ajouter/Retirer quantités  ------------> A SUPPRIMER POSSIBLEMENT
    [...cardElements].forEach(function (cardElement) {

        let minusButton = cardElement.getElementsByClassName('minus-btn')[0];

        let plusButton = cardElement.getElementsByClassName('plus-btn')[0];

        minusButton.addEventListener('click', removeOneQuantity);
        plusButton.addEventListener('click', addOneQuantity);
    });

    function setLSContent(lsContent) {
        localStorage.setItem("products", JSON.stringify(lsContent));
    }

    function getLSContent() {
        // get contents from local storage.
        // if nothing is there, create an empty array
        const lsContent = JSON.parse(localStorage.getItem("products")) || [];
        return lsContent;
    }


    function saveProduct(clickedBtn) {
        // save selected product in local storage 

        // vars
        //const productId = clickedBtn.getAttribute("data-id");
        const card = clickedBtn.parentElement.parentElement;
        const cardInfo = clickedBtn.parentElement;
        const productId = clickedBtn.getAttribute("data-id");
        const prodImage = card.querySelector("img").src;
        const prodName = cardInfo.querySelector("h3").textContent;
        const prodPrice = cardInfo.querySelector(".card__price").textContent;
        const prodQuantity = 1;

        let isProductInCart = false;

        // get local storage array
        const lsContent = getLSContent();

        // to avoid user adds the same course twice, check
        // the product is not in LS already before adding it
        lsContent.forEach(function (product) {
            if (product.id === productId) {
                alert("This course is already in your cart.");
                isProductInCart = true;
            }
        });

        // only if the product is not already in the cart,
        // create an object representing selected product info
        // and push it into local storage array
        if (!isProductInCart) {
            lsContent.push({
                id: productId,
                image: prodImage,
                name: prodName,
                price: prodPrice,
                quantity: prodQuantity
            });

            // add product into into local storage
            setLSContent(lsContent);

            console.log(lsContent);

        }
    }


    /** Inutile pour le moment  */

    function removeOneQuantity(event) {
        let buttonClicked = event.target;
        let quantityElement = buttonClicked.previousSibling;
        let quantity = parseInt(quantityElement.innerText);
        if (quantity == 0) {
            return false;
        }
        else {
            quantity -= 1;
            quantityElement.innerText = quantity;
        }
    }

    function addOneQuantity(event) {
        let buttonClicked = event.target;
        let quantityElement = buttonClicked.nextSibling;
        let quantity = parseInt(quantityElement.innerText);
        quantity += 1;
        quantityElement.innerText = quantity;

    }
    /*           ____________________________________________________               */
    /* Filtres */
    class Product {
        constructor(id, name, image, price, description, quantity = 1, category, type) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.price = price;
            this.description = description;
            this.quantity = quantity;
            this.category = category;
            this.type = type;
        }

        getQuantity() {
            return this.quantity;
        }

        setQuantity(quantity) {
            this.quantity = quantity;
        }
    }

    // Classe Produits 
    let products = [];

    for (let i = 0; i < cardElements.length; i++) {
        const cardElement = document.getElementsByClassName('card grid')[i];
        const cardInfo = cardElement.querySelector('.card__info');
        const cardButton = cardElement.querySelector('.add-to-cart');
        const productId = cardButton.getAttribute("data-id");
        const prodImage = cardElement.querySelector("img").src;
        const prodName = cardInfo.querySelector("h3").textContent;
        let prodQuantity = cardInfo.querySelector(".card__quantity").textContent;
        const prodDescription = cardInfo.querySelector(".card__text").textContent;
        const prodPrice = cardInfo.querySelector(".card__price").textContent;
        const prodCategory = cardInfo.querySelector(".add-to-cart").getAttribute("data-category");
        const prodType = cardInfo.querySelector(".add-to-cart").getAttribute("data-type");

        let product = new Product(productId, prodName, prodImage, prodPrice, prodDescription, prodQuantity, prodCategory, prodType);

        products.push(product);
    }


    //Utiliser les objets de l'array pour personnaliser la fonction saveProduct

    console.log(products);

    //filtersBar.addEventListener('click', filterResults);
    //filtersBar.products = products;
    categoryContainer.products = products;
    typeContainer.products = products;
    minPriceFilter.products = products;
    maxPriceFilter.products = products;

    // Ajoutez des écouteurs d'événements aux filtres
    categoryContainer.addEventListener('change', filterProducts);

    typeContainer.addEventListener('change', filterProducts);

    minPriceFilter.addEventListener('input', filterProducts);
    maxPriceFilter.addEventListener('input', filterProducts);


    function getCategory() {
            const currentUrl = window.location.href;
        //     const grainsFilter = document.getElementById('grains-filter');
        //     const mouluFilter = document.getElementById('moulu-filter');
        //     const capsulesFilter = document.getElementById('capsules-filter');
        //     const dosettesFilter = document.getElementById('dosettes-filter');



        //     const tousFilter = document.getElementById('tous-filter');

        //     tousFilter.removeAttribute("checked");
        //     tousFilter.checked = false;

        //     console.log(currentUrl);
        //     switch (currentUrl) {
        //       case currentUrl.includes('grains'):
        //         if(grainsFilter.getAttribute("checked") == null) {
        //             tousFilter.checked = false;
        //             grainsFilter.setAttribute("checked", "true");
        //             grainsFilter.checked = true;
        //         }



        //         break;
        //       case currentUrl.includes('moulu'):
        //         tousFilter.checked = false;
        //         mouluFilter.setAttribute("checked", "true");
        //         mouluFilter.checked = true;

        //         break;
        //       case currentUrl.includes('capsules'):
        //         tousFilter.checked = false;
        //         capsulesFilter.setAttribute("checked", "true");
        //         capsulesFilter.checked = true;

        //         break;
        //       case currentUrl.includes('dosettes'):
        //         tousFilter.checked = false;
        //         dosettesFilter.setAttribute("checked", "true");
        //         dosettesFilter.checked = true;


        //         break;
        //         // default: 

        //         // tousFilter.setAttribute("checked", "true");
        //         // tousFilter.checked = true;

        //     }
        //     return console.log(currentUrl.includes('grains'), grainsFilter, grainsFilter.checked);

       
       
        let selectedCategory;
                
        if(currentUrl.includes('grains')) {
            selectedCategory = "Café en grains";  
        }
        else if (currentUrl.includes('moulu')) {
            selectedCategory = "Café moulu";  

        }
        else if (currentUrl.includes('capsules')) {
            selectedCategory = "Café en capsules";  

        }
        else if (currentUrl.includes('dosettes')) {
            selectedCategory = "Café en dosettes";  
  
        }
        else { 
            selectedCategory = "Tous";  

         }

         products.forEach((product) => {
            let cardElement;
            Array.from(cardElements).forEach((element, index) => {
                let cardTitle = element.querySelector(".card__title").textContent;
                if (cardTitle === product.name) {
                    cardElement = element;
                }
            });    


            const category = product.category;


            const categoryMatch = selectedCategory.includes(category) || selectedCategory.includes('Tous') || selectedCategory === undefined;

            if (categoryMatch) {
                cardElement.style.display = 'grid';
            } else {
                cardElement.style.display = 'none';
            }   

        });

    }





    function filterProducts(e) {
        const categoryFilters = document.querySelectorAll('.category-filters');
        const typeFilters = document.querySelectorAll('.type-filters');
        let selectedCategory;
        let selectedType;

        categoryFilters.forEach((filter) => {
            if (filter.checked) {
                selectedCategory = filter;
                selectedCategory = selectedCategory.getAttribute('title');
            }
        });


        typeFilters.forEach((filter) => {
            if (filter.checked) {
                selectedType = filter;
                selectedType = selectedType.getAttribute('title');
            }
        });


        //const selectedCategory = Array.from(categoryFilters)
        //.filter((filter) => filter.checked)
        //.map((filter) => filter.getAttribute('data-category'));
        //const selectedType = Array.from(typeFilters)
        //.filter((filter) => filter.checked)
        // .map((filter) => filter.getAttribute('data-type'));
        const minPrice = parseFloat(minPriceFilter.value);
        const maxPrice = parseFloat(maxPriceFilter.value);
        console.log("Selected filters : ", selectedCategory, selectedType, minPrice, maxPrice);

        products.forEach((product) => {
            let cardElement;
            Array.from(cardElements).forEach((element, index) => {
                let cardTitle = element.querySelector(".card__title").textContent;
                if (cardTitle === product.name) {
                    cardElement = element;
                }
            });
            //console.log("cardElement : ", cardElement);

            /*const category = product.querySelector('.card__btn').getAttribute('data-category');
            const type = product.querySelector('.card__btn').getAttribute('data-type');
            const price = parseFloat(product.querySelector('.card__price').textContent);*/
            const category = product.category;
            const type = product.type;
            const price = product.price;
            //console.log("Produit x : ", product, selectedCategory);

            const categoryMatch = selectedCategory.includes(category) || selectedCategory.includes('Tous') || selectedCategory === undefined;
            const typeMatch = selectedType.includes(type) || selectedType.includes('Tous') || selectedType === undefined;
            const priceMatch = price >= minPrice && price <= maxPrice;

            if (categoryMatch && typeMatch && priceMatch) {
                cardElement.style.display = 'grid';
            } else {
                cardElement.style.display = 'none';
            }
        });
    }



    //----------------------------------------------------------------------  

    /* Evenements et liaisons */
    // Save product in cart and Local Storage
    // when add to cart button is clicked

    if (document.readyState !== 'loading') {

        if (location.href.includes('grains') || location.href.includes('moulu') || location.href.includes('capsules') || location.href.includes('dosettes')) {
            getCategory();
        }

    }

    productsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart")) {
            e.preventDefault();
            const clickedBtn = e.target;
            saveProduct(clickedBtn);
        }
    });

}
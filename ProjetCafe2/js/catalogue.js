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


        const lsContent = getLSContent();


        // Vérifie si le produit est deja dans le panier
        lsContent.forEach(function (product) {
            if (product.id === productId) {
                alert("Ce produit est déjà dans votre panier.");
                isProductInCart = true;
            }
        });


        if (!isProductInCart) {
            lsContent.push({
                id: productId,
                image: prodImage,
                name: prodName,
                price: prodPrice,
                quantity: prodQuantity
            });

            setLSContent(lsContent);

            console.log(lsContent);

        }
    }



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

    console.log(products);

    categoryContainer.products = products;
    typeContainer.products = products;
    minPriceFilter.products = products;
    maxPriceFilter.products = products;

    // Ajout des écouteurs d'événements aux filtres
    categoryContainer.addEventListener('change', filterProducts);

    typeContainer.addEventListener('change', filterProducts);

    minPriceFilter.addEventListener('input', filterProducts);
    maxPriceFilter.addEventListener('input', filterProducts);


    function getCategory() {
        const currentUrl = window.location.href;
        let selectedCategory;
        if (currentUrl.includes('grains')) {
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
            console.log("Categ inclue tous");
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

            /*const category = product.querySelector('.card__btn').getAttribute('data-category');
            const type = product.querySelector('.card__btn').getAttribute('data-type');
            const price = parseFloat(product.querySelector('.card__price').textContent);*/
            const category = product.category;
            const type = product.type;
            const price = product.price;

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

    /* Evenements et autres */

    if (document.readyState !== 'loading') {
        getCategory();
    }

    productsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart")) {
            e.preventDefault();
            const clickedBtn = e.target;
            saveProduct(clickedBtn);
        }
    });

}

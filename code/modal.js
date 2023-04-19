

export function showModalProduct(product = "", productList = []) {
    document.querySelector(".modal-image-main-container").innerHTML = ""
    document.querySelector(".modal-product-name").innerHTML = ""
    document.querySelector(".color-wrapper").innerHTML = ""
    document.querySelector(".size-wrapper").innerHTML = ""
    document.querySelector(".modal-image-secondary").innerHTML = ""
    //знаходимо обраний товар
    let productId = product.dataset.id;
    

    const findProduct = productList.find((obj) => {
        return obj.id == productId
    });
    //знаходими необхідні параметри
    let { srcMain,srcSecondary, productName, lowPrice, productColors, productSizes } =
			getProductOptions(findProduct);
    
    // вивід параметрів в модалку
    document.querySelector(".modal-image-main-container").insertAdjacentHTML("beforeend", `
        <img src="${srcMain}" alt="img">
    `);

    document.querySelector(".modal-product-name").insertAdjacentHTML("beforeend", `
        ${productName} <span>ITEM # ${productId.slice(0, 5)}</span>
    `);

    document.querySelector(".low-price").textContent = `${lowPrice}`

    productColors.forEach((color) => {
        let data = `<div style ="background-color:#${color}"></div>`
        document.querySelector(".color-wrapper").insertAdjacentHTML("beforeend", data)
    });
    
    productSizes.forEach((size) => {
        let data = `<div>${size}</div>`
        document.querySelector(".size-wrapper").insertAdjacentHTML("beforeend", data)
    });

    srcSecondary.forEach((src) => {
        let data = `<div><img src="${src}" alt="img"></div>`
        document.querySelector(".modal-image-secondary").insertAdjacentHTML("beforeend", data)
    });
}

function getProductOptions(object) {
    const imgMain = `${object.availableOptions[0].optionImages[0]}`,
        productName = `${object.productName}`,
        lowPrice = `$${object.availableOptions[0].prices[0].price}`,
        productColorsArr = [],
        productSizesArr = [],
        imgSecondaryArr = [];
    
    
    object.availableOptions.forEach((options) => {
		if (!productColorsArr.includes(options.optionColorCode)) {
			productColorsArr.push(options.optionColorCode);
		}
	});

	object.availableOptions.forEach((options) => {
		options.prices.forEach((sizeEl) => {
			if (!productSizesArr.includes(sizeEl.size)) {
				productSizesArr.push(sizeEl.size);
			}
		});
    });
    
    object.availableOptions.forEach((options) => {
		options.optionImages.forEach((src) => {
			if (imgMain !== src & imgSecondaryArr.length < 2) {
				imgSecondaryArr.push(src);
			}
		});
    });

	return {
        srcMain: imgMain,
        srcSecondary: imgSecondaryArr,
        productName: productName,
        lowPrice: lowPrice,
		productColors: productColorsArr,
        productSizes: productSizesArr,
	};
}



/* <section class="modal hide">
        <div class="modal-product-about">
            <div class="close-modal">&#x2715</div>
            <div class="modal-image-main">
                <div><img src="/img/market/image 50.png" alt="img"></div>
            </div>
            <div class="modal-product-description">
                <div class="modal-product-tiitle">
                    <div class="modal-product-name">
                        Sportif's Original Short <span>ITEM # 670170</span> 
                    </div>
                    <div class="modal-product-stars">
                        <img src="/img/market/stars.png" alt="img">
                        <span>93 REVIEWS</span> 
                    </div>
                </div>
                <div class="modal-product-data">
                    <div class="modal-product-price">
                        As low as<br>
                        <span>$67.00</span>
                    </div>
                    <div class="modal-product-colors">
                        <div>COLOR:</div>
                        <div class="color-wrapper">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div class="modal-product-sizes">
                        <span>SIZE:</span>
                        <div class="size-wrapper">
                            <div>32</div>
                            <div>34</div>
                            <div>36</div>
                            <div>38</div>
                            <div>40</div>
                        </div>
                    </div>
                </div>
                <div class="modal-product-buttons">
                    <button class="add-to-bag">
                        <img src="/img/market/bags.svg" alt="bags">
                        <div>ADD TO BAG</div>
                    </button>
                    <button class="add-to-wishlist">
                        <img src="/img/market/heart.png" alt="bags">
                        <div>ADD TO WISHLIST</div>
                    </button>
                </div>
                <div class="modal-product-social">
                    <img src="/img/market/facebook 1.png" alt="face">
                    <img src="/img/market/twitter 1.png" alt="twitt">
                    <img src="/img/market/pinterest 1.png" alt="pint">
                    <img src="/img/market/link 1.png" alt="link">
                </div>
            </div>
            <div class="modal-image-secondary">
                <div><img src="/img/market/image 48.png" alt="img"></div>
                <div><img src="/img/market/image 49.png" alt="img"></div>
            </div>
            <div class="modal-shipping">
                <div><img src="/img/SVG/shopping.svg" alt=""></div>
            </div>
        </div>
    </section> */
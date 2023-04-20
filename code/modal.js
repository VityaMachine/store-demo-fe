

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
        let data = `<div data-optionId="${color.id}" style ="background-color:#${color.code}"></div>`
        document.querySelector(".color-wrapper").insertAdjacentHTML("beforeend", data)
    });
    
    productSizes.forEach((size) => {
        let data = `<div data-priceId="${size.priceId}">${size.size}</div>`
        document.querySelector(".size-wrapper").insertAdjacentHTML("beforeend", data)
    });

    srcSecondary.forEach((src) => {
        let data = `<div><img src="${src}" alt="img"></div>`
        document.querySelector(".modal-image-secondary").insertAdjacentHTML("beforeend", data)
    });

    document.querySelector(".add-to-bag").dataset.productId = productId
}

function getProductOptions(object) {
    
    const modalObj = {
        srcMain: object.availableOptions[0].optionImages[0],
        srcSecondary: [],
        productName: object.productName,
        lowPrice: object.availableOptions[0].prices[0].price,
        productColors: [],
        productSizes: []
    }
    
    object.availableOptions.forEach((options) => {
        modalObj.productColors.push({code:options.optionColorCode, id:options.option_id})

        options.prices.forEach((obj) => {
            if (!modalObj.productSizes.find(el => el.size === obj.size)) {
                modalObj.productSizes.push({size:obj.size, priceId:obj.price_id})
            }
        });
        
        options.optionImages.forEach((src) => {
            if (modalObj.srcMain !== src & modalObj.srcSecondary.length < 2) {
                modalObj.srcSecondary.push(src);
            }
        });
    });
    
    return modalObj
}


	



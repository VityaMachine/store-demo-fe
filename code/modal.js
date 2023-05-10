

export function showModalProduct(productId = "", productList = []) {
    document.querySelector(".modal-image-main-container").innerHTML = ""
    document.querySelector(".modal-product-name").innerHTML = ""
    document.querySelector(".color-wrapper").innerHTML = ""
    document.querySelector(".size-wrapper").innerHTML = ""
    document.querySelector(".modal-image-secondary").innerHTML = ""
    //знаходимо обраний товар
 
    const findProduct = productList.find((obj) => {
        return obj.id == productId
    });
    //знаходими необхідні параметри
    let { srcMain,srcSecondary, productName, lowPrice, productColors, productSizes, productOptions } =
			getProductOptions(findProduct);
    
    // вивід головної картинки
    document.querySelector(".modal-image-main-container").insertAdjacentHTML("beforeend", `
        <img src="${srcMain}" alt="img">
    `);
    // вивід назви
    document.querySelector(".modal-product-name").insertAdjacentHTML("beforeend", `
        ${productName} <span>ITEM # ${productId.slice(0, 5)}</span>
    `);
    // вивід ціни
    document.querySelector(".low-price").textContent = `${lowPrice} ₴`
    // вивід всіх кольорів
    productColors.forEach((color) => {
        let data = `<div data-optionId="${color.optionId}" style ="background-color:#${color.code}"></div>`
        document.querySelector(".color-wrapper").insertAdjacentHTML("beforeend", data)
    });
    // вивід всіх розмірів
    sortSizes(productSizes).forEach((size) => {
        let data = `<div data-priceId="${size.priceId}" data-optionId="${size.optionId}">${size.size}</div>`
        document.querySelector(".size-wrapper").insertAdjacentHTML("beforeend", data)
    });
    // вивід додаткових картинок
    srcSecondary.forEach((src) => {
        let data = `<div><img src="${src}" alt="img"></div>`
        document.querySelector(".modal-image-secondary").insertAdjacentHTML("beforeend", data)
    });

    document.querySelector(".add-to-bag").dataset.productId = productId

    // перевірка наявних розмірів за кольором 
    document.querySelector(".color-wrapper").addEventListener("click", (e) => {
        let parameterOptionID = e.target.dataset.optionid
        if (!parameterOptionID) return
        
        document.querySelector(".size-wrapper").innerHTML = ""

        productOptions.forEach(({option_id,prices}) => {
            if (option_id === parameterOptionID) {
                sortSizes(prices).forEach(({price_id,size}) => {
                    let data = `<div data-priceId="${price_id}" data-optionId="${option_id}">${size}</div>`
                    document.querySelector(".size-wrapper").insertAdjacentHTML("beforeend", data) 
                })
            }
        })
    })
}

function getProductOptions(object) {
    
    const modalObj = {
        srcMain: object.availableOptions[0].optionImages[0],
        srcSecondary: [],
        productName: object.productName,
        lowPrice: object.availableOptions[0].prices[0].price,
        productColors: [],
        productSizes: [],
        productOptions: object.availableOptions
    }
    
    object.availableOptions.forEach((options) => {
        modalObj.productColors.push({code:options.optionColorCode, optionId:options.option_id})

        options.prices.forEach((obj) => {
            if (!modalObj.productSizes.find(el => el.size === obj.size)) {
                modalObj.productSizes.push({size:obj.size, priceId:obj.price_id, optionId:options.option_id})
            }
        });
        
        options.optionImages.forEach((src) => {
            if (modalObj.srcSecondary.length < 2) {
                modalObj.srcSecondary.push(src);
            }
        });
    });
    
    return modalObj
}

function sortSizes(arr) {
    arr.sort((a, b) => {
      const nameA = a.size.toUpperCase(); 
      const nameB = b.size.toUpperCase();
    
      if (nameA < nameB) {
        return -1; // Возвращаем отрицательное число, если a идет перед b
      }
      if (nameA > nameB) {
        return 1; // Возвращаем положительное число, если b идет перед a
      }
      return 0; // Возвращаем 0, если имена равны
    });

    return arr
}
	


/* if(e.target.parentElement.className === "size-wrapper") {
    document.querySelector(".color-wrapper").innerHTML = ""

    productOptions.forEach(({option_id,optionColorCode}) => {
        if (option_id === parameterOptionID) {
            let data = `<div data-optionId="${option_id}" style ="background-color:#${optionColorCode}"></div>`
            document.querySelector(".color-wrapper").insertAdjacentHTML("beforeend", data)
        }
    })
} */


// напиши код для сортировки массива состоящего из обьектов по алфавиту
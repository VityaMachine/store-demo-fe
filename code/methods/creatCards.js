import { randomInteger, ratingStars } from "./methods.js";

// Функція створення карток товарів головної сторінки.
export function creatProductCart(el) {
   /* Функція створення подвійних фото для зміни при наведені. */
    const img = ()=>{
        let src1 = el.availableOptions[0].optionImages[0]
        let src2 = el.availableOptions[0].optionImages[1] ? el.availableOptions[0].optionImages[1]: el.availableOptions[0].optionImages[0]
        return   `<img class="sale-products-card-img-1" src="${src2}" alt="${el.productName}"></img> <img class="sale-products-card-img-2" src="${src1}" alt="${el.productName}"></img>`
    }
    // !!!  Тимчасовий рейтинг товару рандомний, Після створення змінної на бекенді - підставити справжній ретинг замість- randomInteger(0, 5)!!!.
    let card = `
    <div class="sale-products-card" data-id='${el.id}'>
        <div class="sale-products-card-img">
        ${img()}
        </div>
        <div class="sale-products-card-name">${el.productName}</div>
        <div class="sale-products-card-stars">
            ${ratingStars(randomInteger(0, 5))}
        </div>
        <div class="sale-products-price">As low as <span> ${el.availableOptions[0].prices[0].price} ₴</span></div>
        <div class="add-to-cart">
        <img src="./img/SVG/bags.svg" alt="bags">
        <div>ADD TO CART</div>
        </div>
    </div>`;
    return card;
}

// Функція створення карток товарів сторінки каталог.
export function creatProductElement(product) {
    // визначаємо ID 
    const cardID = product.id;

    /* Функція створення подвійних фото для зміни при наведені. */
    const img = ()=>{
        let src1 = product.availableOptions[0].optionImages[0]
        let src2 = product.availableOptions[0].optionImages[1] ? product.availableOptions[0].optionImages[1]: product.availableOptions[0].optionImages[0]
        return   ` <img data-imgId="${cardID}" class="show-products-card-img-1" src="${src2}" alt="${product.productName}"></img> 
        <img data-imgId="${cardID}" class="show-products-card-img-2" src="${src1}" alt="${product.productName}"></img>`
    }

    // визначаємо кольори.
    const colors = `${product.availableOptions.map((el) => {
			return `<div data-productId="${cardID}" data-optionId="${el.option_id}" style ="background-color:#${el.optionColorCode}"></div>`;
		})}`.replace(/,/g, "");
	const cardContainer = document.createElement("div");
    cardContainer.classList.add("show-products-card");
    cardContainer.dataset.id = cardID;
    // !!!  Тимчасовий рейтинг товару рандомний, Після створення змінної на бекенді - підставити справжній ретинг замість- randomInteger(0, 5)!!!.
	const info = `
                    <div class="show-products-card-img">
                        ${img()}
                    </div>
                    <div class="show-products-card-name">${product.productName}</div>
                    <div class="sale-products-card-stars">
                        ${ratingStars(randomInteger(0, 5))}
                    </div>
                    <div class="show-products-price">As low as <span>${product.availableOptions[0].prices[0].price} ₴ </span></div>
                    <div class="show-products-color">${colors}</div>
                    <div data-id="${cardID}" class="add-to-cart">
                        <img src="/img/SVG/bags.svg" alt="bags">
                        <div>ADD TO CART</div>
                    </div>`
	cardContainer.insertAdjacentHTML("beforeend", info)
	return cardContainer;
}

// Функція створення карток товарів сторінки корзина.
export function creatCartProducts(el){
    const cardContainer = document.createElement("ul");
      cardContainer.classList.add("cart-product");
    const info = `<li class="cart-about-product">
        <div class="cart-product-img"><img src="${el.optionImages[0]}" alt="${el.productName}"></div>
        <div class="cart-product-description">
            <div class="cart-product-name">${el.productName}</div>
            <div class="cart-product-color-container">
                <span>Color:</span><div class="cart-product-color" style ="background-color:#${el.optionColorCode}"></div>
            </div>
            <div class="cart-product-size-container">
                <span>Size:</span><div class="cart-product-size">${el.size}</div>
            </div>
            <div class="cart-product-change">Change</div>
        </div>
    </li>
    <li class="cart-product-info">
    <div class="cart-product-price">${el.price} ₴ </div>

    <div class="card-products">
    <div class="counter-container ${el.quantity === 1 ? '' : 'expand'}" data-idCont="${el.id}">
        <div class="minus-icon icon" data-idMinus="${el.id}">➖</div>
        <div class="itemCount" data-idQuntity="${el.id}">${el.quantity}</div>
        <div class="plus-icon icon"  data-idPlus="${el.id}">➕</div>
    </div>
</div>

    <div class="cart-total-price"><span>${el.total_cost} ₴ </span> <span class="cart-product-remove" data-id="${el.id}"> &#x2715</span>
    </div>
    </li>`
    cardContainer.insertAdjacentHTML("beforeend", info)
    return cardContainer;
}

export function creatProductElement(product) {
    // визначаємо ID 
    const cardID = product.id;
    // визначаємо кольори
    const colors = `${product.availableOptions.map((el) => {
			return `<div data-id="${el.option_id}" style ="background-color:#${el.optionColorCode}"></div>`;
		})}`.replace(/,/g, "");
        
	const cardContainer = document.createElement("div");
    cardContainer.classList.add("show-products-card");
    cardContainer.dataset.id = cardID;

	const info = `
                    <div class="show-products-card-img">
                        <img src="${product.availableOptions[0].optionImages[0]}" alt="${product.productName}">
                    </div>
                    <div class="show-products-card-name">${product.productName}</div>
                    <div class="show-products-card-stars">
                        <img src="/img/market/stars.png" alt="stars">
                    </div>
                    <div class="show-products-price">As low as <b>${product.availableOptions[0].prices[0].price} UAH</b></div>
                    <div class="show-products-color">${colors}</div>
                    <div data-id="${cardID}" class="add-to-cart">
                        <img src="/img/market/bags.svg" alt="bags">
                        <div>ADD TO CART</div>
                    </div>`
	cardContainer.insertAdjacentHTML("beforeend", info)
	return cardContainer;
}

// Функція створення карток товарів сторінки корзина.
export function creatCartProducts(el){
    const cardContainer = document.createElement("tr");
      cardContainer.classList.add("cart-product");
    const info = `<td class="cart-about-product">
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
    </td>
    <td class="cart-product=price">${el.price} UAH</td>

    <td class="card-products">
    <div class="counter-container ${el.quantity === 1 ? '' : 'expand'}" data-idCont="${el.id}">
        <div class="minus-icon icon" data-idMinus="${el.id}">➖</div>
        <div class="itemCount" data-idQuntity="${el.id}">${el.quantity}</div>
        <div class="plus-icon icon"  data-idPlus="${el.id}">➕</div>
    </div>
</td>

    <td class="cart-total-price"><span>${el.total_cost} UAH</span> <span class="cart-product-remove" data-id="${el.id}"> &#x2715</span>
    </td>`
    cardContainer.insertAdjacentHTML("beforeend", info)
    return cardContainer;
  }












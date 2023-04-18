export function creatProductElement(product) {

	const cardContainer = document.createElement("div");
	cardContainer.classList.add("show-products-card");

	const info = `
                    <div class="show-products-card-img">
                        <img src="${product.availableOptions[0].optionImages[0]}" alt="${product.productName}">
                    </div>
                    <div class="show-products-card-name">${product.productName}</div>
                    <div class="show-products-card-stars">
                        <img src="/img/market/stars.png" alt="stars">
                    </div>
                    <div class="show-products-price">As low as <b>${product.availableOptions[0].prices[0].price} UAH</b></div>
                    <div class="show-products-color">
                    ${product.availableOptions.map((el) => {
		return `<div data-id="${el.option_id}" style ="background-color:#${el.optionColorCode}"></div>`

	})
		}
                    </div>
                    <div class="add-to-cart">
                        <img src="/img/market/bags.svg" alt="bags">
                        <div>ADD TO CART</div>
                    </div>`
	cardContainer.insertAdjacentHTML("beforeend", info)
	return cardContainer;
}












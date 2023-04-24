import { AJAX, FETCH } from "./request.js";
import { randomProduct } from "./methods/methods.js";
import {url} from "./index.js"

AJAX(url, "GET", show);


let dataMain = [];
function show(data) {
  if (Array.isArray(data)) {
    dataMain = data;
    showRandomProducts(randomProduct(dataMain, 4));
  } else {
    throw new Error("You get an error");
  }
}

const datalist = document.querySelector("#product-name");

const searchInput = document.getElementById("search-field");

searchInput.addEventListener("input", (event) => {
  datalist.innerHTML = ''
  const foundedItems = dataMain.filter( (el) => {
    return el.productName.toLowerCase().includes(event.target.value.toLowerCase())
  })
  
foundedItems.forEach((el) => {
  const option = document.createElement("option")
  option.value = el.productName;
  datalist.append(option);
})
});

function showRandomProducts(productsArr) {
	try {
		if (!Array.isArray(productsArr)) {
			console.warn("Отримано не масив");
			return;
		}

		productsArr.forEach((el) => {
			let card = `
        <div class="sale-products-card">
          <div class="sale-products-card-img">
            <img src="${el.availableOptions[0].optionImages[0]}" alt="${el.productName}">
          </div>
          <div class="sale-products-card-name">${el.productName}</div>
          <div class="sale-products-card-stars">
            <img src="./img/market/stars.png" alt="stars">
          </div>
          <div class="sale-products-price">As low as <b>UAH ${el.availableOptions[0].prices[0].price}</b></div>
          <div class="add-to-cart">
            <img src="./img/market/bags.svg" alt="bags">
            <div>ADD TO CART</div>
          </div>
        </div>`;
    
      document.querySelector(".sale-products").insertAdjacentHTML("beforeend", card);
		});
	} catch (e) {
		if (document.location.pathname === "/") {
			console.error(e)
		}
	}
}



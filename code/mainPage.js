import { AJAX, FETCH } from "./request.js";
import { randomProduct , baskCounter} from "./methods/methods.js";
import {url,urlAdd} from "./index.js";
import { showModalProduct } from "./modal.js";
import { modalListener } from "./methods/modalListener.js";
import{ searchEntipeStori } from "./methods/search-entipe_stori.js";
// import {url,urlAdd} from "./methods/url.js";
// import{dataMain} from "./data/data.js";

AJAX(url, "GET", show);

// Запит на сервер про вміст кошика.
FETCH(urlAdd, baskCounter);

let dataMain = [];
function show(data) {
  if (Array.isArray(data)) {
    dataMain = data;
    //Виклик функції слухач події в полі пошуку хедер.
    searchEntipeStori(data);
    showRandomProducts(randomProduct(dataMain, 4));
  } else {
    throw new Error("You get an error");
  }
}


function showRandomProducts(productsArr) {
	try {
		if (!Array.isArray(productsArr)) {
			console.warn("Отримано не масив");
			return;
		}

		productsArr.forEach((el) => {
			let card = `
        <div class="sale-products-card" data-id='${el.id}'>
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
      eventClickOpenModal(dataMain);
		});
	} catch (e) {
		if (document.location.pathname === "/") {
			console.error(e)
		}
	}
}

// модальне вікно.
function eventClickOpenModal(productList) {
  // відкрити модальне вікно
  document.querySelectorAll(".sale-products-card").forEach((el) => {
    el.addEventListener("click", (evt) => {
      if (evt.target.parentElement.classList == "add-to-cart") {
        document.querySelector(".modal").classList.remove("hide");
        showModalProduct(el, productList);
        modalListener();
      }
    });
  });

  // закрити модальне вікно
  try {
    document.querySelector(".close-modal").addEventListener("click", () => {
      // Очищення обє'кта після зачинення модалки.
      cleanProductAddBag()
      document.querySelector(".modal").classList.add("hide");
    });
  } catch (e) {
    if (document.location.pathname.includes("/catalog/")) {
      new Error(e);
    }
  }
}

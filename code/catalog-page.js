import { FETCH } from "./request.js";
import { url } from "./index.js";
import { creatProductElement } from "./creatCards.js";
import {  searchCetalogPage  } from "./search.js";
import { showModalProduct } from "./modal.js";;

import paginator from "./paginator.js";

const inputSearch = document.querySelector("[name='search-line']");

const productsContainer = document.querySelector(".products-to-show");
const [...pagesControls] = document.querySelector(".pages-list").children;

pagesControls.forEach((el) => {
  if (el.dataset.type) {
    el.addEventListener("click", pageNumHandler);
  }
});

window.addEventListener("load", () => {
  perPageHandler();
});

let productList = [];
let page_num = 1;
let per_page = 6;

function getProduct(data) {
  const resObj = paginator(data, page_num, per_page);

  pagesControls[1].innerText = page_num;

  if (resObj.page === 1 && resObj.total_pages > 1) {
    pagesControls[0].disabled = true;
    pagesControls[2].disabled = false;
  }

  if (resObj.page === resObj.total_pages) {
    pagesControls[2].disabled = true;
    pagesControls[0].disabled = false;
  }

  if (resObj.page !== 1 && resObj.page !== resObj.total_pages) {
    pagesControls[0].disabled = false;
    pagesControls[2].disabled = false;
  }

  productsContainer.innerHTML = "";

  resObj.data.forEach((element) => {
    productsContainer.append(creatProductElement(element));
  });

  showFilerColorSize(getColorsSizeProducts(data));

    productList = data;
    console.log(data);
    eventClickOpenModal(data)
}

const getColorsSizeProducts = (products = []) => {
    if(!Array.isArray(products)) return;
    const mainColorArr = [];
    const mainSizeArr = [];
          
    products.forEach((object)=>{
        object.availableOptions.forEach((colors)=>{
            if(!mainColorArr.includes(colors.optionColorCode)){
                mainColorArr.push(colors.optionColorCode)
            }
        })
    })

    products.forEach((object) => {
			object.availableOptions.forEach((option) => {
				option.prices.forEach((sizeEl) => {
					if (!mainSizeArr.includes(sizeEl.size)) {
						mainSizeArr.push(sizeEl.size);
					}
				});
			});
		});

    return {color: mainColorArr, size : mainSizeArr}
}

function showFilerColorSize (option) {
    const elColor = document.querySelector(".filter-parameters-color");
    const elSize = document.querySelector(".filter-parameters-size");

  elColor.innerHTML = "";
  elSize.innerHTML = "";

  option.color.forEach((color) => {
    const div = document.createElement("div");
    div.classList.add("color-parameter");
    div.style.backgroundColor = `#${color}`;
    elColor.append(div);
  });

    option.size.forEach((size)=>{
        const div = document.createElement("div");
        div.classList.add("size-parameter");
        div.innerText = size;
        elSize.append(div)
    }) 
}

inputSearch.addEventListener("input", (e) => {
    searchCetalogPage(e.target.value, productList)
})

// модальне вікно
function eventClickOpenModal(productList) {   
  // відкрити модальне вікно
	document.querySelectorAll(".show-products-card").forEach((el) => {
		el.addEventListener("click", (evt) => {
      if ((evt.target.parentElement.classList == "add-to-cart")) {
        document.querySelector(".modal").classList.remove("hide");
        showModalProduct(el, productList)
      }
		});
	});

	// закрити модальне вікно
	document.querySelector(".close-modal").addEventListener("click", () => {
	  document.querySelector(".modal").classList.add("hide");
	});
}

function pageNumHandler(e) {
  if (e.target.dataset.type === "prev") {
    page_num -= 1;
  }
  if (e.target.dataset.type === "next") {
    page_num += 1;
  }

  getProduct(productList);
}

function perPageHandler() {
  if (window.innerWidth <= 1150) {
    per_page = 6;
  } else {
    per_page = 8;
  }
}

FETCH(url, getProduct);

window.addEventListener("resize", (e) => {
  perPageHandler();
  getProduct(productList);
});

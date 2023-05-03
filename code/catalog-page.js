import { FETCH, postData } from "./request.js";
import { url, urlAdd } from "./index.js";
import { creatProductElement } from "./creatCards.js";
import { searchCetalogPage } from "./search.js";
import { showModalProduct } from "./modal.js";
import { baskCounter, creatUrl } from "./methods/methods.js";
import { colorsFilterHandler } from "./filters.js";
import paginator from "./paginator.js";
import{ modalListener, cleanProductAddBag } from "./methods/modalListener.js";
import{ searchEntipeStori } from "./methods/search-entipe_stori.js";


// Запит на сервер про вміст кошика.
FETCH(urlAdd, baskCounter);

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
let colorFilter;
let sizeFilter;

function getProduct(data) {
  let resObj;

  resObj = paginator(data, page_num, per_page);

  if (!colorFilter && !sizeFilter) {
    resObj = paginator(data, page_num, per_page);
  }

  if (colorFilter && !sizeFilter) {
    const filteredArr = colorsFilterHandler(data, colorFilter);

    resObj = paginator(filteredArr, page_num, per_page);
  }

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

  if (resObj.total_pages === 1) {
    pagesControls[0].disabled = true;
    pagesControls[2].disabled = true;
  }

  productsContainer.innerHTML = "";

  resObj.data.forEach((element) => {
    productsContainer.append(creatProductElement(element));
  });

  showFilerColorSize(getColorsSizeProducts(data), colorFilter);

  productList = data;

  //Виклик функції слухач події в полі пошуку хедер.
  searchEntipeStori(data);
  eventClickOpenModal(data);
}

const getColorsSizeProducts = (products = []) => {
  if (!Array.isArray(products)) return;
  const mainSizeArr = [];

  const colorsArr = products
    .map((el) => {
      return el.availableOptions.map((elem) => {
        return {
          colorCode: elem.optionColorCode,
          colorName: elem.optionColorName,
        };
      });
    })
    .flat();

  const mainColorArr = [
    ...new Map(colorsArr.map((item) => [item["colorName"], item])).values(),
  ];

  products.forEach((object) => {
    object.availableOptions.forEach((option) => {
      option.prices.forEach((sizeEl) => {
        if (!mainSizeArr.includes(sizeEl.size)) {
          mainSizeArr.push(sizeEl.size);
        }
      });
    });
  });

  return { color: mainColorArr, size: mainSizeArr };
};

function showFilerColorSize(option, selectedColor) {
  const elColor = document.querySelector(".filter-parameters-color");
  const elSize = document.querySelector(".filter-parameters-size");

  elColor.innerHTML = "";
  elSize.innerHTML = "";

  option.color.forEach((color) => {
    const div = document.createElement("div");
    div.classList.add("color-parameter");
    div.style.backgroundColor = `#${color.colorCode}`;
    div.dataset.colorname = color.colorName;

    if (selectedColor && selectedColor !== color.colorName) {
      div.classList.add("filter");
    }

    div.addEventListener("click", colorsFilterClickHandler);

    elColor.append(div);
  });

  option.size.forEach((size) => {
    const div = document.createElement("div");
    div.classList.add("size-parameter");
    div.innerText = size;
    elSize.append(div);
  });
}

inputSearch.addEventListener("input", (e) => {
  searchCetalogPage(e.target.value, productList);
});

// Слухач події додавання товару через інпут хедер.
const searchInput = document.getElementById("search-field");

const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click',()=>{
  if(searchInput.value !== ''){
    const foundedItem = productList.filter( (el) => {

      return el.productName.toLowerCase().includes(searchInput.value.toLowerCase())
      
    });
    if(foundedItem.length > 0){
      document.querySelector(".modal").classList.remove("hide");
      showModalProduct(foundedItem[0].id, productList);
      modalListener();
      searchInput.value = '';
    }
    else {
      searchInput.value = '';
      return
    }

  }

});

// модальне вікно
function eventClickOpenModal(productList) {
  // відкрити модальне вікно
  document.querySelectorAll(".show-products-card").forEach((el) => {
    el.addEventListener("click", (evt) => {
      if (evt.target.parentElement.classList == "add-to-cart") {
        document.querySelector(".modal").classList.remove("hide");
        showModalProduct(el.dataset.id, productList);
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

function colorsFilterClickHandler(e) {
  if (colorFilter !== e.target.dataset.colorname) {
    colorFilter = e.target.dataset.colorname;
  } else {
    colorFilter = undefined;
  }

  page_num = 1;

  getProduct(productList);
};


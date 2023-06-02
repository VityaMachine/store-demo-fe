import { FETCH } from "./methods/request.js";
import { url, urlAdd } from "./methods/url.js";
import { creatProductElement } from "./methods/creatCards.js";
import { searchCetalogPage } from "./methods/search.js";
import { showModalProduct } from "./methods/modal.js";
import { baskCounter, message, listenerScroll, listenerlegacyArrow, showHeader, bodyOverflowHid } from "./methods/methods.js";
import { colorsSizesFilterHandler, priceFilter, alphabeticalFilter } from "./methods/filters.js";
import paginator from "./methods/paginator.js";
import { modalListener, cleanProductAddBag } from "./methods/modalListener.js";
import { searchEntipeStori } from "./methods/search-entipe_stori.js";
import { clickEvents } from "./methods/click_events.js";
import { getColorsSizeBrandProducts, createHtmlEl, productCartPhotoChange } from "./methods/functions_catalog-page.js";
import {formFooterHandler} from "./methods/form_handler.js";


// Запит на сервер про вміст кошика.add-to-cart
FETCH(urlAdd, baskCounter);

// Запит на сервер щоб отримати список товарів для виводу на сторінку за замовчуванням.
FETCH(url, getProduct);

// Запит на сервер щоб отримати список товарів та зберігання у змінні для подальшої обробки.
FETCH(url, productsList);


const inputSearch = document.querySelector("[name='search-line']");

const productsContainer = document.querySelector(".products-to-show");
const [...pagesControls] = document.querySelector(".pages-list").children;

pagesControls.forEach((el) => {
  if (el.dataset.type) {
    el.addEventListener("click", pageNumHandler);
  }
});


pagesControls.forEach((el) => {
  if (el.dataset.type) {
    el.addEventListener("click", pageNumHandler);
  }
});

window.addEventListener("load", () => {
  perPageHandler();
});

//Змінна списку товарів.
let productList = [],

page_num = 1,
per_page = 6,
//Стан кнопок фільтрів за замовчуванням.
colorFilter = 'all',
sizeFilter = 'all',
brandName = 'all';


//Функція збереження отриманих данних з сервера.
function productsList(data) {
  productList = data;
}

//Функція виводу товарів на сторінку з урахуванням фільтрів та пагінації.
function getProduct(data) {
  let resObj;

  if (colorFilter === 'all' && sizeFilter === 'all' && brandName === 'all') {
    resObj = paginator(data, page_num, per_page);
    showFilerColorSizeBrand(getColorsSizeBrandProducts(data), colorFilter, sizeFilter,brandName);
  }
  else {
    const filteredArr = colorsSizesFilterHandler(data, colorFilter, sizeFilter,brandName);
    resObj = paginator(filteredArr, page_num, per_page);
    showFilerColorSizeBrand(getColorsSizeBrandProducts(data), colorFilter, sizeFilter,brandName);
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

  //Виклик функції слухач події в полі пошуку хедер.
  searchEntipeStori(data);
  eventClickOpenModal(data);
  
  //Виклик функції управління відображення кнопки в гору та хедера в мобільній версії.
  listenerScroll();

  //Виклик функції слухач клік кнопки в гору.
  listenerlegacyArrow ();
}

//Події кнопок макс мінім ціна.
document.querySelector('.filter-parameters-price')
  .addEventListener('click',(ev)=>{
 
    const [...btns] = document.querySelectorAll('.btn-filter-price')
    btns.forEach((el)=>{
      el.classList.add('filter')
    })
   
    if(ev.target.dataset.flag === 'min'){
      ev.target.classList.remove('filter')
      getProduct(priceFilter(productList))
    }
    else if(ev.target.dataset.flag === 'max'){
      ev.target.classList.remove('filter')
      getProduct(priceFilter(productList,false))
    }
    else return
  });

//Події кнопок сортування за абеткою.
document.querySelector('.filter-parameters-sorting')
  .addEventListener('click',(ev)=>{

    const [...btns] = document.querySelectorAll('.btn-filter-sorting')
    btns.forEach((el)=>{
      el.classList.add('filter')
    })

    if(ev.target.dataset.flag === 'a'){
      ev.target.classList.remove('filter')
      getProduct(alphabeticalFilter(productList))
    }
    else if(ev.target.dataset.flag === 'z'){
      ev.target.classList.remove('filter')
      getProduct(alphabeticalFilter(productList,false))
    }
    else return
  });

 //Функція скидання всіх фільтрів.
export function resetAllFilters(){
  colorFilter = 'all';
  sizeFilter = 'all';
  brandName = 'all';
}


//Події кнопки скидання усіх фільтрів.
document.querySelector('.reset-all-filters')
  .addEventListener('click',(ev)=>{
    const [...btnsPrice] = document.querySelectorAll('.btn-filter-price')
    btnsPrice.forEach((el)=>{
      el.classList.remove('filter')
    })

    const [...btnsSorting] = document.querySelectorAll('.btn-filter-sorting')
    btnsSorting.forEach((el)=>{
      el.classList.remove('filter')
    })

  if(ev.target.classList.value ==='reset-all-filters'){
       // Скидання всіх фільтрів.
      resetAllFilters()
    getProduct(productList)
  }
  else return;
  });

// Функція відображення секції фільтрів.
function showFilerColorSizeBrand(option, selectedColor, selectedSize, selectedBrand) {
  const elColor = document.querySelector(".filter-parameters-color");
  const elSize = document.querySelector(".filter-parameters-size");
  const elBrand = document.querySelector(".filter-parameters-brands");

  elColor.innerHTML = "";
  elSize.innerHTML = "";
  elBrand.innerHTML = "";

  option.color.forEach((color) => {
    const div = createHtmlEl("div","color-parameter")
    div.style.backgroundColor = `#${color.colorCode}`;
    div.dataset.colorname = color.colorName;

    if (selectedColor !== 'all' && selectedColor !== color.colorName) {
      div.classList.add("filter");
    }
    div.addEventListener("click", colorsFilterClickHandler);
    elColor.append(div);
  });

  option.size.forEach((size) => {
    const div = createHtmlEl("div","size-parameter", size, size)
    div.dataset.sizename = size;
    if (selectedSize !== 'all' && selectedSize !== size) {
      div.classList.add("filter");
    }
    div.addEventListener("click", sizesFilterClickHandler);
    elSize.append(div);
  });

  option.brand.forEach((brand) => {
    const div = createHtmlEl("div","brand-name",brand)
    div.dataset.brandname = brand;
    if (selectedBrand !== 'all' && selectedBrand !== brand) {
      div.classList.add("filter");
    }
    div.addEventListener("click", brandFilterClickHandler);
    elBrand.append(div);
  });
};

//функції подій кліків єлементів фільтрів.
function brandFilterClickHandler(e) {
  if (brandName !== e.target.dataset.brandname) {
    brandName = e.target.dataset.brandname;
  } else return

  page_num = 1;

  getProduct(productList);
};

//функції подій кліків єлементів фільтрів.
function colorsFilterClickHandler(e) {
  if (colorFilter !== e.target.dataset.colorname) {
    colorFilter = e.target.dataset.colorname;
  } else return

  page_num = 1;

  getProduct(productList);
};

//функції подій кліків єлементів фільтрів.
function sizesFilterClickHandler(e) {
  if (sizeFilter !== e.target.dataset.sizename) {
    sizeFilter = e.target.dataset.sizename;
  } else return

  page_num = 1;

  getProduct(productList);
};


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
      bodyOverflowHid('hid')
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



// модальне вікно подія клік на карточки товару.
function eventClickOpenModal(productList) {
  // відкрити модальне вікно
  document.querySelectorAll(".show-products-card").forEach((el) => {
    el.addEventListener("click", (evt) => {
      if (evt.target.parentElement.classList == "add-to-cart") {
        document.querySelector(".modal").classList.remove("hide");
        bodyOverflowHid('hid')
        showModalProduct(el.dataset.id, productList);
        modalListener();
      }
      else if(evt.target.dataset.optionid){
        // Заміна фото карточки залежно від обраного кольру.
        productCartPhotoChange(productList, evt.target.dataset.productid, evt.target.dataset.optionid)
      }
      else return
    
    });
  });

  // закрити модальне вікно
  try {
    document.querySelector(".close-modal").addEventListener("click", () => {
      // Очищення обє'кта після зачинення модалки.
      cleanProductAddBag()
      document.querySelector(".modal").classList.add("hide");
      bodyOverflowHid()
    });
  } catch (e) {
    if (document.location.pathname.includes("/catalog/")) {
      new Error(e);
    }
  }
};


function pageNumHandler(e) {
  if (e.target.dataset.type === "prev") {
    page_num -= 1;
  }
  if (e.target.dataset.type === "next") {
    page_num += 1;
  }

  getProduct(productList);
  window.scrollTo(scrollY, 0);
	showHeader()
};

function perPageHandler() {
  if(window.innerWidth <= 550){
    per_page = 4;
  }
  else if (window.innerWidth <= 1150) {
    per_page = 6;
  } else {
    per_page = 8;
  }
};


window.addEventListener("resize", (e) => {
  perPageHandler();
  getProduct(productList);
});



// Додавання товарів у кошик через головний пошук.
const ul = document.querySelector(".product-list");

const search = document.querySelector('.main-search-line > input');
ul.addEventListener('click',(ev)=>{
  document.querySelector(".modal").classList.remove("hide");
  bodyOverflowHid('hid')
  showModalProduct(ev.target.dataset.id, productList);
  modalListener();
  search.value = '';
  ul.innerHTML = "";
});

//Повідомленя про вдале додавання товару у кошик.
document.querySelector(".add-to-bag").addEventListener("click", (ev) => {
  message.innerHTML = `<div class="message-box">
    <div class="message-box-img" >
      <img src="../img/market/bag.png" alt="bag">
    </div>
    <p>The product has been successfully added to the cart.</p>
    <div  class="message-btns">
      <button data-id="go-shop">Continue shopping?</button>
      <button data-id="go-bag">View cart?</button>
    </div>
  </div>`;
  document.querySelector('main').append(message);
  //Подія натиску кнопок вікнна повідомлення.
  document.querySelector('.message-btns')
    .addEventListener('click',(ev)=>{
      if(ev.target.dataset.id === 'go-shop'){
        message.remove(message);
        return;
      }
      else if(ev.target.dataset.id === 'go-bag'){
        document.location.pathname="../cart_page";;
        message.remove(message);
      }
      else return;
    });
});

// Очищення інпут головного пошуку при втраті фокусу.
document.body.addEventListener('click',(ev)=>{
  if(ev.target.nodeName === 'INPUT' ||
  ev.target.nodeName === 'IMG'||
  ev.target.nodeName === 'P'
  ){
    return
  }
  else {
    search.value = '';
    ul.innerHTML = "";
  }
});

//Виклик функції клік кнопок хедера.
clickEvents();

//Виклик функції обробник форми футер.
formFooterHandler();

// Відкрити закрити панель фільтрів в мобільній версії.
const btn = document.querySelector('.products-filter_btn');
const productsFilter = document.querySelector('.products-filter');
let flag = false;

btn.addEventListener('click',()=>{
    if(flag === false){
      btn.classList.add('products-filter_btn-show')
      productsFilter.classList.add('products-filter-show')
      flag = true;
    }
    else if(flag === true){
      btn.classList.remove('products-filter_btn-show')
      productsFilter.classList.remove('products-filter-show')
      flag = false;
    }
  })

  productsFilter.addEventListener('click',(e)=>{
    if(e.target.classList[0] === 'products-filter' && flag === true){
      btn.classList.remove('products-filter_btn-show')
      productsFilter.classList.remove('products-filter-show')
      flag = false;
    }
    else return
  })

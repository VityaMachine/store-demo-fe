import { AJAX, FETCH } from "./methods/request.js";
import { randomProduct , baskCounter, message, listenerScroll, listenerlegacyArrow, bodyOverflowHid } from "./methods/methods.js";
import { url,urlAdd } from "./methods/url.js";
import { showModalProduct } from "./methods/modal.js";
import { modalListener, cleanProductAddBag } from "./methods/modalListener.js";
import { searchEntipeStori } from "./methods/search-entipe_stori.js";
import { clickEvents } from "./methods/click_events.js";
import { creatProductCart } from "./methods/creatCards.js";
import { formFooterHandler } from "./methods/form_handler.js";

// Запит на сервер щоб отримати список товарів.
// AJAX трохи тормозить замінив на FETCH
// AJAX(url, "GET", show)

// Запит на сервер щоб отримати список товарів.
FETCH(url, show);

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

// Функція виводу карточок товару на головну сторінку.
function showRandomProducts(productsArr) {
  if (!Array.isArray(productsArr)) {
    console.warn("Отримано не масив");
    return;
  }

  document.querySelector(".sale-products").innerHTML ='';

  productsArr.forEach((el) => {
    document.querySelector(".sale-products").insertAdjacentHTML("beforeend", creatProductCart(el));
  });

  eventClickOpenModal(dataMain);
};

// модальне вікно.
function eventClickOpenModal(productList) {
  // відкрити модальне вікно
  document.querySelectorAll(".sale-products-card").forEach((el) => {
    el.addEventListener("click", (evt) => {
      if (evt.target.parentElement.classList == "add-to-cart" || evt.target.classList == "add-to-cart") {
        document.querySelector(".modal").classList.remove("hide");
        // document.body.classList.add('overflow-hid')
        bodyOverflowHid('hid')
        showModalProduct(el.dataset.id, productList);
        modalListener();
      }
    });
  });

  // закрити модальне вікно
  document.querySelector(".close-modal").addEventListener("click", () => {
    // Очищення обє'кта після зачинення модалки.
    cleanProductAddBag()
    document.querySelector(".modal").classList.add("hide");
    // document.body.classList.remove('overflow-hid')
    bodyOverflowHid()
  });
};

// Слухач події додавання товару через інпут хедер.
const searchInput = document.getElementById("search-field");

const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click',()=>{
  if(searchInput.value !== ''){
    const foundedItem = dataMain.filter( (el) => {

      return el.productName.toLowerCase().includes(searchInput.value.toLowerCase())
      
    });
    if(foundedItem.length > 0){
      document.querySelector(".modal").classList.remove("hide");
      document.body.classList.add('overflow-hid')
      bodyOverflowHid('hid')
      showModalProduct(foundedItem[0].id, dataMain);
      modalListener();
      searchInput.value = '';
    }
    else {
      searchInput.value = '';
      return
    }
  }

});

//Повідомленя про вдале додавання товару у кошик.
document.querySelector(".add-to-bag").addEventListener("click", (ev) => {
  message.innerHTML = `<div class="message-box">
    <div class="message-box-img" >
      <img src="./img/market/bag.png" alt="bag">
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

//Виклик функції клік кнопок хедера.
clickEvents();

//Виклик функції управління відображення кнопки в гору та хедера в мобільній версії.
listenerScroll();

//Виклик функції слухач клік кнопки вгору.
listenerlegacyArrow ();

//Виклик функції обробник форми футер.
formFooterHandler();
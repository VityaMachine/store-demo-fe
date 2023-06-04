import { FETCH, postData } from "./methods/request.js";
import { url, urlAdd, creatUrl } from "./methods/url.js";
import { creatCartProducts } from "./methods/creatCards.js"
import { baskCounter, message, listenerScroll, listenerlegacyArrow,  bodyOverflowHid } from "./methods/methods.js";
import { searchEntipeStori, dataMain } from "./methods/search-entipe_stori.js";
import { showModalProduct } from "./methods/modal.js";
import { cleanProductAddBag, modalListener } from "./methods/modalListener.js";
import { clickEvents } from "./methods/click_events.js";
import { formFooterHandler, formModalValidate, clearFormFields, formRemoveError } from "./methods/form_handler.js";

//Змінна списку товарів.
const cartProducts = document.getElementById('cart-list-products');
// Запит на сервер про вміст кошика.
FETCH(urlAdd, showCartProduct);

// Запит на сервер щоб отримати список товарів.
FETCH(url, searchEntipeStori);


// Функція очищення корзини на сервері корзини.
export function clearBasket(data) {
  if(!Array.isArray(data)) return;
  data.forEach(el => {
    postData(creatUrl(el.id), "DELETE",{},showCartProduct);
  })
}

// Функція виводу товарів на сторінку корзини.
export function showCartProduct(data) {
  if(!Array.isArray(data)) return;
  cartProducts.innerHTML = '';
  let totalCost = 0;
  if(data.length ===  0){
    document.querySelector('.cart-basket-empty').classList.remove('hide');
    document.querySelector('.cart-products').classList.add('hide');
  }
  else {
    document.querySelector('.cart-basket-empty').classList.add('hide');
    document.querySelector('.cart-products').classList.remove('hide');
    data.forEach(el => {
      totalCost += el.total_cost;
      cartProducts
        .append(creatCartProducts(el))
    });
    document.querySelector('.cart-grand-total').innerText = `${totalCost} ₴`;
    // Заповнення модального вікна.
    document.querySelector('.modal-form-total-price').innerHTML =`${totalCost}`;
  }
  baskCounter(data)
};

// Події для кнопок (+ , -,  Х) 
cartProducts.addEventListener('click',(ev)=>{

  if(ev.target.classList.value === 'plus-icon icon'){
      let quantityEl = document.querySelector(`div[data-idquntity = '${ev.target.dataset.idplus}']`)
    const dataput = {
      quantity: quantityEl.innerHTML*1 + 1,
    }
    postData(creatUrl(ev.target.dataset.idplus), "PATCH", dataput,showCartProduct)
  }
  else if(ev.target.classList.value === 'minus-icon icon'){
    let quantityEl = document.querySelector(`div[data-idquntity = '${ev.target.dataset.idminus}']`)

    let counter = document.querySelector(`div[data-idcont = '${ev.target.dataset.idminus}']`)

    if (quantityEl.innerHTML*1 === 1) {
        return
    } else {
      const dataput = {
        quantity:quantityEl.innerHTML*1 - 1,
      }
      postData(creatUrl(ev.target.dataset.idminus), "PATCH", dataput,showCartProduct)
    }
  }
  else if(ev.target.classList.value === 'cart-product-remove'){
    if(confirm('Are you sure you want to remove the product from the cart?')){
      postData(creatUrl(ev.target.dataset.id), "DELETE",{}, showCartProduct);
    }
  }
  else return
});

//Події модального вікна оформлення товару.
const modalForm = document.querySelector('.modal-form');

const formModal = document.querySelector('.modal-form-js');

const closeModalForm = document.getElementById('close-modal-form');

const modalFormMessage = document.getElementById('modal-form-message');

const modalFormBtn = document.getElementById('modal-form-btn');


modalFormBtn.addEventListener('click',(ev)=>{
  
   let error = formModalValidate(formModal)
    if(error === 0){
      message.innerHTML = `<div class="message-box">
      <div class="message-box-img" >
      <img src="../img/SVG/icon_modal_send/icon-ok.svg" alt="ok">
      </div>
      <p>Thank you for your order.<br> Our manager will contact you shortly.</p>
      </div>`;
      document.querySelector('main').append(message)
      setTimeout(()=>{
        message.remove(message);
      },3000);
      FETCH(urlAdd, clearBasket);
      FETCH(urlAdd, showCartProduct);
    }
    else {
      console.log('Error')
      return
    }
    window.scrollTo(scrollY, 0);
    modalForm.classList.add('hide');
    bodyOverflowHid()
})

formModal.addEventListener('click',(el)=>{
   
    if(el.target.classList.value !== 'modal-form-btn'){
        formRemoveError()
    }
    else return
})

closeModalForm.addEventListener("click",()=>{
  modalForm.classList.add('hide');
  bodyOverflowHid()
});

// Слухач події кнопок "продовжити покупки" та "оформити заявку"
document.querySelector('.data-cart').addEventListener('click',(ev)=>{
  if(ev.target.classList.value === 'btn-check'){
    document.location.pathname="/catalog_page"
  }
  else if(ev.target.classList.value === 'btn-apply'){
    modalForm.classList.remove('hide');
    bodyOverflowHid('hid')
    document.getElementById('modal-form-check').checked = false;
    clearFormFields();
    modalFormMessage.value = '';
    formRemoveError()
    // document.getElementById('order').value = creatMailMessage(data)
    // FETCH(urlAdd, showCartProduct);
    // message.innerHTML = `<div class="message-box"><p>Далі буде сторінка підтвердження та оформлення замовлення.</p></div>`;
    // document.querySelector('main').append(message)
    // setTimeout(()=>{
    //   message.remove(message);
    // },3000);
    // FETCH(urlAdd, clearBasket);
    // console.log('clear the basket')
    // window.scrollTo(scrollY, 0);
  }
});

// Слухач події кнопок "продовжити покупки"
document.querySelector('.cart-basket-empty-btn').addEventListener("click",() =>{
  document.location.pathname="/catalog_page"
});

// модальне вікно.
document.querySelector("#close-modal").addEventListener("click", () => {
  // Очищення обє'кта після зачинення модалки.
  cleanProductAddBag()
  document.querySelector(".modal").classList.add("hide");
  bodyOverflowHid()
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
          document.location.pathname="../catalog_page";
          message.remove(message);
        }
        else if(ev.target.dataset.id === 'go-bag'){
          FETCH(urlAdd, showCartProduct);
          message.remove(message);
        }
        else return;
      });
});

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


//Виклик функції клік кнопок хедера.
clickEvents();

//Виклик функції управління відображення кнопки в гору та хедера в мобільній версії.
listenerScroll();

//Виклик функції слухач клік кнопки в гору.
listenerlegacyArrow ();

//Виклик функції обробник форми футер.
formFooterHandler();

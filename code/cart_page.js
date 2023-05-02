import{FETCH,postData } from "./request.js";
import{url, urlAdd} from "./index.js";
import{creatCartProducts} from "./creatCards.js"
import { baskCounter,creatUrl } from "./methods/methods.js";
// import{ creatUrl, urlAdd } from './methods/url.js';
// import { productList } from "./catalog-page.js";
import{ searchEntipeStori } from "./methods/search-entipe_stori.js";


const cartProducts = document.getElementById('cart-table-products');

// Запит на сервер про вміст кошика.
FETCH(urlAdd, showCartProduct);
// Запит на сервер щоб отримати список товарів.
FETCH(url, searchEntipeStori);

// Функція очищення корзини на сервері корзини.
function clearBasket(data) {
  if(!Array.isArray(data)) return;
  data.forEach(el => {
    postData(creatUrl(el.id), "DELETE",{},showCartProduct);
  })
}

// Функція виводу товарів на сторінку корзини.
function showCartProduct(data) {
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
    document.querySelector('.cart-grand-total').innerText = `${totalCost} UAH`
  }
  baskCounter(data)
}


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

const message = document.createElement('div');
message.classList = 'message';
message.innerHTML = `<div><p>Далі буде сторінка підтвердження та оформлення замовлення.</p></div>`

// Слухач події кнопок "продовжити покупки" та "оформити заявку"
document.querySelector('.data-cart').addEventListener('click',(ev)=>{
  if(ev.target.classList.value === 'btn-check'){
    document.location.pathname="/catalog_page"
  }
  else if(ev.target.classList.value === 'btn-apply'){
    document.querySelector('main').append(message)
    setInterval(()=>{
      message.remove(message);
    },3000);
    FETCH(urlAdd, clearBasket);
    console.log('clear the basket')
  }
});

// Слухач події кнопок "продовжити покупки"
document.querySelector('.cart-basket-empty-btn').addEventListener("click",() =>{
  document.location.pathname="/catalog_page"
});
// Слухач події кнопки модального вікна обрати колір .
// document.querySelector(".color-wrapper").addEventListener("click", (ev) => {
//   if (ev.target.dataset.optionid) {
//     const [...elColor] = document.querySelectorAll(".color-wrapper > div");
//     elColor.forEach((el) => {
//       el.classList.add("filter");
//     });
//     ev.target.classList.remove("filter");
//     productAddBag.price_id = "";
//     productAddBag.option_id = ev.target.dataset.optionid;
//   } else return;
// });

// Слухач події кнопки модального вікна обрати крозмір.
// document.querySelector(".size-wrapper").addEventListener("click", (ev) => {
//   if (ev.target.dataset.priceid) {
//     const [...elSize] = document.querySelectorAll(".size-wrapper > div");
//     elSize.forEach((el) => {
//       el.classList.add("filter");
//     });
//     ev.target.classList.remove("filter");
//     productAddBag.price_id = ev.target.dataset.priceid;
//   } else return;
// });

// Поле пошуку в хедері.
// const datalist = document.querySelector("#product-name");

// const searchInput = document.getElementById("search-field");

// searchInput.addEventListener("input", (event) => {
//   datalist.innerHTML = ''
//   const foundedItems = dataMain.filter( (el) => {
//     return el.productName.toLowerCase().includes(event.target.value.toLowerCase())
//   })
  
//   foundedItems.forEach((el) => {
//     const option = document.createElement("option")
//     option.value = el.productName;
//     datalist.append(option);
//   })
// });
// // Очищення поля вводу при втраті фокусу.
// searchInput.addEventListener("blur", (ev) => {
//   ev.target.value = '';
// });
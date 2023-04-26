import{FETCH,postData } from "./request.js";
import{urlAdd} from "./index.js";
import{creatCartProducts} from "./creatCards.js"

const cartProducts = document.getElementById('cart-table-products');

// Запит на сервер про вміст кошика.
FETCH(urlAdd, showCartProduct);

// Функція створення  динамічного Url.
const creatUrl = (id) =>{
  return `https://store-demo-be.onrender.com/api/cart/${id}`;
}

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


// Слухач події кнопок "продовжити покупки" та "оформити заявку"
document.querySelector('.data-cart').addEventListener('click',(ev)=>{
  if(ev.target.classList.value === 'btn-check'){
    document.location.pathname="/catalog_page"
  }
  else if(ev.target.classList.value === 'btn-apply'){
    FETCH(urlAdd, clearBasket);
    console.log('clear the basket')
  }
});

// Слухач події кнопок "продовжити покупки"
document.querySelector('.cart-basket-empty-btn').addEventListener("click",() =>{
  document.location.pathname="/catalog_page"
});

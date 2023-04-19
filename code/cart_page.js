import{FETCH,postData } from "./request.js";
import{urlAdd} from "./index.js";
import{creatCartProducts} from "./creatCards.js"


const cartProducts = document.getElementById('cart-table-products');
// export const urlAdd = "https://store-demo-be.onrender.com/api/cart";

// Запит на сервер про вміст кошика.
FETCH(urlAdd, showCartProduct);

// Група 2
// Реалізувати кошик інтернет-магазину.
// При натиску на ADD TO CART відправити post запит на сервер таких запитів може бути
// багато. Кількість доданих до кошика позицій відображати зверху в іконці кошика.
// При натиску на іконку кошика робити перехід до сторінки кошика
// Всю продукцію яку ви відправили пост запитом на сервер відображати на сторінці
// кошика (адреси API в чаті) дати можливість користувачу обрати кількість продукції
// Використовуючи типу такого перемикача.


// для корректної роботи прошу змінити ім'я хосту

// а саме замінити: https://store-demo.herokuapp.com/ 
// на: https://store-demo-be.onrender.com/

// https://store-demo-be.onrender.com/api/products



const data1 = {
  product_id: "d919e5d9-4d1c-46c4-930b-09d12504e66f",
  option_id: "319bf1b8-85d1-44f8-b2a7-e0c1202f0d21",
  price_id: "c7275961-b461-4e85-9174-f8cfc865ef77",
  quantity: 1,
};
const data = {
  product_id: "0bd61a9d-1422-4aaf-b17e-1661bb335f97",
  option_id: "ba0b7dcb-ee45-4d37-9f01-68b4e61ff7a6",
  price_id: "61c9fb01-f13a-42fc-b7b8-90f29b1618f9",
  quantity: 2,
};


const dataput = {
  quantity: 10,
};





// Виклик функції додати в кошик.

// postData(urlAdd,"POST", data1,showCartProduct)



// url =  "https://store-demo-be.onrender.com/api/cart/(+ ID Товару з кошика який треба змінити або видалити)"

// Виклик функції змінити кількість.

// postData(urlPut, "PATCH",dataput,showCartProduct)

// postData(urlPut, "DELETE",showCartProduct)

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
    document.querySelector('.cart-grand-total').innerText = `${totalCost} UAN`
  }
}

// Події для кнопок (+ , -,  Х) 
cartProducts.addEventListener('click',(ev)=>{
  if(ev.target.classList.value === 'add'){
    const dataput = {
      quantity: ev.target.offsetParent.children[1].dataset.quantity*1 + 1,
    }
    postData(creatUrl(ev.target.offsetParent.dataset.id), "PATCH", dataput,showCartProduct)
  }
  else if(ev.target.classList.value === 'remove' && ev.target.offsetParent.children[1].innerText*1 > 1){
    const dataput = {
      quantity: ev.target.offsetParent.children[1].dataset.quantity*1 - 1,
    }
    postData(creatUrl(ev.target.offsetParent.dataset.id), "PATCH", dataput,showCartProduct)
  }
  else if(ev.target.classList.value === 'cart-product-remove'){
    if(confirm('Are you sure you want to remove the product from the cart?')){
      postData(creatUrl(ev.target.dataset.id), "DELETE",{}, showCartProduct);
    }
  }
  else return
})

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

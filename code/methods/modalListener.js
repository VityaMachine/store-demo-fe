import { FETCH, postData } from "./request.js";
import { urlAdd , creatUrl } from "./url.js";
import { baskCounter, bodyOverflowHid } from "./methods.js";

// Обє'кт обраного товару перед відправкою в кошик.
const productAddBag = {
  product_id: "",
  option_id: "",
  price_id: "",
  quantity: 1,
};

// Функція очищення обєкта productAddBag.
export function cleanProductAddBag (){
  productAddBag.product_id = "";
  productAddBag.option_id = "";
  productAddBag.price_id = ""; 
};

// Функція перевірки перевірки чи є подібний товар та додавання товару у кошик.
function addToBag(data) {
  let product = '';
  if (!Array.isArray(data)) {
    console.warn("Отримано не масив");
    return;
  }
 else if(data.length > 0){
  data.find((obj) => {
      if(obj.product_id === productAddBag.product_id && obj.option_id === productAddBag.option_id && obj.price_id === productAddBag.price_id){
        product = obj;
        return;
      }
      else {
        return;
      };
    }); 
  };

  if(product !== ''){
    let {id,quantity} = product;
    postData(creatUrl(id), "PATCH", {quantity:quantity*1+1},baskCounter);
    cleanProductAddBag();
    product = '';
    return
  }
  else if(product === '' && productAddBag.product_id !== ''){
    postData(urlAdd, "POST", productAddBag, baskCounter);
    cleanProductAddBag();
    return; 
  };
};

// Функція слухач подій кнопок модального вікна.
export function modalListener() {

  // Слухач події кнопки модального вікна обрати колір .
  document.querySelector(".color-wrapper").addEventListener("click", (ev) => {
    if (ev.target.dataset.optionid){
      const [...elColor] = document.querySelectorAll(".color-wrapper > div");
      elColor.forEach((el) => {
        el.classList.add("filter");
      });
      ev.target.classList.remove("filter");
    } else return;
  });

  // Слухач події кнопки модального вікна обрати крозмір.
  document.querySelector(".size-wrapper").addEventListener("click", (ev) => {
    if (ev.target.dataset.priceid) {
      const [...elSize] = document.querySelectorAll(".size-wrapper > div");
      elSize.forEach((el) => {
        el.classList.add("filter");
      });
      ev.target.classList.remove("filter");
      productAddBag.option_id = ev.target.dataset.optionid;
      productAddBag.price_id = ev.target.dataset.priceid;
    } else {
      alert("Треба обрати розмір та колір");
      return;
    }
  });

  // Слухач події кнопки додати товар у кошик.
  document.querySelector(".add-to-bag").addEventListener("click", (ev) => {
    productAddBag.product_id = document.querySelector(".add-to-bag").dataset.productId;
    if (
      productAddBag.product_id !== "" &&
      productAddBag.option_id !== "" &&
      productAddBag.price_id !== ""
    ) {
      FETCH(urlAdd, addToBag);
      document.querySelector(".modal").classList.add("hide");
      bodyOverflowHid()

    } else {
      alert("Треба обрати розмір та колір");
      productAddBag.option_id = "";
      productAddBag.price_id = "";
      return;
    }
  });


  // Слухач події модального вікна обрати картинку.
  const modalImageContainer = document.querySelector('.modal-image-main-container');

  const modalImageSecondary= document.querySelector('.modal-image-secondary');

  modalImageSecondary.addEventListener('click',(ev)=>{
    const [...arr] = document.querySelectorAll('.modal-image-secondary div');
    if(ev.target.src){
      arr.forEach((el)=>{
        if(el.firstChild.src === ev.target.src){
          modalImageContainer.innerHTML = ` <img src="${ev.target.src}" alt="img">`
          el.classList.add('modal-image-select');
        }
        else {
          el.classList.remove('modal-image-select');
          return;
        }
      });
    }
    else return
  });
};
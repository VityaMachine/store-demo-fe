import {  bodyOverflowHid } from './methods.js';

export let dataMain = []

// Функція події в полі пошуку хедер.
export function searchEntipeStori(data){
  if (!Array.isArray(data)) {
      console.warn("Отримано не масив");
      return;
  }
  dataMain = data
  // Поле пошуку в хедері.
  const datalist = document.querySelector("#product-name");

  const searchInput = document.getElementById("search-field");
 
  const searchBox = document.querySelector('.search-box');
  //  Збільшує поле пошуку в мобільній версії.
  searchInput.addEventListener('focus',()=>{
    if(window.screen.width <= 870){
      searchBox.classList.add('box-scale');
      datalist.classList.remove('hide');
      bodyOverflowHid('hid')
    }
    else  {
      searchBox.classList.remove('box-scale');
      datalist.classList.add('hide');
      bodyOverflowHid();
    }
  })


  //  Подія інпут.
  searchInput.addEventListener("input", (event) => {
    datalist.innerHTML = '';
    datalist.classList.remove('hide');
    const foundedItems = data.filter( (el) => {
    
      return el.productName.toLowerCase().includes(event.target.value.toLowerCase())
      
    });
  
    foundedItems.forEach((el) => {
      const option = document.createElement("li");
      option.dataset.id = el.id;
      option.textContent = el.productName;
      option.classList = 'search-product-list-item';
      option.addEventListener('click',()=>{
        searchInput.value = option.textContent;
        datalist.innerHTML = '';
        searchBox.classList.remove('box-scale');
        datalist.classList.add('hide');
        bodyOverflowHid();
      })
      datalist.append(option);
    });
  });

  // Очищення поля вводу при click в іншому місті сторінки.
  document.querySelector('main').addEventListener('click',()=>{
    searchInput.value = '';
    datalist.innerHTML = '';
    searchBox.classList.remove('box-scale');
    datalist.classList.add('hide');
    bodyOverflowHid();
  });
};

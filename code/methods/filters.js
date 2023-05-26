import {resetAllFilters}  from "../catalog-page.js";


// Повідомлення про відсутність обраного товару.
const message = document.createElement('div');
message.classList = 'message';
message.innerHTML = `<div class="message-box"><p>Sorry, but the product of the selected brand is not available in the desired color and size.</p>
<p>Please choose a product from another brand with the selected color and size  <br> or call the manager т. 044-555-22-33</p>
</div>`;

// Функція фільтр за брендом.
function brandFilter(arr, brand) {
  return arr.filter((el) => el.manufacturerName.includes(brand));
}

// Функція фільтр за кольором.
function colorsFilter(arr, color) {
  const modifiedArr = arr.map((el) => {
    const elementColors = [];

    el.availableOptions.forEach((elem) => {
      
      elementColors.push(elem.optionColorName);
    });
    return {
      ...el,
      colors: elementColors,
    };
  });

  const filteredArr = modifiedArr.filter((el) => el.colors.includes(color));
  return filteredArr;
}

// Функція фільтр за розміром.
function sizesFilter(arr, size) {
  const modifiedArr = arr.map((el) => {
    const elementSizes = [];
    el.availableOptions.forEach((elem) => {
      elem.prices.forEach((elm)=>{
        if(size === elm.size){
          elementSizes.push(elm.size);
        }
      })
    });
    return {
      ...el,
      sizes: elementSizes,
    };
  });

  const filteredArr = modifiedArr.filter((el) => el.sizes.includes(size));
  return filteredArr;
}


// Функція обробник фільтрів за брендом кольором та розміром.
export function colorsSizesFilterHandler(arr, color, size, brand) {
  let filteredBrandArr =[];
  let filteredColorArr =[];
  let filteredSizeArr = [];

  // Фільтр за брендом.
  if(brand === 'all'){
    filteredBrandArr = arr;
  }
  else {
    filteredBrandArr = brandFilter(arr, brand);
  }

  // Фільтр за кольором.
  if(color === 'all'){
    filteredColorArr = filteredBrandArr; 
  }
  else{
    filteredColorArr = colorsFilter(filteredBrandArr, color)
  };

  // Фільтр за розміром.
  if(size === 'all'){
  filteredSizeArr = filteredColorArr;
    
  }
  else{
    filteredSizeArr = sizesFilter(filteredColorArr, size) 
  }
  // Перевірка чи є товар з обраним кольором та розміром.
  if(filteredColorArr.length === 0 && color !== 'all'){
    // Повідомлення про відсутність обраного товару.
    document.querySelector('main').append(message)
    setTimeout(()=>{
      message.remove(message);
    },3000);
    // Скидання всіх фільтрів.
    resetAllFilters()
    return arr
  }
  else if(filteredSizeArr.length === 0 && size !== 'all'){
   // Повідомлення про відсутність обраного товару.
    document.querySelector('main').append(message)
    setTimeout(()=>{
      message.remove(message);
    },3000);
     // Скидання всіх фільтрів.
    resetAllFilters()
    return arr
  }
  return filteredSizeArr
}

//Функція фільтр макс мінім ціна.
export function priceFilter(data,flag = true){
  if(flag === true){
    let dataNew = data.slice().sort(function (a, b) {
      if (a.availableOptions[0].prices[0].price  > b.availableOptions[0].prices[0].price ) {
        return 1;
      }
      if (a.availableOptions[0].prices[0].price  < b.availableOptions[0].prices[0].price ) {
        return -1;
      }
      // a повинно дорівнювати b
      return 0;
    })
    return dataNew;
  }
  
  else if(flag === false){
    let dataNew = data.slice().sort(function (a, b) {
      if (a.availableOptions[0].prices[0].price  > b.availableOptions[0].prices[0].price ) {
        return -1;
      }
      if (a.availableOptions[0].prices[0].price  < b.availableOptions[0].prices[0].price ) {
        return 1;
      }
      // a повинно дорівнювати b
      return 0;
    })
    return dataNew;
  }
}

//Функція фільтр за абеткою.
export function alphabeticalFilter(data,flag = true){

  if(flag === true){
    let dataNew = data.slice().sort(function (a, b) {
      if (a.productName  > b.productName ) {
        return 1;
      }
      if (a.productName  < b.productName) {
        return -1;
      }
      // a повинно дорівнювати b
      return 0;
    })
    return dataNew;
  }
  
  else if(flag === false){
    let dataNew = data.slice().sort(function (a, b) {
      if (a.productName  > b.productName) {
        return -1;
      }
      if (a.productName < b.productName) {
        return 1;
      }
      // a повинно дорівнювати b
      return 0;
    })
    return dataNew;
  }
}
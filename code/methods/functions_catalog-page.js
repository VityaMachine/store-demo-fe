
export function getColorsSizeBrandProducts(products = []){
    if (!Array.isArray(products)) return;
    const mainSizeArr = [];
    const mainBrandArr = [];
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
  
    products.forEach((el) => {
      if (!mainBrandArr.includes(el.manufacturerName)) {
        mainBrandArr.push(el.manufacturerName); 
      }
    });
  
  
    products.forEach((object) => {
      object.availableOptions.forEach((option) => {
  
        option.prices.forEach((sizeEl) => {
          if (!mainSizeArr.includes(sizeEl.size)) {
            mainSizeArr.push(sizeEl.size); 
          }
        });
      });
    });
    return { color: mainColorArr, size: mainSizeArr, brand:mainBrandArr };
};

//Функція створення HTML тегів.
export function createHtmlEl(tagName, className, text=''){
  const elem = document.createElement(tagName);
  elem.classList = className;
  elem.innerText = text;
  return elem;
};

// Функція заміни фото карточки залежно від обраного кольру.
export function productCartPhotoChange(arr, productid, optionid){
  const img1 = document.querySelector(`.show-products-card-img-1[data-imgId="${productid}"]`);
  const img2 = document.querySelector(`.show-products-card-img-2[data-imgId="${productid}"]`);

  arr.forEach((elem)=>{
    elem.availableOptions.forEach((e)=>{
      if(e.option_id.includes(optionid)){
        img1.src = e.optionImages[0]
        img2.src = e.optionImages[1] ? e.optionImages[1] : e.optionImages[0]
      }
    });
  });
};

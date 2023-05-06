
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

  const searchBtn = document.querySelector('.search-btn');

  searchInput.addEventListener("input", (event) => {
    datalist.innerHTML = ''
    const foundedItems = data.filter( (el) => {
    
      return el.productName.toLowerCase().includes(event.target.value.toLowerCase())
      
    });

    foundedItems.forEach((el) => {
      const option = document.createElement("option");
      option.dataset.id = el.id;
      option.value = el.productName;
      datalist.append(option);
    });
  });

  // Очищення поля вводу при click в іншому місті сторінки.
  document.querySelector('main').addEventListener('click',()=>{
    searchInput.value = '';
  });
};


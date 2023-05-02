// Функція події в полі пошуку хедер.
export function searchEntipeStori(data){
    if (!Array.isArray(data)) {
        console.warn("Отримано не масив");
        return;
    }

    // Поле пошуку в хедері.
    const datalist = document.querySelector("#product-name");
  
    const searchInput = document.getElementById("search-field");
  
    searchInput.addEventListener("input", (event) => {
      datalist.innerHTML = ''
      const foundedItems = data.filter( (el) => {
        return el.productName.toLowerCase().includes(event.target.value.toLowerCase())
        
      })
      
      foundedItems.forEach((el) => {
        const option = document.createElement("option")
        option.value = el.productName;
        datalist.append(option);
      })
    });
    // Очищення поля вводу при втраті фокусу.
    searchInput.addEventListener("blur", (ev) => {
      ev.target.value = '';
    });
  }
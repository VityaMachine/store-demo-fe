import { FETCH, postData } from "./request.js";
import { url, urlAdd } from "./index.js";
import {creatProductElement} from "./creatCards.js";
import {searchCetalogPage} from "./search.js";
import{baskCounter} from "./methods/methods.js";

const inputSearch = document.querySelector("[name='search-line']");
let productList = [];

function getProduct(data) {
    console.log(data)
	data.forEach(element => {
		document.querySelector('.products-to-show')
			.append(creatProductElement(element))
	});

    showFilerColorSize(getColorsSizeProducts(data));
    productList = data;
    eventClickOpenModal()
}

const getColorsSizeProducts = (products = []) => {
    if(!Array.isArray(products)) return;
    const mainColorArr = [];
    const mainSizeArr = [];


    products.forEach((object)=>{
        object.availableOptions.forEach((colors)=>{
            if(!mainColorArr.includes(colors.optionColorCode)){
                mainColorArr.push(colors.optionColorCode)
            }
        })
    })

    products.forEach((object)=>{
        object.availableOptions.forEach((option)=>{
            option.prices.forEach((sizeEl)=>{
                if(!mainSizeArr.includes(sizeEl.size)){
                mainSizeArr.push(sizeEl.size)
            }
            })
            
        })
    })


    return {color: mainColorArr, size : mainSizeArr}
}

function showFilerColorSize (option) {
    const elColor = document.querySelector(".filter-parameters-color");
    const elSize = document.querySelector(".filter-parameters-size");

    option.color.forEach((color)=>{
        const div = document.createElement("div");
        div.classList.add("color-parameter");
        div.style.backgroundColor = `#${color}`
        elColor.append(div)
    }); 

    option.size.forEach((size)=>{
        const div = document.createElement("div");
        div.classList.add("size-parameter");
        div.innerText = size;
        elSize.append(div)
    }) 



}

inputSearch.addEventListener("input", (e) => {
    searchCetalogPage(e.target.value, productList)
})

FETCH(url, getProduct);

// Запит на сервер про вміст кошика.
FETCH(urlAdd, baskCounter)

function eventClickOpenModal () {
    
	// відкрити модальне вікно
	document.querySelectorAll(".show-products-card").forEach((el) => {
		el.addEventListener("click", (evt) => {
			if ((evt.target.parentElement.classList == "add-to-cart")) {return}
			document.querySelector(".modal").classList.toggle("hide");
		});
	});

	// закрити модальне вікно
	try {
		document.querySelector(".close-modal").addEventListener("click", () => {
            // Очищення обє'кта після зачинення модалки.
            productAddBag.product_id = '';
            productAddBag.option_id = '' ;
            productAddBag.price_id = '';
			document.querySelector(".modal").classList.toggle("hide");
		});	
	} catch (e) {
		if (document.location.pathname.includes("/catalog/")) {
			new Error(e);
			//console.error(e);
		}
	}
}
// Обє'кт обраного товару перед відправкою в корзину.
const productAddBag = {
    product_id: '',
    option_id: '',
    price_id: '',
}

// Функція додавання товару у кошик.
function addToBag({product_id, option_id, price_id}){
    if(product_id && option_id && price_id){
        const data = {
            product_id: product_id,
            option_id: option_id,
            price_id: price_id,
            quantity: 1,
          };
        postData(urlAdd,"POST", data, baskCounter)   
    }
    else return
}

// Слухач події кнопки додати товар у кошик.
document.querySelector('.add-to-bag').addEventListener('click',(ev)=>{
    productAddBag.product_id = document.querySelector('.add-to-bag').dataset.productid;
    if(productAddBag.product_id !== '' && productAddBag.option_id !== '' && productAddBag.price_id !== ''){
        console.log(productAddBag)
        addToBag(productAddBag);
        // Очищення обє'кта після додавання товару в корзину.
        productAddBag.product_id = '';
        productAddBag.option_id = '' ;
        productAddBag.price_id = '';
        document.querySelector(".modal").classList.toggle("hide");
    }else {
        alert("Треба обрати розмір та колір");
        return;
    } 
});


// Слухач події кнопки модального вікна обрати колір .
document.querySelector('.color-wrapper').addEventListener('click',(ev)=>{
    if(ev.target.dataset.optionid){
        const [...elColor] = document.querySelectorAll('.color-wrapper > div');
        elColor.forEach((el)=>{
            el.classList.add('filter');
        })
        ev.target.classList.remove('filter')
        productAddBag.option_id = ev.target.dataset.optionid;
    }
    else return
});

// Слухач події кнопки модального вікна обрати крозмір.
document.querySelector('.size-wrapper').addEventListener('click',(ev)=>{
    if(ev.target.dataset.priceid){
        const [...elSize] = document.querySelectorAll('.size-wrapper > div');
        elSize.forEach((el)=>{
            el.classList.add('filter');
        })
        ev.target.classList.remove('filter')
        productAddBag.price_id = ev.target.dataset.priceid;
    }
    else return
});
import { FETCH, postData } from "./request.js";
import { url, urlAdd } from "./index.js";
import {creatProductElement} from "./creatCards.js";
import {searchCetalogPage} from "./search.js"
import{baskCounter} from "./methods/methods.js"
// import {baskCounter, urlAdd} from "./cart_page.js"

const inputSearch = document.querySelector("[name='search-line']");
let productList = [];

function getProduct(data) {
	data.forEach(element => {
		document.querySelector('.products-to-show')
			.append(creatProductElement(element))
	});

    showFilerColorSize(getColorsSizeProducts(data));

    productList = data;
    console.log(data);
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
			document.querySelector(".modal").classList.toggle("hide");
		});	
	} catch (e) {
		if (document.location.pathname.includes("/catalog/")) {
			new Error(e);
			//console.error(e);
		}
	}
}



// Тестові товари.
const data1 = {
    product_id: "d919e5d9-4d1c-46c4-930b-09d12504e66f",
    option_id: "319bf1b8-85d1-44f8-b2a7-e0c1202f0d21",
    price_id: "c7275961-b461-4e85-9174-f8cfc865ef77",
};
const data = {
    product_id: "0bd61a9d-1422-4aaf-b17e-1661bb335f97",
    option_id: "ba0b7dcb-ee45-4d37-9f01-68b4e61ff7a6",
    price_id: "61c9fb01-f13a-42fc-b7b8-90f29b1618f9",
};

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
    addToBag(data1)
    document.querySelector(".modal").classList.toggle("hide");
})
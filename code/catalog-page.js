import { FETCH } from "./request.js";
import { url } from "./index.js";
import {creatProductElement} from "./creatCards.js";
import {searchCetalogPage} from "./search.js"

const inputSearch = document.querySelector("[name='search-line']");
let productList = [];

function getProduct(data) {
	data.forEach(element => {
		document.querySelector('.products-to-show')
			.append(creatProductElement(element))
	});

    showFilerColorSize(getColorsSizeProducts(data));

    productList = data;
    console.log(productList);
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
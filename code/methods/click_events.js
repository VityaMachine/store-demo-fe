import {  bodyOverflowHid } from "./methods.js"

export function clickEvents() {
	const burger = document.querySelector(".burger");
	const burgerContainer = document.querySelector(".burger-container");
	let open = false;

	// адаптивне бургер меню
	burger.addEventListener("click", function () {
		if(open === false){
			this.classList.add("active");
			burgerContainer.classList.add("open");
			bodyOverflowHid('hid')
			open = true;
		}
		else if(open === true){
			this.classList.remove("active");
			burgerContainer.classList.remove("open");
			bodyOverflowHid()
			open = false;
		}
	});

	burgerContainer.addEventListener('click',()=>{
		if(open === true){
			burger.classList.remove("active");
			burgerContainer.classList.remove("open");
			bodyOverflowHid()
			open = false;
		}
		else return
	})


	//випадаюче філтьр-меню
	document.querySelectorAll(".filter-name").forEach((el) => {
		el.addEventListener("click", () => {
			el.children[0].classList.toggle("fa-rotate-180");
			el.nextElementSibling.classList.toggle("hide");
		});
	});

	//відкрити корзину
	document.querySelector(".basket-box").addEventListener("click", () => {
		document.location.pathname="../cart_page"
	})

	//лого на головну
	document.querySelector(".logo").addEventListener("click", () => {
		document.location.pathname="../"
	})
	
}
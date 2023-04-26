window.onload = function () {
	// адаптивне бургер меню
	document.querySelector(".burger").addEventListener("click", function () {
		this.classList.toggle("active");
		document.querySelector(".burger-container").classList.toggle("open");
	});

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
	
};
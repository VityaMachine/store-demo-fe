// Функції відображення випадкових чотирьох товарів першої сторінки.
export function randomProduct(product, quantity, math = Math) {
	if (!Array.isArray(product)) {
		console.warn("Отримано не масив");
		return;
	}

	if (quantity >= product.length) {
		console.warn("Кількість випадкових елементів більше к-ті елементів масиву");
		return;
	}

	let indexRandom = [];

	for (let i = 0; i < quantity; i++) {
		let currentRandomIndex = math.floor(math.random() * product.length);

		while (indexRandom.includes(currentRandomIndex)) {
			currentRandomIndex = math.floor(math.random() * product.length);
		}

		indexRandom.push(currentRandomIndex);
	}

	return  indexRandom.map((index) => {
		return product[index];
	});
};

// Функції відображення кошика товарів.
export function baskCounter(data) {
	if(!Array.isArray(data)) {return;}
	let caunter = 0;
	data.forEach(el =>{
		caunter += el.quantity*1;
	})
	if(caunter > 0){
		document.querySelector('.basket-counter').classList.remove('hide-basket');
		document.querySelector('.basket-counter').innerText = caunter;
		showBasket ('on');
	}
	else {
		document.querySelector('.basket-counter').classList.add('hide-basket');
		showBasket ();
	};
};

// Функції анімації кошика товарів порожній повний.
export function showBasket (on = 'off'){
	if(on === 'on'){
		document.querySelector('.cart__lines').classList.add('show')
		document.querySelector('.cart__top').classList.add('show')
		document.querySelector('.cart__wheel1').classList.add('show')
		document.querySelector('.cart__wheel2').classList.add('show')
		document.querySelector('.cart__wheel1 > .cart__wheel-stroke').classList.add('show')
    document.querySelector('.cart__wheel2 >.cart__wheel-stroke').classList.add('show')
	}
	else if(on === 'off'){
		document.querySelector('.cart__lines').classList.remove('show')
		document.querySelector('.cart__top').classList.remove('show')
		document.querySelector('.cart__wheel1').classList.remove('show')
		document.querySelector('.cart__wheel2').classList.remove('show')
		document.querySelector('.cart__wheel1 > .cart__wheel-stroke').classList.remove('show')
    document.querySelector('.cart__wheel2 >.cart__wheel-stroke').classList.remove('show')
	}
};

// Функція створення  динамічного Url.
export const creatUrl = (id) =>{
	return `https://store-demo-be.onrender.com/api/cart/${id}`;
};
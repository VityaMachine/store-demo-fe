
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
}


// Функції відображення кошика товарів.
export function baskCounter(data) {
	if(!Array.isArray(data)) {return;}
	let caunter = 0;
	data.forEach(el =>{
		caunter += el.quantity*1;
	})
	if(caunter > 0){
		document.querySelector('.basket-counter').classList.remove('hide-basket');
		document.querySelector('.basket-counter').innerHTML = caunter;
		showBasket ('on');
	}
	else {
		document.querySelector('.basket-counter').classList.add('hide-basket');
		showBasket ();
	};
}

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
}

// Елемент повідомлення.
export const message = document.createElement('div')
message.classList = 'message'

// Випадкове число від min до (max+1).
export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

//Функція відображення рейтингу товару у вигляді зірочок rating(0-5). !!!  Тимчасовий рейтинг товару рандомний, Після створення змінної на бекенді - підставити справжній ретинг!!!.
export function ratingStars (rating){
    const star = (color)=>{return `<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8205 0L15.3997 7.25312L23.4039 8.41582L17.6118 14.0612L18.9794 22.0329L11.8205 18.2688L4.66156 22.0329L6.02918 14.0612L0.237098 8.41582L8.24126 7.25312L11.8205 0Z" fill="${color}"/>
</svg>`};
    let stars =[]
    for (let i = 0; i < 5; i++) {
        if(i < rating){
            stars.push(`<span>${star("#FFCC48")}</span>`)
        }
        else {
            stars.push(`<span>${star("#BCBCCC")}</span>`)
        }
    }
    return stars.join('')
}

//Функція перевіряє чи видно елемент на сторінці. Приймає елемент, та край який треба відслідкувати 'top' або 'bottom' за замовчуванням 'all'. повертає true або false.
export function isVisible(elem,visible = 'all') {

	let coords = elem.getBoundingClientRect();
  
	let windowHeight = document.documentElement.clientHeight;
  
	// верхній АБО нижній край елемента видно.
	let topVisible = coords.top > 0 && coords.top < windowHeight;
	let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
	if(visible === 'all'){
		return topVisible || bottomVisible;
	}
	else if(visible === 'top'){
		return topVisible;
	}
	else if(visible === 'bottom'){
		return bottomVisible;
	}
	
}

// Функція показати приховати хедер.
export function showHeader(but='on'){
	const header = document.querySelector('header')
	if(but === 'on'){
		header.classList.remove('header-hiden')
	}
	else if(but === 'off'){
		header.classList.add('header-hiden')
	}
}
	//Змінна попереднього значення scrollY.
	let b = 0;
// Функція слухач події скрол.
export function listenerScroll(){
	//Ширина екрана користувача.
	const scrWidth = window.screen.width;

	// В мобільній версії приховує хедер скрол - вниз або показує скролл - вгору.Element.scrollHeight;
	if(scrWidth <= 870){
		window.addEventListener('scroll', () => {
			setTimeout(()=>{ b = scrollY }, 1);
			// Перевірка напрям скроллу.
			if(b > scrollY){
				showHeader()
			}
			else if(b < scrollY){showHeader('off')}

		})
	}
	// Приховує або показує кнопку вгору як що видно верхній край футер.
	window.addEventListener('scroll', function() {
	  const arrowTop = document.querySelector('.legacy-arrow')
	  const bottom = document.querySelector('footer')
	  const h = document.documentElement.scrollHeight;
	  const hScren = window.screen.height;
	  
	  if(isVisible(bottom) && hScren*2 < h){
		arrowTop.classList.remove('hide')
	  }
	  else if(scrollY > h - 750){
		arrowTop.classList.remove('hide')
	  }
	  else {
		arrowTop.classList.add('hide')
	}
	});
}

//Функція клік кнопки вгору.
export function listenerlegacyArrow (){
	document.querySelector('.legacy-arrow')
		.addEventListener('click',()=>{
	  		window.scrollTo(scrollY, 0);
			showHeader()
		})
}

// Функція блокує скрол сторінки коли відчинено інше вікно.
export function bodyOverflowHid(hid) {
	const body = document.body;
	if(hid === 'hid'){
		body.classList.add('overflow-hid')
	}
	else body.classList.remove('overflow-hid')
}
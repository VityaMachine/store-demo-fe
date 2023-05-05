// Посилання GET запитів на сервер щоб отримати список товарів.
export const url = "https://store-demo-be.onrender.com/api/products/";

// Посилання GET, РОST запитів на сервер для роботи з вмістом кошика.
export const urlAdd = "https://store-demo-be.onrender.com/api/cart";

// Функція створення  динамічного Url посилання DELETE, PATCH запитів на сервер для роботи з окремим товаром у кошику.
export const creatUrl = (id) =>{
	return `https://store-demo-be.onrender.com/api/cart/${id}`;
};
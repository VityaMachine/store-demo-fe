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
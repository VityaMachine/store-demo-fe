
export const searchCetalogPage = (value, products = []) => {

 const l = products.length;

 const arr =  products.filter((product)=>{
     return product.productName.toLowerCase().includes(value.toLowerCase())
 })
 .map((product)=>{
     return {
         productId: product.id,
         productImg : product.availableOptions[0].optionImages[0],
         productName : product.productName
     }
 })
 showProductSearchList(arr, l)
}

function showProductSearchList (products = [], l) {
    const ul = document.querySelector(".product-list");
    ul.innerHTML = "";

    if(products.length >= l){
        ul.innerHTML = "";
        return
    }

    products.forEach(({ productImg, productName, productId }) => {
        if (ul.childElementCount > 4) return;
        const li = document.createElement("li");
        li.dataset.id = productId;
        const img = document.createElement("img");
        img.dataset.id = productId;
        const p = document.createElement("p");
        p.dataset.id = productId;
        img.src = productImg;
        img.alt = productName;
        p.innerText = productName;

        li.append(img, p);
        ul.append(li);
    });
};


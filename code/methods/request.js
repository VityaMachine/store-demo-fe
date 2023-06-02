import { urlAdd } from "./url.js";

//Змінна лоудер.
let loader = '';

if(document.location.pathname.includes("/catalog_page/") || 
  document.location.pathname.includes("/cart_page/")){
    loader = document.querySelector(".loader_box");
}
else loader = document.querySelector(".loader_header_box");


// Відправлення GET запитів.
function AJAX(url = "", method = "GET", callback = () => {}) {
  loader.classList.remove("hide");
  const ajax = new XMLHttpRequest();
  ajax.open(method, url);
  ajax.send();
  ajax.addEventListener("readystatechange", () => {
    if (ajax.readyState === 4 && ajax.status >= 200 && ajax.status < 300) {
      const response = JSON.parse(ajax.responseText);
      callback(response);
    } else if (ajax.readyState === 4) {
      throw new Error(`Error in status ${ajax.status}`);
    }
    loader.classList.add("hide");
  });
};

// Відправлення GET запитів.
async function FETCH(
  url = "",
  callback = () => {},
  option = { method: "GET" }
) {
  loader.classList.remove("hide");
  const request = await fetch(url, option);
  const data = await request.json();
  //const data = BD;
  callback(data);
  loader.classList.add("hide");
}

// Відправлення POST, PATCH та DELETE запитів.
async function postData(url = "", met = "POST", data = {},callback = ()=>{}) {
  loader.classList.remove("hide");
 if(met === 'DELETE'){
   const response = await fetch(url, {
     method: met, // *POST, PUT, DELETE, etc.PATCH
     cache: "no-cache", // *default, no-cache, reload, force-cache,
   }); 
   FETCH(urlAdd, callback); 
 }
 else{
   const respons = await fetch(url, {
     method: met, // *POST, PUT, DELETE, etc.PATCH
     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data), // body data type must match "Content-Type" header
     
   });
   if (respons.status >= 200 && respons.status < 300) {
    FETCH(urlAdd, callback);
   }
   else   return;
  }
 loader.classList.add("hide");
};

// Відправлення повідомлень на Email !!!-- Працює тількі на сервері --!!!.
async function formSend(form){
  const formData = new FormData(form);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
  .then(() => {
    console.log("Form successfully submitted")
  })
  .catch((error) => alert(error));

}




export { AJAX, FETCH,  postData, formSend};
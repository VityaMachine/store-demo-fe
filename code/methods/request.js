import { urlAdd } from "./url.js";
//Змінна лоудер.
const loader = document.querySelector(".loader_box");

// Відправлення POST запитів.
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

// Відправлення POST запитів.
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

export { AJAX, FETCH,  postData};
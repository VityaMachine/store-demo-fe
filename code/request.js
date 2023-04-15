const loader = document.querySelector(".loader_box");

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
}

async function FETCH(
  url = "",
  callback = () => {},
  option = { method: "GET" }
) {
  loader.classList.remove("hide");
  const request = await fetch(url, option);
  const data = await request.json();
  callback(data);
  loader.classList.add("hide");
}

export { AJAX, FETCH };

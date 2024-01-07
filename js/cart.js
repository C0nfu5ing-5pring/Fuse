const cartedContainer = document.getElementById("carted-products-container");
let stringData = localStorage.getItem("carted");

let carted = stringData.split(",");
carted = carted.map((item) => +item);
function addProductsToCart() {
  fetch("https://c0nfu5ing-5pring.github.io/Fuse/data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (carted.indexOf(+data[i].id) != -1) {
          let div = document.createElement("div");
          div.classList.add("product-card");
          div.setAttribute("id", `${data[i].id}`);
          if (data[i].badge) {
            div.innerHTML = `<div class="badge">Hot</div>
                              <div class="product-tumb">
                                <img
                                  src="${data[i].img_src}"
                                  alt="${data[i].img_alt}"
                                />
                              </div>
                              <div class="product-details">
                                <span class="product-catagory">${data[i].span}</span>
                                <h4><a href="#">${data[i].h4}</a></h4>
                                <p>
                                ${data[i].p}
                                </p>
                                <div class="product-bottom-details">
                                  <div class="product-price"><small>${data[i].small}</small>${data[i].price}</div>
                                  <div class="product-links">
                                    <i class="fa fa-heart"></i>
                                    <button class="cartRemover" id="carted${data[i].id}">Delete</button>
                                  </div>
                                </div>
                              </div>`;
          } else {
            div.innerHTML = `<div class="product-tumb">
                             <img
                              src="${data[i].img_src}"
                              alt="${data[i].img_alt}"
                              />
                              </div>
                              <div class="product-details">
                                <span class="product-catagory">${data[i].span}</span>
                                <h4><a href="#">${data[i].h4}</a></h4>
                                <p>
                                ${data[i].p}
                                </p>
                                <div class="product-bottom-details">
                                  <div class="product-price"><small>${data[i].small}</small>${data[i].price}</div>
                                  <div class="product-links">
                                    <i class="fa fa-heart"></i>
                                    <button class="cartRemover" id="carted${data[i].id}">Delete</button>
                                  </div>
                                </div>
                              </div>`;
          }
          cartedContainer.appendChild(div);
          let element = document.getElementById(`carted${data[i].id}`);
          element.addEventListener("click", (e) => {
            let id = +e.target.id.slice(6);
            let element =
              e.target.parentElement.parentElement.parentElement.parentElement;
            element.remove();
            let index = carted.indexOf(id);
            carted.splice(index, 1);
            localStorage.setItem("carted", carted);
            notify();
          });
        }
      }
    });
}

addProductsToCart();

function notify() {
  let notification = document.getElementById("cartnotification");
  notification.style.display = "block";
  setTimeout(() => {
    document.getElementById("cartnotification").style.display = "none";
  }, 1100);
}

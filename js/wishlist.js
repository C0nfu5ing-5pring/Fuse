const wishlistedContainer = document.getElementById("wishlisted-products-container");
let stringData = localStorage.getItem("wishlisted");
const isEmpty = document.getElementById("empty-wishlist");
let wishlisted;

wishlisted = stringData ? stringData.split(",") : [];
wishlisted = wishlisted.map((item) => +item);
empty();

function addProductsToCart() {
  fetch("https://c0nfu5ing-5pring.github.io/Fuse/data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (wishlisted.indexOf(+data[i].id) != -1) {
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
                                    <button class="cartRemover" id="wishlisted${data[i].id}">Delete</button>
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
                                    <button class="cartRemover" id="wishlisted${data[i].id}">Remove</button>
                                  </div>
                                </div>
                              </div>`;
          }
          wishlistedContainer.appendChild(div);
          let element = document.getElementById(`wishlisted${data[i].id}`);
          element.addEventListener("click", (e) => {
            let id = +e.target.id.slice(10);
            let element =
              e.target.parentElement.parentElement.parentElement.parentElement;
            element.remove();
            let index = wishlisted.indexOf(id);
            wishlisted.splice(index, 1);
            localStorage.setItem("wishlisted", wishlisted);
            notify();
            empty();
          });
        }
      }
    });
}

addProductsToCart();

function notify() {
  let notification = document.getElementById("wishNotification");
  notification.style.display = "block";
  setTimeout(() => {
    document.getElementById("wishNotification").style.display = "none";
  }, 1100);
}

function empty() {
  if (wishlisted.length > 0) {
    isEmpty.style.display = "none";
  } else {
    isEmpty.style.display = "block";
  }
}
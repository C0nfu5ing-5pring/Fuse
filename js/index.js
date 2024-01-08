const product_Container = document.getElementById("products-container");

let ls = localStorage.getItem("carted");
let carted;
if (ls) {
  carted = ls.split(",").map((item) => +item);
} else {
  carted = [];
}
document.getElementById("cart-counter").innerText = carted.length;
function addProducts() {
  fetch("https://c0nfu5ing-5pring.github.io/Fuse/data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
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
                                  <label for="carted${data[i].id}"><i class="fa fa-shopping-cart" title="Add to Cart"></i></label>
                                  <input type="checkbox" id="carted${data[i].id}">
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
                                  <label for="carted${data[i].id}"><i class="fa fa-shopping-cart" title="Add to Cart"></i></label>
                                  <input type="checkbox" id="carted${data[i].id}">
                                </div>
                              </div>
                            </div>`;
        }
        product_Container.appendChild(div);

        let checkbox = document.getElementById(`carted${data[i].id}`);
        if (carted.indexOf(+checkbox.id.slice(6)) !== -1)
          checkbox.previousElementSibling.firstChild.style.color = "#53FF45";
        addToCart(checkbox);
      }
    });
}

addProducts();

function addToCart(checkbox) {
  checkbox.addEventListener("change", (e) => {
    let id = +e.target.id.slice(6);
    if (checkbox.checked && carted.indexOf(id) === -1) {
      carted.push(id);
      checkbox.previousElementSibling.firstChild.style.color = "#53FF45";
      notify(true);
    } else {
      notify(false);
    }
    localStorage.setItem("carted", carted);
    document.getElementById("cart-counter").innerText = carted.length;
  });
}

function notify(flag) {
  let notification = document.getElementById("cartnotification");
  notification.innerHTML = flag
    ? '<span style="color: #53FF45;">Successfully</span> Added to Cart'
    : " Item Already in Cart ";
  notification.style.display = "block";
  setTimeout(() => {
    document.getElementById("cartnotification").style.display = "none";
  }, 1100);
}

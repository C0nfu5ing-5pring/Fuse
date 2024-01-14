const product_Container = document.getElementById("products-container");

let ls = localStorage.getItem("carted");
let wishLs = localStorage.getItem("wishlisted");
let carted;
let wishlisted;

if (ls) {
  carted = ls.split(",").map((item) => +item);
} else {
  carted = [];
}

if (wishLs) {
  wishlisted = wishLs.split(",").map((item) => +item);
} else {
  wishlisted = [];
}
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
                                  <label for="wishlist${data[i].id}"><i class="fa fa-heart" title = "Add to Wishlist"></i></label>
                                  <input type="checkbox" id="wishlist${data[i].id}">
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
                                <label for="wishlist${data[i].id}"><i class="fa fa-heart" title = "Add to Wishlist"></i></label>
                                <input type="checkbox" id="wishlist${data[i].id}">
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

        let wishCheckbox = document.getElementById(`wishlist${data[i].id}`);
        if (wishlisted.indexOf(+wishCheckbox.id.slice(8)) !== -1)
          wishCheckbox.previousElementSibling.firstChild.style.color = "red";

        addToWishlist(wishCheckbox);
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
  });
}

function addToWishlist(wishCheckbox) {
  wishCheckbox.addEventListener("change", (e) => {
    let id = +e.target.id.slice(8);
    if (wishCheckbox.checked && wishlisted.indexOf(id) === -1) {
      wishlisted.push(id);
      wishCheckbox.previousElementSibling.firstChild.style.color = "red";
      wishNotify(true);
    } else {
      wishNotify(false);
    }
    localStorage.setItem("wishlisted", wishlisted);
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

function wishNotify(flag) {
  let notification = document.getElementById("wishNotification");
  notification.innerHTML = flag
    ? '<span style="color: #53FF45;">Successfully</span> Added to Wishlist'
    : " Item Already in Wishlist ";
  notification.style.display = "block";
  setTimeout(() => {
    document.getElementById("wishNotification").style.display = "none";
  }, 1100);
}

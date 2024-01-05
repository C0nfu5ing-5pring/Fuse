const product_Container = document.getElementById("products-container");

function addProducts() {
  fetch("../data.json")
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
                                  <i class="fa fa-shopping-cart" id="cart${data[i].id}" title="Add to Cart"></i>
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
                                  <i class="fa fa-shopping-cart" id="cart${data[i].id}" title="Add to Cart"></i>
                                </div>
                              </div>
                            </div>`;
        }
        product_Container.appendChild(div);
      }
    });
}

addProducts();

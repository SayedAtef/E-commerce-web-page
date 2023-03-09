// Get data from localStorage upon load
const storedData = JSON.parse(localStorage.getItem("myData"));

// Get required elements and add functionality to cart (sidebar) to open and close
// I know that the task is dropdown but I felt like this is better for my UI and It has the same
// functionality as a dropdown
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-icon");
// open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Display data upon load
let shopContainer = document.getElementById("shop-container");
let cartContent = document.getElementsByClassName("cart-content")[0];
let cartBoxes = cartContent.getElementsByClassName("cart-box");
let cardHtml = ``;
storedData.forEach((item) => {
  cardHtml += `
    <div class="product-card">
        <img src=${item.product_image} alt=${
    item.product_name
  } class="product-image" />
        <div class="contain">
          <h2 class="product-title">${item.product_name}</h2>
          <button type="button" class="quick-view" id="open-modal">Quick View</button>
        </div>
        <div class="contain">
          <span class="price">${item.product_price}$</span> ${
    !item.added_to_cart
      ? `<button type="button" class="add-cart">Add to cart</button>`
      : `<button type="button" class="remove-cart">Remove from cart</button>`
  }
        </div>
    </div>   
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <img src=${item.product_image} alt=${
    item.product_name
  } class="modal-image" />
        <div class="modal-right">
        <h2 class="title-modal">${item.product_name}</h2>
        <p>${item.product_price}$</p>
        ${
          !item.added_to_cart
            ? `<button type="button" class="add-cart-modal">Add to cart</button>`
            : `<button type="button" class="remove-cart-modal">remove from cart</button>`
        }
      </div>
      </div>
    </div> 
  `;
});
shopContainer.innerHTML = cardHtml;
// Display content of the cart
let cartShopBox = document.createElement("div");
let cartItems = document.getElementsByClassName("cart-content")[0];
cartShopBox.classList.add("cart-box");
let filterdObjs = storedData.filter((obj) => obj.added_to_cart === true);
let cartBoxContent = ``;
let total = 0;
// Get products with added_to_cart true
filterdObjs.forEach((item) => {
  total += parseInt(item.product_price);
  cartBoxContent += `
    <img src="${item.product_image}" alt="${item.product_name}" class="cart-img" />
    <div class="detail-box">
    <div class="cart-product-title">${item.product_name}</div>
    <div class="cart-price">${item.product_price}$</div>
    </div>
    <img src="/img/delete.png" alt="delete" class="remove-icon" />
    `;
});
document.getElementsByClassName("total-price")[0].innerText = "$" + total;
document.querySelector(".cart-indicator").innerText = filterdObjs.length;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
// This check avoids error when cartShopBox is empty
if (cartShopBox.hasChildNodes()) {
  cartShopBox
    .getElementsByClassName("remove-icon")[0]
    .addEventListener("click", removeCartItem);
}

// Check if the page is fully loaded to start interacting with it
if (document.readyState === "complete") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// The function that will run when the page is fully loaded
function ready() {
  // Remove items from cart
  let removeCartButtons = document.getElementsByClassName("remove-icon");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Add to cart functionality
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClick);
  }

  // Remove from cart functionality
  let removeCart = document.getElementsByClassName("remove-cart");
  for (let i = 0; i < removeCart.length; i++) {
    let button = removeCart[i];
    button.addEventListener("click", removeFromCart);
  }

  // Add to cart  modal
  let addCartModal = document.getElementsByClassName("add-cart-modal");
  for (let i = 0; i < addCartModal.length; i++) {
    let button = addCartModal[i];
    button.addEventListener("click", addCartClickModal);
  }

  // Remove from cart functionality modal
  let removeCartModal = document.getElementsByClassName("remove-cart-modal");
  for (let i = 0; i < removeCartModal.length; i++) {
    let button = removeCartModal[i];
    button.addEventListener("click", removeFromCartModal);
  }

  // Quick view functionality
  let quickView = document.getElementsByClassName("quick-view");
  for (let i = 0; i < quickView.length; i++) {
    let button = quickView[i];
    button.addEventListener("click", openModal);
  }

  // Quick view functionality
  let close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    let button = close[i];
    button.addEventListener("click", closeModal);
  }

  // Buy button
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// Buy Button function will erase everything in the cart and send alert
function buyButtonClicked() {
  alert("Your order is placed");

  console.log(filterdObjs);
  const newData = storedData.map((obj) => {
    return { ...obj, added_to_cart: false };
  });
  localStorage.setItem("myData", JSON.stringify(newData));
  location.reload();
}

// Remove items from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  const shopProducts = buttonClicked.parentElement;
  const title = shopProducts
    .getElementsByClassName("detail-box")[0]
    .getElementsByClassName("cart-product-title")[0].innerText;

  let currentObject = storedData.find(
    (obj) => obj.product_name.toLowerCase() == title.toLowerCase()
  );
  if (currentObject) {
    currentObject.added_to_cart = !currentObject.added_to_cart;
  }
  const updatedData = JSON.stringify(storedData);
  localStorage.setItem("myData", updatedData);
  localStorage.getItem("myData");

  // updateTotal();
  // updateIndicator();
  location.reload();
}

// Remove from cart
function removeFromCart(event) {
  const button = event.target;
  const shopProducts = button.parentElement.parentElement;
  const title =
    shopProducts.getElementsByClassName("product-title")[0].innerText;

  let currentObject = storedData.find(
    (obj) => obj.product_name.toLowerCase() == title.toLowerCase()
  );
  if (currentObject) {
    currentObject.added_to_cart = !currentObject.added_to_cart;
  }
  const updatedData = JSON.stringify(storedData);
  localStorage.setItem("myData", updatedData);
  localStorage.getItem("myData");

  // updateTotal();
  // updateIndicator();
  location.reload();
}

// Add cart functionality
function addCartClick(event) {
  const button = event.target;
  const shopProducts = button.parentElement.parentElement;
  const title =
    shopProducts.getElementsByClassName("product-title")[0].innerText;
  console.log(title);
  let currentObject = storedData.find(
    (obj) => obj.product_name.toLowerCase() == title.toLowerCase()
  );
  if (currentObject) {
    currentObject.added_to_cart = !currentObject.added_to_cart;
  }
  const updatedData = JSON.stringify(storedData);
  localStorage.setItem("myData", updatedData);
  localStorage.getItem("myData");
  location.reload();
}

// Remove from cart
function removeFromCartModal(event) {
  const button = event.target;
  const shopProducts = button.parentElement;
  const title = shopProducts.getElementsByClassName("title-modal")[0].innerText;

  let currentObject = storedData.find(
    (obj) => obj.product_name.toLowerCase() == title.toLowerCase()
  );
  if (currentObject) {
    currentObject.added_to_cart = !currentObject.added_to_cart;
  }
  const updatedData = JSON.stringify(storedData);
  localStorage.setItem("myData", updatedData);
  localStorage.getItem("myData");
  location.reload();
}

// Add cart functionality
function addCartClickModal(event) {
  const button = event.target;
  const rightModal = button.parentElement;
  const title = rightModal.getElementsByClassName("title-modal")[0].innerText;
  let currentObject = storedData.find(
    (obj) => obj.product_name.toLowerCase() == title.toLowerCase()
  );
  if (currentObject) {
    currentObject.added_to_cart = !currentObject.added_to_cart;
  }
  const updatedData = JSON.stringify(storedData);
  localStorage.setItem("myData", updatedData);
  localStorage.getItem("myData");
  location.reload();
}

// Modal functions
function openModal(event) {
  const button = event.target;
  const productCard = button.parentElement.parentElement;
  const modal = productCard.nextElementSibling;
  modal.style.display = "block";
}
function closeModal(event) {
  const button = event.target;
  const modal = button.parentElement.parentElement;
  modal.style.display = "none";
}
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

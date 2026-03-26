
const listProducts = document.querySelector(".list-menu");
const shopList = document.querySelector(".list-shops");
const addToCartBtn = document.querySelector(".add-btn");

async function getProducts(shopName = "") {
  listProducts.innerHTML = "<p>Loading products...</p>";

  const url = shopName
    ? `http://localhost:3000/api/products?shop=${shopName}`
    : "http://localhost:3000/api/products";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    listProducts.innerHTML = "";

    if (data.length === 0) {
      listProducts.innerHTML = "<p>No products found in this shop.</p>";
      return;
    }
    data.forEach(({ name, price, image, shop }) => {
      const cardProduct = markupProductCard(name, price, image, shop);
      render(cardProduct);
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    listProducts.innerHTML = `<p style="color: red;">Oops! Something went wrong while loading products. Please try again later.</p>`;
  }
}

shopList.addEventListener("click", isSelectedShop);

function isSelectedShop(evt) {
    evt.preventDefault();
  const button = evt.target.closest(".shop-btn");

  if (!button || !evt.currentTarget.contains(button)) return;

  const selectedShop = button.dataset.shop || "";
  getProducts(selectedShop);
}

getProducts();

function markupProductCard(name, price, image, shop) {
    const cart = JSON.parse(localStorage.getItem("order")) || [];
    const isSelected = cart.some(item => item.name === name);

    const btnText = isSelected ? "In Cart" : "add to Cart";
    const btnDisabled = isSelected ? "disabled" : "";
    const btnClass = isSelected ? "add-btn is-selected" : "add-btn";

  return ` <li class="card" data-shop="${shop}">
              <img
                src="${image}"
                alt="${name}"
                width="200"
                class="image-card"
              />
              <h3 class="card-title">${name}</h3>
              <p class="cart-shop">${shop}</p>
              <p>Price: ${price}</p>
              <button class="${btnClass}" ${btnDisabled}>${btnText}</button>
            </li>`;
}

function render(product) {
  listProducts.insertAdjacentHTML("beforeend", product);
}

listProducts.addEventListener("click", (evt) => {
  const button = evt.target.closest(".add-btn");
  if (!button) return;

  const card = button.closest(".card");
  
  const product = {
    name: card.querySelector(".card-title").textContent,
    price: card.querySelector("p").textContent.split(": ")[1],
    image: card.querySelector(".image-card").src,
    shop: card.dataset.shop,
  };

  addToCart(product, button);
});

function addToCart(product, button) {
  let cart = JSON.parse(localStorage.getItem("order")) || [];

  if (cart.length > 0 && cart[0].shop !== product.shop) {
    alert("Please select products from the same shop or clear your cart!");
    return;
  }

  const isExist = cart.some(item => item.name === product.name);
  if (!isExist) {
    cart.push(product);
    localStorage.setItem("order", JSON.stringify(cart));
    
      button.textContent = "In Cart";
      button.disabled = true;
      button.classList.add('is-selected')
  }
}
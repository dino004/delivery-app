import { IProduct } from "./types.js";

const listProducts = document.querySelector(".list-menu") as HTMLUListElement;
const shopList = document.querySelector(".list-shops") as HTMLUListElement;
const addToCartBtn = document.querySelector(".add-btn") as HTMLButtonElement;

async function getProducts(shopName: string = "") {
  listProducts.innerHTML = "<p>Loading products...</p>";

  const url = shopName
    ? `https://delivery-app-backend-4w31.onrender.com/api/products?shop=${shopName}`
    : "https://delivery-app-backend-4w31.onrender.com/api/products";

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
    data.forEach(({ name, price, image, shop, _id }: IProduct) => {
      const cardProduct = markupProductCard(name, price, image, shop, _id);
      render(cardProduct);
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    listProducts.innerHTML = `<p style="color: red;">Oops! Something went wrong while loading products. Please try again later.</p>`;
  }
}

shopList.addEventListener("click", isSelectedShop);

function isSelectedShop(evt: Event) {
  evt.preventDefault();
  const target = evt.target as HTMLElement;
  const button = target.closest(".shop-btn") as HTMLButtonElement;

  if (!button) return;

  const selectedShop = button.dataset.shop || "";
  getProducts(selectedShop);
}

getProducts();

function markupProductCard(name: string, price: number, image: string, shop: string, id: string) {
  const cart = JSON.parse(localStorage.getItem("order") || "[]") as IProduct[];
  const isSelected = cart.some((item) => item.name === name);

  const btnText = isSelected ? "In Cart" : "add to Cart";
  const btnDisabled = isSelected ? "disabled" : "";
  const btnClass = isSelected ? "add-btn is-selected" : "add-btn";

  return ` <li class="card" data-shop="${shop}" data-id="${id}">
              <img
                src="${image}"
                alt="${name}"
                width="200"
                class="image-card"
              />
              <h3 class="card-title">${name}</h3>
              <p class="cart-shop">${shop}</p>
              <p class="price">Price: ${price}</p>
              <button class="${btnClass}" ${btnDisabled}>${btnText}</button>
            </li>`;
}

function render(product: string) {
  listProducts.insertAdjacentHTML("beforeend", product);
}

listProducts.addEventListener("click", (evt: Event) => {
  const target = evt.target as HTMLElement
  const button = target.closest(".add-btn") as HTMLButtonElement;
  if (!button) return;

  const card = button.closest(".card") as HTMLElement;
  if(!card) return

  const product: IProduct = {
    name: (card.querySelector(".card-title") as HTMLElement).textContent || '',
    price: Number((card.querySelector(".price") as HTMLElement).textContent?.split(": ")[1]) || 0,
    image: (card.querySelector(".image-card") as HTMLImageElement).src,
    shop: card.dataset.shop || '',
      _id: card.dataset.id || "",
    quantity: 1,
  };

  addToCart(product, button);
});

function addToCart(product: IProduct, button: HTMLButtonElement) {
  let cart = JSON.parse(localStorage.getItem("order") || "[]");

  if (cart.length > 0 && cart[0].shop !== product.shop) {
    alert("Please select products from the same shop or clear your cart!");
    return;
  }

  const isExist = cart.some((item: IProduct) => item.name === product.name);
  if (!isExist) {
    cart.push(product);
    localStorage.setItem("order", JSON.stringify(cart));

    button.textContent = "In Cart";
    button.disabled = true;
    button.classList.add("is-selected");
  }
}

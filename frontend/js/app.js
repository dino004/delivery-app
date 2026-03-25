const listProducts = document.querySelector(".list-menu");
const shopList = document.querySelector(".list-shops");

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
  const button = evt.target.closest(".shop-btn");

  if (!button || !evt.currentTarget.contains(button)) return;

  const selectedShop = button.dataset.shop || "";
  getProducts(selectedShop);
}

getProducts();

function markupProductCard(name, price, image, shop) {
  return ` <li class="card">
              <img
                src="${image}"
                alt="${name}"
                width="200"
                class="image-card"
              />
              <h3 class="card-title">${name} (from ${shop})</h3>
              <p>Price: ${price}</p>
              <button class="add-btn">add to Cart</button>
            </li>`;
}

function render(product) {
  listProducts.insertAdjacentHTML("beforeend", product);
}

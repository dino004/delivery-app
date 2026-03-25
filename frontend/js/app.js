const listProducts = document.querySelector(".list-menu");

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

getProducts()
  .then((item) => {
    item.forEach(({ name, price, image, shop }) => {
      const cardProduct = markupProductCard(name, price, image, shop);
      render(cardProduct);
    });
  })
  .catch((err) => console.log("Ошибка запроса:", err));

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

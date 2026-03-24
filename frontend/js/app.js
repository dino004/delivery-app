const listProducts = document.querySelector(".list-menu");

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

getProducts()
  .then((item) => {
    item.forEach(({ name, image }) => {
      const cardProduct = markupProductCard(name, image);
      render(cardProduct);
    });
  })
  .catch((err) => console.log("Ошибка запроса:", err));

function markupProductCard(name, image) {
  return ` <li class="card">
              <img
                src="${image}"
                alt="${name}"
                width="200"
                class="image-card"
              />
              <h3 class="card-title">${name}</h3>
              <button class="add-btn">add to Cart</button>
            </li>`;
}

function render(product) {
  listProducts.insertAdjacentHTML("beforeend", product);
}

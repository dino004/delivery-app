const form = document.querySelector("#form-order");
const listOrders = document.querySelector(".cart-list");
const totalPriceElement = document.querySelector("#total-val");

function getOrders() {
  const orders = JSON.parse(localStorage.getItem("order")) || [];
  if (orders.length === 0) {
    listOrders.innerHTML = "<h2>Your cart is empty. Go get some food!</h2>";
    return;
  }

  listOrders.innerHTML = "";
  let total = 0;

  orders.forEach(({ name, price, image }) => {
    total += Number(price);
    const cartHtml = markupOrders(name, price, image);
    renderListOrders(cartHtml);
  });

  upgradeTotalPrice(total);
}

function renderListOrders(html) {
  listOrders.insertAdjacentHTML("beforeend", html);
}

function upgradeTotalPrice(sum) {
  if (totalPriceElement) {
    totalPriceElement.textContent = `Total price: ${sum}`;
  }
}

function markupOrders(name, price, image) {
  return `<li class="cart-item">
                  <img
                    src="${image}"
                    alt="${name}"
                    width="150"
                    class="cart-item__img"
                  />
                  <div class="cart-item__info">
                    <h3>${name}</h3>
                    <p>Price: ${price}</p>
                    <input
                      type="number"
                      value="1"
                      min="1"
                      class="cart-item__input"
                      data-price="${price}"
                    />
                  </div>
                </li>`;
}

getOrders();

listOrders.addEventListener("input", (evt) => {
  if (evt.target.classList.contains("cart-item__input")) {
    recalculateTotal();
  }
});

function recalculateTotal() {
  const allInputs = document.querySelectorAll(".cart-item__input");
  let newTotal = 0;

  allInputs.forEach((input) => {
    const quantity = Number(input.value);
    const price = Number(input.dataset.price);

    newTotal += quantity * price;
  });

  upgradeTotalPrice(newTotal);
}

const clearBtn = document.querySelector(".clear-cart-btn");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("order");
    getOrders();
  });
}

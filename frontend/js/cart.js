const form = document.querySelector("#form-order");
const listOrders = document.querySelector(".cart-list");
const totalPriceElement = document.querySelector("#total-value");
const loader = document.querySelector(".lds-spinner");
const submitBtn = document.querySelector(".submit-btn");
function getOrders() {
    const orders = JSON.parse(localStorage.getItem("order") || "[]");
    if (orders.length === 0) {
        listOrders.innerHTML = "<h2>Your cart is empty. Go get some food!</h2>";
        return;
    }
    listOrders.innerHTML = "";
    let total = 0;
    orders.forEach((order) => {
        if (!order)
            return;
        const { name, price, image, _id, quantity } = order;
        const currentQuantity = quantity || 1;
        total += Number(price) * currentQuantity;
        const cartHtml = markupOrders(name, price, image, _id, currentQuantity);
        renderListOrders(cartHtml);
    });
    upgradeTotalPrice(total);
}
function renderListOrders(html) {
    listOrders.insertAdjacentHTML("beforeend", html);
}
function upgradeTotalPrice(sum) {
    if (totalPriceElement) {
        totalPriceElement.textContent = String(sum);
    }
}
function markupOrders(name, price, image, id, qty) {
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
                      value="${qty}"
                      min="1"
                      class="cart-item__input"
                      data-id="${id}"
                      data-price="${price}"
                    />
                  </div>
                  <button type="button" class="cart-item__remove" data-id="${id}">❌</button>
                </li>`;
}
getOrders();
listOrders.addEventListener("input", (evt) => {
    const target = evt.target;
    if (target.classList.contains("cart-item__input")) {
        const id = target.dataset.id;
        const newQuantity = Number(target.value);
        const arrOrders = JSON.parse(localStorage.getItem("order") || "[]");
        const updatedOrders = arrOrders.map((order) => {
            if (order._id === id) {
                return { ...order, quantity: newQuantity };
            }
            return order;
        });
        localStorage.setItem("order", JSON.stringify(updatedOrders));
        recalculateTotal();
    }
});
function recalculateTotal() {
    const allInputs = document.querySelectorAll(".cart-item__input");
    let newTotal = 0;
    allInputs.forEach((element) => {
        const input = element;
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
        totalPriceElement.textContent = "0";
        getOrders();
    });
}
function removeOrder(id) {
    const arrOrders = JSON.parse(localStorage.getItem("order") || "[]");
    const updatedOrders = arrOrders.filter((order) => order._id !== id);
    localStorage.setItem("order", JSON.stringify(updatedOrders));
    getOrders();
}
listOrders.addEventListener("click", (evt) => {
    const target = evt.target;
    const button = target.closest(".cart-item__remove");
    if (!button)
        return;
    const id = button.dataset.id;
    if (!id)
        return;
    removeOrder(id);
});
form.addEventListener("submit", handleSubmit);
async function handleSubmit(evt) {
    evt.preventDefault();
    loader.classList.remove("hidden");
    submitBtn.disabled = true;
    const customer = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value,
        address: document.querySelector("#address").value,
    };
    const rawItems = JSON.parse(localStorage.getItem("order") || "[]");
    const items = rawItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        shop: item.shop,
    }));
    const totalPrice = Number(document.querySelector("#total-value").textContent);
    const finalOrder = { customer, items, totalPrice };
    if (items.length === 0) {
        alert("Your cart is empty. Add some food first!");
        loader.classList.add("hidden");
        submitBtn.disabled = false;
        return;
    }
    const options = {
        method: "POST",
        body: JSON.stringify(finalOrder),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    };
    try {
        const responses = await fetch("https://delivery-app-backend-4w31.onrender.com/api/orders", options);
        if (!responses.ok) {
            throw new Error(`Server error: ${responses.status}`);
        }
        const responseData = await responses.json();
        alert("Order created successfully!");
        console.log("Saved order:", responseData);
        localStorage.removeItem("order");
        form.reset();
        getOrders();
    }
    catch (error) {
        console.error("Failed to submit order:", error);
        alert("Oops! Something went wrong while sending your order.");
    }
    finally {
        loader.classList.add("hidden");
        submitBtn.disabled = false;
    }
}
export {};

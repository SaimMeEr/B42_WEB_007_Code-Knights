function getCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart : [];
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cart = getCartFromLocalStorage();
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="actions">
                    <button onclick="removeItemFromCart(${index})">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
    }

    updateCartSummary();
}

function updateCartSummary() {
    const cart = getCartFromLocalStorage();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById("total-items").innerText = totalItems;
    document.getElementById("total-price").innerText = totalPrice;
}

function removeItemFromCart(index) {
    const cart = getCartFromLocalStorage();
    cart.splice(index, 1);
    saveCartToLocalStorage(cart);
    renderCartItems();
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.getElementById("checkout-button").addEventListener("click", function() {
    const cart = getCartFromLocalStorage();
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Proceeding to checkout...");
    }
});

renderCartItems();

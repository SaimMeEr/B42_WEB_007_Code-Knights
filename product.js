function getProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        price: params.get("price"),
        image: params.get("image")
    };
}

function displayProductDetails() {
    const product = getProductFromURL();
    const productDetailsContainer = document.querySelector('.product-details');

    productDetailsContainer.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart({
            name: '${product.name}', 
            price: ${product.price}, 
            quantity: 1, 
            image: '${product.image}'
        })">Add to Cart</button>
    `;
}

function addToCart(item) {
    const cart = getCartFromLocalStorage();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }

    saveCartToLocalStorage(cart);
    alert(`${item.name} added to cart!`);
}

function getCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart : [];
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

displayProductDetails();

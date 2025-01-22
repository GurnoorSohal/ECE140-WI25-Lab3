document.addEventListener("DOMContentLoaded", function() {
    // Global variables
    let productPrice = 0;
    let quantity = 0;

    // Debug logging
    function logDebug(message) {
        const debugLog = document.getElementById('debug-log');
        const timestamp = new Date().toLocaleTimeString();
        debugLog.textContent = `[${timestamp}] ${message}\n` + debugLog.textContent;
    }

    // Initialize price (with bug!)
    async function initializePrice() {
        logDebug('Starting price initialization...');
        
        // Bug:
        try {
            const response = await fetch ('/api/price')
            const data = await response.json();
            productPrice = data.price;
            document.getElementById('product-price').textContent = productPrice.toFixed(2);
            logDebug(`Price initialized to: $${productPrice}`);
            updateTotal();
        }
        catch (error) {
            logDebug('Error initializing price: ${productPrice}');
        }
        logDebug('Price initialization function completed');
    }

    function increaseQuantity() {
        quantity++;
        updateDisplay();
        logDebug(`Quantity increased to ${quantity}`);
    }

    function decreaseQuantity() {
        if (quantity > 0) {
            quantity--;
            updateDisplay();
            logDebug(`Quantity decreased to ${quantity}`);
        }
    }

    function updateDisplay() {
        document.getElementById('quantity').textContent = quantity;
        updateTotal();
    }

    function updateTotal() {
        const total = quantity * productPrice;
        document.getElementById('total').textContent = total.toFixed(2);
        logDebug(`Total updated to: $${total}`);
    }

    window.increaseQuantity = increaseQuantity;
    window.decreaseQuantity = decreaseQuantity;

    // Initialize the page
    logDebug('Page initialization started');
    initializePrice();
    updateDisplay();
});
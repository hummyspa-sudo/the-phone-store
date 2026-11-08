import promptSync from "prompt-sync";
import {
    createCustomer,
    getCustomerById,
    insertOrder,
    insertStockAlert,
    showAllProducts,
    showNewProducts,
    showNoStockProducts,
    getCustomerOrders,
    getOrderLinesByOrder,
    processReturn,
    getAllOrderDetails
} from "./data.js";

const prompt = promptSync();

// show all products function
export function showProductMenu(){
    const product = showAllProducts()

    // Guard Clause
    if (!product || product.length === 0) {
        console.log("\nProduct not found.");
        return;
    }
    // Show Selected Columns
        console.log("\n--- All Products ---")
    for(const item of product) {
        const stockStatus = item.stock > 0 ? "" : "(UITVERKOCHT)";
        console.log(`${item.id}.${item.product_name} - € ${Number(item.price).toFixed(2)} ${stockStatus}`)
    }


    while (true) {
        const input = prompt("\nWhat product would you like to purchase? (enter ID): ");
        const productId = Number(input); // String to Number

        // search product based on product ID
       const selectedProduct = product.find((item) => item.id === productId);

       if (!selectedProduct) {
            console.log("Product not found. Please provide a valid product ID.");
            continue;
       }

       if(selectedProduct.stock<= 0){
           console.log("This products it not available at the moment.")
           console.log("Go to the help menu to register for a stock alert.")
           break
       }

        console.log(`Purchase this product: ${selectedProduct.product_name}`);
        const makePurchaseChoice = prompt("y/n:");

        if(makePurchaseChoice === "y"){
            console.log("Product added to cart!");
            cart.push(selectedProduct);
            return;
        }else if (makePurchaseChoice === "n"){
            console.log("Product removed.");
            return;
        }
    }

}

//show new products function
export function showNewProductMenu() {
    const product = showNewProducts()

    // Guard Clause
    if (!product || product.length === 0) {
        console.log("\nProduct not found.");
        return;
    }

        console.log("\n--- New Products ---")
    for (const newItem of product) {
        const stockStatus = newItem.stock > 0 ? "" : "(UITVERKOCHT)";
        console.log(`${newItem.id}.${newItem.product_name} - € ${Number(newItem.price).toFixed(2)} ${stockStatus}`)
        }


    while (true) {
        const input = prompt("\nWhat product would you like to purchase? (enter ID): ");
        const productId = Number(input); // String to Number

        // search product based on product ID
        const selectedProduct = product.find((item) => item.id === productId);

        if (!selectedProduct) {
            console.log("Product not found. Please provide a valid product ID.");
            continue;
        }

        if(selectedProduct.stock<= 0){
            console.log("This products it not available at the moment.")
            console.log("Go to the help menu to register for a stock alert.")
            break;
        }

        console.log(`Purchase this product: ${selectedProduct.product_name}`);
        const makePurchaseChoice = prompt("y/n:");

        if(makePurchaseChoice === "y"){
            console.log("Product added to cart!");
            cart.push(selectedProduct);
            return;
        }else if (makePurchaseChoice === "n"){
            console.log("Product removed.");
            return;
        }
    }

}

const cart = [] // shoppingCart array

function getOrCreateCustomerId() {
    console.log("\nCustomer Details for Order:");
    console.log("1. Existing customer (enter customer ID)");
    console.log("2. Register new customer");

    const option =  Number(prompt("Choose an option (1 or 2):"))

    if (option === 1){
        while (true) {
            const idInput = Number(prompt("Enter your customer ID:"))
            if(idInput === 0 ) return null;


            const customer = getCustomerById(idInput)

            if(customer){
                console.log(`Welcome back, ${customer.voornaam} ${customer.achternaam}!`)
                return customer.id
            }
            console.log("Customer ID not found in the database. Please try again.")
        }
    } else if(option === 2){
        console.log("\n--- Register New Customer ---");
        const voornaam = prompt("First name: ");
        const achternaam = prompt("Last name: ");
        const email = prompt("Email address: ");

        if(!voornaam.trim() || !achternaam.trim() || !email.trim()){
            console.log("Registration canceled: all fields are required.")
            return null
        }

        const newId = createCustomer(voornaam.trim(), achternaam.trim(), email.trim());
        console.log(`customer successfully registered! Your customer ID is: ${newId}`)
    } else{
        console.log(" Invalid choice.");
        return null
    }
}


export function showCartMenu(cart){
    console.log("\n--- Your Shopping Cart ---")

    if (!cart || cart.length === 0){
        console.log("Your Shopping cart is currently empty");
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const price = Number(item.price);
        console.log(`${index +1}. ${item.product_name} - €${price.toFixed(2)}`);
        total += price
    });

    console.log("----------------------");
    console.log(`Total items: ${cart.length}`);
    console.log(`Total amount: ${total.toFixed(2)}`);

    let running = true

    while (running) {
        console.log(`
        1. Checkout (Confirm purchase)
        2. Clear cart
        3. Back to main menu`)


        const choice = Number(prompt("Please make a choice: (1-3):"))

        if (choice === 1){

            const customerId = getOrCreateCustomerId();

            if (!customerId){
                console.log("\nCheckout canceled")
                return;
            }
            const confirm = prompt("\nConfirm purchase and place order? (y/n):")

            if(confirm === "y"){
                const orderID = insertOrder(customerId, cart);

                console.log(`\n Order successfully Placed!`);
                console.log(`Your order number is: #${orderID}`)

                cart.length = 0;
                running = false
            }else{
                console.log("\n Checkout canceled.")
            }
        } else if (choice === 2){
            cart.length = 0;
            console.log("\nShopping cart has been cleared")
            running = false
        }else if (choice === 3){
            running = false
        }

    }

}

export function showHelpMenu(){

    console.log("\n--- Help ---")

    let running = true

    while (running){
        console.log(`
    1. Leave a review?
    2. Get a stock alert
    3. Return a product`)

        const choice = Number(prompt("Please make a choice: (1-3):"))

        if (choice === 1){
            const review = prompt("Please write your review: ");

            if (review === "") {
                console.log("Review canceled (empty input).");
            } else {
                console.log("\nThank you for your feedback!");

                console.log(`Your review: ${review}`);
            }

        }else if (choice === 2) {
            console.log("\n--- Register for Stock Alert ---");

            const product = showNoStockProducts()

            // Guard Clause
            if (!product || product.length === 0) {
                console.log("\nProduct not found.");
                return;
            }

            console.log("\n--- All Products with no stock ---")
            for(const stockAlertItem of product) {
                console.log(`${stockAlertItem.id}.${stockAlertItem.product_name} - € ${Number(stockAlertItem.price).toFixed(2)}`)
            }

            while (true){
                const input = prompt("\nWhat product would you like to receive an alert for? (enter ID): ");

                const productId = Number(input);
                const selectedProduct = product.find((item) => item.id === productId);

                if (!selectedProduct){
                    console.log("Product not found. Please try again.");
                    continue;
                }

                console.log(`Get an alert when: ${selectedProduct.product_name} is available `);

                const stockAlertChoice = prompt("y/n:");

                if (stockAlertChoice === "n" ){
                    console.log("stock alert cancelt")
                    break;
                } else if (stockAlertChoice === "y"){

                   const customerId = getOrCreateCustomerId()

                    if(customerId){
                        insertStockAlert(customerId,productId,true);
                        console.log(`Alert preference saved, You will be notified when it is back in stock.`)
                        return true;
                    }
                } else {
                    console.log("Invalide choice")
                }
            }

        } else if (choice === 3) {
            console.log("\n--- Return a product ---");

            const customerId = getOrCreateCustomerId();
            if (!customerId) {
                console.log("Return canceled.");
                continue;
            }

            const orders = getCustomerOrders(customerId);

            if (!orders || orders.length === 0) {
                console.log("\nWe could not find any past orders for your account.");
                continue;
            }

            console.log("\nYour Orders:");
            for (const order of orders) {
                console.log(`[Order ID: ${order.order_id}] - Date: ${order.order_date}`);
            }

            const orderInput = prompt("Enter the Order ID you want to view (or 'c' to cancel): ");
            if (orderInput.trim().toLowerCase() === "c") continue;

            const selectedOrderId = Number(orderInput);
            const selectedOrder = orders.find((o) => o.order_id === selectedOrderId);

            if (!selectedOrder) {
                console.log("Invalid Order ID. Please try again.");
                continue;
            }

            const orderLines = getOrderLinesByOrder(selectedOrderId);

            if (!orderLines || orderLines.length === 0) {
                console.log("\nThis order is empty or already fully returned.");
                continue;
            }

            console.log(`\nProducts in Order ${selectedOrderId}:`);
            for (let i = 0; i < orderLines.length; i++) {
                const item = orderLines[i];

                console.log(`${i + 1}. ${item.product_name} (€${Number(item.price).toFixed(2)})`);
            }

            const productInput = prompt("Enter the number of the product you want to return (or 'c' to cancel): ");
            if (productInput.trim().toLowerCase() === "c") continue;

            const productIndex = Number(productInput) - 1;
            const selectedPurchase = orderLines[productIndex];

            if (!selectedPurchase) {
                console.log("Invalid choice. Return canceled.");
                continue;
            }

            console.log(`\nYou are about to return: ${selectedPurchase.product_name}`);
            const confirm = prompt("Are you sure? (y/n): ").trim().toLowerCase();

            if (confirm === "y") {

                processReturn(selectedPurchase.order_line_id, selectedPurchase.product_id);
                console.log("✓ Product successfully returned. The refund will be processed shortly.");
                return true;
            } else {
                console.log("Return canceled.");
            }


        }



    }



}

export function showAdminMenu(){
    while (true) {
        console.log("\n--- Admin Center ---");
        console.log("1. View all orders");
        console.log("2. Back to main menu");

        const choice = Number(prompt("Please make a choice (1-2): "))

        if (choice === 1){
        const orders = getAllOrderDetails()

            if(orders.length === 0){
                console.log("No orders found in the system")
                continue;
            }
            console.log("\n --- All Orders Overview ---");

            console.table(orders)

        }else if (choice === 2 || choice.toLowerCase() === "c"){
            break;
        }else {
            console.log("Invalid choice. Please try again.")
        }
    }


}


//Main Menu function
export function startShop() {

    let running = true

    while ( running) {
        let welcomeMessage = " Welkom to ThePhoneStore.nl"
        console.log(`\n${welcomeMessage}`)

        console.log(`\n=== Menu ===
          1. All products
          2. New items
          3. Shopping cart 
          4. Help
          5. Exit Shop
          6. Admin`)


        let choice = Number(prompt(`Please make a choice:`))

        if (choice === 1){
            showProductMenu()

        } else if (choice === 2){
            showNewProductMenu()

        }else if (choice === 3){
            showCartMenu(cart);

        }else if(choice === 4)
            showHelpMenu(showAllProducts);

        else if(choice === 5) {
            console.log(" Thank U for doing business with us!")
            running = false
        }else if (choice === 6)
            showAdminMenu();

    }
}


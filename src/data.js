import Database from "better-sqlite3";

const db = new Database('ThePhoneStore.db');
db.pragma('foreign_keys = ON');

export function showAllProducts() {
    return db.prepare('SELECT * FROM product').all(); // can only ask for the data. needs to provide data to who is asking for it

}

export function showNewProducts(){
    return db.prepare('SELECT * FROM product WHERE is_new = ?').all(1)
}

export function showNoStockProducts(){
    return db.prepare('SELECT * FROM product WHERE stock = ?').all(0)
}


export function createCustomer(voornaam, achternaam, email){
    const stmt =db.prepare("INSERT INTO customer (voornaam, achternaam, email) values (?,?,?)");
    const result = stmt.run(voornaam, achternaam, email);
    return result.lastInsertRowid;
}

export function getCustomerById(id) {
    return db.prepare("SELECT * FROM customer WHERE id = ?").get(id)
}

export function insertOrder(customerId, cart) {
    const today = new Date().toISOString().split('T')[0];

    const orderStmt = db.prepare("INSERT INTO orders (customer_id, order_date) VALUES (?, ?)");
    const orderResult = orderStmt.run(customerId, today);
    const newOrderId = orderResult.lastInsertRowid;

    const lineStmt = db.prepare("INSERT INTO order_line (order_id, product_id, quantity) VALUES (?, ?, ?)");
    const stockStmt = db.prepare("UPDATE product SET stock = stock - 1 WHERE id = ? AND stock > 0");

    for (const item of cart) {
        lineStmt.run(newOrderId, item.id, 1);
        stockStmt.run(item.id);
    }

    return newOrderId;
}

export function insertStockAlert (customerId, productId, notified ) {
    const stmt = db.prepare(`
    INSERT INTO stock_alert (customer_id, product_id, notified) VALUES (?, ?, ?)
    `);

    const status = notified ? 1:0;

    const result = stmt.run(customerId, productId, status)
    return result.lastInsertRowid;
}

export function getCustomerOrders(customerId) {
    const stmt = db.prepare(`
        SELECT id AS order_id, order_date
        FROM orders
        WHERE customer_id = ?
    `);
    return stmt.all(customerId);
}

export function getOrderLinesByOrder(orderId) {
    const stmt = db.prepare(`
        SELECT order_line.id AS order_line_id, product.id AS product_id, product.product_name, product.price
        FROM order_line
        JOIN product ON order_line.product_id = product.id
        WHERE order_line.order_id = ?
    `);
    return stmt.all(orderId);
}

export function processReturn(orderLineId, productId) {
    const deleteStmt = db.prepare(`DELETE FROM order_line WHERE id = ?`);
    deleteStmt.run(orderLineId);

    const stockStmt = db.prepare(`UPDATE product SET stock = stock + 1 WHERE id = ?`);
    stockStmt.run(productId);

    const cleanupStmt = db.prepare(`
        DELETE FROM orders 
        WHERE id NOT IN (SELECT order_id FROM order_line)
    `);
    cleanupStmt.run();
}


export function getAllOrderDetails() {
    const stmt = db.prepare(`SELECT * FROM order_details_overview`);
    return stmt.all();
}
CREATE TABLE customer (
    id INTEGER PRIMARY KEY,
    voornaam VARCHAR NOT NULL,
    achternaam VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL
);


CREATE TABLE product (
    id INTEGER PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    brand VARCHAR NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL,
    is_new INTEGER DEFAULT 0
);


CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY ( customer_id) REFERENCES customer(id)
);

CREATE TABLE order_line (
    id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE stock_alert (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    notified INTEGER DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
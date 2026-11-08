-- insert customers
INSERT INTO customer VALUES (001, 'Kees', 'Bos', 'kees.bos@fake.nl');
INSERT INTO customer VALUES (002, 'Mark', 'Schaap', 'Mark.schaap@fake.nl');
INSERT INTO customer VALUES (003, 'Schoen', 'Coos', 'Schoen.Coos@fake.nl');
INSERT INTO customer VALUES (004, 'Jos', 'Dekker', 'Jos.Dekker@fake.nl');
INSERT INTO customer VALUES (005, 'Peter', 'Smit', 'Peter.Smit@fake.nl');
INSERT INTO customer VALUES (006, 'Marko', 'Roterman', 'Marko.Roterman@fake.nl');
INSERT INTO customer VALUES (007, 'Stefan', 'Schaap', 'Stefan.schaap@fake.nl');
INSERT INTO customer VALUES (008, 'Amber', 'Coos', 'Amber.Coos@fake.nl');
INSERT INTO customer VALUES (009, 'Jos', 'Stefans', 'Jos.Stefans@fake.nl');
INSERT INTO customer VALUES (010, 'Paul', 'Klaas', 'Paul.Klaas@fake.nl');


--insert products
INSERT INTO product VALUES (01, 'iPhone 17 silicone case','case','Apple','10.99','0',1);
INSERT INTO product VALUES (02, 'iPhone 18 silicone case','case','Apple','13.99','1100',1);
INSERT INTO product VALUES (03, 'Samsung Galaxy S26 silicone case','case','Samsung','8.99','0',1);
INSERT INTO product VALUES (04, 'Samsung Galaxy S26 Ultra silicone case','case','Samsung','9.99','1000',0);
INSERT INTO product VALUES (05, 'Samsung Charger','charger','Samsung','25.99','500',0);
INSERT INTO product VALUES (06, 'Apple Charger','charger','Apple','25.99','750',0);


--insert Order_line
INSERT INTO order_line VALUES (987,3434,02,2);
INSERT INTO order_line VALUES (986,3434,06,1);
INSERT INTO order_line VALUES (638,2343,05,1);
INSERT INTO order_line VALUES (640,6482,06,1);
INSERT INTO order_line VALUES (343,7583,02,1);
INSERT INTO order_line VALUES (454,8967,02,1);

--insert orders
INSERT INTO orders VALUES (3434,010,'2026-06-18');
INSERT INTO orders VALUES (2343,004,'2026-06-22');
INSERT INTO orders VALUES (6482,006,'2026-06-24');
INSERT INTO orders VALUES (7583,001,'2026-06-29');
INSERT INTO orders VALUES (8967,003,'2026-06-29');


INSERT INTO stock_alert VALUES (76489,003,'1',1);
INSERT INTO stock_alert VALUES (53863,006,'3',1);
INSERT INTO stock_alert VALUES (15264,002,'3',1);
INSERT INTO stock_alert VALUES (67358,005,'1',0);
INSERT INTO stock_alert VALUES (67343,008,'1',1);


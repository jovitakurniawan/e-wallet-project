# INSTRUCTION: SELECT ALL THE CODE AND PRESS THE FIRST LIGHTNING ICON 

# Drop database 
DROP DATABASE IF EXISTS db_moneyapp;

# Create Money App DB 
CREATE DATABASE  IF NOT EXISTS db_moneyapp;

# Use Money App DB 
USE db_moneyapp;

# Create tb_user 
CREATE TABLE IF NOT EXISTS tb_user (
	user_id INT NOT NULL AUTO_INCREMENT, 
    email_address VARCHAR(255) NOT NULL, 
    user_password VARCHAR(128) NOT NULL, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_no CHAR(8) NOT NULL, 
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id), 
    UNIQUE KEY (email_address),
    UNIQUE KEY (phone_no)
); 

# Test table 
# DESCRIBE tb_user;
# DROP TABLE tb_user;

# Create tb_balance 
CREATE TABLE IF NOT EXISTS tb_balance (
	balance_id INT NOT NULL AUTO_INCREMENT, 
	user_id INT NOT NULL, 
	current_balance FLOAT UNSIGNED NOT NULL DEFAULT 0,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (balance_id), 
    FOREIGN KEY (user_id) REFERENCES tb_user (user_id)
); 



# Create tb_topup 
CREATE TABLE IF NOT EXISTS tb_topup (
	topup_id INT NOT NULL AUTO_INCREMENT, 
    user_id INT NOT NULL,
    topup_amt FLOAT UNSIGNED NOT NULL,
    topup_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    balance_id INT NOT NULL, 
	PRIMARY KEY (topup_id), 
    FOREIGN KEY (balance_id) REFERENCES tb_balance (balance_id)
); 

# create tb_withdraw
CREATE TABLE IF NOT EXISTS tb_withdraw (
	withdraw_id INT NOT NULL AUTO_INCREMENT, 
    user_id INT NOT NULL,
    withdraw_amt FLOAT UNSIGNED NOT NULL,
    withdraw_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    balance_id INT NOT NULL, 
	PRIMARY KEY (withdraw_id), 
    FOREIGN KEY (balance_id) REFERENCES tb_balance (balance_id)
); 

# Create tb_transfer 
CREATE TABLE IF NOT EXISTS tb_transfer (
	transfer_id INT NOT NULL AUTO_INCREMENT, 
    transfer_amt FLOAT NOT NULL, 
    sender_id INT NOT NULL, 
    sender_phone_no CHAR(8) NOT NULL,
    recipient_id INT NOT NULL, 
    recipient_phone_no CHAR(8) NOT NULL, 
    sender_balance_id INT NOT NULL, 
    recipient_balance_id INT NOT NULL, 
	transfer_message VARCHAR(500) NULL, 
    transfer_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (transfer_id),
    FOREIGN KEY (recipient_id) REFERENCES tb_user (user_id),
    FOREIGN KEY (recipient_balance_id) REFERENCES tb_balance (balance_id),
	FOREIGN KEY (sender_id) REFERENCES tb_user (user_id),
    FOREIGN KEY (sender_balance_id) REFERENCES tb_balance (balance_id)
); 

# Insert Mock Data into tb_user 
INSERT INTO tb_user (user_id, email_address, user_password, first_name, last_name, phone_no)
VALUES 
(1, 'johnmatthew@gmail.com', '1234567', 'John', 'Matthew', '89673213'), 
(2, 'janescott@gmail.com', '456789', 'Jane', 'Scott', '99448822'),
(3, 'pambeesly@gmail.com', '28492919', 'Pam', 'Beesly', '99776655'),
(4, 'jimhalpert@outlook.com', 'helloworld', 'Jim', 'Halper', '99882222'),
(5, 'dwightschrutte@yahoo.com', 'byeworld', 'Dwight', 'Schrutte', '88743823');

# Check Unique keys 
# INSERT INTO tb_user (user_id, email_address, user_password, first_name, last_name, phone_no)
# VALUES 
# (6, 'dwightschrutte@gmail.com', 'byeworld', 'Dwight', 'Schrutte', '88743823'),
# (7, 'janescott@gmail.com', 'byeworld', 'Dwight', 'Schrutte', '88743823');

# Show all data in tb_user 
# SELECT * FROM tb_user;



# Test table 
# DESCRIBE tb_balance;
# DROP TABLE tb_balance;

# Insert Mock Data into tb_balance
INSERT INTO tb_balance (balance_id, user_id, current_balance)
VALUES (1, 1, 200);

INSERT INTO tb_balance (balance_id, user_id, current_balance)
VALUES (2, 2, 100);


# Show all data in tb_balance
# SELECT * FROM tb_balance; 


# Test table 
# DESCRIBE tb_topup;
# DROP TABLE tb_topup;

# Insert Mock Data into tb_topup
INSERT INTO tb_topup (topup_id, user_id, topup_amt, balance_id)
VALUES 
(1, 1, 12, 1), 
(2, 2, 2, 2);

# Show first 10 data in tb_topup

# Insert Mock Data into tb_withdraw 
INSERT INTO tb_withdraw (topup_id, user_id, topup_amt, balance_id)
VALUES 
(1, 1, 12, 1), 
(2, 2, 22, 2);

    
# Consider adding first & last name into transfer table 
    
# Test table 
# DESCRIBE tb_transfer;
# DROP TABLE tb_transfer;


# Insert Mock Data into tb_transfer
INSERT INTO tb_transfer (transfer_id, transfer_amt, sender_id, sender_phone_no, recipient_id, recipient_phone_no, sender_balance_id, recipient_balance_id, transfer_message) 
VALUES 
(1, 10, 1, '89673213', 2, '99448822', 1, 2, 'food'), 
(2, 20, 2, '99448822', 3, '99776655', 2, 1, 'present');


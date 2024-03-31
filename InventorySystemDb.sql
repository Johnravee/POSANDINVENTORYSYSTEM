CREATE TABLE `company_accounts`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `employee_id` VARCHAR(255) NOT NULL,
    `fullname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `contact_number` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `job_position` VARCHAR(255) NOT NULL,
    `dateofbirth` VARCHAR(255) NOT NULL,
    `Invoice_number` VARCHAR(255) NULL
);
ALTER TABLE
    `company_accounts` ADD UNIQUE `company_accounts_employee_id_unique`(`employee_id`);
ALTER TABLE
    `company_accounts` ADD UNIQUE `company_accounts_email_unique`(`email`);
CREATE TABLE `pos_products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_image` BLOB NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `product_price` VARCHAR(255) NOT NULL,
    `product_stocks` VARCHAR(255) NOT NULL,
    `product_category` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `pos_products` ADD UNIQUE `pos_products_product_name_unique`(`product_name`);
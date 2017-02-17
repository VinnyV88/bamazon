var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect();

function productsForSale() {

    connection.query('SELECT id, product_name, price, stock_quantity from products', function(error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
};

function lowInventory() {

    connection.query('SELECT id, product_name, price, stock_quantity from products where stock_quantity < 5', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) console.table(results);
        else console.log("There are no low inventory items to view.")
    });
};

function addInventory() {
    connection.query('SELECT id, product_name, stock_quantity from products', function(error, results, fields) {
        if (error) throw error;
        console.table(results);
        setTimeout(function() {
            inquirer.prompt(
                [{
                        type: "input",
                        name: "id",
                        message: "Add more inventory to id: "
                    },
                    {
                        type: "input",
                        name: "quantity",
                        message: "Units: "
                    }
                ]
            ).then(function(data) {
                connection.query('UPDATE products SET stock_quantity = stock_quantity + ? where id = ?', [data.quantity, data.id], function(error, results, fields) {
                    if (error) throw error;
                    console.log("Inventory Updated");
                    connection.query('SELECT id, product_name, stock_quantity from products where id = ?', [data.id], function(error, results, fields) {
                        if (error) throw error;
                        console.table(results);
                    });

                });
            });
        }, .5 * 1000);
    });
};

function addProduct() {
    inquirer.prompt(
        [{
                type: "input",
                name: "prodName",
                message: "Product Name: "
            },
            {
                type: "input",
                name: "id",
                message: "Department Id: "
            },
            {
                type: "input",
                name: "price",
                message: "Price: "
            },
            {
                type: "input",
                name: "quan",
                message: "Stock Qauntity: "
            }


        ]
    ).then(function(data) {
        connection.query('INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES (?, ?, ?, ?)', [data.prodName, data.id, data.price, data.quan], function(error, results, fields) {
            if (error) throw error;
            console.log("Product added");
            connection.query('SELECT * from products', function(error, results, fields) {
                if (error) throw error;
                console.table(results);
            });

        });
    });
};

//-------------------------program starts executing here----------------------------

inquirer.prompt(
    [{
        type: "list",
        name: "choice",
        message: "Manager's Menu",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]
).then(function(data) {
    switch (data.choice) {
        case "View Products for Sale":
            productsForSale();
            break;
        case "View Low Inventory":
            lowInventory();
            break;
        case "Add to Inventory":
            addInventory();
            break;
        case "Add New Product":
            addProduct();
            break;
    }
});
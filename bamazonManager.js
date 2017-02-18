var mysql = require('mysql');
var inquirer = require('inquirer');
var figlet = require('figlet');
var chalk = require('chalk');


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
        process.stdout.write('\n\n');
        console.table(results);
    });
    setTimeout(function() {
        process.exit();
    }, .5 * 1000);

};

function lowInventory() {
    connection.query('SELECT id, product_name, price, stock_quantity from products where stock_quantity < 5', function(error, results, fields) {
        if (error) throw error;
        process.stdout.write('\n\n');
        if (results.length > 0) console.table(results);
        else console.log("There are no low inventory items to view.")
    });
    setTimeout(function() {
        process.exit();
    }, .5 * 1000);

};

function addInventory() {
    connection.query('SELECT id, product_name, stock_quantity from products', function(error, results, fields) {
        if (error) throw error;
        process.stdout.write('\n\n');
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
                    process.stdout.write('\n');
                    console.log("Inventory Updated");
                    connection.query('SELECT id, product_name, stock_quantity from products where id = ?', [data.id], function(error, results, fields) {
                        if (error) throw error;
                        process.stdout.write('\n');
                        console.table(results);
                        setTimeout(function() {
                            process.exit();
                        }, .5 * 1000);

                    });

                });
            });
        }, .5 * 1000);
    });
};

function addProduct() {
    process.stdout.write('\n\n');
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
            process.stdout.write('\n\n');
            console.log("Product added");
            connection.query('SELECT * from products', function(error, results, fields) {
                if (error) throw error;
                process.stdout.write('\n\n');
                console.table(results);
                setTimeout(function() {
                    process.exit();
                }, .5 * 1000);

            });

        });
    });
};

//-------------------------program starts executing here----------------------------
//clear the terminal
process.stdout.write('\x1Bc');
figlet('BAMAZON  -  MANAGER', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.bold.magenta(data));
});
setTimeout(function() {

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
}, .5 * 1000);
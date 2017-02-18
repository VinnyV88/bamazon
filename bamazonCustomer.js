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

function placeOrder(id, quantity) {
    var quanAvail;
    var quan = parseInt(quantity);
    var price;
    var cost;
    var prodName;


    connection.query('SELECT stock_quantity, price, product_name from products where id = ?', [id], function(error, results, fields) {
        if (error) throw error;
        quanAvail = parseInt(results[0].stock_quantity);
        price = parseFloat(results[0].price);
        prodName = results[0].product_name;

        if (quanAvail < quan) {
            console.log("Sorry, we do not have enough stock for that order. Quantity available: " + quanAvail)
            setTimeout(function() {
                process.exit();
            }, .5 * 1000);

        } else {
            cost = (quan * price).toFixed(2);
            connection.query('UPDATE products SET stock_quantity = stock_quantity - ? where id = ?', [quan, id], function(error, results, fields) {
                if (error) throw error;
                process.stdout.write('\n\n');
                console.log("Your order has been placed for " + quan + " unit(s) of " + prodName + ". " + "Your total came out to: $" + cost);
            });

            connection.query('INSERT INTO sales (product_id, quantity_purchased) VALUES (?, ?)', [id, quan], function(error, results, fields) {
                if (error) throw error;
                setTimeout(function() {
                    process.exit();
                }, .5 * 1000);

            });
        }
    });
};

//-------------------------program starts executing here----------------------------
//clear the terminal
process.stdout.write('\x1Bc');
figlet('BAMAZON  -  CUSTOMER', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.bold.yellow(data));
});
setTimeout(function() {

    connection.query('SELECT id, product_name, price from products', function(error, results, fields) {
        if (error) throw error;
        console.table(results);
        inquirer.prompt(
            [{
                    type: "input",
                    name: "id",
                    message: "Please provide the id number of the product you would like to buy: "
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "How many units would you like to purchase: "
                }
            ]
        ).then(function(data) {
            placeOrder(data.id, data.quantity);
        });
    });
}, .5 * 1000);
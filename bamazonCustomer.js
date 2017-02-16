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

function placeOrder(id, quantity) {
  var quanAvail;
  var quan = parseInt(quantity);
  var price;
  var cost;


  connection.query('SELECT stock_quantity, price from products where id = ?', [id], function (error, results, fields) {
    if (error) throw error;
    quanAvail = parseInt(results[0].stock_quantity);
    price = parseFloat(results[0].price);

    if (quanAvail < quan) {
      console.log("Sorry, we do not have enough stock for that order. Quantity available: " + quanAvail)
    } else {

      cost = quan * price;
      connection.query('UPDATE products SET stock_quantity = stock_quantity - ? where id = ?', [quan, id], function (error, results, fields) {
        if (error) throw error;
        console.log("Your order has been placed. Your total came out to: $" + cost);
      });

      connection.query('INSERT INTO sales (product_id, quantity_purchased) VALUES (?, ?)', [id, quan], function (error, results, fields) {
        if (error) throw error;
      });
    }
  });
};

connection.query('SELECT id, product_name, price from products', function (error, results, fields) {
  if (error) throw error;
  console.table(results);
});

setTimeout(function () {
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
  ).then(function (data) {
    placeOrder(data.id, data.quantity);
  });
}, .5 * 1000);
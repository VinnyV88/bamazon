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

function productSalesByDept() {
    process.stdout.write('\n\n');

    connection.query('SELECT d.id, d.department_name, d.over_head_costs, SUM(s.quantity_purchased  * p.price) as product_sales, (SUM(s.quantity_purchased * p.price) - d.over_head_costs) as total_profit from departments d, products p, sales s where d.id = p.department_id and p.id = s.product_id group by  d.id, d.department_name, d.over_head_costs', function(error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
    setTimeout(function() {
        process.exit();
    }, .5 * 1000);

};

function createNewDept() {
    process.stdout.write('\n\n');

    inquirer.prompt(
        [{
                type: "input",
                name: "deptName",
                message: "Department Name: "
            },
            {
                type: "input",
                name: "overhead",
                message: "Over Head Cost: "
            }
        ]
    ).then(function(data) {
        connection.query('INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)', [data.deptName, data.overhead], function(error, results, fields) {
            if (error) throw error;
            process.stdout.write('\n');
            console.log("Department added");
            connection.query('SELECT * from departments', function(error, results, fields) {
                if (error) throw error;
                process.stdout.write('\n');
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
figlet('BAMAZON  -  SUPERVISOR', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.bold.blue(data));
});
setTimeout(function() {

    inquirer.prompt(
        [{
            type: "list",
            name: "choice",
            message: "Supervisor's Menu",
            choices: ["View Product Sales by Department", "Create New Department"]
        }]
    ).then(function(data) {
        switch (data.choice) {
            case "View Product Sales by Department":
                productSalesByDept();
                break;
            case "Create New Department":
                createNewDept();
                break;
        }
    });
}, .5 * 1000);
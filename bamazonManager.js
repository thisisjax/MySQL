//Require mySQL
var mysql = require("mysql");
//Require Inquirer
var inquirer = require("inquirer");

//Connect to database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    //   console.log("connected as id " + connection.threadId);
    askManager();
});

function askManager() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View Products for Sale":
                    forSale();
                    break;

                case "View Low Inventory":
                    lowInv();
                    break;

                case "Add to Inventory":
                    addInv();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
            
        });
}

//Show table of products
function forSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("\nItem ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock Quantity: " + res[i].stock_quantity);
        }
        console.log("------------------------------------------------------------");
        askManager();
    })
}

//show tabel of all products with less than 10 in stock_quantity
function lowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 10", function (err, res) {
        for (var i = 0; res.stock < 10; i++) {
            console.log("\nItem ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock Quantity: " + res[i].stock_quantity);
        }
        console.log("------------------------------------------------------------");
        askManager();
    });

}

//Add a products to the table
function addInv() { 

        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "What is the products item_id number?"
            },
            {
                name: "stock",
                type: "input",
                message: "How many units are you adding?"
            },
        ]).then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [answer.item , answer.stock], function (err, res) {
    
                    if (err) throw err;
                    
                    console.log("Your  was successfully Updated!");
                    console.log("------------------------------------------------------------");
                    // re-prompt the user for if they want to bid or post
                    askManager();
        
                }
            );
        });
}




function addProduct() {
    // prompt for info about the product being added to inventory
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the products item_id number?"
        },
        {
            name: "product",
            type: "input",
            message: "What is the product_name?"
        },
        {
            name: "department",
            type: "input",
            message: "What department is the product in?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price of the product?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock",
            type: "input",
            message: "How many are in stock?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    item_id: answer.item,
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was added successfully!");
                    console.log("------------------------------------------------------------");
                    // re-prompt the user for if they want to bid or post
                    askManager();
                }
            );
        });
}

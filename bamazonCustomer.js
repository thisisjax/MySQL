//Require
var mysql = require("mysql");
//Require Inquirer
var inquirer = require("inquirer");

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

//show table of product upon connection
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    showAllProducts();
});

//Prompt for user input
function productInfo() {
    inquirer.prompt([
        {
            //Ask what item id to look up
            name: "item_id",
            type: "input",
            message: "Enter the Item ID of the product you are purchasing?",
            filter: Number
        },
        {
            //ask how many units
            name: "quantity",
            type: "input",
            message: "How many units of this product would you like to purchase?",
            filter: Number
        }
        //promise
    ]).then(function (res) {
    
        //item selected by user input
        var item = res.item_id;
        //quantity selected by user input
        var quantity = res.quantity;
        //console.log("this is the quanitty "+quantity)
        //console.log("this is the item "+item)
    
    

        //Grab item id from the database
        connection.query("SELECT * FROM products WHERE item_id=?", [item],  function(err, response) {
            if (err) throw err;
            //if the item number is incorrect or not found then..
     
                var productRes = response[0];
               console.log(productRes)
                
                if (quantity <= productRes.stock_quantity) {
                    console.log("Your order had been placed!");
                    
                    //Update inventory
                    var updateInv = "UPDATE products SET stock_quantity = " + (productRes.stock_quantity - quantity) + " WHERE item_id = " + item;

                    connection.query(updateInv, function (err, res) {
                        if (err) throw err;
                        console.log("Your toal is: " + productRes.price * quantity + " Your order has been placed. Thank You!")
                        shopAgain();
                    })
                
                } else {
                    console.log("Insufficient quantity!\n Item " + productRes.product_name + " has " + productRes.stock_quantity + " left in stock.")
                    shopAgain();
                }
            
        })

    })
}


//Show table of products
function showAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("\nItem ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock Quantity: " + res[i].stock_quantity);
        }
        console.log("------------------------------------------------------------");
        productInfo();
    })
}

//after purchase 
//ask if they would like to continue shopping
function shopAgain (){
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Would you like to look at more products?"
        }
    ]).then(function (res) {
        if (res.confirm) {
            console.log("-------------------------------------------------------------");
            showAllProducts();
            //if not then
        } else {
            console.log("Thank You!")
            connection.end();
        }
    })
}


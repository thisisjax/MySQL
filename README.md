# MySQL 

// Bamazon Customer
https://drive.google.com/file/d/1PtM1T1zwCLnNaEy-YUavZW-pYAOUddu1/view


//Bamazon Manger
https://drive.google.com/file/d/1vK3nCyE-ejQ_qdMs8vZeYHEnhxCBWFpc/view

i didn't get the Add Inventory to work but here is my attempted code:

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

i also wasnt able to get the Low Inventory to work but here is my attemped code:

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
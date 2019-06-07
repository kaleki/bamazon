var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SKny1104",
    database: "bamazon_db",
    port: 3306
});
connection.connect();

var display = function(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        console.log("Welcome to Bamazon for Shoes");
        console.log("Find Your Kicks!");
        
        var table = new Table({
            head: ["Product ID", "Product Name", "Price"],
            colWidths: [15, 50, 10],
            colAligns: ["center", "left", "right"],
            style:{
                head: ["red"],
                compact: true
            }
        });
        for (var i = 0; i < res.length; i++){
            table.push([res[i].id, res[i].product_name, res[i].price]);
}

     
        console.log(table.toString());
        console.log("");
        shop(res);
    });
    
};

function shop(amount) {
    inquirer.prompt([{
        name: "buyProducts",
        type: "input",
        message: "Enter the product ID for the shoes you would like to buy. ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: "quantity",
        type: "input",
        message: "How many of those shoes would you like to purchase? ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {
        
        for (var i = 0; i < amount.length; i++){
           
            if (amount[i].id == answer.buyProducts){
                if (amount[i].quantity < answer.quantity){
                    console.log("Not enough! Sorry");
                    shop(amount);
                }
                else {
                    connection.query("UPDATE products SET quantity = quantity - ? WHERE id = ?", [answer.quantity, answer.buyProducts],  function(err, res) {
                        console.log("Great! Your Shoes are being Shipped!");
                        // display();
            
                        
                    })
                }
            }

        
        }

        
    })
};
console.log("Great! Your Shoes are being Shipped!")
display();

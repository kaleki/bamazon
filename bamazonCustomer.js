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
        for (var i = 0; i < res.length; i++){
            table.push([res[i].id, res[i].product_name, res[i].price]);
        }
    });
    var table = new Table({
        head: ["Product ID", "Product Name", "Price"],
        colWidths: [15, 50, 10],
        colAligns: ["center", "left", "right"],
        style:{
            head: ["red"],
            compact: true
        }
    });
    console.log(table.toString());
    console.log("");
};

function shop() {
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

        connection.query(res.selectItemId, [answer.id], function(err, res) {

            var quantity = res[0].stock_quantity;
            var newQuantity = quantity - answer.quantity;

            var totalCost = res[0].price * answer.quantity;

            if(newQuantity < 0) {

            	console.log("Sorry, Not enough to go around!");

            } else {
            	connection.query(res.updateStock, [newQuantity, answer.id], function(err, res) {
            		
            		console.log("TOTAL: $" + totalCost);
            		console.log("Thanks for shopping at Bamazon shoes! Your order will be shipped!")

            	})
            }
        })
    })
};

display(shop);
shop();
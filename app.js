
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://localhost:27017/todolistDB',{useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("item",itemsSchema)



app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    
    var today = new Date();
    
    var options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);
    
    Item.find({},function(err, foundItems){
        if(foundItems.length==0){
            Item.insertMany(deafualtItems)
            res.redirect("/");
        }
        
        else{
        res.render("list",{NameOfDay: day, newlistitems: foundItems});
        }
    })
    
});

const item1 = new Item({
    name : "wellcome to the to do list"
})
const item2 = new Item({
    name : "clisk on the + buttom to add a new task"
})
const item3 = new Item ({
    name: "Click on the check box to delete task"
})
const deafualtItems = [item1,item2,item3];



app.post("/", function(req,res){
    let itemName = req.body.newItem;
    const item = new Item({
        name : itemName
    })
    item.save();

    res.redirect("/");
    
})
app.post("/delete", function (req,res){
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function(err){
        if(err){
            console.log("successfully deleted");
        }
        res.redirect("/")
    })
})
app.listen(3000)
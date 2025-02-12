import express from "express";
import { getAll, getItem } from "./data.js";

const app = express();
const PORT = process.env.PORT || 3000; // Replit assigns a port

//  Set EJS as the view engine
app.set("views", "templates"); 
app.set("view engine", "ejs"); //  This tells Express to process EJS files

app.use(express.static("public")); 

// Home Route Display all items
app.get("/", (req, res) => {
    const items = getAll();
    res.render("home", { items }); //  EJS should process "home.ejs"
});

// Detail Route Show item details
app.get("/detail", (req, res) => {
    const id = req.query.id;
    const item = getItem(id);

    if (item) {
        res.render("detail", { item }); //  EJS should process "detail.ejs"
    } else {
        res.status(404).send("Item not found");
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

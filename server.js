
const express = require('express');
const app = express();
const cors = require("cors");


app.use(
    cors({
        //URL de front
        origin: "http://localhost:3000"
    })
)


//DB init
require("./server/config/mongoose.config");

//Para usar json y obtener URL data
app.use(express.json(), express.urlencoded({ extended: true }));

//Routes
const myRoutes = require("./server/routes/player.routes");
myRoutes(app);

app.listen(8000, () => console.log("SERVER LOADED"));
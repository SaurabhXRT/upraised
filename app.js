const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const sequelize = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use("/", apiRoutes);
const db = async() => {
    try{
        await sequelize.authenticate();
        console.log("db connected");
        //await sequelize.sync({ force: true });
    }catch(error){
        console.error('Unable to connect to the database:', error)
    }
}
db();

server.get("/", (req,res) => {
    res.json({
        message: "server is running",
        status: "ok"
    })
});
server.listen(3000, () => {
    console.log("server is running")
})
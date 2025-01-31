const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const sequelize = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');
const swaggerUi = require("swagger-ui-express");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use("/", apiRoutes);
//using swaggerautogen that generates swaggerapidocs and using swaggeruiexpress serving the docs
const swaggerDocument = require('./swagger-output.json');
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//initializing the databse i have used sequelize orm and postgresql with class based schema design
//i used supabase for postgresql database
const db = async () => {
    try {
        await sequelize.authenticate();
        console.log("db connected");
        //await sequelize.sync({ force: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
db();

server.get("/", (req, res) => {
    res.json({
        message: "server is running",
        status: "ok"
    })
});
server.listen(3000, () => {
    console.log("server is running")
})
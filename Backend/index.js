const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const monsterRoutes = require("./routes/monsterRoutes");;
const authRoutes = require("./routes/authRoutes");
const gunRoutes = require("./routes/gunRoutes");


app.use(express.json());
app.use(cors());

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//imagens
app.use(
    "/imagens",
    express.static(path.join(__dirname, "public/imagens"))
);
app.use(
    "/imguns",
    express.static(path.join(__dirname, "public/imguns"))
);

// Rotas
app.use(monsterRoutes);
app.use(authRoutes);
app.use(gunRoutes);

// MongoDB
mongoose
    .connect("mongodb://localhost:27017/hunters")
    .then(() => {
        console.log("Mongo funcionando!");
    })
    .catch((err) => {
        console.log("Mongo não está conectado", err);
    });

// Servidor
app.listen(3001, () => {
    console.log("API rodando em http://localhost:3001");
});
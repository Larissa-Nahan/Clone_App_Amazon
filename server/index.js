const express = require("express");     //<- importando 'express'
const mongoose = require("mongoose");   //(necessario para se conectar com o banco)

const authRouter = require('./routes/auth');
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");

//Inicializações
const app = express()   //<- inicializando o express
const PORT = 3001;
const DB = "mongodb+srv://larissa:larissa@cluster0.irmmksz.mongodb.net/?retryWrites=true&w=majority"

//Middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);

//Conexões
mongoose.connect(DB).then(() => {
    console.log("Connection successful")
}).catch(e => {
    console.log(e);
})

app.listen(PORT, "0.0.0.0", () => {     //(android não consegue acessar o localhost, por isso precisa definir para debug)
    console.log(`connected at port: ${PORT}`)
})


app.get('/', (req, res) => {
    res.json({name: "testing"})
})

/*

app.get('/hello-world', (req, res) => {
    res.send("hello world")
})

*/
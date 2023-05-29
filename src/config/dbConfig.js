const mongoose = require ('mongoose');


const connect = () => {
    mongoose.connect('mongodb+srv://max:123@cluster0.icy8eql.mongodb.net/?retryWrites=true&w=majority');

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.log("erro ao conectar com o banco")
    })

    connection.on("open", () => {
        console.log("sucesso ao conectar com o banco")
    })
} 

connect();

module.exports = mongoose;

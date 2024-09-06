import express, { response } from "express"
import pg from "pg"

const app = express();
const { Pool } = pg;

const PORT = 8080;

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'wonderwalks',
    // password: '0010',
    port: 5432,
}

const db = new Pool(dbConfig)

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get("/", (request, response) => {
    db.query("SELECT * FROM cart", (error, results) => {
        if (error) {
            throw error
        }
        return response.status(200).json(results.rows)
    })
});


app.get("/user/:userId", (request, response) => {
    db.query("SELECT * FROM users where userid = $1", [request.params.userId], (error, res) => {
        if (error) {
            throw error
        }
        return response.json(res.rows)
    })
});


app.get("/cart/:userId", (request, response) => {
    db.query("SELECT * FROM cart where userid = $1", [request.params.userId], (error, res) => {
        if (error) {
            throw error
        }
        return response.json(res.rows)
    })
});


app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

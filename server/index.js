import express, { response } from "express"
import pg from "pg"
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json())
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


app.post("/Login/", (request, response) => {
    const { username, password } = request.body
    console.log(username, password)

    db.query("SELECT * FROM users where userid = $1", [username], (error, res) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            status: res.rows.length && (password == res.rows[0].password) ?
                "Login Successfull" : "Login Unsuccessfull",
            login: res.rows.length && password == res.rows[0].password,
            userExists: res.rows.length && (res.rows.length != 0)
        })
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

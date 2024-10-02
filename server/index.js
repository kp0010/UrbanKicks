import express from "express"
import pg from "pg"
import cors from "cors"
import passport from "passport"
import LocalStratergy from "passport-local"
import session from "express-session"
import bcrypt from "bcrypt"

const saltRounds = 10;

import SQLiteStoreFactory from "connect-sqlite3"
const SQLiteStore = SQLiteStoreFactory(session)

const PORT = 8080;
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: "insertsecrethere",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'session.db', dir: './db/' }),
    cookie: {
        domain: "localhost",
        httpOnly: true,
        secure: false,
        maxAge: 72 * 60 * 60 * 1000 //72 hrs exp
    }
}))

app.use(passport.initialize())
app.use(passport.session())

const { Pool } = pg;

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

passport.use(new LocalStratergy(function verify(username, password, cb) {
    const query = `SELECT * FROM users WHERE mail='${username}' OR phoneNo='${username}';`

    db.query(query, (error, res) => {
        if (error) { throw error }

        if (!res.rows[0]) { console.log("Invalid Username"); return cb(null, false, { message: "Email or Number Invalid" }) }

        const temp = bcrypt.compare(password, res.rows[0].password)
        console.log(res.rows[0].password, password, temp)
        if (bcrypt.compare(password, res.rows[0].password)) {
            console.log("Password Verified")
            return cb(null, res.rows[0])
        } else {
            console.log("Invalid Password")
            return cb(null, false, { message: "Incorect Password" })
        }
    })
}))

passport.serializeUser(function(user, cb) {
    cb(null, user.mail)
})


passport.deserializeUser(function(id, cb) {
    db.query("SELECT * FROM users where mail=$1 OR phoneNo=$1", [id], (error, res) => {
        if (error) { throw error }
        return cb(null, res.rows[0])
    })
})


app.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ login: false, userExists: true, message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ login: true, userExists: true, message: "Login Successful", user })
        });
    })(req, res, next)
})

app.post("/signup", (req, res) => {
    const mail = req.body.mail
    const number = req.body.number
    const password = req.body.password
    const fullname = req.body.fullname

    bcrypt.hash(password, saltRounds)
        .then((hashedPassword) => {
            db.query("INSERT INTO users (mail, phoneNo, password, fullname) VALUES ($1, $2, $3, $4) RETURNING mail",
                [mail, number, hashedPassword, fullname], (error, result) => {
                    return res.status(200).json(
                        {
                            success: !Boolean(error),
                            mail: (!error) ? result.rows[0].mail : null,
                            error: error
                        })
                })
        })
})

app.get("/user", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ authenticated: true, user: req.user });
    } else {
        return res.json({ authenticated: false })
    }
})

app.post("/cart", (req, res) => {
    const productId = req.body.productId
    const mail = req.body.mail
    const quantity = req.body.quantity
    const size = req.body.size

    db.query("INSERT INTO cart (mail, productId, quantity, size) VALUES ($1, $2, $3, $4) RETURNING mail",
        [mail, productId, quantity, size], (error, result) => {
            return res.status(200).json(
                { success: !Boolean(error) }
            )
        })

})


app.post("/getCart/", (req, res) => {
    const mail = req.body.mail

    db.query("SELECT * FROM cart WHERE mail=$1",
        [mail], (error, result) => {
            console.log(result.rows)
            return res.status(200).json(
                {
                    success: !Boolean(error),
                    result: result.rows
                }
            )
        })

})

app.post("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: 'Logout error' });
        res.json({ message: 'Logged out' });
    });
});


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});

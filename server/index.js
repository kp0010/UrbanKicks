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
    //password: 'sahil@135',
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
    const { mail, number, password, fullname } = req.body

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
    const { productId, mail, quantity, size } = req.body

    db.query("SELECT * FROM cart WHERE mail=$1 AND productId=$2 AND size=$3",
        [mail, productId, size], (error, result) => {
            if (result.rows.length > 0) {
                db.query("UPDATE cart SET quantity=$1",
                    [quantity + result.rows[0].quantity], (error, result) => {
                        res.status(200).json(
                            { success: !Boolean(error) }
                        )
                        return
                    }
                )
            } else {
                db.query("INSERT INTO cart (mail, productId, quantity, size) VALUES ($1, $2, $3, $4) RETURNING mail",
                    [mail, productId, quantity, size], (error, result) => {
                        return res.status(200).json(
                            { success: !Boolean(error) }
                        )
                    })
            }

        })


})

app.post("/getCart", (req, res) => {
    const mail = req.body.mail

    db.query("SELECT * FROM cart WHERE mail=$1 ORDER BY productId, size",
        [mail], (error, result) => {
            return res.status(200).json(
                {
                    success: !Boolean(error),
                    result: result.rows,
                    length: result.rows.length
                }
            )
        })

})

app.put("/cart/", (req, res) => {
    const { productId, mail, quantity, size } = req.body

    db.query("UPDATE cart SET quantity=$1 WHERE mail=$2 AND size=$3 AND productId=$4 RETURNING *",
        [quantity, mail, size, productId], (error, result) => {
            if (result.rows.length > 0) {
                res.status(200).json(
                    {
                        success: !Boolean(error),
                        result: result.rows[0],
                    }
                )
            } else {
                return res.status(200).json(
                    {
                        success: false,
                    }
                )
            }
        })
})


app.delete("/cart/", (req, res) => {
    const { productId, mail, size } = req.body

    db.query("DELETE from cart WHERE productId=$3 AND mail=$1 AND size=$2 RETURNING *",
        [mail, size, productId], (error, result) => {
            if (result.rows.length > 0) {
                res.status(200).json(
                    {
                        success: !Boolean(error),
                        result: result.rows[0],
                    }
                )
            } else {
                return res.status(404).json(
                    {
                        success: false,
                    }
                )
            }
        })
})

app.get("/products", (req, res) => {
    let sizeResp;

    db.query("SELECT * FROM sizes", (err, result) => {
        sizeResp = result.rows
    })

    db.query("SELECT * FROM products", (err, result) => {
        res.status(200).json({
            products: result.rows,
            sizes: sizeResp
        })
    })
})

app.post("/order/", (req, res) => {
    const { mail, totalamount, shippingaddress } = req.body

    const insertCartItems = async (cartData, orderid) => {
        var orderItems = []
        var orderPrices = []

        const promises = cartData.map(async (item) => {
            const curItemPrice = await getProductPrice(item.productid)
            return new Promise((resolve, reject) => {
                db.query("INSERT INTO orderitems (orderid, productid, quantity, price, size) VALUES ($1, $2, $3, $4, $5) RETURNING orderitemid",
                    [orderid, item.productid, item.quantity, curItemPrice, item.size], (error, result) => {
                        orderItems.push(result.rows[0].orderitemid)
                        orderPrices.push(curItemPrice)
                        resolve(result.rows[0].orderitemid)
                    })
            })
        })

        await Promise.all(promises)

        const totalPrice = orderPrices.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr), 0)
        db.query("UPDATE orders SET totalamount=$1", [totalPrice])
        db.query("DELETE FROM cart WHERE mail=$1", [mail])

        res.status(200).json({
            temp: orderItems
        })
    }

    const getCartItems = (orderid) => {
        db.query("SELECT * FROM cart WHERE mail=$1 ORDER BY productId, size",
            [mail], (error, result) => {
                // if (error) { throw error }
                insertCartItems(result.rows, orderid)
            })
    }

    db.query("INSERT INTO orders (mail, totalamount, shippingaddress) VALUES ($1, $2, $3) RETURNING orderid",
        [mail, totalamount, shippingaddress], (error, result) => {
            // if (error) { throw error }
            getCartItems(result.rows[0].orderid)
        })

    const getProductPrice = async (productid) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT price FROM products WHERE productid=$1", [productid], (error, result) => {
                console.log(result.rows[0].price)
                resolve(result.rows[0].price)
            })
        })
    }

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

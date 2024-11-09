import express from "express"
import pg from "pg"
import cors from "cors"
import passport from "passport"
import LocalStratergy from "passport-local"
import session from "express-session"
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;

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
            return res.status(200).json({ login: true, userExists: true, message: "Login Successful", user, admin: user.isadmin })
        });
    })(req, res, next)
})

app.post("/signup", (req, res) => {
    const { mail, number, password, fullname } = req.body

    bcrypt.hash(password, SALT_ROUNDS)
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
        return res.json({ authenticated: true, user: req.user, admin: req.user.isadmin });
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

app.post("/getAddress/", (req, res) => {
    const { mail } = req.body

    db.query("SELECT * FROM addresses WHERE mail=$1 AND isdeleted!=TRUE",
        [mail], (error, result) => {
            if (result.rows.length > 0) {
                res.status(200).json(
                    {
                        success: !Boolean(error),
                        address: result.rows,
                    }
                )
            } else {
                return res.status(400).json(
                    {
                        success: false,
                        address: []
                    }
                )
            }
        })
})

app.post("/address/", (req, res) => {
    const { mail, address } = req.body
    const { firstName, lastName, addressLine1, addressLine2,
        zipCode, state, city, country, phoneNo } = address


    const hardAddressDeleter = () => {
        db.query("DELETE FROM addresses WHERE isDeleted = TRUE " +
            "AND addressId NOT IN (SELECT DISTINCT shippingAddressId from orders)"
        )
    }

    db.query("INSERT INTO addresses(mail, firstName, lastName, addressLine1, addressLine2," +
        "zipCode, state, city, country, phoneNo) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING addressId",
        [mail, firstName, lastName, addressLine1, addressLine2, zipCode, state, city, country, phoneNo]
        , (error, result) => {
            hardAddressDeleter()
            if (result.rows.length > 0) {
                res.status(200).json(
                    {
                        success: !Boolean(error),
                        addressId: result.rows[0].addressid,
                    }
                )
            } else {
                res.status(400).json(
                    {
                        success: false,
                    }
                )
            }
        })
})

app.delete("/address/", (req, res) => {
    const { mail, addressId } = req.body

    const hardAddressDeleter = () => {
        db.query("DELETE FROM addresses WHERE isDeleted = TRUE " +
            "AND addressId NOT IN (SELECT DISTINCT shippingAddressId from orders)"
        )
    }

    db.query("UPDATE addresses SET isDeleted = TRUE WHERE mail=$1 AND addressid=$2 RETURNING addressid",
        [mail, addressId]
        , (error, result) => {
            hardAddressDeleter()
            if (result.rows.length > 0) {
                res.status(200).json(
                    {
                        success: !Boolean(error),
                        addressId: result.rows[0].addressid,
                    }
                )
            } else {
                return res.status(400).json(
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
    const { mail, shippingAddressId, paymentType } = req.body

    const hardAddressDeleter = () => {
        db.query("DELETE FROM addresses WHERE isDeleted = TRUE " +
            "AND addressId NOT IN (SELECT DISTINCT shippingAddressId from orders)"
        )
    }

    const insertCartItems = async (cartData, orderid, paymentInfo) => {
        var orderItems = []

        const promises = cartData.map(async (item) => {
            const curItemPrice = await getProductPrice(item.productid)
            return new Promise((resolve, reject) => {
                db.query("INSERT INTO orderitems (orderid, productid, quantity, price, size) VALUES ($1, $2, $3, $4, $5) RETURNING orderitemid",
                    [orderid, item.productid, item.quantity, curItemPrice, item.size], (error, result) => {
                        orderItems.push(result.rows[0].orderitemid)
                        resolve(result.rows[0].orderitemid)
                    })
            })
        })

        await Promise.all(promises)

        db.query("DELETE FROM cart WHERE mail=$1", [mail])

        hardAddressDeleter()

        res.status(200).json({
            success: true,
            orderItems: orderItems,
            orderId: orderid,
            paymentId: paymentInfo.paymentid
        })
    }

    const insertOrder = async (cartData, totalAmount) => {
        const paymentInfo = await insertPayment(paymentType, totalAmount)

        db.query("INSERT INTO orders (mail, totalamount, shippingAddressId, paymentId) VALUES ($1, $2, $3, $4) RETURNING orderid",
            [mail, totalAmount, shippingAddressId, paymentInfo.paymentid], (error, result) => {
                insertCartItems(cartData, result.rows[0].orderid, paymentInfo)
            })
    }

    const insertPayment = async (paymentType, amount) => {
        var status

        if (paymentType === "cash_on_delivery") {
            status = "pending"
        } else {
            status = "successfull"
        }

        return new Promise(async (resolve, reject) => {
            const query = `INSERT INTO payments (paymentType, amount, status) VALUES ('${paymentType}', ${amount}, '${status}') RETURNING *;`
            const paymentRes = await db.query(query)

            resolve(paymentRes.rows[0])
        })
    }


    const getProductPrice = async (productid) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT price FROM products WHERE productid=$1", [productid], (error, result) => {
                if (error) { reject(0) }
                resolve(result.rows[0].price)
            })
        })
    }

    db.query("SELECT * FROM cart WHERE mail=$1 ORDER BY productId, size",
        [mail], async (error, result) => {
            const resultRows = [...result.rows]

            const pricePromises = result.rows.map(async (item) => {
                const currItemPrice = await getProductPrice(item.productid) * item.quantity
                return parseFloat(currItemPrice)
            })

            const prices = await Promise.all(pricePromises)

            const totalAmount = prices.reduce((acc, curr) => acc + curr, 0) + 300

            insertOrder(resultRows, totalAmount)
        })

})

app.post("/getOrder", async (req, res) => {
    const { orderId } = req.body

    var orderItemsInfoRes = await db.query("SELECT * FROM orderitems WHERE orderid=$1", [orderId])
    var orderItemsInfo = orderItemsInfoRes.rows

    var orderInfoRes = await db.query("SELECT * FROM orders WHERE orderid=$1", [orderId])
    var orderInfo = orderInfoRes.rows[0]

    var addressInfoRes = await db.query("SELECT * FROM addresses WHERE addressid=$1", [orderInfo.shippingaddressid])
    var addressInfo = addressInfoRes.rows[0]

    var paymentInfoRes = await db.query("SELECT * FROM payments WHERE paymentid=$1", [orderInfo.paymentid])
    var paymentInfo = paymentInfoRes.rows[0]

    if (orderInfo !== undefined && orderItemsInfo !== undefined) {
        res.status(200).json({
            success: true,
            orderInfo: orderInfo,
            orderItemsInfo: orderItemsInfo,
            addressInfo: addressInfo,
            paymentInfo: paymentInfo
        })
    } else {
        res.status(400).json({
            success: false
        })
    }
})

app.post("/getOrders", async (req, res) => {
    const { mail, admin } = req.body

    const queryCondition = !admin ? " WHERE mail = $1 " : " "
    const query = "SELECT * FROM orders " + queryCondition + " ORDER BY orderdate DESC;"
    const queryExt = admin ? [] : [mail]

    console.log(query, queryExt, admin)

    if (admin) {
        var orderInfoRes = await db.query(query)
    } else {
        var orderInfoRes = await db.query(query, queryExt)
    }

    var orderInfo = orderInfoRes.rows

    var allOrderInfo = await Promise.all(
        orderInfo.map(async (order) => {
            var orderItemsInfoRes = await db.query("SELECT * FROM orderitems WHERE orderid=$1", [order.orderid])

            var addressInfoRes = await db.query("SELECT * FROM addresses WHERE addressid=$1", [order.shippingaddressid])

            var paymentInfoRes = await db.query("SELECT * FROM payments WHERE paymentid=$1", [order.paymentid])

            return {
                ...order,
                orderItems: orderItemsInfoRes.rows,
                addressInfo: addressInfoRes.rows[0],
                paymentInfo: paymentInfoRes.rows[0]
            }
        })
    )

    if (orderInfo.length === allOrderInfo.length) {
        res.status(200).json({
            success: true,
            allOrderInfo: allOrderInfo,
        })
    } else {
        res.status(400).json({
            success: false
        })
    }
})

app.post("/getWishlist", (req, res) => {
    const mail = req.body.mail

    db.query("SELECT * FROM wishlist WHERE mail=$1 ORDER BY productId",
        [mail], (error, result) => {
            return res.status(200).json(
                {
                    success: !Boolean(error),
                    result: result.rows,
                }
            )
        })
})

app.post("/wishlist", (req, res) => {
    const { productId, mail } = req.body

    db.query("INSERT INTO wishlist (mail, productId) VALUES ($1, $2)",
        [mail, productId], (error, result) => {
            return res.status(200).json({
                success: !Boolean(error),
            })
        })
})


app.delete("/wishlist", (req, res) => {
    const { productId, mail } = req.body

    db.query("DELETE FROM wishlist WHERE productId = $2 AND mail = $1",
        [mail, productId], (error, result) => {
            return res.status(200).json({
                success: !Boolean(error),
            })
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

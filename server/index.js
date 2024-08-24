import express from "express"
// import readFile from np

const app = express();

const PORT = 8080;

app.get("/", (request, response) => {
    console.log("lmao")
    return response.status(234).send("Ecommerce Backend");
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

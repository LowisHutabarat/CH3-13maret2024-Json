//express third-party
//baca express di reading material
// console.log("hello world 1");
const fs = require("fs");
const express = require('express')

const app = express()
const PORT = 8000;

//middleware untuk membaca json dari request body ke kita
app.use(express.json())

const customers = JSON.parse(
fs.readFileSync(`${__dirname}/Data/dummy.json`));

// localhost :8000
app.get('/', (req, res, next) => {
    res.send("<h1>Hello World</h1>")
});

app.get('/api/v1/customers', (req, res, next) => {
    res.status(200).json({
        status: "success",
        totalData: customers.length,
        Data : {
            customers,
        },
    });
});

app.post("/api/v1/customers",(req, res) =>{
    console.log(req.body);

    const newCustomer = req.body;

    customers.push(req.body);
    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers),err => {
        //201 untuk create
        res.status(201).json({
            status : 'success' ,
            data : {
                customers : newCustomer,
            },
        })
    });
    //res wajib ada
    // res.send("oke kelaz");
})

app.listen(PORT, () =>{
    console.log(`APP RUNNING ON PORT : ${PORT}`);
});
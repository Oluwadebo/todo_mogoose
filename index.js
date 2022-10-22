const express = require("express");
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
const UserSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        school: String,
    }
)
const UserModel = mongoose.model('User', UserSchema)
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, }).then((res) => {
    console.log("connected successfuly")
}).catch(err => {
    console.log(err);
})
app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    const dele = (index) => {
        const third = result.filter((item, ind) => index !== ind)
        alert(third)
    }
    UserModel.find((err, result) => {
        if (err) {
            console.log(err);
            console.log("error dey oo");
        } else {
            console.log(result);
            res.render("home", { allusers: result, dele })
        }
    })
})
app.get("/new-user", (req, res) => {
    res.render("new-user");
})
app.post("/new-user", (req, res) => {
    let user = req.body;
    UserModel.create(user, (err, res) => {
        if (err) {
            console.log(err);
            console.log("There is error oo");
        } else {
            console.log("Sent successfull and saved");
        }
    })
    // console.log(user);
    res.redirect('/')
})
app.post('/deleteUser', (req, res) => {
    let id = (req.body.id);
    console.log(id);
    UserModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.redirect('/')
        }
    })
})
app.listen(5003, () => {
    console.log("Server started");
})
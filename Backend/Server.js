const express = require("express")
const mysql =require("mysql")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const app = express();

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST","GET"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: "guvi"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
    } else {
        console.log('Connected to the database');
    }
});

app.post('/signup', (req, res) => {
    if (!req.body.gender) {
        return res.status(400).json("Gender field is required");
    }

    const sql = "INSERT INTO `userdata`(`name`, `email`, `password`, `age`, `dob`, `mobile`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.age,
        req.body.dob,
        req.body.mobile,
        req.body.gender
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data into the database: ' + err.message);
            return res.status(500).json("Error");
        }
        console.log('Data inserted successfully');
        return res.status(200).json({ success: true, name: req.body.name });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM userdata WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Error querying the database: ' + err.message);
            return res.status(500).json("Error");
        }
        if (data.length > 0) {
            req.session.name = data[0].name;
            console.log(req.session.name)
            return res.json({Login:true});
        } else {
            return res.json({Login:false});
        }
    });
});

app.get('/home', (req, res) => {
    if (req.session.name) {
        const sql = "SELECT `id`, `name`, `email`, `password`, `age`, `dob`, `mobile`, `gender`, `other1` FROM `userdata` WHERE `name` = ?";
        db.query(sql, [req.session.name], (err, data) => {
            if (err) {
                console.error('Error querying the database: ' + err.message);
                return res.status(500).json("Error");
            }
            if (data.length > 0) {
                return res.json({
                    valid: true,
                    userData: {
                        name: req.session.name,
                        age: data[0].age,
                        mobile: data[0].mobile,
                        dob: data[0].dob,
                        gender: data[0].gender,
                        email: data[0].email
                    }
                });
            } else {
                return res.json({ valid: false });
            }
        });
    } else {
        return res.json({ valid: false });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session: ' + err.message);
        return res.status(500).json("Error");
      }
      return res.json({ loggedOut: true });
    });
  });
  

app.listen(8081, () => {
    console.log('Server is listening on port 8081');
});

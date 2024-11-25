const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
 
const bcrypt = require('bcrypt'); // https://www.npmjs.com/package/bcrypt npm i bcrypt
var jwt = require('jsonwebtoken'); //https://github.com/auth0/node-jsonwebtoken npm install jsonwebtoken
 
const app = express();
const port = 3001
 
app.use(express.json());
app.use(cors());
 
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "nodejsdb"
})
 
con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})
 
// Hashisng Password
app.get('/hash', (req, res) => { 
    bcrypt.hash("123456", 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            hash
        ]
        return res.json({result: hash});
    } )
})

// Get All Data User
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error fetching users" });
        return res.json({ Status: "Success", Users: result });
    });
});

// Get Data Dengan ID
app.get('/users/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error fetching user" });
        if (result.length === 0) return res.json({ Status: "Error", Error: "User not found" });
        return res.json({ Status: "Success", User: result[0] });
    });
});

// Update Data User
app.put('/users/:id', (req, res) => {
    const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    
    // Hash password sebelum memperbarui
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });
        
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.params.id
        ];

        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: "Error updating user" });
            if (result.affectedRows === 0) {
                return res.json({ Status: "Error", Error: "User not found" });
            }
            return res.json({ Status: "Success", Message: "User updated successfully" });
        });
    });
});
 
// Delete User by ID
app.delete('/users/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const userId = req.params.id;

    con.query(sql, [userId], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error deleting user" });
        if (result.affectedRows === 0) {
            return res.json({ Status: "Error", Error: "User not found" });
        }
        return res.json({ Status: "Success", Message: "User deleted successfully" });
    });
});

// Login Post
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "password error"});
                if(response) {
                    const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
                    return res.json({Status: "Success", Token: token})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
            })
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})
 
// Register Post
app.post('/register',(req, res) => {
    const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)"; 
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Error query"});
            return res.json({Status: "Success"});
        })
    } )
})
 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
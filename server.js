const express = require("express");
const fs = require("fs");
const path = require("path");


// const noteList = require("./db/noteList");
// API route fill in
// const apiRoutes = require(".routes/apiRoutes");
// // HTML route fill in
// const htmlRoutes = require(".routes/htmlRoutes");

// Init app and port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Allows use of static files: Important
app.use(express.static("public"));
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);
//DISPLAY GETS 
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req,res){
    fs.readFile("./db/noteList.json", "utf8",function(err,data){
        if(err) throw err;
        const newData = JSON.parse(data);
        res.json(newData);
    })
    
});
// Taking user data POSTS
app.post("/api/note", function (req,res){
    fs.readFile("./db/noteList.json", "utf8",function(err,data){
        if(err) throw err;
        const noteList = JSON.parse(data);
        noteList.push(req.body);

        fs.writeFile("./db/noteList.json",JSON.stringify(noteList),function(err){
            if(err) throw err;
            res.redirect("/notes");
        });
    });
})

app.delete("/api/note/:id", function(req,res){
    const delNote = req.params.id;
    const delArr = [];
    fs.readFile("./db/noteList.json", "utf8",function(err,data){
        if(err) throw err;
        const noteList = JSON.parse(data);
        for(let i=0;i<noteList.length;i++){
            if(noteList[i].title==delNote){
                delete noteList[i].title;
                delete noteList[i].date;
                delete noteList[i].notes;
            }
            else{
                delArr.push(noteList[i]);
            }
        }
        fs.writeFile("./db/noteList.json",JSON.stringify(delArr),function(err){
            if(err) throw err;
            console.log("Added");
            res.end();
        });
        // res.redirect("/notes"); NOT SURE
    });
});
// Starts server on PORT
app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));
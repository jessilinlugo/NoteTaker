const express = require("express");
const fs = require("fs");
const uuid = require("uuid");

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data))
        })
    })
};

app.post("/api/notes", (req, res) => {
    let newNote = req.body
    newNote.id = uuid.v4()
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        let fileJson = JSON.parse(data);
        fileJson.push(newNote)
        fs.writeFile("./db/db.json", JSON.stringify(fileJson), (err) => {
            if (err) throw err;
            res.status(200).send(true)
        })
    })
});

app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) =>  {
        let fileJson = JSON.parse(data);
        if (err) throw err;
        fileJson.forEach((element) => {
            if (element.id === noteId) {
                fileJson.splice(element, 1)
            }
        })
    })
});
const router = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");

//this loads the notes

    router.get("/notes", (req, res) => {
        console.log("here's a thing");
        fs.readFile("./public/db/db.json", "utf-8", (err, data) => {
            console.log(data);
            if (err) throw err;
            return res.json(data);
        })
    });


//this creates new notes
router.post("/notes", (req, res) => {
    let newNote = req.body
    newNote.id = uuid.v4()
    fs.readFile("./public/db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        let fileJson = JSON.parse(data);
        fileJson.push(newNote);
        fs.writeFile("./public/db/db.json", JSON.stringify(fileJson), (err) => {
            if (err) throw err;
            res.status(200).send(true);
        })
    })
});

// //this deletes the selected note
// router.delete("/notes/:id", (req, res) => {
//     let noteId = req.params.id;
//     fs.readFile("public/db/db.json", (err, data) =>  {
//         // let fileJson = JSON.parse(data);
//         if (err) throw err;
//         fileJson.forEach((element) => {
//             if (element.id === noteId) {
//                 fileJson.splice(...element, 1)
//             }
//         })
//     })
// });

module.exports = router;
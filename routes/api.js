const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "..", "db", "db.json");
const uuid = require("uuid");



function saveNote(title, text) {
  const newNote = {
    id: uuid.v4(),
    title,
    text,
  };

  const notes = getNotes();
  notes.push(newNote);
  fs.writeFileSync(dbPath, JSON.stringify(notes), "utf-8");
  return newNote;
}

function getNotes() {
  const content = fs.readFileSync(dbPath, "utf-8");

  return JSON.parse(content) || [];
}

function deleteNote(id){
    const notes = getNotes();
    const filtered = notes.filter((note)=>  note.id !== id)
fs.writeFileSync(dbPath, JSON.stringify(filtered), 'utf-8')


}

router.get("/api/notes", (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

router.post("/api/notes", (req, res) => {
  const created = saveNote(req.body.title, req.body.text);

  res.json(created);
});


router.delete('/api/notes/:id', (req, res)=>{

deleteNote(req.params.id)

    res.json({
        data: 'ok',
    })

})

module.exports = router;

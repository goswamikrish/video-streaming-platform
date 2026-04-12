const express = require('express');
const Note = require('../models/Note')
const { validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middlewear/fetchuser');
//route 1=> get all thew notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("some eror noccured");
    }
})
//route 2=> to add notes
router.post('/addnotes', fetchuser, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    ;
    try {
        const { title, channeltitle, videoUrl, imageUrl } = req.body;
        const note = new Note({
            title, channeltitle, videoUrl, imageUrl, user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    } catch (error) {
        console.log(error)
        res.status(500).send("some eror noccured");
    }

})
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");

        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "success": "note has been deleted", note: note });
    } catch (error) {
        res.status(500).send("internal server error");
    }

})
module.exports = router
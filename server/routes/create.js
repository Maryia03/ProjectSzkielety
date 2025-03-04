const router = require("express").Router()
const Form = require("../models/create.js")

router.route('/').post((req, res) => {
    try {
        new Form.Forms({ ...req.body }).save()
        res.status(201).send({ message: "Dodano dane" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
});
module.exports = router
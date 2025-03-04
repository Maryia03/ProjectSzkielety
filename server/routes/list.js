const router = require("express").Router()
const MongoClient = require('mongodb').MongoClient;
const Form = require("../models/create.js")


router.route('/get').get((req, res) => {
    Form.Forms.find({}).sort({ status: 1 }).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/getuser/:email').get((req, res) => {
    Form.Forms.find({ email: req.params.email }).sort({ status: 1 }).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/getuser/:status/:email').get((req, res) => {
    Form.Forms.find({ status: req.params.status, email: req.params.email }).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/get/:status').get((req, res) => {
    Form.Forms.find({ status: req.params.status }).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/moreinfo/:id').get((req, res) => {
    Form.Forms.find({ _id: req.params.id }).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/update/:status/:id').get((req, res) => {
    var status = ""
    switch (req.params.status) {
        case "przyjete":
            status = "Samochód przyjęty do naprawy"
            break;
        case "realizacja":
            status = "Samochód w trakcie naprawy"
            break;
        case "zakonczone":
            status = "Samochód naprawiony, gotowy do odbioru"
            break;
        case "odebrane":
            status = "Samochód odebrany"
            break;
        default:
            status = "Status nieznany"
    }

    Form.Forms.updateOne({ _id: req.params.id },
        {
            $set: { status: status }
        }
    ).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/delete/:id').get((req, res) => {
    Form.Forms.deleteOne({ _id: req.params.id }).exec((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router
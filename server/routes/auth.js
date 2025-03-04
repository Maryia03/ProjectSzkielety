const router = require("express").Router()
const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const Joi = require("joi")

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(401).send({ message: "Blędny email lub hasło" })

        const validPassowrd = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassowrd)
            return res.status(401).send({ message: "Blędny email lub hasło" })


        var data = {
            token: user.generateAuthToken(),
            status: user.status,
            email: user.email,
            fname: user.firstName,
            lname: user.lastName
        };

        res.status(200).send({ data: data, message: "Zalogowano pomyślnie" })
        console.log("asfd")
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    })
    return schema.validate(data)
}

module.exports = router
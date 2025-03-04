const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const tokenVerification = require("../middleware/tokenVerification");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "Użytkownik o podanym emailu już istnieje!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "Konto zostało utworzone" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Wystąpił błąd", error: error.message });
    }
});

router.get("/currentUser", tokenVerification, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

router.delete("/deleteAccount", tokenVerification, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;

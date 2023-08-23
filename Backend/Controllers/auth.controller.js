const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/userModel');

exports.signup = async (req, res) => {
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    }
    try {
        const user = await User.create(userData);
        res.status(200).json({ msg: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

exports.signin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404).json({ msg: "no user with provided email" })
    } else {
        try {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    let options = {
                        maxAge: 20 * 60 * 1000, // would expire in 20minutes
                        httpOnly: true, // The cookie is only accessible by the web server
                        secure: true,
                        sameSite: 'None',
                    };
                    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
                    res.cookie('SessionID', token, options);
                    res.status(200).json({
                        msg: "SingIn success",
                        accessToken: token,
                        user
                    });
                }
                if (err) {
                    res.status(401).json({ msg: "Invalid Password" })
                }
            });
        } catch (error) {
            res.status(500).json({ msg: error })
        }
    }
}
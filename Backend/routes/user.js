const express = require('express');
const BlackList = require('../Models/blackListModel');
const { signin, signup } = require('../Controllers/auth.controller');
const verifyToken = require('../middleware/authJWT');

const router = express.Router();

router.post("/register", signup, () => { });

router.post("/login", signin, () => { });

router.get("/hiddencontent", verifyToken, async function (req, res) {
  const authHeader = req.headers.authorization;

  if(!authHeader) return  res.status(401).send({message: "Not Authorised"});
  const cookie = authHeader.split(' ')[1];

  const checkIfBlacList = await BlackList.findOne({token : cookie});
  if (checkIfBlacList) {
    return res.status(401)
    .json({ message: 'This session has expired. Please re-login' });
  }

  if (!user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  if (req.user == "admin") {
    res.status(200)
      .send({
        message: "Congratulations! but there is no hidden content"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorised access"
      });
  }
});


router.post("/logout", verifyToken, async (req, res) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({message:'Un-authorised'})
    }
    const accessToken = req.headers.authorization.split(" ")[1];

    const isBlackListed = BlackList.findOne({token:accessToken});
    if (isBlackListed) {
      return res.sendStatus(204);
    }
    const newBlackList = new BlackList({
      token : accessToken
    });

    await newBlackList.save();
    res.setHeader('Clear-Site-Data', '"cookies", "storage"');
    res.status(200).json({ message: 'You are logged out!' });

  } catch (error) {
    return res.status(500).json({messgage : 'Internal Server Error'})
  }
});

module.exports = router;
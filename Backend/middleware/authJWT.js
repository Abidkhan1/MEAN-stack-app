const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, function (err, decode) {
      if (err) req.user = undefined;
      const user = User.findOne({_id: decode.id});
      if (user) {
        req.user = user;
            next();
      }else{
        res.status(500)
              .send({
                message: "Un-authenticated request"
              });
      }
      // User.findOne({
      //     _id: decode.id
      //   })
      //   .exec((err, user) => {
      //     if (err) {
      //       res.status(500)
      //         .send({
      //           message: err
      //         });
      //     } else {
      //       req.user = user;
      //       next();
      //     }
      //   })
    });
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;
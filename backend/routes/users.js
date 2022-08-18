
const { User } = require("../models/users");
const express = require("express");
const router = express.Router();
require("dotenv/config");
const api = process.env.API_URL;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.jwtTokenSecret;
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("B$c0/\/", salt)

router.post(`/register`, async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordHash: bcrypt.hashSync(req.body.password),
  });
  user = await user.save();
  if (!user) return res.status(400).send("the user cannot be created!");
  res.send(user);
});

router.patch(`/resetPassword`, async (req, res) => {
  console.log(`${req.body.email}`);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  
  const user = await User.findOne({email:  req.body.email});
  if (user){
    password=bcrypt.hashSync(generateString(10));
    user.passwordHash=password;
    user.save();
    res.send({ data: user.passwordHash });
  }
  else{
    res.send();
  }
  
});

router.get("/getall", async (req, res) => {
  res.send({ data: await User.find().select("id name email password") });
});

// try{
// User = await User.save();
// if(!User)return res.status(400).send("the user cannot be created!");
// res.status(201).send(User);
// }
// catch(err){
// return res.status(400).send("err: "+ err.message);
// }

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
      const userLimited = await User.findOne({ email: req.body.email }).select(
        "id name email "
      );
      const token = jwt.sign(
        {
          userId: userLimited.id,
          isAdmin: true,
        },
        secret,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).send({ data: userLimited, token: token });
    } else {
      res.status(400).send({ message: "User Invalid" });
    }
  } else {
    res.status(400).send({ message: "User not found" });
  }
});

router.get(`/`, async (req, res) => {
  const userList = await User.find();
  if (userList.length == 0) {
    res
      .status(500)
      .json({ status: false, message: "No data found", errCode: "0001" });
    return;
  }
  res.send(userList);
});

router.post(`/`, (req, res) => {
  const user = new User({
    name: req.body.name,
    image: req.body.image,
    countInsta,
  });
  res.send(user);
});

module.exports = router;

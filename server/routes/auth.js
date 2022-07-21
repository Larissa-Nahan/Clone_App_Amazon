const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authRouter = express.Router();

// authRouter.get("/user", (req, res) => {
//   res.json({ msg: "larissa" });
// });

//Route Sign-Up
authRouter.post("/api/signup", async (req, res) => {
  try {
    //Pegar os dados do cliente (no form)
    const { name, email, password } = req.body;

    //(validação se o usuário já existe)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same e-mail already exists" });
    } //(usa 'msg: mensagem de error' quando se tem erro de validação)

    //(encriptografando a senha)
    const hashedPassword = await bcryptjs.hash(password, 8);

    //Post os dados no banco de dados (mongoose)
    let user = new User({
      name,
      email,
      password: hashedPassword,
    });

    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message }); //(usa 'error: e.message' quando se tem erro no servidor)
  }

});

//Route Sign-In
authRouter.post("/api/signin", async (req, res) => {
    try {
      //Pegar os dados do cliente (no form)
      const { email, password } = req.body;
  
      //(validação que o usuário já existe)
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User with this e-mail does not exist" });
      }
  
      //(decriptografando a senha)
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
      }
  
      const token = jwt.sign({ id: user._id }, "passwordKey");
      res.json({ token, ...user._doc });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

module.exports = authRouter;

const express = require("express");
const bcryptjs = require("bcryptjs");
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

module.exports = authRouter;

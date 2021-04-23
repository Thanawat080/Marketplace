const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const Joi = require('joi')

router = express.Router();

const passwordValidator = (value, helpers) => {
  if (value.length < 8) {
    throw new Joi.ValidationError('Password must contain at least 8 characters')
  }
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    throw new Joi.ValidationError('Password must be harder')
  }
  return value
}


const usernameValidator = async (value, helpers) => {
  const rows = await pool.query(
    "SELECT username FROM user WHERE username = ?",
    [value]
  )
  console.log(rows[0])
  if (rows[0].length > 0) {
    const message = 'This user is already taken'
    throw new Joi.ValidationError(message, { message })
  }
  return value
}


const signupSchema = Joi.object({
  f_name: Joi.string().required().max(150),
  l_name: Joi.string().required().max(150),
  username: Joi.string().required().min(5).external(usernameValidator),
  password: Joi.string().required().custom(passwordValidator),
  confirm_password: Joi.string().required().valid(Joi.ref('password')),
  email: Joi.string().required().email(),
  usertype: Joi.string().required().valid("seller", "buyer"),
  phone_number: Joi.string().required().pattern(/0[0-9]{9}/),
})



router.post("/register", async function (req, res, next) {

  try {
    await signupSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err)
  }
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  const f_name = req.body.f_name;
  const l_name = req.body.l_name;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const usertype = req.body.usertype;

  try {
    await conn.query("INSERT INTO user(f_name, l_name, username, password, email, phone_number, usertype) VALUES(?, ?, ?, ?, ?, ?, ?);",
      [f_name, l_name, username, password, email, phone_number, usertype])
    await conn.commit()
    res.status(201).send()

  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})
// router.post("/register/owner_marketplace", async function (req, res, next) {
//   const conn = await pool.getConnection();
//   await conn.beginTransaction();
//   try {
//     let result = await conn.query("SELECT MAX(id) id FROM user")
//     await conn.query("INSERT INTO owner_marketplace(id) VALUES(?);",
//       [result[0][0].id])
//     await conn.commit()

//     res.send(result[0][0].id + "");

//   } catch (err) {
//     await conn.rollback();
//     return res.status(400).json(err);
//   } finally {
//     console.log("finally");
//     conn.release();
//   }

// })
router.post("/register/buyer", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT MAX(id) id FROM user")
    await conn.query("INSERT INTO buyer(id) VALUES(?);",
      [result[0][0].id])
    await conn.commit()

    res.send(result[0][0].id + "");

  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})
router.post("/register/seller", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT MAX(id) id FROM user")
    await conn.query("INSERT INTO seller(id) VALUES(?);",
      [result[0][0].id])
    await conn.commit()

    res.send(result[0][0].id + "");

  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})


exports.router = router;
const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

router = express.Router();
const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.put("/addstore", async function(req, res, next){
  const storename = req.body.storename;
  const description = req.body.description;
  const rent_type = req.body.rent_type;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query("INSERT INTO store (subscription_type, store_name, description, seller_id, owner_marketplace_id) VALUES(?, ?, ?, ?, ?);", 
    [rent_type, storename,description, req.session.userdata.id, 1])
    await conn.commit()
    res.json("addstorecomplete")
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})

router.get("/category", async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT * FROM category")
    await conn.commit()
    res.json({name: result[0]})
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})

router.put("/addproduct", upload.array('Pic'), async function(req, res, next){
  const p_name = req.body.pame;
  const description = req.body.description;
  const price = req.body.price;
  const promoprice = req.body.promoprice;
  const categorys = req.body.category;
  const quantity = req.body.quantity;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const file = req.files;
    const store = await conn.query("SELECT * FROM store WHERE seller_id = ?", [req.session.userdata.id])
    const category = await conn.query("SELECT * FROM category WHERE category_name = ?", [categorys])
    await conn.query("INSERT INTO product (p_name, price, description, promotion_price, store_id, category_id, quantity) VALUES(?, ?, ?, ?, ?, ?, ?);", 
    [p_name, price, description, promoprice, store[0][0].id, category[0][0].id, quantity])
    if (file) {
      console.log(file)
      file.forEach(async function (value) {
        const product = await conn.query("SELECT MAX(id) id FROM product") 
        await conn.query("INSERT INTO product_picture (product_id, picture) VALUES(?, ?)", [product[0][0].id, value.path.substr(6)])
      });
    }
    await conn.commit()
    res.json("addproductcomplete")
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})




exports.router = router;
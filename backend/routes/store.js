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

router.get("/getproduct", async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const [rows, _] = await pool.query("SELECT * FROM store where seller_id = ? ", [req.session.userdata.id])
    const product = await pool.query("select * from product where store_id = ?", [rows[0].id])
    res.send(product[0])
    await conn.commit()
  }catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
})

router.delete("/deleteproduct/:productId", async function(req,res,next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const [images,imageFields] = await conn.query(
      "SELECT `picture` FROM `product_picture` WHERE `product_id` = ?",
      [req.params.productId]
    );
    const appDir = path.dirname(require.main.filename); // Get app root directory
      
      images.forEach((e) => {
        const p = path.join(appDir, 'static', e.picture);
        fs.unlinkSync(p);
      });
      await conn.query("DELETE FROM `product_picture` WHERE `product_id` = ?", [req.params.productId]);
      await conn.query("DELETE FROM `product` WHERE `id` = ?", [req.params.productId]);
    await conn.commit()
    res.status(204).send();
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})

router.get("/getproduct/:productId", async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const product = await pool.query("SELECT * FROM product WHERE id = ?", [req.params.productId])
    await conn.commit()
    res.send(product[0][0])
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})

router.post("/editproduct/:productId", async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  const p_name = req.body.p_name
  const price = req.body.price
  const description = req.body.description
  const quantity = req.body.quantity
  const promotion_price = req.body.promotion_price
  const categorys = req.body.category
  try{
    const category = await conn.query("SELECT * FROM category WHERE category_name = ?", [categorys])
    await conn.query('UPDATE product SET p_name=?, price=?, description=?, promotion_price=?, quantity=?, category_id=? WHERE id=?', 
    [p_name, price, description, promotion_price, quantity, category[0][0].id, req.params.productId])
    res.send('update complete')
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})




exports.router = router;
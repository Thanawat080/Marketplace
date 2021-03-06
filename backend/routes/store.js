const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const Joi = require('joi')


router = express.Router();
const multer = require('multer');
const { string } = require("joi");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })


const storeSchema = Joi.object({
  storename: Joi.string().required(),
  description: Joi.string().required(),
  rent_type: Joi.string().required().valid("free", "normal", "epic"),
})

router.put("/addstore", upload.single('Pic'),async function(req, res, next){
  try {
    await storeSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return console.log(err)
    
  }

  const storename = req.body.storename;
  const description = req.body.description;
  const rent_type = req.body.rent_type;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const rows = await pool.query(
      "SELECT seller_id FROM store WHERE seller_id = ?",
      [req.session.userdata.id]
    )
    console.log(rows[0])
    const file = req.file;
    if(rows[0].length < 1){
    await conn.query("INSERT INTO store (subscription_type, store_name, description, seller_id, owner_marketplace_id, store_picture,reportnumber) VALUES(?, ?, ?, ?, ?,?,?);", 
    [rent_type, storename,description, req.session.userdata.id, 1,file.path.substr(6),0]) 
    res.send("Success")
    }else{
      throw res.status(400).json(err);
      
    }
    await conn.commit() 
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


const productSchema = Joi.object({
  pame: Joi.string().required(),
  description: Joi.string().required(),
  price:Joi.number().required().max(1000000),
  category: Joi.string().required(),
  quantity: Joi.number().integer(),
})


router.put("/addproduct", upload.array('Pic'), async function(req, res, next){

  try {
    await productSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return console.log(err)
    
  }
  const p_name = req.body.pame;
  const description = req.body.description;
  const price1 = req.body.price;
  const categorys = req.body.category;
  const quantity = req.body.quantity;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const test = await conn.query("select * from event") 
    console.log(test[0].length)
    if(test[0].length === 1){ 
      const file = req.files;
      const store = await conn.query("SELECT * FROM store WHERE seller_id = ?", [req.session.userdata.id])
      const category = await conn.query("SELECT * FROM category WHERE category_name = ?", [categorys])
      await conn.query("INSERT INTO product (p_name, price, description, store_id, category_id, quantity) VALUES(?, ?, ?, ?, ?, ?);", 
      [p_name, (price1*((100-test[0][0].discount)/100)), description, store[0][0].id, category[0][0].id, quantity])
      if (file) {
        console.log(file)
        file.forEach(async function (value) {
          const product = await conn.query("SELECT MAX(id) id FROM product") 
          await conn.query("INSERT INTO product_picture (product_id, picture) VALUES(?, ?)", [product[0][0].id, value.path.substr(6)])
        });
      }
    }else{
    const file = req.files;
    const store = await conn.query("SELECT * FROM store WHERE seller_id = ?", [req.session.userdata.id])
    const category = await conn.query("SELECT * FROM category WHERE category_name = ?", [categorys])
    await conn.query("INSERT INTO product (p_name, price, description, store_id, category_id, quantity) VALUES(?, ?, ?, ?, ?, ?);", 
    [p_name, price1, description, store[0][0].id, category[0][0].id, quantity])
    if (file) {
      console.log(file)
      file.forEach(async function (value) {
        const product = await conn.query("SELECT MAX(id) id FROM product") 
        await conn.query("INSERT INTO product_picture (product_id, picture) VALUES(?, ?)", [product[0][0].id, value.path.substr(6)])
      });
    }
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



const editproductSchema = Joi.object({
  p_name: Joi.string().required(),
  description: Joi.string().required(),
  price:Joi.number().required().max(1000000),
  category: Joi.string().required(),
  quantity: Joi.number().integer(),
})


router.post("/editproduct/:productId", async function (req, res, next) {
  try {
    await editproductSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return console.log(err)
  }
  const p_name = req.body.p_name
  const price = req.body.price
  const description = req.body.description
  const quantity = req.body.quantity
  const category = req.body.category
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const event = await conn.query("select * from event") 
    if(event[0].length === 1){ 
    const value = await conn.query("SELECT * FROM category WHERE category_name = ?", [category])
    await conn.query('UPDATE product SET p_name=?, price=?, description=?,  quantity=?, category_id=? WHERE id=?', 
    [p_name, (price*((100-event[0][0].discount)/100)), description, quantity, value[0][0].id, req.params.productId])
    res.send('update complete')
  }
  else{
    const value = await conn.query("SELECT * FROM category WHERE category_name = ?", [category])
    await conn.query('UPDATE product SET p_name=?, price=?, description=?,  quantity=?, category_id=? WHERE id=?', 
    [p_name, price, description, quantity, value[0][0].id, req.params.productId])
    res.send('update complete')
  }
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})

router.get("/getproduct1/:productId", async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const product = await pool.query("SELECT * FROM product join product_picture on (product.id = product_picture.product_id) where id = ?", [req.params.productId])
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




const mainsellerSchema = Joi.object({
  cardId: Joi.number().min(1000000000000).required(),
 
})



router.put("/addcheck/openstore", upload.single('Pic'), async function(req, res, next){
  try {
    await mainsellerSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return console.log(err)
    
  }
  const cardId = req.body.cardId;
  
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const file = req.file;
    console.log(req.body)
    if (file) {
       console.log(file)
         const result = await pool.query("update seller set cardID = ?, cardId_pic = ? ,status = ? where id = ?",[cardId,file.path.substr(6),false,req.session.userdata.id])
         res.send(result[0][0])
     }else{     
      console.log("fail")
     }
    await conn.commit()
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})




router.put("/report", async function(req, res, next){
  const id = req.body.id
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    await pool.query("update store set reportnumber = reportnumber + 1 where id = ?", [id])
    await conn.commit()
    console.log(id)
    res.send("Report success")
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})

router.get("/picture/:productId", async (req,res,next)=>{
  const conn = await pool.getConnection();
  await conn.beginTransaction
  try{
    const result = await pool.query("SELECT * FROM product_picture WHERE product_id = ?", [req.params.productId])

    await conn.commit()
    res.send(result[0])
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})



router.get("/detail/store1", async (req,res,next)=>{
  const conn = await pool.getConnection();
  await conn.beginTransaction
  try{
    const result = await pool.query("SELECT * FROM store WHERE seller_id = ?", [req.session.userdata.id])
    await conn.commit()
    res.send(result[0])
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})



// const passwordValidator = (value, helpers) => {
//   if (value.length < 8) {
//     throw new Joi.ValidationError('Password must contain at least 8 characters')
//   }
//   if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
//     throw new Joi.ValidationError('Password must be harder')
//   }
//   return value
// }


// const usernameValidator = async (value, helpers) => {
//   const rows = await pool.query(
//     "SELECT username FROM user WHERE username = ?",
//     [value]
//   )
//   console.log(rows[0])
//   if (rows[0].length > 0) {
//     const message = 'This user is already taken'
//     throw new Joi.ValidationError(message, { message })
//   }
//   return value
// }


// const signupSchema = Joi.object({
//   f_name: Joi.string().required().max(150),
//   l_name: Joi.string().required().max(150),
//   username: Joi.string().required().min(5).external(usernameValidator),
//   password: Joi.string().required().custom(passwordValidator),
//   confirm_password: Joi.string().required().valid(Joi.ref('password')),
//   email: Joi.string().required().email(),
//   usertype: Joi.string().required().valid("seller", "buyer"),
//   phone_number: Joi.string().required().pattern(/0[0-9]{9}/),
// })


exports.router = router;



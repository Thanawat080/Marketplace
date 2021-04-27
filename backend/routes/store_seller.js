const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");



router = express.Router();

router.get("/store/product/:sellerId", async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const seller_product = await pool.query("SELECT *, product.id FROM product join product_picture on (product.id = product_picture.product_id) join store on (store.id = product.store_id) where store_id = ?", [req.params.sellerId])
    if(seller_product[0].length > 0){
        res.send(seller_product[0])
    }else{
        const store = await pool.query("SELECT * from store where id = ?", [req.params.sellerId])
        res.send(store[0])
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


router.post("/checkstatus", async function(req, res, next){
  const id = req.body.id
  console.log(id)
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const seller = await pool.query("select seller_id from store where id = ?", [id])
    const result = await pool.query("select status from seller where id = ?", [seller[0][0].seller_id])
    await conn.commit()
    res.send(result[0][0])
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})

exports.router = router;



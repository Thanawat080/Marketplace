const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
router = express.Router();


router.get("/index", async function(req,res,next){
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      const result = await pool.query("SELECT * FROM product")
      if(result[0].length > 0){
        const [rows, fields] = await pool.query(
          `SELECT a.*, b.picture FROM product AS a LEFT JOIN 
          (SELECT DISTINCT * FROM product_picture) AS b ON a.id = b.product_id
          group by id;`
        );
      await conn.commit()
      res.send(rows)
      }
      else{
        await conn.commit()
        res.send([])
      }
      
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }

})


router.post("/search", async function (req, res, next) {
  const search = req.body.search;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const rows1 = await pool.query(
      `SELECT a.*, b.picture FROM product AS a LEFT JOIN 
            (SELECT * FROM product_picture) AS b ON a.id = b.product_id where p_name like ? group by product.id`,['%'+search+'%']
    );
    res.send(rows1[0])
    console.log(search)
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})


router.get("/index/seller/store", async function(req,res,next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
      const rows = await pool.query(
        `select * from store where subscription_type = 'epic'`
      );

    await conn.commit()
    res.send(rows[0])
    
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }

})



router.post("/search/type", async function(req,res,next){
  const search_type = req.body.search_type;
  console.log(search_type)
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const rows1 = await pool.query(
      `select *,product.id from product join product_picture on(product.id = product_picture.product_id) join category on (product.category_id = category.id) where category_name = ? group by product.id`,[search_type]
    );
    await conn.commit()
    res.send(rows1[0]) 
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }

})



router.get("/event", async function(req,res,next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const result = await pool.query("SELECT * FROM event")
    
    await conn.commit()
    res.send(result[0])
    console.log(result[0])
    
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }

})


exports.router = router;

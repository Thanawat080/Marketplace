const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
router = express.Router();



router.get("/admin/main", async (req,res,next) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try{
        const store = await conn.query("SELECT *,store.id FROM store join seller on (store.seller_id = seller.id)")  
        conn.commit()
        res.json(store[0])
        
    }
    catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }  
    
})



router.post("/admin/getseller", async (req,res,next) => {
  const id = req.body.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
      const seller = await conn.query("SELECT * FROM seller where id = ?",[id])  
      conn.commit()
      res.json(seller[0][0])
  }
  catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }  
})


router.post("/admin/status/true", async (req,res,next) => {
  const id = req.body.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
      await conn.query("update seller set status = ?  where id = ?",[true,id])  
      const seller = await conn.query("SELECT status FROM seller where id = ?",[id])
      conn.commit()
      res.json(seller[0][0])
  }
  catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }  
})



router.post("/admin/status/false", async (req,res,next) => {
  const id = req.body.id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
      await conn.query("update seller set status = ?  where id = ?",[false,id])  
      const seller = await conn.query("SELECT status FROM seller where id = ?",[id])
      conn.commit()
      res.json(seller[0][0])
  }
  catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }  
})


// router.delete("/admin/deletestore/:storeId", async (req,res,next) => {
//     console.log(req.params.storeId)
//     const conn = await pool.getConnection();
//     await conn.beginTransaction();
//     try{
//         await conn.query('DELETE FROM `project`.`order_detail` WHERE `product_id` = 1')
//         // await conn.query("alter table `order_detail` drop foreign key `order_detail_ibfk_1`") 
//         // await conn.query("alter table `product_picture` drop foreign key `product_picture_ibfk_1`") 
//         // const product = await conn.query("select id from product where id = ? ",[req.params.storeId])  
//         // await conn.query("delete from `order_detail` where product_id = ? ",[product[0].id]) 
//         // await conn.query("delete from product where store_id = ? ",[req.params.storeId])  
//         // await conn.query("delete from store where id = ? ",[req.params.storeId])  
//         conn.commit()
//         res.json("Delete Success")
//     }
//     catch (err) {
//         await conn.rollback();
//         return res.status(400).json(err);
//       } finally {
//         console.log("finally");
//         conn.release();
//       }  
//   })



exports.router = router;
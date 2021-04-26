const express = require('express')
const pool = require("../config");
router = express.Router();


router.put("/addorder/:productId", async (req,res,next) => {

    const quantity = req.body.quantity
    const price  = req.body.price

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try{
        const orderId = await conn.query("SELECT MAX(order_id) id FROM `order`")
        await conn.query("INSERT INTO order_detail(product_id, order_id, total_price, quantity, price) VALUES (?, ?, ?, ?, ?)",
        [req.params.productId, orderId[0][0].id, quantity * price, quantity, price])
        conn.commit()
        res.json(orderId[0][0].id)
        
    }
    catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }
    
    
    
})

exports.router = router




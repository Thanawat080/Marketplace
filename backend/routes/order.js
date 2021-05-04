const express = require('express')
const pool = require("../config");
router = express.Router();
const { isLoggedIn } = require('../middlewares')

router.put("/addorder/:productId", isLoggedIn, async (req,res,next) => {

    const quantity = req.body.quantity
    const price  = req.body.price

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try{
        const orderId = await conn.query("SELECT MAX(order_id) id FROM `order` where buyer_id = ?",[req.session.userdata.id])
        const orderD = await conn.query("SELECT * FROM order_detail where product_id = ? AND order_id = ?", [req.params.productId, orderId[0][0].id])
        if(orderD[0].length == 0){
          await conn.query("INSERT INTO order_detail(product_id, order_id, total_price, quantity, price) VALUES (?, ?, ?, ?, ?)",
        [req.params.productId, orderId[0][0].id, quantity * price, quantity, price])
        }
        else{
          await conn.query("UPDATE order_detail set total_price = ?, quantity = ? where id = ?", [orderD[0][0].total_price + (quantity*price), (parseInt(orderD[0][0].quantity) + parseInt(quantity)), orderD[0][0].id])
        }
        
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

router.get("/checkout", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try{
    const result = await conn.query("SELECT *,od.id from `order` o join order_detail od using(order_id) join (select p_name, id from product) p on (p.id = product_id) where o.order_id in (select order_id from `order` where order_price is null) AND buyer_id = ? ", req.session.userdata.id)
    conn.commit()
    res.json(result[0])
  }catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})

router.post("/order/:orderId", isLoggedIn ,async (req, res, next) => {
  const address = req.body.address

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try{
    const totalprice = await conn.query("SELECT SUM(total_price) t FROM order_detail WHERE order_id = ? GROUP BY order_id", req.params.orderId)
    await conn.query("UPDATE `order` SET order_price = ? , date = ?, address = ? WHERE order_id = ?", [totalprice[0][0].t, new Date(), address, req.params.orderId])
    conn.commit()
    res.json('succress')
  }catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
})

router.put("/order", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try{
    await conn.query("INSERT INTO `order`(`buyer_id`, `order_price`, `date`, `address`) VALUES(?, ?, ?, ?);", 
            [req.session.userdata.id, null, null, null]) 
    conn.commit()
    res.json('succress')
  }catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
})

router.post("/product/:productId", async (req, res, next) => {
  const quantity = req.body.quantity
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try{
    await conn.query('UPDATE product SET quantity = ? WHERE id = ?', [quantity, req.params.productId])
    conn.commit()
    res.json('succress')
  }catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
})

router.get("/orderhistory", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const result = await conn.query("SELECT * FROM `order` WHERE buyer_id = ?", req.session.userdata.id)
    conn.commit()
    res.json(result[0])
  }catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
})


router.get("/sold/:productId", async (req, res, next) => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const result = await conn.query("SELECT sum(quantity) count FROM `order_detail` WHERE product_id = ?", req.params.productId)
    conn.commit()
    res.send(result[0])
  }catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
})


router.delete("/delete/orderdetail/:orderId", async function(req,res,next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    await conn.query("DELETE FROM `order_detail` WHERE `id` = ?", [req.params.orderId]);
    await conn.commit()
    res.send("success");
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})

router.post("/update/productquantity/:orderId", async function(req,res,next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const product = await conn.query("select * FROM `order_detail` WHERE `id` = ?", [req.params.orderId]);
    await conn.query("update product set quantity = quantity + ? WHERE `id` = ?", [product[0][0].quantity,product[0][0].product_id]);
    await conn.commit()
    res.send("success");
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})


router.post("/info/:orderId", async function(req,res,next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const order_detail = await conn.query("select *,order_detail.quantity FROM `order_detail` join product on(order_detail.product_id = product.id)  WHERE `order_id` = ?", [req.params.orderId]);
    await conn.commit()
    res.send(order_detail[0]);
  }catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
})



exports.router = router




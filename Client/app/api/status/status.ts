import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: "TEST-1121991478303106-071123-211897e3813a959b6199cf6e2d046272-1412742934",
});

export const venta = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const topic = query.topic || query.type;

  

  try {
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      const payment = await mercadopago.payment.findById(Number(paymentId));
      const paymentStatus = payment.body.status;

     
      if (paymentStatus === "approved") {
        
      const {status, payment_id, external_reference,merchant_order_id} = req.query;
        
      res.json({status, payment_id, external_reference,merchant_order_id})
        //aca va lo de Ismael

      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
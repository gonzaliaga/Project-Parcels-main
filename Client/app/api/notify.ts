import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.NEXT_ACCESS_TOKEN!,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const topic = query.topic || query.type;

 
  try {
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      let payment = await mercadopago.payment.findById(Number(paymentId));
      let paymentStatus = payment.body.status;

     
      if (paymentStatus === "approved"){
        //llamar a la DB y agregar los datos / Ojo el console log esta devolviendo los datos de la compra por ID
        // el dato para Front ya esta.-
        //hacer un merchant_order ----- bla bla si est en true se pasa el dato.
      }
    }
  } catch (error) {
    res.send(error);
  }
};

export default handler;
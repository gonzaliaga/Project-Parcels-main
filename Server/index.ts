import "dotenv/config"
import express from "express"
import router from "./router"
import connectDB from "./db/connect"
import morgan from "morgan"
import newAuthRouter from "./router/user.router"
import emailNotification from "./router/emailNotification.router"
import bodyParser from "body-parser"
/* import mercadopago from "mercadopago" */
const mercadopago = require("mercadopago")
const cors = require("cors") //Gonzalo MercadoPago

const app = express()

const { URL_LOCAL, URL_PAGO, URL_STATUS, URL_FAILURE } = process.env

const PORT = process.env.PORT || 3001

// Configuración de CORS
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.json())
app.use(cors()) //Gonzalo MercadoPago
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  res.header("X-Total-Count", "1000")
  next()
})
app.use("/api", router)
app.use(newAuthRouter)
app.use(emailNotification)

//aca tenemos lo de mercadopago en el server

mercadopago.configure({
  access_token:
    "TEST-1121991478303106-071123-211897e3813a959b6199cf6e2d046272-1412742934" // ojo esta con la cuenta prueba de vendedor
})

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: String(req.body.description),
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity)
      }
    ],
    back_urls: {
      success: URL_STATUS,
      failure: URL_FAILURE,
      pending: "" //esto es cuando pagan en efectivo y tienen que ir con el ticket a pagar a alguna caja
    },
    auto_return: "approved" as const
  }

  mercadopago.preferences
    .create(preference)
    .then(function (response: any) {
      res.json({
        id: response.body.id
      })
    })
    .catch(function (error: any) {
      console.log(error)
    })

  // Aca es la captura cuando vuelve la compra y te devuelve el status.-

  app.get("URL_STATUS", function (req, res) {
    res.json({
      Status: req.query.status,
      Payment: req.query.payment_id,
      Price: req.query.external_reference,
      MerchantOrder: req.query.merchant_order_id
    })
  })
})

// aca termina mercadopago

/* const status = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const topic = query?.topic || query?.type;

  console.log({ query, topic });
  try {
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      let payment = await mercadopago.payment.findById(Number(paymentId));
      let paymentStatus = payment.body.status;

      console.log([payment, paymentStatus]);
      if (paymentStatus === "approved" || paymentStatus==="failure") {
        // Acciones en caso de pago aprobado
        const status = req.query.status; // Estado: aprobado, desaprobado
        const paymentId = req.query.payment_id; // ID de mercadopago en caso de Pagado
        const externalReference = req.query.external_reference; // lo que pagó en $$
        const merchantOrderId = req.query.merchant_order_id; // Identificador de la orden de pago

        // Realizar acciones con los datos obtenidos
      }
    }
  } catch (error) {
    res.send(error);
  } */

app.listen(PORT, () => {
  connectDB()
  console.log("App escuchando en el puerto :", PORT)
})

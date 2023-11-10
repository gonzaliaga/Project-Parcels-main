import express from "express"
import {
    parcela,
    parcelas,
    createCondominio,
    createParcela,
    updateParcela,
    deleteParcela,
    desableParcela,
    updateViews
} from "../controllers/auth"

import {
    users,
    userDelete,
    userUpdate,
    postWishList,
    deleteWishList,
} from '../controllers/users'
import {
    createMessage,
    deleteMessage,
    getMessages,
    updateMessage,
} from "../controllers/contacts";

const router = express.Router();

router.get("/parcelas", parcelas)
router.get("/parcelas/:id", parcela)
router.post("/parcela", createParcela)
router.put("/usersDelete/:id", userDelete)
router.put("/updateUser/:id", userUpdate)
router.get('/users', users)
router.post("/condominio", createCondominio)
router.put("/updateParcela/:id", updateParcela)
router.put("/deleteParcela/:id", deleteParcela)
router.put("/desableParcela/:id", desableParcela)
router.put("/updateViews/:id", updateViews)
// rutas de mensajes...
router.post("/message", createMessage)
router.get("/message", getMessages)
router.put("/message/:id", updateMessage)
router.put("/deleteMessage/:id", deleteMessage)

router.put("/wishlist/:id", postWishList)
router.put("/thewishlist/:id", deleteWishList)

export default router;

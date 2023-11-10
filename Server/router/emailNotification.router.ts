import { Router } from "express"
const router = Router()

import emailNotification  from "../userControlers/emailNotification"

router.post("/emailNotification", emailNotification)


export default router

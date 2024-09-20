import { Router } from "express";
import {
    uploadCSV,
    addUserFromCSV,
    userUnsbscribe,
    sendEmailToList
} from "../controllers/user.controller.js"

const router = Router()

router.post("/adduser/:listId", uploadCSV, addUserFromCSV)
router.get("/unsubscribe/:listId/:userId", userUnsbscribe)
router.post("/sendemail/:listId", sendEmailToList)


export default router;


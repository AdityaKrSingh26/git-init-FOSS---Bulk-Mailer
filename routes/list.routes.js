import { Router } from "express";
import {
    createList
} from "../controllers/list.controller.js"

const router = Router()

router.route("/createList").post(createList)

export default router;
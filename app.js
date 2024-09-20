import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// Import Routes
import userRoute from "./routes/user.routes.js"
import listRoute from "./routes/list.routes.js"

// Declare Routes
app.use("/api/v1/list", listRoute)
app.use("/api/v1/user", userRoute)

export { app }
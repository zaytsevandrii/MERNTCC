import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
dotenv.config()
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"

connectDB()
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", userRoutes)

app.get("/", (req, res) => res.send("Server ready aff"))
app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Server started at ${port}`))

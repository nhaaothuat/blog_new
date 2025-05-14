import express  from "express";
import dotenv from "dotenv"
import connectDb from "./utils/db.js";
import userRoutes from "./routes/user.js"
dotenv.config()

const port = process.env.PORT
const app = express()
connectDb()

app.use(express.json())

app.use("/api/v1",userRoutes)



app.listen(port,()=>{
     console.log(`Server is listening on port ${port}`);
})
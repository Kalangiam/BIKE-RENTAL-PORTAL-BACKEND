import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import AppRouter from './routes/index.js'
dotenv.config()

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(AppRouter)

// app.get("/", (req, res) => {
//     res.send('Bike rental Portal Backend');
//   });

app.listen(PORT, ()=>console.log(`App listening PORT ${PORT}`))


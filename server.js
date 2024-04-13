import 'dotenv/config';
import  express  from 'express';
import path from "path";
import cors from 'cors';

import dbConnect from './config/dbConnect.js';
import SaveContact from './controllers/SaveContact.js'

const app = express();

const PORT = process.env.PORT || 5000;


app.use(express.json({ limit: '50mb' }))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve() + "/public"))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

dbConnect();

app.post('/contact',SaveContact)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


  
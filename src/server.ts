import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './database';
import { employeeRouter } from './employee.routes';

dotenv.config()

const app = express();
const {ATLAS_URI} = process.env;
app.use(cors());

if(!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been declared on config.env")
    process.exit(1);
} else {
    connectToDatabase(ATLAS_URI)
}

app.use("/employees", employeeRouter)
app.listen(5200, () => {
    console.log(`Server running at http://localhost:5200...`)
})

export default app;
import { AppDataSource } from "./data-source"
import app from './app';

const PORT = process.env.PORT || 3200;

async function initializeDatabase () {
    try {
        await AppDataSource();
    } catch (error) {
        console.log(error);
    }
}

initializeDatabase ();

// AppDataSource.initialize().then(async () => {
//     console.log("Connected to the MySQL database.....");
// }).catch(error => console.log(error))

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
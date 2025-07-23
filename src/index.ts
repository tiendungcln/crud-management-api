import dotenv from 'dotenv';
import { AppDataSource } from './config/db.config';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`);
    })
  })
  .catch((err) => {
    console.error('Error connecting DB', err)
  });
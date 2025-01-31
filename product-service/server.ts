import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './src/routes/productRoutes';
import { constants } from "./src/utility/global";
import { runSeeder } from "./src/seeders/seeder"

global.constants = constants;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/product-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async() => {
  console.log('Product Service DB Connected')
  await runSeeder();

})
  .catch((err) => console.error(err));

app.use('/api/products', productRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Product service running on port ${port}`);
});

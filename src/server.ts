import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main(): Promise<void> {
  try {
    await mongoose.connect(config.dbUri as string);
    console.log('Connected to MongoDB');
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`),
    );
  } catch (error) {
    console.error(error);
  }
}

main();

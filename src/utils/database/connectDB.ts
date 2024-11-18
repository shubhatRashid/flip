import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

// @ts-ignore
let cached: MongooseCache = global.mongoose;

if (!cached) {
// @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<mongoose.Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useUnifiedTopology:true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

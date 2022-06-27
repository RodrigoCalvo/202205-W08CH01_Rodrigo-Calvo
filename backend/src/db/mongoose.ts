import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function mongoooseConnect() {
    const uri = process.env.URI_MONGO;
    return mongoose.connect(uri as string);
}

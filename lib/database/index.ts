/* BEST METHOD TO CONNECT FOR MONGODB SO FAR */

import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI

const cached = (global as any).mongoose || { conn: null, promise: null }
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn

  if (!uri) throw new Error('MongoDB URI not found')

  cached.Promise =
    cached.Promise ||
    mongoose.connect(uri, {
      dbName: 'eventhesizer',
      bufferCommands: false
    })

  cached.conn = await cached.promise

  return cached.conn
}

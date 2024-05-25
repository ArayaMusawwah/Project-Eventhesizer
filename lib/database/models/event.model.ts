import { Document, Schema, Types, model, models } from 'mongoose'

export interface IEvent extends Document {
  _id: string
  title: string
  description?: string
  location?: string
  createdAt: Date
  startDate: Date
  endDate: Date
  imageUrl: string
  price?: string
  isFree: boolean
  url?: string
  categoryId: { _id: Types.ObjectId | string; name: string }
  organizerId: {
    _id: Types.ObjectId | string
    firstName: string
    lastName: String
  }
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  categoryId: { type: Types.ObjectId, ref: 'Category' },
  organizerId: { type: Types.ObjectId, ref: 'User' }
})

const Event = models.Event || model('Event', EventSchema)

export default Event

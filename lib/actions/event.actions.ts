'use server'

import { CreateEventParams, GetAllEventsParams } from '@/types'
import { connectToDatabase } from '../database'
import User from '../database/models/user.model'
import Event from '../database/models/event.model'
import { handleError } from '../utils'
import Category from '../database/models/category.model'

const populateEvent = async (event: any) => {
  return event
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName'
    })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

export const createEvent = async ({ event, userId }: CreateEventParams) => {
  try {
    await connectToDatabase()
    const organizer = await User.findById(userId)

    if (!organizer) throw new Error('Organizer not found')
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId
    })

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}

export const getEventById = async (id: string) => {
  try {
    await connectToDatabase()
    const event = await populateEvent(Event.findById(id))

    if (!event) throw new Error('Event not found')
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}

export const getAllEvents = async ({
  query,
  category,
  page,
  limit = 6
}: GetAllEventsParams) => {
  try {
    await connectToDatabase()

    const conditions = {}
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit)
    }
  } catch (error) {
    handleError(error)
  }
}

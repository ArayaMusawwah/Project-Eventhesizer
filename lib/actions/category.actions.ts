'use server'

import { CreateCategoryParams } from '@/types'
import { connectToDatabase } from '../database'
import Category from '../database/models/category.model'

export const createCategory = async ({
  categoryName
}: CreateCategoryParams) => {
  await connectToDatabase()
  const newCategory = await Category.create({ name: categoryName })
  return JSON.parse(JSON.stringify(newCategory))
}

export const getAllCategories = async () => {
  await connectToDatabase()
  const categories = await Category.find({})
  return JSON.parse(JSON.stringify(categories))
}

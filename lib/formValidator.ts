import * as z from 'zod'

export const formSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(100, 'Description must be less than 100 characters'),
  location: z
    .string()
    .min(3, 'Location is required')
    .max(300, 'Location must be less than 400 characters'),
  imageUrl: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean().default(false),
  url: z.string().url()
})

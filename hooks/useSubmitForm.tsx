'use client'

import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { createEvent, updateEvent } from '@/lib/actions/event.actions'
import { handleError } from '@/lib/utils'
import { formSchema } from '@/lib/formValidator'
import { useState } from 'react'
import { eventDefaultValues } from '@/constant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IEvent } from '@/lib/database/models/event.model'

type Props = {
  userId: string
  type: 'Create' | 'Update'
  event?: IEvent
  eventId?: string
}

const useSubmitForm = ({ userId, type, event, eventId }: Props) => {
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  const initialValues =
    event && type === 'Update'
      ? {
          ...event,
          imageUrl: event.imageUrl,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate)
        }
      : eventDefaultValues
  console.log('useSubmitForm ~ initialValues =>', initialValues)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })

  const { startUpload } = useUploadThing('imageUploader')

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let uploadImageUrl = values.imageUrl
    console.log('onSubmit ~ uploadImageUrl =>', uploadImageUrl)

    if (!files.length) return

    const uploadedImage = await startUpload(files)
    if (!uploadedImage) return

    uploadImageUrl = uploadedImage[0].url

    if (type === 'Update') {
      if (!event || !eventId) {
        router.back()
        return
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadImageUrl, _id: eventId },
          path: `/events/${eventId}`
        })

        if (updatedEvent) {
          form.reset()
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        handleError(error)
      }
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadImageUrl },
          userId,
          path: '/profile'
        })

        if (newEvent) {
          form.reset()
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        handleError(error)
      }
    }
  }

  return { form, onSubmit, setFiles }
}

export default useSubmitForm

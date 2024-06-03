'use client'

import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { createEvent } from '@/lib/actions/event.actions'
import { handleError } from '@/lib/utils'
import { formSchema } from '@/lib/formValidator'
import { useState } from 'react'
import { eventDefaultValues } from '@/constant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const useSubmitForm = ({
  userId,
  type
}: {
  userId: string
  type: 'Create' | 'Update'
}) => {
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: eventDefaultValues
  })

  const { startUpload } = useUploadThing('imageUploader')

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let uploadImageUrl = values.imageUrl

    if (!files.length) return

    const uploadedImage = await startUpload(files)
    if (!uploadedImage) return

    uploadImageUrl = uploadedImage[0].url

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

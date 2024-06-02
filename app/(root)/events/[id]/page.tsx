import { getEventById } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils'
import { Event, SearchParamProps } from '@/types'
import Image from 'next/image'

const DetailEventPage = async ({ params: { id } }: SearchParamProps) => {
  const event: Event = await getEventById(id)

  return (
    <section className="flex flex-col justify-center bg-primary-50 bg-dotted-pattern bg-contain bg-center">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{event.title}</h2>

            <div className="flex flex-col gap-3 sm:items-center md:flex-row">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/50 px-5 py-2 text-green-700">
                  {event.isFree ? 'FREE' : `$${event.price}`}
                </p>
                <p className="p-medium-20 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {event.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>

          {/* Checkout Button */}

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width="32"
                height="32"
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDateTime(event.startDate).dateOnly} -{' '}
                  {formatDateTime(event.startDate).timeOnly}
                </p>
                <p>
                  {formatDateTime(event.endDate).dateOnly} -{' '}
                  {formatDateTime(event.endDate).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold20 text-grey-18">What You&lsquo;ll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
            <p className="p-medium-16 lg:p-regular-18 text-primary-500 underline">
              {event.url}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default DetailEventPage

import { IEvent } from "@/lib/database/models/event.model"
import Card from "./Card"
import Pagination from "./Pagination"

interface Props {
  data: IEvent[]
  emptyTitle: string
  emptyStateSubtext: string
  collectionType: "All_Events" | "Events_Organized" | "My_Tickets"
  page: number | string
  totalPages?: number
  urlParamName?: string
}

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  page,
  urlParamName,
  totalPages = 0
}: Props) => {
  return data.length > 0 ? (
    <div className="flex flex-col items-center gap-10">
      <ul
        className={`grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:gap-10 ${collectionType === "All_Events" ? "lg:grid-cols-4" : "lg:grid-cols-3"} `}
      >
        {data.map((event: IEvent) => {
          const hasOrderLink = collectionType === "Events_Organized"
          const hidePrice = collectionType === "My_Tickets"

          return (
            <li className="flex justify-center" key={event?._id}>
              <Card
                event={event}
                hasOrderLink={hasOrderLink}
                hidePrice={hidePrice}
              />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          urlParamName={urlParamName}
        />
      )}
    </div>
  ) : (
    <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
      <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
      <p className="p-regular-14">{emptyStateSubtext}</p>
    </div>
  )
}
export default Collection

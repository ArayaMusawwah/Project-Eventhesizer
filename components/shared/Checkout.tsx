"use client"

import { checkoutOrder } from "@/lib/actions/order.actions"
import { IEvent } from "@/lib/database/models/event.model"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect } from "react"
import { Button } from "../ui/button"

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const router = useRouter()
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.")
    }

    if (query.get("canceled")) {
      console.log(
        `Order canceled -- continue to shop around and checkout when you're ready.`
      )
    }
  }, [])

  const onCheckout = async (e: FormEvent) => {
    e.preventDefault()
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    }
    const url = await checkoutOrder(order)
    router.push(url!)
  }

  return (
    <form onSubmit={onCheckout} method="POST">
      <Button type="submit" role="link" size={"lg"} className="button sm:w-fit">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  )
}
export default Checkout

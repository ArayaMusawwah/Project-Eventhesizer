import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import { Suspense } from "react"
import Loading from "./loading"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense fallback={<Loading />}>
        <main className="flex-1">{children}</main>
      </Suspense>
      <Footer />
    </div>
  )
}

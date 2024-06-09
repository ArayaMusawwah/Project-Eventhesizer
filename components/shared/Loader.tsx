import Image from "next/image"

const Loader = () => {
  return (
    <div className="wrapper grid min-h-[70vh] place-items-center">
      <Image
        src={"/assets/icons/loader.svg"}
        alt="loader"
        width={80}
        height={80}
        className="animate-spin"
      />
    </div>
  )
}
export default Loader

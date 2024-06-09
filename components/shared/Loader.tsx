import Image from "next/image"

const Loader = () => {
  return (
    <div className="wrapper grid min-h-screen place-items-center">
      <Image
        src={"/assets/icons/loader.svg"}
        alt="loader"
        width={100}
        height={100}
        className="animate-spin"
      />
    </div>
  )
}
export default Loader

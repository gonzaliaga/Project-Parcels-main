import { MdOutlineSearchOff } from "react-icons/md"

const SearchNotFound = () => {
  const gradientText = {
    background:
      "-webkit-linear-gradient(90deg, hsla(79, 60%, 58%, 1) 0%, hsla(156, 96%, 31%, 1) 100%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  }
  return (
    <div className="h-[20rem] w-[60rem] pl-[10rem] py-[5rem] flex justify-center">
      <div className="flex items-center justify-center w-40 h-40 mb-4 rounded-full bg-green-200 sm:mx-auto sm:w-34 sm:h-34">
        <MdOutlineSearchOff className="w-30 h-30 text-deep-purple-accent-400 sm:w-[5rem] sm:h-[5rem] text-green-600" />
      </div>
      <div>
        <h2 className="max-w-lg mb-6  text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto m-9">
          No hay parcelas que{" "}
          <span style={gradientText}>coincidan con tu búsqueda</span>
        </h2>
      </div>
    </div>
  )
}

export default SearchNotFound

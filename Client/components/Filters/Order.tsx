import { sortParcelas } from "@/redux/features/parcelSlice"
import { useAppDispatch } from "@/redux/hooks"
export default function Order() {
  const dispatch = useAppDispatch()

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const orderBy = event.target.value
    dispatch(sortParcelas(orderBy))
  }

  return (
    <select
      className=" text-gray-600 hover:text-gray-400 duration-200 text-[0.80rem] font-semibold focus:outline-none focus:ring-none focus:ring-none"
      onChange={handleSortChange}
    >
      <option value="asc">MENOR PRECIO</option>
      <option value="desc">MAYOR PRECIO</option>
    </select>
  )
}

type ButtonProps = {
  text: string
}

export default function Button({ text }: ButtonProps) {
  return (
    <button className="bg-gradient-to-r from-[#ACD453] to-[#039D60] text-white hover:from-[#8cad43] hover:to-[#006F43]   duration-200 px-4 py-[5px] rounded-md">
      {text}
    </button>
  )
}

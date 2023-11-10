const Confirmation = () => {
    return (
        <div className=" absolute flex flex-col justify-center items-center text-[25px] w-[600px] h-[400px] bg-white bg-opacity-30 backdrop-blur-[10px]  z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl shadow-2xl">
            <h2 className="font-bold">Felicidades</h2>
            <p className="font-medium">¡La parcela se ha creado de manera exitosa!</p>
        </div>
    )
}

export default Confirmation;

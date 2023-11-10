import ParcelaModel from "../models/parcela"

const idParcela = async (id:string) => {
    const [parcela] = await ParcelaModel.find({_id:id})
    return parcela
}

export default idParcela;
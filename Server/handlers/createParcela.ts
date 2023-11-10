import ParcelaModel from "../models/parcela"
import CondominioModel from '../models/condominio';

const createParcela = async (
  name: string,
  lote:number,
  area:number,
  price:number,
  location:string,
  image:string,
  description:string,
  condominio: string,
  user:string,
  ) => {

    const nuevoParcela = new ParcelaModel({
      name,
      lote,
      area,
      price,
      location,
      image,
      description,
      condominio,
      user,
    });
        const parcelaCreado = await nuevoParcela.save();
    const [condominioId] = await CondominioModel.find({name:condominio})
        const id = condominioId._id;
        await CondominioModel.findByIdAndUpdate(
          id,
          { $push: { parcelas: parcelaCreado._id.valueOf().toString() } },
          { new: true }
        );
        return parcelaCreado;
}

export default createParcela;

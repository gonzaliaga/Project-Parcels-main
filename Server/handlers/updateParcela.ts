import ParcelaModel from '../models/parcela';

const updateParcela = async (
  id: string,
  name: string,
  lote: number,
  area: number,
  price: number,
  location: string,
  image: string,
  description: string,
  status: string,
  user: string,
) => {
  console.log("description",description)
  const parcelaActualizado = await ParcelaModel.findByIdAndUpdate(id, {
    name,
    lote,
    area,
    price,
    location,
    image,
    description,
    status,
    user,
  }, { new: true });

  return parcelaActualizado;
}

export default updateParcela;

import ParcelaModel from '../models/parcela';

const deletedParce = async (id: string) => {
  const parcela = await ParcelaModel.findByIdAndRemove(id);

  return parcela;
}

export default deletedParce;

import ParcelaModel from '../models/parcela';

const desableParc = async (id: string) => {
  const parcela = await ParcelaModel.findById(id);

  if (!parcela) {
    throw new Error(`Parcela with id ${id} not found`);
  }

  parcela.deleted = !parcela.deleted;
  await parcela.save();

  return parcela;
}

export default desableParc;

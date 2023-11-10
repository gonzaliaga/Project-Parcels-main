import { Request, Response } from "express"
import searchParcelas from "../handlers/searchParcelas";
import idParcela from "../handlers/idParcela"
import functionCreate from "../handlers/createParcela"
import createCondo from "../handlers/createCondominio"
import updateParce from "../handlers/updateParcela"
import deletedParce from "../handlers/deleteParcela";
import desableParc from "../handlers/desableParcela";
import ParcelaModel from '../models/parcela'

// esta ruta trae por query( el nombre del condominio) sus parcelas  y sin query trae todas las parcelas existentes
export const parcelas = async (req: Request, res: Response) => {

  try {
    const { name } = req.query
    const parcelas = await searchParcelas(name);
    res.status(200).json(parcelas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las parcelas de la base de datos.');
  }
}

// parcela por id
export const parcela = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    if (!id) {
      throw new Error('El campo  id no existe .');
    }
    const parcela = await idParcela(id)

    return res.status(200).send(parcela)

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los parcela de la base de datos.');
  }

}

export const updateViews = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const parcelaViews = await idParcela(id)
    if (parcelaViews.views !== undefined) {
      await ParcelaModel.findByIdAndUpdate(id, {
        views: parcelaViews.views + 1
      }, { new: true });
      console.log(parcelaViews,"existe")
      return res.status(200).send(parcelaViews)
    } else {
      await ParcelaModel.findByIdAndUpdate(id, {
        views: 0
      }, { new: true });
      console.log(parcelaViews, "no existe")
      return res.status(200).send(parcelaViews)
    }
  } catch (error) {
    res.status(500).send('Error views update ')
  }
}


/* const parcelaActualizado = await ParcelaModel.findByIdAndUpdate(id, {
  name,
  lote,
  area,
  price,
  location,
  image,
  description,
  condominio
}, { new: true }); */

// Crea parcela y guarda en el condominio el id de la parcela
export const createParcela = async (req: Request, res: Response) => {
  try {
    const { name, lote, area, price, location, image, description, condominio, user } = req.body;

    if (!name || !lote || !area || !price || !location || !image || !description || !user) {
      throw new Error('Los datos requeridos estan incompletos.');
    }

    const parcelaCreada = await functionCreate(
      name,
      lote,
      area,
      price,
      location,
      image,
      description,
      condominio,
      user,
    );
    res.status(201).json(parcelaCreada);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la parcela en la base de datos.');
  }
};

//Crear condominio
export const createCondominio = async (req: Request, res: Response) => {
  try {
    const { id, name, location, access, parcelas, description, image } = req.body;
    console.log(req.body)
    if (!name || !location || !access || !description || !image) {
      throw new Error('El campo name e id son requeridos.');
    }
    const condominioCreado = await createCondo(id,
      name,
      location,
      access,
      description,
      image,
      parcelas);
    res.status(201).json(condominioCreado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el condominio en la base de datos.');
  }


};

// actualiza una parcela por id
export const updateParcela = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lote, area, price, location, image, condominio, description, status, user } = req.body;
    console.log(req.body);


    if (!id) {
      throw new Error('El campo id es requerido.');
    }
    const parcelaActualizado = await updateParce(id, name, lote, area, price, location, image, description, status, user)
    if (!parcelaActualizado) {
      return res.status(404).json({ error: 'El documento no existe.' });
    }

    return res.status(200).json(parcelaActualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar la parcela en la base de datos.' });
  }

}
// borrado logico por _id
export const deleteParcela = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const borrado = await deletedParce(id)
    if (!borrado) {
      return res.status(404).json({ error: 'Parcela no encontrada.' });
    }

    return res.status(200).json(borrado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar la parcela de la base de datos.' });
  }

};

export const desableParcela = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const disable = await desableParc(id)
    if (!disable) {
      return res.status(404).json({ error: 'Parcela no encontrada.' });
    }

    return res.status(200).json(disable);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al deshabilitar la parcela de la base de datos.' });
  }

};





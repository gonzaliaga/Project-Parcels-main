import { ParsedQs } from 'qs';
import CondominioModel from '../models/condominio';
import ParcelaModedel from "../models/parcela"

const searchParcelas = async (name: string | string[] | ParsedQs | ParsedQs[] | undefined) => { 
     
    if (!name) { 
        // todas las parcelas
          const parcelasData = await ParcelaModedel.find() ;     
          return parcelasData
      } else {
        //por el nombre del comdominio
          const [parcelasData] = await CondominioModel.find({ name: name });
          
          const parcelasIds = parcelasData.parcelas.map(parcela => parcela.toString());
       return parcelasIds
      } 
    }   

export default searchParcelas;
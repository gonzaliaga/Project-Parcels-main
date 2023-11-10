import CondominioModel from '../models/condominio'; 

const createCondominio = async (   id:string,
    name:string,
    location:string,
    access:string,
    description:string,
    image:string,
    parcelas:any
    ) => {
  
   const nuevoCondominio = new CondominioModel(  
 {   id,
    name,
    location,
    access,
    description, 
    image, 
    parcelas}
   );
       const condominioCreado = await nuevoCondominio.save()
       return condominioCreado;
}

export default createCondominio;
import User from "../models/user"
import { IParcela } from "../models/parcela"

const createWishlist = async (data: IParcela, id: string) => {
  try {
    const user = await User.findById(id); 

    if (user) {
      user.wishes?.push(data);
      await user.save(); 
      console.log("Wishlist actualizada con éxito");
      return user
    } else {
      console.log("No se encontró el usuario con el ID proporcionado");
    }
  } catch (error) {
    console.error("Error al actualizar la wishlist:", error);
  }
}

export default createWishlist;
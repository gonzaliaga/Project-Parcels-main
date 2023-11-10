import Contact from "../models/contacto"


const DeleteMessage = async (id:string) => {
    await Contact.findByIdAndDelete(id);
}

export default DeleteMessage

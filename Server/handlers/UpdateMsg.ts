import Contact from "../models/contacto";

const UpdateMsg = async (id: string, managed: boolean) => {

    const inf = await Contact.findByIdAndUpdate(id, { managed }, { new: true });

    return inf
}

export default UpdateMsg

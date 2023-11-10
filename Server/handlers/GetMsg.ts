import Contact from "../models/contacto";

const GetMsg = async () => {
    const info = await Contact.find();
    return info


}

export default GetMsg

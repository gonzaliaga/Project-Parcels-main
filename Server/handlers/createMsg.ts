import Contact from "../models/contacto";

const CreateMsg = async (firstName:string, lastName: string, email:string, phone: number, reason: string, message: string) => {

    const newMessage = new Contact({
        firstName,
        lastName,
        email,
        phone,
        reason,
        message
    })

    const createMessage = await newMessage.save();

    return createMessage

}

export default CreateMsg;

import { Request, Response } from "express"
import CreateMsg from "../handlers/createMsg";
import GetMsg from "../handlers/GetMsg";
import UpdateMsg from "../handlers/UpdateMsg";
import DeleteMessage from "../handlers/DeleteMessage";


export const createMessage = async (req: Request, res: Response) => {

    const { firstName, lastName, email, phone, reason, message } = req.body;

    try {
        const parcelas = await CreateMsg(firstName, lastName, email, phone, reason, message);
        res.status(200).json(parcelas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el mensaje en la base de datos.');
    }
}

export const getMessages = async (req: Request, res: Response) => {

    try {
        const messages = await GetMsg();
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al comunicarse con la base de datos.' });
    }

}

export const updateMessage = async (req: Request, res: Response) => {

    const {id} = req.params
    const { managed } = req.body;


    try {
        if (!id) {
            throw new Error('El campo id es requerido.');
        }

        const mesg = await UpdateMsg(id, managed)

        res.status(200).json(mesg);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar el estado del mensaje.' });
    }
 }

export const deleteMessage = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        if (!id) {
            throw new Error('El campo id es requerido.');
        }
        await DeleteMessage(id);

        res.status(200).json("Eliminacion exitosa...")

    } catch (error) {
        return res.status(500).json({error: "El mensaje no pudo ser eliminado."})
    }
 }

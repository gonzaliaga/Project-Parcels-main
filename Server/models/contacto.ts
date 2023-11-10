// Contact.js
import { Schema, model, Document } from "mongoose";

interface Contactanos extends Document {
  firstName: string
  lastName: string
  email: string
  phone: number
  reason: string
  message: string
  managed: boolean
}

const contact = new Schema<Contactanos>({
  firstName: {type: String, required: true},
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  reason: { type: String, required: true },
  message: { type: String, required: true },
  managed: { type: Boolean, required: false, default: false}
});

const Contact = model<Contactanos>("Contact", contact);

export default Contact;

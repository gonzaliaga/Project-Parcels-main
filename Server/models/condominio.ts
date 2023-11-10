import { Schema, model, Document, Types } from "mongoose";

interface ICondominio extends Document {
    id: string;
    name: string;
    location: string;
    image: string;
    access: string;
    description: string;
    parcelas: Types.ObjectId[]; // Array de referencias a Parcelas
  }
  
  const condominioSchema = new Schema<ICondominio>({
    id: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    access: { type: String, required: true },
    description: { type: String, required: true },
    parcelas: [{ type: Schema.Types.ObjectId, ref: "Parcelas" }] // Array de referencias a Parcelas
  });
  
  const Condominio = model<ICondominio>("Condominio", condominioSchema);
  export default Condominio ;
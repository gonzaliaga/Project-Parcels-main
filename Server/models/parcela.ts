import { Schema, model, Document } from "mongoose";

export interface IParcela extends Document {
  name: string;
  lote: number;
  area: number;
  price: number;
  location: string;
  image: string[];
  deleted: boolean;
  description: string;
  user: string; // Referencia al Condominio
  views:number,
  status?: string
}

const parcelaSchema = new Schema<IParcela>({
  name: { type: String, unique: true, required: true },
  lote: { type: Number, unique: true, required: true },
  area: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
  description: { type: String, required: true },
  user: { type: String, required: true},
  views:{type:Number, required:false, default:0},
  status: { type: String, required:false, default:'Disponible'}
 // condominio: { type: Schema.Types.String, ref: "Condominio", required: true }
});

const Parcela = model<IParcela>("Parcela", parcelaSchema);


export default Parcela;

import { Schema, model } from "mongoose";


const servicesSchema = new Schema({
    id:{type:String,unique:true, require:true},
    name:{type:String, unique:true, require:true},
    price:{type:Number, require:true}
   
})

export default  model("Services",servicesSchema,"services");
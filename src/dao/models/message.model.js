//estructura del documento que se guardara
//esquema
//schema
import mongoose from "mongoose"

const messageCollection ='message'

const messageSchema = new mongoose.Schema({
    
    user:{type:String, required:true},
    message: {type:String, required:true}
})
const messageModel =mongoose.model(messageCollection,messageSchema)
export default messageModel
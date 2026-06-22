import mongoose, { models, Schema } from "mongoose";


const UsersSchema = new Schema({
   firstname: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   role:{
      type: String,
      default:"USER"
   }
}, {
   timestamps: true,
}
)

const UsersModel = models.users || mongoose.model("users", UsersSchema)

export default UsersModel
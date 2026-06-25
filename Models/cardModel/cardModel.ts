import mongoose, { Schema, models } from "mongoose";

const CardSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   des: {
      type: String,
   },
   color: {
      type: String,
      default: "#ffffff"
   },
   board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      index: true,
      required:true
   }
}, {timestamps: true})

const CardModel = models.card || mongoose.model("card", CardSchema)
export default CardModel

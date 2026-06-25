import mongoose, { models, Schema } from "mongoose";

const BoardSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   des: {
      type: String,
   },
   color: {
      type: String,
      default: "white"
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      index: true,
      required: true
   }

}, { timestamps: true })

const BoardModel = models.board || mongoose.model("board", BoardSchema)
export default BoardModel
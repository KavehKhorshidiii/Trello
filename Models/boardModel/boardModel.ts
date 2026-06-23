import mongoose, { models, Schema } from "mongoose";

const BoardSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   color: {
      type: String,
      default: "white"
   },
   createdAt: {
      type: Date,
      default:Date.now
   },
   userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
   }

}, { timestamps: true })

const BoardModel = models.board || mongoose.model("board" , BoardSchema)

export default BoardModel
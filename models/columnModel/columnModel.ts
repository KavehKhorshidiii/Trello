import mongoose, { Schema, models } from "mongoose";

const ColumnSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      index: true,
      required: true
   },
   order: {
      type:Number
   }
})

const ColumnModel = models.column || mongoose.model("column", ColumnSchema)

export default ColumnModel
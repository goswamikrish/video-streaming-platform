const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
  user:{
    type :mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
   title: {
    type: String,
    required: true,
  },
   channeltitle: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now
  },
  });
  module.exports= mongoose.model('notes',NotesSchema);
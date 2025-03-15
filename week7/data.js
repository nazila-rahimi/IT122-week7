import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://dbuser:Yosuf143@cluster0.cctfk.mongodb.net/sccproject?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

export default mongoose;

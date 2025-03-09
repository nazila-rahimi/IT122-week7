import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://dbuser:Yosuf143@cluster0.cctfk.mongodb.net/sccproject?retryWrites=true&w=majority";

//  Connect to MongoDB with proper options
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,   // Prevents connection string parsing issues
  useUnifiedTopology: true // Enables new Server Discoveryengine
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

export default mongoose;

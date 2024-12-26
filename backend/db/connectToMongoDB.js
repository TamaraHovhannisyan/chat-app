import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connect to MongoDB");
        
    } catch (error) {
        console.log("Error connecting MongoDB");
        
    }
}

export default connectToMongoDB;
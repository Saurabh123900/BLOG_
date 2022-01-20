import mongoose from 'mongoose';

const Connection = async () => {
    try {
        const URL = 'mongodb+srv://100gods:saurabh123@cluster0.9efro.mongodb.net/BLOG?retryWrites=true&w=majority'
        await mongoose.connect(URL,{useNewUrlParser:true,
            useUnifiedTopology:true,
            });
        console.log("Database Connected");
    }catch(error){
        console.log("Database not connected",error);
        throw(error);
    }
}

export default Connection;

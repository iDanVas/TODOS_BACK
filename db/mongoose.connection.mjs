import mongoose from "mongoose";
import log from "@ajar/marker";

export const connectDB = async (uri) => {//connect mongoose DB

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    });
};
    //     await mongoose.connect(uri);
    // };
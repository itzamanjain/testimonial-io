import mongoose  from "mongoose";

export async function connectDb(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('connected to DB');
        })

        connection.on('error', (error) => {
            console.log('something went wrong while connecting DB');
            console.log(error);
            process.exit(1);
            
        })
    } catch (error) {
        console.log('something went wrong while connecting DB');
        console.log(error);
    }
}
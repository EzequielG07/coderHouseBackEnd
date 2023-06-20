import mongoose from 'mongoose';
import config from '../../config/config.js';
<<<<<<< HEAD
import { logger } from '../../utils/logger.utils.js';
=======
>>>>>>> eb0f85b0fa781a66615fd5188ce5aaceee93cce0

const URI = config.mongo_uri;

// mongoose.connect(URI)
//     .then(() => console.log('DB is connected'))
//     .catch(err => console.error(err));


const connectDB = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
<<<<<<< HEAD
        logger().info('MongoDB connected');
        //console.log('MongoDB connected');
    } catch (error) {
        logger().error(error);
        //console.log(error);
=======
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
>>>>>>> eb0f85b0fa781a66615fd5188ce5aaceee93cce0
    }
}

export default connectDB;
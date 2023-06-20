import dotenv from 'dotenv';

dotenv.config();

export default {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT,
    secretKey: process.env.SECRETKEY,
    admin_email: process.env.ADMIN_EMAIL,
    admin_password: process.env.ADMIN_PASSWORD,
<<<<<<< HEAD
    node_env: process.env.NODE_ENV
=======
>>>>>>> eb0f85b0fa781a66615fd5188ce5aaceee93cce0
}
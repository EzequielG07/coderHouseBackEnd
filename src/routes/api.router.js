import businessRouter from '../routes/business.router.js';
import productsRouter from '../routes/products.router.js';
import usersRouter from '../routes/users.router.js';
import cartsRouter from '../routes/carts.router.js';
import ordersRouter from '../routes/orders.router.js';
<<<<<<< HEAD
import loggerRouter from '../routes/logger.router.js';
=======
>>>>>>> eb0f85b0fa781a66615fd5188ce5aaceee93cce0

import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/business', businessRouter);

apiRouter.use('/products', productsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/carts', cartsRouter);

apiRouter.use('/orders', ordersRouter);

<<<<<<< HEAD
apiRouter.use('/test', loggerRouter);

=======
>>>>>>> eb0f85b0fa781a66615fd5188ce5aaceee93cce0
export default apiRouter;
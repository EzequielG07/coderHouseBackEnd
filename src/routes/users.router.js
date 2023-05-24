import { Router } from 'express';
import passport from 'passport';
import { loginUsers } from '../controllers/users.controller.js';

const router = Router();

router.post(
  '/register',
  passport.authenticate('Register', {
    successRedirect: '/login',
    failureRedirect: '/errorRegister',
    passReqToCallback: true,
  })
);

// router.post('/login', async (req, res) => {
//     try {
//         const user = req.body;
//         const userLogged = await usersManager.loginUser(user);
//         if (userLogged) {
//             for (const key in user) {
//                 req.session[key] = user[key];
//             }
//             req.session.userId = userLogged._id;
//             req.session.logged = true;
//             if (userLogged.email === 'adminCoder@coder.com' && userLogged.password === 'adminCod3r123') {
//                 req.session.isAdmin = true;
//             } else {
//                 req.session.isAdmin = false;
//                 req.session.role = userLogged.role;
//             }
//             res.redirect('/products');
//         } else {
//             res.redirect('/errorLogin');
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// login with passport
// router.post('/login', passport.authenticate('local'
//     , {
//         successRedirect: '/products',
//         failureRedirect: '/errorLogin',
//     }
// ));

router.post('/login', loginUsers);

router.get(
  '/loginpass',
  passport.authenticate('current', { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/login');
    }
  });
});

router.get(
  '/github',
  passport.authenticate('Github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('Github', {
    // successRedirect: '/products',
    failureRedirect: '/errorRegister',
  }),
  (req, res) => {
    req.session.email = req.user.email;
    req.session.logged = true;
    req.session.userId = req.user._id;
    req.session.isAdmin = false;
    req.session.role = req.user.role;
    res.redirect('/profile');
  }
);

export default router;

const express = require('express');
const passport = require('passport');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../../config/config')

router.use(bodyParser.urlencoded({ extended: true }));
// Create a route to handle the login request
// router.post('/auth/local', (req, res, next) => { 
//   console.log("body "+req.body)
//   passport.authenticate('local', (err, user, info) => {
//       if (err) {
//           req.flash('error', 'An error occurred.');
//           return res.redirect('/');
//       }
//       if (!user) {
//         console.log(info)
//         req.flash('error', 'Invalid email or password.');
//         return res.send(info,err,user);
//       }      
//       req.logIn(user, (err) => {
//         if (err) {
//             console.log('some other login error occured')         
//             req.flash('error', 'An error occurred.');
//             return res.redirect('/');
//           }
          
//           req.flash('success', 'Successfully logged in!');
//           console.log('loggin in holmes')
//           return res.redirect('/');
//       });
//   })(req, res, next);
// });
router.post('/auth/local',
  passport.authenticate('local',{
    successReturnToOrRedirect:'/',
    failureRedirect: '/',
    keepSessionInfo:true 
   }
 ),  
);
//////////console.log('findOne(): ')
router.get('/auth/google', 
passport.authenticate('google',
  {scope:['profile','email','openid'], callbackURL: `${config.baseUrl}/auth/google/callback`},
  {failureRedirect:'/'}));

router.get('/auth/google/callback', 
passport.authenticate('google',
   {failureRedirect:'/'}),
  (req,res)=>{
   res.redirect('/')});

   router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

   router.get('/auth/facebook/callback',
     passport.authenticate('facebook', { failureRedirect: '/' }),
     function(req, res) {
       // Successful authentication, redirect home.
       res.redirect('/');
     }
   );
   
  router.get('/logout', function(req, res, next) {
    const user=req.user
    console.log(user)
   
    req.logout(function(err){
      if(err){return next(err)}
     }
    )  
       
        return  res.redirect('/'); 
   }
 )      


module.exports = router;
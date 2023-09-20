const express = require('express');
const passport = require('passport');
const router = express.Router();

// Create a route to handle the login request
router.post('/checkCreds',
  passport.authenticate('local',{
    successReturnToOrRedirect:'/market',
    failureRedirect: '/login',
    keepSessionInfo:true 
   }
 ),  
);
//////////console.log('findOne(): ')
router.get('/auth/google', 
passport.authenticate('google',
  {scope:['profile','email','openid'], callbackURL: "http://localhost:3000/auth/google/callback"},
  {failureRedirect:'login'}));

router.get('/auth/google/callback', 
passport.authenticate('google',
   {failureRedirect:'login'}),
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
    const sessionUser = req.session.user
    console.log(sessionUser)
    if(user)
    req.logout(function(err){
      if(err){return next(err)}
     }
    )  
   if(sessionUser){
        req.session.destroy(function(err){
          if(err){return next(err)}})
    }              
        return  res.redirect('/'); 
   }
 )      


module.exports = router;
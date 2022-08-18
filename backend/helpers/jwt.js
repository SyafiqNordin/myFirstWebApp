const expressJWT = require('express-jwt');
const { model } = require('mongoose');

function authJWT() {
    const secret= process.env.secret;
    const api=process.env.API_URL;
    return expressJWT({
        secret,
        algorthims: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET',]},
            {url: /\/api\/v1\/model(.*)/ , methods: ['GET',]}
        ]
    })
}

async function isRevoked(req, payload, done){
    if(!payload.isAdmin){
      done(null, true)
    }
    done();
  } 
model.exports=authJWT
 
const {codeGenerator} = require('./utils')
const url = require('url')
const ctrl = require('./db/controller')



// strips querystring
exports.stripQuery = (req,res,next) =>{
 if(req.query.code) {
    req.session.code = req.query.code
    res.redirect(req.path);
  } else if(req.session.code) {
    return next()
  } else if(!req.query.code && !req.session.code ) {
    req.session.code = codeGenerator(32)
    return next()
  }
  else { 
    return next() 
   }
}


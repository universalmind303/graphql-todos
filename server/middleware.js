
const {codeGenerator} = require('./utils')
const url = require('url')
const ctrl = require('./db/controller')



// strips querystring
exports.stripQuery = (req,res,next) =>{

  // if there is a code, overwrite the existing one
 if(req.query.code) {
    req.session.code = req.query.code
    res.redirect(req.path);

  // if there is a session code, continue
  } else if(req.session.code) {
    return next()

  // if neither, generate code
  } else if(!req.query.code && !req.session.code ) {
    req.session.code = codeGenerator(32)
    return next()
  }
  // wildcard
  else {
    return next()
   }
}


const {codeGenerator} = require('./utils')
const url = require('url')
const ctrl = require('./db/controller')



// strips querystring
exports.stripQuery = (req,res,next) =>{
 if(req.query.code) {
    req.session.code = req.query.code
    ctrl.setUser(req.session.code)
    res.redirect(url.parse(req.url).pathname);
  } else if(req.session.code) {
    ctrl.setUser(req.session.code)
    return next()
  } else if(!req.query.code & !req.session.code) {
    req.session.code = codeGenerator(32)
    return next()
  }
}


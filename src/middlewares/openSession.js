
var modelsUser = require('./models/user')

module.exports = function (req, res, next) {

    if(req.session.openSession && !req.session.user) {
        let user = userData.findByEmail(req.cookie.openSession)
        req.session.user = user.email
    }
    next()
}
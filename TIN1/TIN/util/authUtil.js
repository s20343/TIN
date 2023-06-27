const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    return bcrypt.hashSync(passPlain, salt);
}

exports.comparePasswords = (passPlain, passHash) => {
    return bcrypt.compareSync(passPlain, passHash);
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser) {
        next();
    }else{
        throw new Error('unauthorized access');
    }
}
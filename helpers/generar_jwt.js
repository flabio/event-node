const jwt = require('jsonwebtoken');
const { TOKEN_FAILED } = require('./global_constante');


const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(TOKEN_FAILED);
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}
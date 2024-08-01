const jwt = require('jsonwebtoken');


// * To Allow Only Logged In Users To See Some Pages * \\

const IsAuthenticated = async (req,res,next) => {

    const headerObject = req.headers

    const token = headerObject.authorization.split('')[1]

    const verifyToken = jwt.verify(token,'anyKey',(err,decoded)=>{
        if(err){
            return false
        }else{
            return decoded
        }
    })


    if(verifyToken){
        req.user = verifyToken.id
        next()
    }else{
        const err = new Error('Token Expired Please Login !')
        next(err)
    }

    next()

}


module.exports = IsAuthenticated
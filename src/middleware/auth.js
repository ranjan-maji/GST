const jwt = require('jsonwebtoken');
const Empley = require('../model/user');

const auth = async (req, res, next) => {
 
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'hiiamranjanmajiiambackenddev')
        const user = await Empley.findOne({ _id: decoded._id, 'tokens.token': token })
    
        if(!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
    
        next()
       } catch (error) {
        // console.log(error)
        res.status(401).send({error: 'Please authentication.'})
       }

}
//  

module.exports = auth
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/GST-App-login', {

    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
}).then(() => {
    console.log('Connection is Successfull')
}).catch((error) => {
    console.log('No Connection', error)
})
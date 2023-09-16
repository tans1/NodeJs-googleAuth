const mongoose = require('mongoose');

// offline mongodb configuration
// mongoose.connect('mongodb://localhost:27017/<databaseName>',
//     {
//       useNewUrlParser:true,
//       useUnifiedTopology:true
//     })
 

// online mongodb configuration
try {
    mongoose.connect('',
        {
          useNewUrlParser:true,
          useUnifiedTopology:true
        }
      )
    console.log("db connection is successful")
} catch(error) {
    console.log("db connection unsuccessful")
}




const userSchema = mongoose.Schema({
    username : String,
    googleId : String
})

const User = mongoose.model('User',userSchema)

module.exports= User

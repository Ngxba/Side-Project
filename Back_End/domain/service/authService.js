var User = require("../model/user");

const authService = {
  signUp: async (
    email,
    password,
    name,
    address1,
    address2,
    city,
    state,
    zip,
    agree
  ) => {
    const result = await User.findOne({ email: email });
    if (!result && agree) {
      const newUser = User({
        email: email,
        password: password,
        name : name,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
      });
      await newUser.save();
      return newUser;
    } else {
      throw new Error("EMAIL_EXISTED");
    }
  },
  signIn : async (email, password)=>{
    let result = await User.findOne({"email": email, "password" : password})
    if(result){
        return result;
    }
    else{
        throw new Error("error/user_not_found")
    }
    
  }
};

module.exports = authService;

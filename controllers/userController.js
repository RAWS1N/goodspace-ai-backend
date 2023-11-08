const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const {ErrorHandler} = require("../middlewares/ErrorMiddleware.js")
const generateToken = require("../utils/generateToken.js")

// creating user on register request
const CreateUser = async (req, res, next) => {
    const {name, email, password } = req.body;
    const user = await User.findOne({ email });
  try {
    if (user) {
        return res.status(409).json({
            success: false,
            message: "user already exist",
          });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(200).json({
        _id : newUser._id,
        name : newUser.name,
        email : newUser.email,
        token : generateToken(newUser._id)
    })
    }
  } catch (error) {
    return next(new ErrorHandler('',error.message));
  }
};

// login function to make user login 
const loginUser = async (req, res, next) => {
  try {
    // get email,password from client
    const { email, password } = req.body;
    // checking if user exist or not via email
    const user = await User.findOne({ email }).select("+password");
    // if user already exist throwing error
    if (!user) return next(new ErrorHandler("user not found", 404));
    // comparing user password to saved one
    const isMatch = await bcrypt.compare(password, user.password);
    // if password do not match throw error
    if (!isMatch) return next(new ErrorHandler("Invalid Credentials", 404));
    // sending user in json form
    res.status(200).json({
      _id : user._id,
      name : user.name,
      email : user.email,
      token : generateToken(user._id)
  })
  } catch (err) {
    console.log(err)
    // throw error if something goes wrong
    return next(new ErrorHandler(400,"Error on user sign in"))
  }
};


const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "you're logged out successfully",
    });
};



const fetchMessages = async(req,res,next) => {
  const _id = req.user._id
  try{
    const messages = await User.findOne(_id,"messages")
    res.status(200).json({success:true,messages})
  }catch(e){
      return next(new ErrorHandler(400,'error while getting messages'))
  }
}

module.exports = {loginUser,CreateUser,logoutUser,fetchMessages}
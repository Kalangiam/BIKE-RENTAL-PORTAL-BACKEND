import UserModel from "../models/UserModel.js"
import Auth from "../common/Auth.js"
import bcrypt from 'bcryptjs'
import ResetPassword from "./ResetPassword.js"


const login = async (req, res) => {
     let { email, password } = req.body;
     try {
          let user = await UserModel.findOne({ email: email })
          if (user) {
               if (await Auth.hashCompare(password, user.password)) {
                    let token = await Auth.createToken({
                         email,
                         role: user.role,
                         id:user._id
                    })
         
                    res.status(200).send({
                         message: "login Successful",
                         name: user.name,
                         role: user.role,
                         token

                    })
                    
               }
               else {
                    res.status(400).send({
                         message: "Incorrect Credentials"
                    })
            
                    
               }

          }
          else {
               res.status(400).send({
                    message: "User doesn't exists"
               })
          }
     } catch (error) {
          res.status(500).send({
               message: error.message || "Internal Server Error"
          })
     }
}

const create = async (req, res) => {
     try {
          let { name, email, password } = req.body
          let user = await UserModel.findOne({ email: req.body.email })

          if (!user) {
               password = await Auth.hashPassword(password)
               await UserModel.create({ name, email, password })
               res.status(200).send({
                    message: "User Created successfully"
               })
          }
          else {
               res.status(400).send({
                    message: `User with ${req.body.email} already exits`
               })
          }
     }
     catch (error) {
          res.status(500).send({
               message: error.message || "Internal server Error"
          })
     }
}

const getAllUsers = async(req,res)=>{
     try {
         let users = await UserModel.find({role:"user"},{password:0})
         res.status(200).send({
             message:"Data Fetch Successful",
             users
         })
     } catch (error) {
         res.status(500).send({
             message:error.message || "Internal Server Error"
         })
     }
 }


const forgotPassword = async (req, res) => {
     const { email } = req.body;
   
     try {

       const user = await UserModel.findOne({ email });
       if (!user) {
         return res.status(404).json({ error: 'User not found' });
       }
   
       const resetToken = Math.random().toString(36).substring(7);
       const hashedResetToken = await bcrypt.hash(resetToken, 10);
       user.resetPasswordToken = hashedResetToken;
       user.resetPasswordExpires = Date.now() + 3600000;
       await user.save();
     //   console.log(`Reset token for ${email}: ${resetToken}`);
       
       ResetPassword({email, resetToken})
   

       res.status(200).json({ message: 'Reset token generated successfully' });
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   };

const resetPassword =  async (req, res) => {
     const { email, token, newPassword } = req.body;
   
     try {
       const user = await UserModel.findOne({ email });
       if (!user) {
         return res.status(404).json({ error: 'User not found' });
       }
   

       if (user.resetPasswordExpires < Date.now()) {
         return res.status(400).json({ error: 'Reset token has expired' });
       }
   

       const tokenMatch = await bcrypt.compare(token, user.resetPasswordToken);
       if (!tokenMatch) {
         return res.status(400).json({ error: 'Invalid reset token' });
       }
       const hashedPassword = await bcrypt.hash(newPassword, 10);
       user.password = hashedPassword;
       user.resetPasswordToken = undefined;
       user.resetPasswordExpires = undefined;
       await user.save();

       res.status(200).json({ message: 'Password reset successfully' });
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   };



export default {
     login,
     create,
     getAllUsers,
     forgotPassword,
     resetPassword
}
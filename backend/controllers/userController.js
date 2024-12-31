const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

exports.registerUser = async(req , res) =>{
    
     try{
        const {password} = req.body;
       
        const hashedPassword = await bcrypt.hash(password , saltRounds);
        const newUser = await user.create({...req.body,password:hashedPassword});

        res.status(201).json({message:"user registration successfull" , error:false , success:true})
     }
     catch(err){
        res.status(500).json({message:err.message , error:true , success:false})
     }
}

exports.login = async (req, res) => {
  try {
      const { userName, password } = req.body;
      console.log(userName);
      

      const isUser = await user.findOne({userName});
      console.log(isUser);
      

      if (!isUser) {
          return res.status(404).json({
              message: "User not found. Please enter a valid user name .",
              error: true,
              success: false
          });
      }

      // Compare passwords
      const isMatched = await bcrypt.compare(password, isUser.password);
      if (!isMatched) {
          return res.status(401).json({
              message: "Incorrect password. Please try again.",
              error: true,
              success: false
          });
      }

      // Generate JWT token
      const payload = { id: isUser._id, role: isUser.role };
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({
          message: "Login successful",
          error: false,
          success: true,
          token,
          role:isUser.role
      });
  } catch (err) {
      res.status(500).json({ message: err.message, error: true, success: false });
  }
};


exports.getAllUsers = async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await user.find();
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found", error: true, success: false });
      }
  
      res.status(200).json({ message: "Users fetched successfully", error: false, success: true, users });
    } catch (err) {
      res.status(500).json({ message: err.message, error: true, success: false });
    }
  };    

  exports.deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;  // Assuming user ID is passed in the URL as a parameter
  
      // Find and delete the user by ID
      const deletedUser = await user.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found", error: true, success: false });
      }
  
      res.status(200).json({ message: "User deleted successfully", error: false, success: true });
    } catch (err) {
      res.status(500).json({ message: err.message, error: true, success: false });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const { userId } = req.params; 
      const { userName, email, role } = req.body;
  
      // Hash the new username and use it as the password
      const hashedPassword = await bcrypt.hash(userName, saltRounds);
  
      // Update user in the database
      const updatedUser = await user.findByIdAndUpdate(
        userId,
        { userName, email, role, password: hashedPassword },  // Update password with hashed userName
        { new: true }  // Ensure the updated document is returned
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found", error: true, success: false });
      }
  
      res.status(200).json({
        message: "User updated successfully",
        error: false,
        success: true,
        user: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ message: err.message, error: true, success: false });
    }
  };
  
  
  exports.getAllInstructors = async (req, res) => {
    try {
      const instructors = await user.find({ role: 'instructor' }).select('userName _id'); 
  
      if (instructors.length === 0) {
        return res.status(404).json({
          message: "No instructors found",
          error: true,
          success: false,
        });
      }
  
      res.status(200).json({
        message: "Instructors fetched successfully",
        error: false,
        success: true,
        instructors,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
        error: true,
        success: false,
      });
    }
  };
  
  exports.getStudentCount = async (req, res) => {
    try {
      const studentCount = await user.countDocuments({ role: 'student' });
      res.status(200).json({ count: studentCount });
    } catch (error) {
      res.status(500).json({ message: error.message, error: true, success: false });
    }
  };
  
  // Controller to fetch the count of instructors (role: 'instructor')
  exports.getInstructorCount = async (req, res) => {
    try {
      const instructorCount = await user.countDocuments({ role: 'instructor' });
      res.status(200).json({ count: instructorCount });
    } catch (error) {
      res.status(500).json({ message: error.message, error: true, success: false });
    }
  };

  exports.updateUserEmailAndUsername = async (req, res) => {
    try {
      const userId  = req.user.id; // Get user ID from request parameters
      const { userName, email } = req.body; // Get new username and email from request body
      console.log(userId);
      
      // Create an object to hold the fields to update
      const updateFields = {};
      if (userName) updateFields.userName = userName; // Only add if provided
      if (email) updateFields.email = email; // Only add if provided
  
      // Find the user by ID and update their details
      const updatedUser  = await user.findByIdAndUpdate(
        userId,
        updateFields, 
        { new: true, runValidators: true }
      );
  
      if (!updatedUser ) {
        return res.status(404).json({ message: "User  not found", error: true, success: false });
      }
  
      res.status(200).json({
        message: "User  updated successfully",
        error: false,
        success: true,
        user: updatedUser ,
      });
    } catch (err) {
      res.status(500).json({ message: err.message, error: true, success: false });
    }
  };

  exports.changePassword = async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from request parameters
      const { currentPassword, newPassword } = req.body; // Get current and new passwords from request body
  console.log(req.body);
  
      // Find the user by ID
      const userpass = await user.findById(userId);
      
      if (!userpass) {
        return res.status(404).json({ message: "User  not found", error: true, success: false });
      }
  
      // Compare the current password with the stored password
      const isMatched = await bcrypt.compare(currentPassword, userpass.password);
      console.log(isMatched);
      
      if (!isMatched) {
        return res.status(401).json({
          message: "Current password is incorrect",
          error: true,
          success: false,
        });
      }
  console.log("hi");
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  console.log(hashedNewPassword);
  
      // Update the user's password
      userpass.password = hashedNewPassword;
      await userpass.save();
  
      res.status(200).json({
        message: "Password changed successfully",
        error: false,
        success: true,
      });
    } catch (err) {
      res.status(500).json({ message: err.message, error: true, success: false });
    }
  };

  exports.getUser = async(req,res)=>{
    try{

      const userId = req.user.id;
      const userById = await user.findById(userId);

      if(!userById){
        res.status(400).json({message:"User not exists"})
      }

      res.status(200).json(userById)

    }
    catch(err){
      res.status(500).json({ message: err.message, error: true, success: false });
    }
  }
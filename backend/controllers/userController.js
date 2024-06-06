import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Auth User" })
})

//Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({ name, email, password })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

    res.status(200).json({ message: "Register User" })
})

//logout user
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Logout User" })
})

//Get user profile
//api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User Profile" })
})

//Update user profile
//api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Update User" })
})

export { authUser, logoutUser, getUserProfile, updateUserProfile, registerUser }

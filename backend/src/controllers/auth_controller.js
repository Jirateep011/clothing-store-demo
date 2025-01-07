const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const responseMessages = require('../utils/responseMessages');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ resMsg: responseMessages.DUPLICATE_USERNAME });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ resMsg: responseMessages.DUPLICATE_EMAIL });
            }
        }
        const user = new User({ username, email, password });
        await user.save();
        req.session.userId = user._id;
        res.status(201).json({ resMsg: responseMessages.USER_REGISTERED_SUCCESS });
    } catch (error) {
        res.status(400).json({ resMsg: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ resMsg: responseMessages.INVALID_CREDENTIALS });
        }
        req.session.userId = user._id;

        // Generate token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '6h' });

        // Log token in terminal
        console.log(`User ${user.email} signed in with token: ${token}`);

        res.status(200).json({ resMsg: responseMessages.USER_LOGGED_IN_SUCCESS, username: user.username, role: user.role, token });
    } catch (error) {
        res.status(400).json({ resMsg: error.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ resMsg: responseMessages.LOGOUT_FAILED });
        res.status(200).json({ resMsg: responseMessages.USER_LOGGED_OUT_SUCCESS });
    });
};

exports.checkUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const existingUser = await User.findOne({ username });
        res.status(200).json({ exists: !!existingUser });
    } catch (error) {
        res.status(400).json({ resMsg: error.message });
    }
};

exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        res.status(200).json({ exists: !!existingUser });
    } catch (error) {
        res.status(400).json({ resMsg: error.message });
    }
};
import genToken from "../config/token.js";
import User from "../models/user.model.js";

export const googleAuth = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { name, email } = req.body;

        // findOneAndUpdate + upsert is atomic, so two near-simultaneous
        // requests for the same email can't both try to insert and hit
        // the unique-email duplicate key error (E11000).
        let user = await User.findOneAndUpdate(
            { email },
            { $setOnInsert: { name, email } },
            { new: true, upsert: true }
        );

        console.log("User:", user);

        const token = await genToken(user._id);

        console.log("Token:", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json(user);

    } catch (error) {
        console.error("GOOGLE AUTH ERROR:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack,
        });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout Successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};
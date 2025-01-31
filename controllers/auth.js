const Verfication = require("../models/Verification");
const User = require("../models/user");
const sendEmail = require("./email");
const jsonwebtoken = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
class AuthController {
    async requestOtp(req, res) {
        try {
            const { email, name } = req.body;
            const user = await User.findOne({
                where: {
                    email: email,
                }
            });
            if (user && user.isEmailverified) {
                const token = jsonwebtoken.sign({ email }, secret, { expiresIn: "1d" });
                return res.status(200).json({
                    message: "user logged in successfully",
                    token: token
                })
            };
            const token = jsonwebtoken.sign({ email }, secret, { expiresIn: "5m" });
            let otp = Math.floor(100000 + Math.random() * 900000);
            const messageId = await sendEmail(email, name, otp);
            if (messageId) {
                const verification = await Verfication.create({
                    token: token,
                    otp: otp
                });
                if (verification) {
                    await User.create({
                        name: name,
                        email: email
                    });
                    return res.status(200).json({
                        message: "otp has been sent to your email please verify",
                        token: token
                    });
                }
            }
            return res.status(500).json({
                message: "something went wrong try agian"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error",
                error: error.message
            })
        }
    }

    async verifyOtp(req, res) {
        try {
            const { otp, token } = req.body;
            try {
                jsonwebtoken.verify(token, secret);
            } catch (error) {
                if (error.name === "TokenExpiredError") {
                    return res.status(400).json({
                        message: "tpken expired"
                    })
                }
                return res.status(400).json({
                    message: "invalid token"
                })
            }
            const verification = await Verfication.findOne({
                where: {
                    token: token,
                }
            });

            if (!verification) {
                return res.status(400).json({
                    message: "invalid token"
                })
            }

            if (verification.otp !== otp) {
                return res.status(400).json({
                    message: "invalid otp"
                })
            }
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            const useremail = decoded.email;
            const user = await User.findOne({
                where: {
                    email: useremail
                }
            });
            await user.update({
                isEmailverified: true,
            });
            await Verfication.destroy({
                where: {
                    token: token,
                }
            });
            const apitoken = jsonwebtoken.sign({ useremail }, secret, { expiresIn: "1d" });
            return res.status(200).json({
                message: "user logged in successfully",
                token: apitoken
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "something went wrong"
            })
        }

    }
}

module.exports = new AuthController();
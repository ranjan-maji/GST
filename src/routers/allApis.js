const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserOTPVerification = require('../model/userOTPVerification');
const User = require('../model/user');
const auth = require('../middleware/auth')




router.post('/singup', async(req, res) => {
    try{
        const newUser = new User(req.body)
        const createUser = await newUser.save()
        const token = await newUser.generateAuthToken()
        sendOTPVerificationEmail(result, res)
       res.status(201).send(createUser, token)
    }catch(error)
        { res.status(400).send(error);}
})

router.get('/', async (req, res) => {
    res.send('Hi wellcome to send ')
})

//nodemailer 

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ranjanmaji007@outlook.com',
        pass: 'ranjan@1234'
    },
});

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`; 

        //mail option
        const mailOptions = {
            from: 'ranjanmaji007@outlook.com',
            to: req.body.email,
            subject: "Verify your Email",
           html: `<p> Enter <b>${top}</b> in the app to verify your email address and complete</p>
           <p> This code <b>expires in 1 hour</b>.</P>`, 
        };

        //hash the app
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
       const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expireesAt: Date.now() + 3600000,
        });
        //save otp recod
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
        res.json({
            status: "PENDING",
            message: "Verification Otp email send",
            date: {
                userId: _id,
                email,
            },
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
};


module.exports = router;
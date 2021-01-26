const { Router, response } = require('express')
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
// api/auth/register
router.post(
    '/register',
    [
        check('email', 'Please, check email').isEmail(),
        check('password', 'The minimum length of password 6 digits').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data while registration'
            })
        }
        const {email, password} = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
           return res.status(400).json({message: 'This user is already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()
        res.status(201).json({message: 'User has been created'})

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' })
    }
})

// api/auth/login
router.post(
    '/login', 
    [
        check('email','Check correct email').normalizeEmail().isEmail(),
        check('password', 'Check correct password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data while log in'
            })
        }
        
        const {email, password} = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({message: 'User is not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Password is incorrect, try again' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' })
    }
})

module.exports = router
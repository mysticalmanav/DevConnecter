const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User')
//@route  GET api/auth
//@desc   Test route
//@access public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
//@route  Post api/auth 
//@desc   Authenticate user and get token
//@access public
router.post('/', [

    check('email', 'please enter a valid email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()



],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            //see if user exist
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({errors:[{msg:"Invalid credential"}]})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({errors:[{msg:"Invalid credential"}]})
            }
           user.depopulate('password');






            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 3600000 },
                (err, token) => {
                    if (err) throw err;
                    const { password, ...userWithoutPassword } = user.toObject();
                    res.json({ token, user: userWithoutPassword });
                }

            )
        }
        catch (err) { 
            console.error(err.message);
            res.status(500).send('server error');

        }



    });
module.exports = router;

const bcrypt = require('bcrypt');
const { User } = require('../../db/models')
const validator = require('validator')
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { name, email, password, phone, role } = req.body;

            if (validator.isEmail(email)) {

                const checkUser = await User.findOne({
                    where: {
                        email: email
                    }
                })


                if (checkUser == null) {
                    const hash = await bcrypt.hash(password, 10);
                    const create = await User.create({
                        name: name,
                        email: email,
                        password: hash,
                        phone: phone,
                        role: role
                    })
                    res.status(201).json({
                        message: 'Akun berhasil dibuat'
                    })

                } else {
                    res.status(400).json({
                        message: 'Email sudah terdaftar, silahkan gunakan email yang lain'
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Masukkan email yang benar'
                })
            }


        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'FAILED'
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const checkUser = await User.findOne({
                where: {
                    email: email
                }
            })

            if (checkUser != null) {
                const checkPassword = await bcrypt.compare(password, checkUser.password);
                const token = jwt.sign({
                    user: {
                        name: checkUser.name,
                        email: checkUser.email
                    }
                }, 'secret')

                if (checkPassword) {
                    res.status(200).json({
                        status: "SUCCESS",
                        message: "Berhasil Login",
                        token: token
                    })
                } else {
                    res.status(400).json({
                        status: "FAILED",
                        message: "Password salah"
                    })
                }


            } else {
                res.status(400).json({
                    status: "FAILED",
                    messagge: "Akun belum terdaftar"
                })
            }



        } catch (error) {
            res.status(500).json({
                status: "FAILED",
            })
        }
    }
}
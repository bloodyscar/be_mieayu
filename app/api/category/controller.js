const bcrypt = require('bcrypt');
const { Category } = require('../../db/models')

module.exports = {
    createCategory: async (req, res, next) => {
        try {
            const { name } = req.body;

            const checkCategory = await Category.findOne({ where: { name: name } })

            if (checkCategory != null) {
                res.status(400).json({
                    message: 'Category sudah terdaftar'
                })
            } else {
                const create = await Category.create({
                    name: name
                })
                res.status(201).json({
                    message: 'Category berhasil dibuat'
                })

            }




        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'FAILED'
            })
        }
    }
}
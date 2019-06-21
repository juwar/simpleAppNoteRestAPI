'use strict'

const response = require('../response');
const connection = require('../connect');

exports.getCategories = function (req, res){
    connection.query(
        `SELECT * FROM category`,
        function(error, rows){
            if (error){
                throw error
            } else {
                return res.send({
                    error:false,
                    data:rows
                })
            }
        }
    )
}

exports.createCategory = function (req, res){
    let category = req.body.category
    if (category !=''){
        connection.query(
            `INSERT into category SET category=?`,
            [category],
            function(error){
                if (error){
                    throw error
                } else {
                    return res.send({
                        message: 'Category has ben insert'
                    })
                }
            }
        )
    }
}


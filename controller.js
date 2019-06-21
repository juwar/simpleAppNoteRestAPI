'use strict'

const response = require('./response');
const connection = require('./connect');
const getTime = require('./getTime')

exports.ok = function (req, res){
    response.ok('OK', res);
}

exports.getNotes = function (req, res, next){
    let search = req.query.search || '';
    let sort = req.query.sort || 'DESC';
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    let offset = ((page -1)*limit)
    search = '%'+search+'%'

    let queryTotal = `SELECT COUNT(*) as total FROM note WHERE title LIKE '${search}'`
    let query = `SELECT note.id, note.title, note.note, note.time, category.category FROM note LEFT JOIN category ON note.id_category = category.id WHERE note.title LIKE '${search}' ORDER BY note.time ${sort} LIMIT ${limit} OFFSET ${offset}`    

    connection.query(
        queryTotal,
        function(error, rows){
            if (error){
                throw error
            } else {
                let total = rows[0].total;
                let totalPage = Math.ceil(total/limit)
                connection.query(
                    query,
                    function(error, rows){
                        if (error){
                            throw error
                        } else {
                            if (rows != ''){
                                console.log('Total ',total,'\nPage ',page,'\nTotal Page',totalPage,'\nRow on Page',limit)
                                return res.send({
                                    data : rows,
                                    total : total,
                                    page : page,
                                    totalPage : totalPage,
                                    limit : limit,
                                })
                            } else {
                                response.ok(rows, res)
                            }
                        }
                    }
                )
            }
        }
    )
}

 
exports.createNote = function (req, res){
    let title = req.body.title;
    let note = req.body.note;
    let idCategory = req.body.id_category;
    if (title != '' && note != '' && idCategory != ''){
        connection.query(
            `INSERT INTO note SET title=?,note=?, id_category=?`,
            [title,note,idCategory],
            function(error){
                if (error){
                    throw error
                } else {
                    return res.send ({
                        message: 'Note has been insert'
                    })
                }
            }
        )
    } else {
        return res.send ({
            message: 'Variable Input not be null'
        })
    }
}

exports.updateNote = function (req, res){
    let title = req.body.title;
    let note = req.body.note;
    let time = getTime.getTimeUpdate;
    let idCategory = req.body.id_category;
    let id = req.body.id;
    if (title != '' && note != '' && time != '' && idCategory != ''){
        connection.query(
            `Update note SET title=?,note=?, id_category=? WHERE id=?`,
            [title,note,idCategory,id],
            function(error){
                if (error){
                    throw error
                } else {
                    return res.send ({
                        message: 'Note has been Update'
                    })
                }
            }
        )
    } else {
        return res.send ({
            message: 'Variable Input not be null'
        })
    }
}

exports.deleteNote = function (req, res){
    let id = req.params.id;
    if (id!=''){
        connection.query(
            `DELETE FROM note WHERE id=?`,
            [id],
            function(error){
                if (error){
                    throw error
                } else {
                    return res.send ({
                        message: 'Note has been DELETE'
                    })
                }
            }
        )
    } else {
        return res.send ({
            message: 'Variable id not be null'
        })
    }
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
'use strict'

module.exports = function(app){
    const controller = require('./controller');

    app.get('/', controller.ok);
    app.get('/notes', controller.getNotes);
    app.post('/notes', controller.createNote);
    app.patch('/notes', controller.updateNote);
    app.delete('/notes/:id', controller.deleteNote);
    app.post('/category', controller.createCategory);
}

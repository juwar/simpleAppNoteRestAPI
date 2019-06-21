'use strict'

module.exports = function(app){
    const controllerNotes = require('./controller/notes');
    const controllerCategories = require('./controller/categories');

    app.get('/', controllerNotes.ok);
    app.get('/notes', controllerNotes.getNotes);
    app.post('/notes', controllerNotes.createNote);
    app.patch('/notes', controllerNotes.updateNote);
    app.delete('/notes/:id', controllerNotes.deleteNote);
    app.get('/categories', controllerCategories.getCategories);
    app.post('/categories', controllerCategories.createCategory);
}

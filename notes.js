const fs = require('fs');
const chalk = require('chalk');

const addNote = ( title, body ) => {

    const notes = loadNotes();
    const duplicateNote = notes.find( note  => note.title === title );

    if ( !duplicateNote ) {

        notes.push({
            title: title,
            body: body
        });

        saveNotes( notes );
        console.log( chalk.green.inverse( 'New note added !' ) );

    } else {
        console.log( chalk.red.inverse( 'Note title taken.' ) );
    }
};

const saveNotes = ( notes ) => {

    const dataJSON = JSON.stringify( notes );
    fs.writeFileSync( 'notes.json', dataJSON );

};

const loadNotes = () => {
    try {

        const dataBuffer = fs.readFileSync( 'notes.json' );
        const dataJSON = dataBuffer.toString();
        return JSON.parse( dataJSON );

    } catch(e) {
        return [];
    }
 
};

const removeNote = ( title ) => {

    const notes = loadNotes();
    const newNotes = notes.filter( note => note.title !== title );

    if (notes.length > newNotes.length){

        saveNotes( newNotes );
        console.log( chalk.green.inverse( 'Note removed !' ) );

    } else {
        console.log( chalk.red.inverse( 'Note not found !' ) );
    }

};

const listNotes = () => {

    console.log( chalk.yellow.inverse( 'Your notes :' ) );
    let notes = loadNotes();
    notes.forEach(note =>  console.log( chalk.magenta(note.title) ) );

};

const readNote = ( title ) => {

    const notes = loadNotes();
    const read = notes.find( ( note ) => note.title === title );

    if( read ) {
        console.log( chalk.inverse( title ) );
        console.log( chalk.yellow( read.body ) ); 
    } else {
        console.log( chalk.red( 'This note doesn\'t exist!' ) );
    }

};
 
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
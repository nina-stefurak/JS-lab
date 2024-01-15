document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.querySelector('.note-form');
    const notesList = document.querySelector('.notes-list');
    const searchBox = document.querySelector('.search-box');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let editingNoteId = null;

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const noteData = {
            title: document.getElementById('noteTitle').value,
            content: document.getElementById('noteContent').value,
            color: document.getElementById('noteColor').value,
            pinned: document.getElementById('notePinned').checked,
            tags: document.getElementById('noteTags').value.split(',').map(tag => tag.trim()),
            creationDate: new Date().toLocaleDateString()
        };

        if (editingNoteId) {
            const noteIndex = notes.findIndex(note => note.id === editingNoteId);
            notes[noteIndex] = { ...notes[noteIndex], ...noteData };
            editingNoteId = null;
        } else {
            const newNote = { ...noteData, id: Date.now() };
            notes.push(newNote);
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        noteForm.reset();
    });

    function displayNotes() {
    const sortedNotes = notes.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    });
        notesList.innerHTML = sortedNotes.map(note => `
            <div class="note" style="border-left-color: ${note.color}" data-id="${note.id}">
                <div class="note-header">
                    <h2>${note.title}</h2>
                    <div>
                        <button onclick="editNote(${note.id})" class="edit-button" aria-label="edit">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button onclick="deleteNote(${note.id})" class="delete-button" aria-label="delete">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="note-body">
                    ${note.content}
                </div>
                <div class="note-footer">
                    <div>${note.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>
                    <div class="note-footer-right">
                        <span class="date">${note.creationDate}</span>
                        ${note.pinned ? '<i class="fa fa-thumbtack pinned"></i>' : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    window.editNote = (noteId) => {
        const noteToEdit = notes.find(note => note.id === noteId);
        document.getElementById('noteTitle').value = noteToEdit.title;
        document.getElementById('noteContent').value = noteToEdit.content;
        document.getElementById('noteColor').value = noteToEdit.color;
        document.getElementById('notePinned').checked = noteToEdit.pinned;
        document.getElementById('noteTags').value = noteToEdit.tags.join(', ');
        editingNoteId = noteId;
    };

    window.deleteNote = (noteId) => {
        notes = notes.filter(note => note.id !== noteId);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    };

    searchBox.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchText) || 
            note.content.toLowerCase().includes(searchText) || 
            note.tags.some(tag => tag.toLowerCase().includes(searchText))
        );
        notesList.innerHTML = filteredNotes.map(note => `
            <div class="note" style="border-left-color: ${note.color}" data-id="${note.id}">
                <h2>${note.title}</h2>
                <div class="note-body">
                    ${note.content}
                </div>
                <div class="note-footer">
                    <span>${note.creationDate}</span>
                    <div>${note.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>
                    ${note.pinned ? '<span class="pinned">Pinned</span>' : ''}
                    <button onclick="editNote(${note.id})" class="edit-button" aria-label="edit"></button>
                    <button onclick="deleteNote(${note.id})" class="delete-button" aria-label="delete"></button>
                </div>
            </div>
        `).join('');
    });

    displayNotes();
});

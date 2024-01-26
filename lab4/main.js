    const noteForm = document.querySelector('.note-form');
    const notesList = document.querySelector('.notes-list');
    const searchBox = document.querySelector('.search-box');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let editingNoteId = null;

    noteForm.addEventListener('submit', handleFormSubmit);
    searchBox.addEventListener('input', handleSearch);



    function handleFormSubmit(e) {
        e.preventDefault(); 
        const noteData = {
            id: editingNoteId || Date.now(),
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
            // ... tworzy nowy obiekt notatki, 
        } else {
            notes.push(noteData); 
        }
    
        localStorage.setItem('notes', JSON.stringify(notes)); //localStorage z nową tablicą notes`. 
        displayNotes();
        noteForm.reset();
        editingNoteId = null;
    }

    function handleSearch(e) {
        const searchText = e.target.value.toLowerCase();
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchText) || 
            note.content.toLowerCase().includes(searchText) || 
            note.tags.some(tag => tag.toLowerCase().includes(searchText)) //Metoda some zwraca `true`
        );
        displayNotes(filteredNotes);
    }

    function displayNotes(filteredNotes) {
    let notesToShow = [];
    if(filteredNotes){
        notesToShow = filteredNotes;
    } else { 
        const sortedNotes = notes.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return 0;
        });
        notesToShow = sortedNotes;
    }
    //Używam `map` do stworzenia ciągu HTML dla każdej notatki
    //a następnie `innerHTML ` do wstawienia tego ciągu do DOM
        notesList.innerHTML = notesToShow.map(note => `
            <div class="note" style="border-left-color: ${note.color}" data-id="${note.id}" id="${note.id}">
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
        localStorage.setItem('notes', JSON.stringify(notes));//aktualizuje tablice notes w lokal storage
        displayNotes();
    };

    displayNotes();


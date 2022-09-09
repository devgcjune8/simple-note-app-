const ADD_BTN = document.querySelector('.add-btn');
const NOTES = JSON.parse(localStorage.getItem('notes'))

if (NOTES) {
    NOTES.forEach(note => addNoteBox(note))
}

ADD_BTN.addEventListener('click', () => addNoteBox(""));

function addNoteBox(text = "") {
    const NOTE_BOX = document.createElement('div');
    NOTE_BOX.classList.add('note-box');

    NOTE_BOX.innerHTML = `
    <div class="note-tools">
            <button class="edit-btn"><img src="icons/edit.svg"></button>
            <button class="copy-btn ${text ? "hidden" : ""}"><img src="icons/copy.svg"></button>
            <button class="delete-btn"><img src="icons/x-square.svg"></button>
            
    </div>

            <div class="note ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}" placeholder="&#10; &#10;Click Yellow Button to Save or Edit Note &#10; &#10; Click Blue Button to Copy Note &#10; &#10; Double Click Red Button to Delete Note" spellcheck= 'false'></textarea>
            
    `

    const EDIT_BTN = NOTE_BOX.querySelector('.edit-btn');
    const DELETE_BTN = NOTE_BOX.querySelector('.delete-btn');
    const COPY_BTN = NOTE_BOX.querySelector('.copy-btn');
    const NOTE = NOTE_BOX.querySelector('.note');
    const TEXT_AREA = NOTE_BOX.querySelector('textarea');

    TEXT_AREA.value = text;
    NOTE.innerHTML = text;


    DELETE_BTN.addEventListener("dblclick", () => {
        NOTE_BOX.remove()
        updateLocalStorage()
    })
    
    EDIT_BTN.addEventListener("click", () => {
        NOTE.classList.toggle('hidden')
        TEXT_AREA.classList.toggle('hidden')
        COPY_BTN.classList.toggle('hidden')

    });
    COPY_BTN.addEventListener('click', () => {
        TEXT_AREA.select()
        document.execCommand('copy')

    })
    

    

    TEXT_AREA.addEventListener('input', (event) => {
        const { value } = event.target
        
        NOTE.innerHTML = whitespacerAndNewLiner(value)

        updateLocalStorage()
    })


    function whitespacerAndNewLiner(value) {
        let newLined = value.replace(/\n/g, '<br/>');
        let whitespaced = newLined.replace(/\s/g, '&nbsp;');

        return whitespaced;
    }

    document.body.appendChild(NOTE_BOX)
}

function updateLocalStorage() {
    const NOTES_TEXT = document.querySelectorAll('textarea')

    const NOTES_ARR = [];

    NOTES_TEXT.forEach(note => NOTES_ARR.push(note.value))

    localStorage.setItem('notes', JSON.stringify(NOTES_ARR))

}
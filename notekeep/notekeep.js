const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
colorBtns = popupBox.querySelectorAll("input[name='color']"),
addBtn = popupBox.querySelector("button"); 

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false, updateId;

// popUp do wpisywania notatek
addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

// zamykanie popUpa
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

// wyświetlanie notatek

function showNotes() {
    if(!notes) return;
    //usuwanie istniejących elementów z widoku
    document.querySelectorAll(".note").forEach(li => li.remove());
    
    //ustawienie elementów z pinowanych na górę listy
    notes.forEach((note, id)=> {
        if(note.notePinStatus){
            let noteToPin = note;
            notes.splice(id, 1);
            notes.push(noteToPin)
        }
    });
    //wyświetlenie zawartości tablicy notes
    notes.forEach((note, id) => {
            let filterDesc = note.description.replaceAll("\n", '<br/>');
            let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content" style="border-top: 3px solid ${note.selectedColor}">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                    <li onclick="pinNote(${id})"><i class="uil uil-bookmark"></i> ${note.notePinStatus==true ? 'Unpin' : 'Pin'} </li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
            addBox.insertAdjacentHTML("afterend", liTag);
        console.log(note.notePinStatus);
    });
}


showNotes();

// elementy do modyfikacji notatki - menu
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

//usuwanie notatki
function deleteNote(noteId) {
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

//aktualizacja notatki
function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}


// przypięcie notatki
function pinNote(noteId){
    noteToPin = notes[noteId];
    console.log(noteToPin.notePinStatus);
    !noteToPin.notePinStatus ?  noteToPin.notePinStatus = true :  noteToPin.notePinStatus = false;
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();    
}

//dodawanie notatek
addBtn.addEventListener("click", e => {
    let title = titleTag.value.trim(),
    selectedColor,
    description = descTag.value.trim();
    
    for (const color of colorBtns){
        if(color.checked){
            selectedColor = color.value;
        }
    }
    
    
    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();
        let notePinStatus = false;
        let noteInfo = {title, description, selectedColor, date: `${month} ${day}, ${year}`, notePinStatus}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});
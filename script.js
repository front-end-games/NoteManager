// Lecture: Get And Manipulate On Individual Elements - Part 1

var form = document.getElementById('add-input');
var addBtn = document.getElementById('add-btn');

var ul = document.querySelector('ul');
var newLi = document.createElement('li');
var lastListItem = document.getElementById('list').lastElementChild;

addBtn.addEventListener('click',
    function (event) {
        var addInput = document.getElementById('add-input');
        event.preventDefault();

        if (addInput.value.trim() != "") {
            newLi = lastListItem.cloneNode(true);
            // newLi = ul.lastElementChild.cloneNode(true);
            ul.appendChild(newLi);
            newLi.firstElementChild.textContent = addInput.value;
            addInput.value = '';
        }
    });


ul.addEventListener('click', function (e) {
    if (e.target.classList[1] === "fa-pencil-square-o") {	// na click znikną nam ikonki mające daną klasę

        var parentPar = e.target.parentNode;
        console.log(parentPar);
        parentPar.style.display = 'none';

        var note = parentPar.previousElementSibling;    // wskazuje na tekst w paragrafie
        var input = parentPar.nextElementSibling;   // wskazuje na obszar z tekstem

        input.style.display = 'block';
        input.value = note.textContent;
        console.log(input);
        
        // ****** EDIT AND DELETE ITEMS
        input.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) {     // if ENTER
                if (input.value !== '') {   // remove if empty
                    note.textContent = input.value;
                    parentPar.style.display = 'block';
                    input.style.display = 'none';
                } else {
                    var li = input.parentNode;
                    li.parentNode.removeChild(li);
                }
            }
        });
    } else if (e.target.classList[1] === "fa-times") {
        var list = e.target.parentNode.parentNode;
        list.parentNode.removeChild(list);
    }
});

// ****** HIDE ITEMS
var hideItem = document.getElementById('hide');

hideItem.addEventListener('click', function () {
    var label = document.querySelector('label');
    if (hideItem.checked) {
        label.textContent = 'Unhide notes';
        ul.style.display = 'none';
    } else {
        label.textContent = 'Hide notes';
        ul.style.display = 'block';
    }
});



// ****** SEARCH FILTER
// gdy napiszemy ciąg znaków to elementy znalezione pozostaną widoczne,
// a nieznalezione zostaną schowane
var searchInput = document.querySelector('#search-note input');

searchInput.addEventListener('keyup', function (e) {    //wywołany, gdy puścimy klawiszeC
    var searchChar = e.target.value.toUpperCase();
    var notes = ul.getElementsByTagName('li');

    Array.from(notes).forEach(function (note) {  // funkcja reprezentuje aktualny item
        var parText = note.firstElementChild.textContent;

        if (parText.toUpperCase().indexOf(searchChar) !== -1) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
});
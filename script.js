const bookTitle = document.querySelector("#bookTitle");
const author = document.querySelector("#author");
const addRecord = document.querySelector("#addRecord");
const records = document.querySelector("#records");
let id = Number(localStorage.getItem('id')) || 0;

function buttons(){
	const editButton = document.createElement('button');
	const deleteButton = document.createElement('button');

	editButton.textContent = "EDIT";
	deleteButton.textContent = "DELETE";

	return [editButton,deleteButton];
}

function createRecord(bookTitle,author,genre){
	const title = document.createElement('td');
	const writer = document.createElement('td');
	const type = document.createElement('td');

	title.textContent = bookTitle.value.trim();
	writer.textContent = author.value.trim();
	type.textContent = genre.value;

	const bookId = document.createElement('td');
	const edit = document.createElement('td');
	const Delete = document.createElement('td');

	const buttonArray = buttons();
	edit.appendChild(buttonArray[0]);
	Delete.appendChild(buttonArray[1]);

	bookId.textContent = id;
	id++;
	localStorage.setItem('id',id);

	const record = document.createElement('tr');
	record.appendChild(bookId);
	record.appendChild(title);
	record.appendChild(writer);
	record.appendChild(type);
	record.appendChild(edit);
	record.appendChild(Delete);

	return record;
}


addRecord.addEventListener("click",(e)=>{
	const genre = document.querySelector('input[name="genre"]:checked');
	const record = createRecord(bookTitle,author,genre);
	records.appendChild(record);
});

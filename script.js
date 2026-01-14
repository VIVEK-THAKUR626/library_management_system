const bookTitle = document.querySelector("#bookTitle");
const author = document.querySelector("#author");
const addRecord = document.querySelector("#addRecord");
const records = document.querySelector("#records");
let id = Number(localStorage.getItem('id')) || 0;
const recordArray = JSON.parse(localStorage.getItem('recordArray')) || [];

function populateStorage(){
	localStorage.setItem('id',id);
	localStorage.setItem('recordArray',JSON.stringify(recordArray));
}

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
	recordArray.push({
		'id':id,
		'title':bookTitle.value.trim(),
		'author':author.value.trim(),
		'genre':genre.value
	});
	id++;
	populateStorage();

	const record = document.createElement('tr');
	record.appendChild(bookId);
	record.appendChild(title);
	record.appendChild(writer);
	record.appendChild(type);
	record.appendChild(edit);
	record.appendChild(Delete);

	return [record,...buttonArray,id-1];
}

function deleteRecord(deleteButton,record,bookId){
	deleteButton.addEventListener('click',()=>{
		records.removeChild(record);
		for(let i=0; i<recordArray.length; i++){
			if(recordArray[i].id == bookId){
				recordArray.splice(i,1);
				break;	
			}
		}	
		populateStorage();
	});
}

function saveEditedRecord(editButton,deleteButton,saveButton,record,bookId,newTitleInput,newAuthorInput,newGenreInput){
	saveButton.addEventListener('click',()=>{
		const newTitle = newTitleInput.value.trim();
		const newAuthor = newAuthorInput.value.trim();
		const newGenre = newGenreInput.value;
		const newArray = [newTitle,newAuthor,newGenre];

		for(let i=1; i<4; i++){
			record.children[i].firstChild.remove();
			record.children[i].textContent = newArray[i-1];
		}

		for(let i=0; i<recordArray.length; i++){
			if(recordArray[i].id == bookId){
				recordArray[i] = {
					'id': bookId,
					'title': newTitle,
					'author': newAuthor,
					'genre': newGenre
				}
				break;
			}
		}
		record.children[4].lastChild.remove();
		editButton.disabled = false;
		deleteButton.disabled = false;
		populateStorage();
	});
}
	

function editRecord(editButton,deleteButton,record,bookId){
	editButton.addEventListener('click',()=>{
		const newTitleInput = document.createElement('input');
		const newAuthorInput = document.createElement('input');
		const newGenreInput = document.createElement('select');
		const saveButton = document.createElement('button');
		saveButton.textContent = "SAVE";

		const scienceFiction = document.createElement('option');
		const fantasy = document.createElement('option');
		const history = document.createElement('option');

		scienceFiction.value = "Science Fiction";
		scienceFiction.textContent = "Science Fiction";
		
		fantasy.value = "Fantasy";
		fantasy.textContent = "Fantasy";
		
		history.value = "History";
		history.textContent = "History";

		newGenreInput.appendChild(scienceFiction);
		newGenreInput.appendChild(fantasy);
		newGenreInput.appendChild(history);

		record.children[1].textContent = "";
		record.children[1].appendChild(newTitleInput);
		record.children[2].textContent = "";
		record.children[2].appendChild(newAuthorInput);
		record.children[3].textContent = "";
		record.children[3].appendChild(newGenreInput);
		record.children[4].appendChild(saveButton);
		
		editButton.disabled = true;
		deleteButton.disabled = true;
		saveEditedRecord(editButton,deleteButton,saveButton,record,bookId,newTitleInput,newAuthorInput,newGenreInput);
	});
}

addRecord.addEventListener("click",(e)=>{
	const genre = document.querySelector('input[name="genre"]:checked');
	const record = createRecord(bookTitle,author,genre);
	records.appendChild(record[0]);

	const editButton = record[1];
	const deleteButton = record[2];
	const bookId = record[3];

	deleteRecord(deleteButton,record[0],bookId);
	editRecord(editButton,deleteButton,record[0],bookId);
});

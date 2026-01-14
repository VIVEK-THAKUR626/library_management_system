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

addRecord.addEventListener("click",(e)=>{
	const genre = document.querySelector('input[name="genre"]:checked');
	const record = createRecord(bookTitle,author,genre);
	records.appendChild(record[0]);

	const editButton = record[1];
	const deleteButton = record[2];
	const bookId = record[3];

	deleteRecord(deleteButton,record[0],bookId);
});

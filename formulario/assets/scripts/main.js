var form = document.querySelector('form');
var parentContent = document.getElementById('submit-content');
var label = document.createElement("label");
parentContent.appendChild(label);
label.classList.add("msg");
var btnRemove = document.getElementById("remove-btn");
var objArray = [];

btnRemove.addEventListener('click', function () {
var chbox = document.getElementsByName("chboxRemove");
	if(!DeleteRow()) {
		alert("Debes seleccionar un bug");
		chbox[0].focus();
	}

});
	
form.addEventListener('submit', function (event) {

	event.preventDefault();

	if ( ValidateAll()) {

	var BugObject = {};
	
	BugObject ['title'] = form.title.value, 
	BugObject ['email'] =  form.email.value,
	BugObject ['description'] =  form.description.value,
	BugObject ['system'] = form.osystem.value,
	BugObject ['browser'] =  form.browser.value,
	BugObject ['type'] = getCheckboxValues(),
	BugObject ['priority'] =  form.priority.value

	objArray.push(BugObject);

	function compare(a,b) {
		console.log(a.priority, b.priority);
		  if (a.priority < b.priority)
		     return -1;
		  if (a.priority > b.priority)
		    return 1;
		  return 0;
		}

	objArray.sort(compare);
	console.log(objArray);
	console.log(BugObject);
	console.log(objArray.title);
	console.log(BugObject.title);

  
	addBug(BugObject);
	sortByPriority(form.priority.value);
	ResetForm();

	}
});

function ValidateAll() {

	var title = document.getElementById("title");
	var email = document.getElementById("email");
	var description = document.getElementById("description");

	if( !ValidateInput(title)) {
		return false;
	}

	if( !ValidateInput(email)) {
		return false;
	}

	if( !ValidateInput(description)) {
		return false;
	}

	if( !ValidateSelect()) {
		return false;
	}

	if( !ValidateOption()) {
		return false;
	}

	return true;
}
	
function ValidateInput (inputType) {

	if ( inputType.value == "") {

		inputType.classList.add("input-validate");
		label.innerHTML = 'Debes completar todos los campos';
		inputType.onfocus = function(){ this.classList.remove('input-validate'); }
		return false;
	}
	return true;
}

function ValidateSelect () {

	var allElements = document.getElementsByTagName("select");

		for(var i = 0 ; i < allElements.length ; i++) {

			if( allElements[i].value == null || allElements[i].value == -1) {

				allElements[i].classList.add("input-validate");
				label.innerHTML = 'Debes seleccionar una opcion';
				allElements[i].onfocus = function(){ this.classList.remove('input-validate'); }
				return false;
			}				
		}
		return true;
}

function ValidateOption () {

	var rbuttons = document.getElementsByName("browser");	
	var seleccionado = false;

	for(var i = 0 ; i < rbuttons.length ; i++) {    
				
		if( rbuttons[i].checked) {
			seleccionado = true;
			break;
		}
	}
		if( !seleccionado) {
			label.innerHTML = 'Debes seleccionar una opcion';
			rbuttons[0].focus();
		}
	return seleccionado;
}
function getPriorityValue (value) {
	var priority = "";

		if(value == 0) {
			priority = "High";
		}
		else {
			if (value == 1) {
				priority = "Medium";
			}
			else {
				priority = "Low";
			}
		}			
			
	return priority;
	
}

function getCheckboxValues() {

	var chboxArray = [];

	var chboxElements = document.getElementsByName("type");

	for(var i = 0; i < chboxElements.length; i++) {

		if(chboxElements[i].checked) { 
			chboxArray.push(chboxElements[i].value);
		}
	}

	return chboxArray;
} 

function CreateCheckbox() {
	
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name= "chboxRemove";

	return checkbox;

}

function addBug(obj) {
		
	var table = document.getElementById('bug-table').getElementsByTagName('tbody')[0];
	var newText  = document.createTextNode(title);
	
	var checkbox = CreateCheckbox();

	function addrow (a) {
		var row = "";
		row += "<tr id='tr'><td>" + a.title + "</td><td>" + a.email + "</td><td>" + a.description + 
		"</td><td>" + a.system + "</td><td>" + a.browser + "</td><td>" +  a.type + "</td><td>" + 
		getPriorityValue(a.priority) + "</td><td>" +  "</td></tr>";

		table.innerHTML +=  row;
	}


	
	
	var rowLength = table.rows.length;

		for ( i = 0; i < rowLength; i++) {

			if(table.rows[i].cells[table.rows[i].cells.length-1].value == null) {
					table.rows[i].cells[table.rows[i].cells.length-1].appendChild(checkbox);
			}
		}

	StylePriority(obj.priority);

}   

function ResetForm() {

	document.getElementById("form").reset();
}

function StylePriority (priority) {

	var table = document.getElementById('bug-table').getElementsByTagName('tbody')[0];
	var rowLength = table.rows.length;

			
		for ( i = 0; i < rowLength; i++) {
			
		   	if (table.rows[i].cells[6].innerHTML == "High") {

			   		table.rows[i].className = "high-bug";
			}
			else {
			   	if (table.rows[i].cells[6].innerHTML == "Medium") {

		   			table.rows[i].className = "medium-bug";
			   	}
			   	else {
			   			
			   		table.rows[i].className = "low-bug";
			   		}
			}	 
 		}
}

function DeleteRow () {

	var table = document.getElementById('bug-table').getElementsByTagName('tbody')[0];
	var chbox = document.getElementsByName("chboxRemove");
	var seleccionado = false;

		for ( i = 0; i < chbox.length; i++) {

			if(chbox[i].checked) {
				table.rows[i].remove(table.rows[i]);
				seleccionado = true;
			}
		}
	return seleccionado;
}
function sortByPriority () {
	/*var table = document.getElementById('bug-table').getElementsByTagName('tbody')[0];
	var rowLength = table.rows.length;
	var sortArray = [];
	console.log('entro al metodo');
		
		for ( i = 0; i < rowLength; i++) {
			objs.sort(function() {
				return (table.rows[i].cells[6] > table.rows[i+1].cells[6]) ? 1 : (((table.rows[i].cells[6] < table.rows[i+1].cells[6]) ? -1 : 0);} ); 

			sortArray.push(table.rows[i].cells[6]);
			console.log(table.rows[i].cells[6]);
				if (table.rows[i].cells[6] < table.rows[i+1].cells[6]) 
					return -1;
				if (table.rows[i].cells[6] > table.rows[i+1].cells[6])
					return 1;
				return 0;
		}

		console.log(sortArray);
	
	return sortArray;*/

}

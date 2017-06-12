var form = document.querySelector('form');
var parentContent = document.getElementById('submit-content');
var label = document.createElement("label");
parentContent.appendChild(label);
label.classList.add("msg");
var btnRemove = document.getElementById("remove-btn");

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
  
    addBug(BugObject);
   
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

			if( allElements[i].value == null || allElements[i].value == 0 ) {

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
		var row = "";
		var checkbox = CreateCheckbox();

		row += "<tr id='tr'><td>" + obj.title + "</td><td>" + obj.email + "</td><td>" + obj.description + 
		"</td><td>" + obj.system + "</td><td>" + obj.browser + "</td><td>" +  obj.type + "</td><td>" + 
		obj.priority + "</td><td>" +  "</td></tr>";

		table.innerHTML +=  row;
	
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

	console.log(rowLength);
			
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


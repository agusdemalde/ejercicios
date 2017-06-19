var form = document.querySelector('form');
var parentContent = document.getElementById('submit-content');
var label = document.createElement("label");
label.classList.add("msg");
var objArray = [];
	
form.addEventListener('submit', function (event) {

	event.preventDefault();

	if ( ValidateAll()) {

		label.innerHTML= "";
		var BugObject = {}; 

		BugObject ['title'] = form.title.value, 
		BugObject ['email'] =  form.email.value,
		BugObject ['description'] =  form.description.value,
		BugObject ['system'] = form.osystem.value,
		BugObject ['browser'] =  form.browser.value,
		BugObject ['type'] = getCheckboxValues(),
		BugObject ['priority'] =  form.priority.value 

		SortArray(BugObject);
		addCard(objArray);
		ResetForm();
	}
});

function SortArray(obj) {

	objArray.push(obj);

	function compare(a,b) {
		console.log(a.priority, b.priority);
			if (a.priority < b.priority)
				return -1;
			if (a.priority > b.priority)
				return 1;
			return 0;
	}
	objArray.sort(compare);
}

function ValidateAll() {

	var title = document.getElementById("title");
	var email = document.getElementById("email");
	var description = document.getElementById("description");

	if( !ValidateInput(title)) {
		parentContent.appendChild(label);
		return false;
	}

	if( !ValidateInput(email)) {
		parentContent.appendChild(label);
		return false;
	}

	if( !ValidateInput(description)) {
		parentContent.appendChild(label);
		return false;
	}

	if( !ValidateSelect()) {
		parentContent.appendChild(label);
		return false;
	}

	if( !ValidateOption()) {
		parentContent.appendChild(label);
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


function appendBugTitle (obj, div) {
	var titleLabel = document.createElement('label');
	div.appendChild(titleLabel);
	titleLabel.classList.add('bug-title');
	titleLabel.innerHTML = obj.title;
}

function appendBugContent (obj, div) {
	var primaryInfo = document.createElement('p');
	div.appendChild(primaryInfo);
	primaryInfo.classList.add('bug-content');
	primaryInfo.innerHTML = " <b> Email: </b>" + obj.email  + "<b> &nbsp; Description: </b> " + obj.description + " </br>" +
							" <b> Op. System: </b> " + obj.system + "<b> &nbsp; Browser: </b>" + obj.browser + "<b> &nbsp; Type: </b>" + obj.type;

}
function appendButtonAndPriority (div, content, priority) {
	var priorityLabel = document.createElement('label');
	div.appendChild(priorityLabel);
	priorityLabel.innerHTML = getPriorityValue(priority);
	str = "bug-priority-" + priority;
	priorityLabel.classList.add(str);
	priorityLabel.classList.add("bug-priority");

	var buttonRemove = document.createElement('input');
	buttonRemove.type = 'button';
	buttonRemove.value = 'Remove Bug';
	buttonRemove.classList.add('bug-button');
	div.appendChild(buttonRemove);
	buttonRemove.onclick = function () { this.parentNode.remove(this)}
}

function addCard (obj) {
	var content = document.getElementById('cards-content');
		content.innerHTML = "";
	
	for (var i = 0; i < obj.length; i++) {

		var div = document.createElement('div');
		content.appendChild(div);
		str = "bug-div-" + obj[i].priority;
		div.classList.add('bug-div'); 
		div.classList.add(str); 

		appendButtonAndPriority(div, content, obj[i].priority);
		appendBugTitle(obj[i], div);
		appendBugContent(obj[i], div);
	}
}

function ResetForm() {
	document.getElementById("form").reset();
}





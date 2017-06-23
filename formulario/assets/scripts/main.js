var form = document.querySelector('form');
var parentContent = document.getElementById('submit-content');
var label = document.createElement("label");
label.classList.add("msg");
var objArray = [];
var i = 0;

form.addEventListener('submit', function (event) {

	event.preventDefault();

	if ( validateAll()) {

		label.innerHTML= "";
		var BugObject = {};
		 

		BugObject ['title'] = form.title.value, 
		BugObject ['email'] =  form.email.value,
		BugObject ['description'] =  form.description.value,
		BugObject ['system'] = form.osystem.value,
		BugObject ['browser'] =  form.browser.value,
		BugObject ['type'] = getCheckboxValues(),
		BugObject ['priority'] =  form.priority.value,
		BugObject ['id'] = i;


		sortArray(BugObject);
		addCard(objArray);
		resetForm();
		i++;
		console.log(BugObject.id);
	}
});

function sortArray(obj) {

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

function validateAll() {

	var title = document.getElementById("title");
	var email = document.getElementById("email");
	var description = document.getElementById("description");

	if( !validateInput(title)) {
		parentContent.appendChild(label);
		return false;
	}

	if( !validateInput(email)) {
		parentContent.appendChild(label);
		return false;
	}

	if( !validateInput(description)) {
		parentContent.appendChild(label);
		return false;
	}

	if( !validateSelect()) {
		parentContent.appendChild(label);
		return false;
	}

	if( !validateOption()) {
		parentContent.appendChild(label);
		return false;
	}

	return true;
}
	
function validateInput (inputType) {

	if ( inputType.value == "") {

		inputType.classList.add("input-validate");
		label.innerHTML = 'Debes completar todos los campos';
		inputType.onfocus = function(){ this.classList.remove('input-validate'); }
		return false;
	}
	return true;
}

function validateSelect () {

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

function validateOption () {

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

	var bugInfo = document.createElement('dl');
	bugInfo.id= "bugInfo";
	div.appendChild(bugInfo);
	bugInfo.classList.add('bug-content');
	var references= document.getElementById("priorityRef");
	references.style.display = "block";

	bugInfo.innerHTML = "<dt> Description: </dt> " + "<dd>" + obj.description + "</dd>" + "<dt> Email: </dt>" + "<dd>" + obj.email + "</dd>" +
							" <dt class='inline'> Op. System: </dt> " + "<dd class='inline'>" + obj.system + "</dd>" + "<dt class='inline'> Browser: </dt>" + "<dd class='inline'>" + obj.browser + "</dd>"  ;

	if( obj.type.length != 0) {

		bugInfo.innerHTML += "<dt>Type: </dt>" + "<dd>" + obj.type + "</dd>" ;
	}

}
function appendButtonAndPriority (div, obj, currentyObj) {
	
	var buttonRemove = document.createElement('input');
	buttonRemove.type = 'button';
	buttonRemove.value = 'X';
	buttonRemove.classList.add('bug-button');
	div.appendChild(buttonRemove);
	buttonRemove.onclick = function () {

		this.parentNode.remove(this)
		
		for (var i = 0; i < obj.length; i++) {
			if(obj[i].id == currentyObj.id) {
				obj.splice(obj[i].id,1);
			}
		}
	}
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

		appendButtonAndPriority(div, obj, obj[i]);
		appendBugTitle(obj[i], div);
		appendBugContent(obj[i], div);
	}
	console.log(obj);
}

function resetForm() {
	document.getElementById("form").reset();
}





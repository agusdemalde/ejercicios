form = document.querySelector('form');
var parentContent = document.getElementById('submit-content');
var label = document.createElement("label");
parentContent.appendChild(label);
label.classList.add("msg");

form.addEventListener('submit', function (event) {

	event.preventDefault();

	if ( ValidateAll()) {

		HTMLFormElement.prototype.submit.call(form);
		alert("Formulario enviado exitosamente");  
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


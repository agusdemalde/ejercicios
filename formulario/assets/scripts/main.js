
function Validate(form) {
	var title = document.form.title.value;
	var email = document.form.email.value;
	var description = document.form.description.value;
	var optionSystem = document.getElementById("osystem").selectedIndex;
	var rbuttons = document.getElementsByName("browser");
	var seleccionado = false;
	var optionPriority = document.getElementById("priority").selectedIndex;
	var message = "";


		if (title == "" ) {
			 alert ('Completar campo obligatorio!');
			 form.title.focus();
	         return false;

		}
		if (email == "" ) {
			alert ('Completar campo obligatorio!');
			 form.email.focus();
	         return false;
		}
		if (description == "") {
			 alert ('Completar campo obligatorio!');
			 form.description.focus();
	         return false;
		}

		if( optionSystem == null || optionSystem == 0 ) {
			alert ('Debe seleccionar una opcion!');
			 form.osystem.focus();
		  return false;
		}
		
		for(var i=0; i<rbuttons.length; i++) {    
		  	if(rbuttons[i].checked) {
		    seleccionado = true;
		    break;
		  }
		}
 
		if(!seleccionado) {
		  return false;
		}
		if( optionPriority == null || optionPriority == 0 ) {
			alert ('Debe seleccionar una opcion!');
			 form.optionPriority.focus();
		  return false;
		}
		
		
		alert ('Formulario enviado');
		return true;
}
	




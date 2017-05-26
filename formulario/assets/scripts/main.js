
function Validate(form) {

var title = document.form.title.value;
var email = document.form.email.value;
var description = document.form.description.value;
var allSelects = document.getElementsByTagName("select");
var rbuttons = document.getElementsByName("browser");
var seleccionado = false;
var message=document.getElementById("msg");
var allInputs=document.form.getElementsByTagName("input");
var otherInput = document.getElementsByName("otherSO");


	for(var i=0;i<allInputs.length;i++)
	{
		if(allInputs[i].name !="submit" && allInputs[i].name !="otherSO")  
		{
			if(allInputs[i].value=="")
			{
				allInputs[i].style.border="2px solid #F00"; 
				message.innerHTML= 'Debes completar todos los campos';
				allInputs[i].onclick=function(){ this.style.border="2px solid #CCC"; }
				return false;
			} 
		}
	}

	if (description == "") {
		message.innerHTML= 'Debes completar todos los campos';
		form.description.style.border="2px solid #F00"; 
		form.description.onclick=function(){ this.style.border="2px solid #CCC"; }
		return false;
	} 

	for(var i=0;i<allSelects.length;i++)
	{
		if(allSelects[i].value == null || allSelects[i].value == 0 )
			{
				allSelects[i].style.border="2px solid #F00"; 
				message.innerHTML= 'Debes seleccionar una opcion';
				allSelects[i].onclick=function(){ this.style.border="2px solid #CCC"; }
				return false;
			}				
	}
	
	for(var i=0; i<rbuttons.length; i++) {    
		if(rbuttons[i].checked) 
		{
			seleccionado = true;
			break;
		}
	}

	if(!seleccionado) {
		message.innerHTML= 'Debes seleccionar una opcion';
		rbuttons[0].focus();
		return false;
	}
	
	
	message.innerHTML= "";
	alert('Formulario enviado existosamente');
	return true;
}



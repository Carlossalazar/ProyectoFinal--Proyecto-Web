$(function(){
	//verificamos si el navegador soporta localStorage
	if(!localStorage){
		setTimeout(function(){
			alert('Lo siento, pero su navegador no soporta localStorage.'+
			'No podrá utilizar la agenda :(');
		});
	}
	
	$.mostrarListaEstudiantes=function(){
		//guardamos en una variable la cantidad de Estudiantes y el cuerpo de la
		//tabla en la que mostraremos la lista (agregando filas con jQuery)
		var iTotalEstudiantes=localStorage.length,
		$objCuerpoTablaEstudiante=$('#tblTablaEstudiantes').find('tbody');
		
		//vaciamos el cuerpo de la tabla
		$objCuerpoTablaEstudiante.empty();
		
		//Verificamos si hay estudiantess almacenados?
		if(iTotalEstudiantes>0){
			//recorremos la lista de Estudiante (los items almacenados en localStorage)
			for(var iEstudiante=0; iEstudiante<iTotalEstudiantes; iEstudiante++){
				//guardamos en variables los datos recuperados del localStorage
				var strName=localStorage.key(iEstudiante),
				strCedula=localStorage.getItem(localStorage.key(iEstudiante));
			
				//agregamos una nueva fila con los datos de la Estudiante
				$objCuerpoTablaEstudiante.append(
					$('<tr>').append(
						$('<td>',{ //fila con el nombre de la Estudiante
							text	: strName,
							align	: 'left'
						}),
						$('<td>',{ //fila con la cedula de Estudiante 
							text	: strCedula,
							align	: 'left'
						}),
						$('<td>',{ //fila para el boton de eliminar
							align	: 'center',
							width	: 60
						}).append(
							//agregamos a la fila el boton
							$('<input>',{
								type	: 'button',
								class	: 'clsEliminarEstudiante',
								value	: 'Eliminar',
							}).data('contactoAEliminar',strCedula) //por medio del metodo
							//data almacenamos en el boton el Codigo de Carrera que debemos eliminar
							//(esto no sera visible, es un truquillo interesante)
						)
					)
				);
			}
		//no hay estudiantes almacenados
		}else{
			//agregamos una fila con un mensaje indicando que no hay estudiantes
			$objCuerpoTablaEstudiante.append(
				$('<tr>').append(
					$('<td>',{
						text	: 'No se encuentran Estudiantes',
						colspan	: 3,
						align	: 'center'
					})
				)
			);
		}
	};
	
	//funcion para limpiar los campos del formulario
	$.limpiarCamposDelFormulario=function(){
		//vaciamos el contenido de los campos de texto
		$('#txtNombre,#txtCedula,#txtIngles,#txtCarrera').val('');
		//enfocamos el campo para digitar el nombre
		$('#txtNombre').focus();
	};
	
	//evento submit del formulario
	$('#frmAgregarEstudiante').on('submit',function(eEvento){
		//evitamos que el form se envie (para que no recargue la pagina)
		eEvento.preventDefault();
		
		//obtenemos una "copia" de los campos de texto
		var $txtCedula=$('#txtCedula'),$txtNombre=$('#txtNombre'), $txtIngles=$('#txtIngles'),$txtCarrera=$('#txtCarrera');
		
		//verificamos que los datos no esten vacios
		//con $.trim() eliminamos los espacios al final y al inicio de las cadenas
		if($.trim($txtNombre.val())!='' && $.trim($txtCedula.val())){
			//creamos dos variables con el nombre y Codigo que vamos a guardar
			var strName=$.trim($txtNombre.val()),
			strCedula=$.trim($txtCedula.val()),
			strIngles=$.trim($txtIngles.val()),
			strCarrera=$.trim($txtCarrera.val());
			
			
			
			//preguntamos si el numero de cedula ya existe
			if(localStorage.getItem(strCedula)){
				//si ya existe... preguntamos si desea actualizar?
				if(confirm('El Estudiante con esa Cedula ya existe ¿Desea actualizarlo?')){
					//actualizamos
					localStorage.setItem(strName, strCedula,strIngles ,strCarrera);
					//cargamos en el cuerpo de la tabla la lista de carreras
					$.mostrarListaEstudiantes();
					//limpiamos el formulario
					$.limpiarCamposDelFormulario();
					location.href ="estudiantes.html";
				}
			//cedula no existe
			}else{
				//agregamos el contacto al localStorage
				localStorage.setItem(strName, strCedula,strIngles,strCarrera);
				//cargamos en el cuerpo de la tabla la lista de carreras
				$.mostrarListaEstudiantes();
				//limpiamos el formulario
				$.limpiarCamposDelFormulario();
				alert('Estudiante Guardado exitosamente.');
				location.href ="estudiantes.html";
			}
		}else{	//en caso de que algun campo este vacio
			//verificamos si el nombre esta vacio
			if($.trim($txtNombre.val())==''){
				//mostramos un mensaje
				alert('Por favor, digite el nombre del estudiante.');
				//enfocamos el campo para el nombre
				$txtNombre.val('').focus();
			//verificamos si el telefono esta vacio
			}else{
				//mostramos un mensaje
				alert('Por favor, digite el la cedula del estudiante.');
				//enfocamos el campo para el telefono
				$txtCedula.val('').focus();
			}
		}
	});
	
	//clic en el boton para eliminar un estudiante
	//se usa live en vez de on, porque el boton se creo en tiempo de ejecucion
	$('.clsEliminarEstudiante').live('click',function(){
		//obtenemos el contacto que se va a eliminar (recordar que esta almacenado en data)
		var strEstudianteAEliminar=$(this).data('contactoAEliminar');
		
		if(confirm('¿Desea eliminar el Estudiante seleccionado?')){
			//eliminamos el contacto usando la clave que esta asociada al nombre
			//recordemos que el item se guardo usando como clave el telefono
			localStorage.removeItem(strEstudianteAEliminar);
			//cargamos en el cuerpo de la tabla la lista de estudiantes
			$.mostrarListaEstudiantes();
		}
	});
	
	//cuando la pagina carga mostramos la lista de estudiantes
	//ojo: esto se hace al inicio...
	$.mostrarListaEstudiantes();
});


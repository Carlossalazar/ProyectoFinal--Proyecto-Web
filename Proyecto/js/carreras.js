$(function(){
	//verificamos si el navegador soporta localStorage
	if(!localStorage){
		setTimeout(function(){
			alert('Lo siento, pero su navegador no soporta localStorage.'+
			'No podrá utilizar la agenda :(');
		});
	}
	
	$.mostrarListaCarreras=function(){
		//guardamos en una variable la cantidad de carreras y el cuerpo de la
		//tabla en la que mostraremos la lista (agregando filas con jQuery)
		var iTotalCarreras=localStorage.length,
		$objcuerpoTablaCarrera=$('#tblTablacarreras').find('tbody');
		
		//vaciamos el cuerpo de la tabla
		$objcuerpoTablaCarrera.empty();
		
		//Verificamos si hay carreras almacenados?
		if(iTotalCarreras>0){
			//recorremos la lista de carreras (los items almacenados en localStorage)
			for(var iContacto=0; iContacto<iTotalCarreras; iContacto++){
				//guardamos en variables los datos recuperados del localStorage
				var strCodigo=localStorage.key(iContacto),
				strNombre=localStorage.getItem(localStorage.key(iContacto));
			
				//agregamos una nueva fila con los datos de la carrera
				$objcuerpoTablaCarrera.append(
					$('<tr>').append(
						$('<td>',{ //fila para el boton de eliminar
							align	: 'center',
							width	: 60
						}).append(
							//agregamos a la fila el boton
							$('<input>',{
								type	: 'checkbox',
								class	: 'clsEditar',
								value	: 'editar',
							}).data('contactoAEditar',strCodigo, strNombre) //por medio del metodo
							//data almacenamos en el boton el Codigo de Carrera que debemos eliminar
							//(esto no sera visible, es un truquillo interesante)
						),
						$('<td>',{ //fila con el nombre de la carrera
							text	: strNombre,
							align	: 'left'
						}),
						$('<td>',{ //fila con el Codigo de Carrera 
							text	: strCodigo,
							align	: 'left'
						}),	
						$('<td>',{ //fila para el boton de eliminar
							align	: 'center',
							width	: 60
						}).append(
							//agregamos a la fila el boton
							$('<input>',{
								type	: 'button',
								class	: 'clsGuardar',
								value	: 'Guardar',
							}).data('guardarContacto',strCodigo).data('guardarname',strNombre) //por medio del metodo
							//data almacenamos en el boton el Codigo de Carrera que debemos eliminar
							//(esto no sera visible, es un truquillo interesante)
						),					
						$('<td>',{ //fila para el boton de eliminar
							align	: 'center',
							width	: 60
						}).append(
							//agregamos a la fila el boton
							$('<input>',{
								type	: 'button',
								class	: 'clsEliminarContacto',
								value	: 'Eliminar',
							}).data('contactoAEliminar',strCodigo)//por medio del metodo
							//data almacenamos en el boton el Codigo de Carrera que debemos eliminar
							//(esto no sera visible, es un truquillo interesante)
						)
					)
				);
			}
		//no hay carreras almacenados
		}else{
			//agregamos una fila con un mensaje indicando que no hay carreras
			$objcuerpoTablaCarrera.append(
				$('<tr>').append(
					$('<td>',{
						text	: 'No se encuentran carreras',
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
		$('#txtNombre,#txtCodigo').val('');
		//enfocamos el campo para digitar el nombre
		$('#txtNombre').focus();
	};
	
	//evento submit del formulario
	$('#frmAgregarCarrera').on('submit',function(eEvento){
		//evitamos que el form se envie (para que no recargue la pagina)
		eEvento.preventDefault();
		
		//obtenemos una "copia" de los campos de texto
		var $txtCodigo=$('#txtCodigo'),$txtNombre=$('#txtNombre');
		
		//verificamos que los datos no esten vacios
		//con $.trim() eliminamos los espacios al final y al inicio de las cadenas
		if($.trim($txtNombre.val())!='' && $.trim($txtCodigo.val())){
			//creamos dos variables con el nombre y Codigo que vamos a guardar
			var strNombre=$.trim($txtNombre.val()),
			strCodigo=$.trim($txtCodigo.val());
			
			//preguntamos si el Codigo de la carrera ya existe
			if(localStorage.getItem(strCodigo)){
				//el Codigo existe... desea actualizar?
				if(confirm('El Codigo ya existe ¿Desea actualizarlo?')){
					//actualizamos
					localStorage.setItem(strCodigo,strNombre);
					//cargamos en el cuerpo de la tabla la lista de carreras
					$.mostrarListaCarreras();
					//limpiamos el formulario
					$.limpiarCamposDelFormulario();
					//Direcciona a carrera
					location.href ="carreras.html";
				}
			//el Codigo no existe
			}else{
				//agregamos el contacto al localStorage
				localStorage.setItem(strCodigo,strNombre);
				//cargamos en el cuerpo de la tabla la lista de carreras
				$.mostrarListaCarreras();
				//limpiamos el formulario
				$.limpiarCamposDelFormulario();
				//Direcciona a carrera
				location.href ="carreras.html";
			}
		}else{	//en caso de que algun campo este vacio
			//verificamos si el nombre esta vacio
			if($.trim($txtNombre.val())==''){
				//mostramos un mensaje
				alert('Por favor, digite el nombre de la carrera.');
				//enfocamos el campo para el nombre
				$txtNombre.val('').focus();
			//verificamos si el Codigo esta vacio
			}else{
				//mostramos un mensaje
				alert('Por favor, digite el Codigo de carreras.');
				//enfocamos el campo para el Codigo
				$txtCodigo.val('').focus();
			}
		}
	});

	$('.clsGuardar').live('click',function(){
		//obtenemos el contacto que se va a eliminar (recordar que esta almacenado en data)
		var strcodigoGuardar=$(this).data('guardarContacto');
		var strnameGuardar=$(this).data('guardarname');
		
		if(confirm('¿Desea Guardar el contacto seleccionado?')){
			//eliminamos el contacto usando la clave que esta asociada al nombre
			//recordemos que el item se guardo usando como clave el Codigo
			localStorage.setItem(strcodigoGuardar, strnameGuardar);
			//cargamos en el cuerpo de la tabla la lista de carreras
			$.mostrarListaCarreras();
		}
	});


	
	//clic en el boton para eliminar un carreras
	//se usa live en vez de on, porque el boton se creo en tiempo de ejecucion
	$('.clsEliminarContacto').live('click',function(){
		//obtenemos el contacto que se va a eliminar (recordar que esta almacenado en data)
		var strCodAEliminar=$(this).data('contactoAEliminar');
		
		if(confirm('¿Desea eliminar el contacto seleccionado?')){
			//eliminamos el contacto usando la clave que esta asociada al nombre
			//recordemos que el item se guardo usando como clave el Codigo
			localStorage.removeItem(strCodAEliminar);
			//cargamos en el cuerpo de la tabla la lista de carreras
			$.mostrarListaCarreras();
		}
	});
	
	//cuando la pagina carga mostramos la lista de carreras
	//ojo: esto se hace al inicio...
	$.mostrarListaCarreras();
});

function modifica() {
  tab=document.getElementById('tblTablacarreras');
  for (i=0; ele=tab.getElementsByTagName('input')[i]; i++) {
    if (ele.checked) edita(ele);
    ele.checked = false;
  }
}

function edita(obj) {
  padre = obj.parentNode.parentNode;
  celda = padre.getElementsByTagName('td');
  inicio = 1;//celda para comenzar
  fin = 3;//celda para terminar
  
  for(i=inicio;i<fin;i++){
  var celdaTmp = celda[i];
    
  txt = celdaTmp.innerHTML;
  celdaTmp.innerHTML = '';
  inp = celdaTmp.appendChild(document.createElement('input'));
  inp.value=txt;
  inp.onblur = function() { this.parentNode.innerHTML = this.value  }   
      
  }
}


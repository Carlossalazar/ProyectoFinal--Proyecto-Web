var x = 10;

function ir() //Esta es la seccion que compara la contraseña
{

    var contra = "12345"; //esta es la contraseña
    var user = "admin";
    var p1= document.getElementById("password").value;
    var p2= document.getElementById("txtusuario").value;

    if((document.form_1.password.value=="")&&(document.form_1.txtusuario.value=="")){ 
        alert("Espacios en blanco, favor llenar para continuar"); 
    }
    else{        
        p1 = document.form_1.password.value; //Aqui se guarda la contraseña digitada
        p2 = document.form_1.txtusuario.value;
    }
    if ((p1==contra)&&(p2==user)) //Compara si son iguales contraseña codificada introducida con la ya codificada
    {
        location.href ="index.html"; //Si son iguales concatena y carga la pagina 
    }
    else{
        alert("Acceso no permitido \n\nEsta contraseña es incorrecta");
    }
}


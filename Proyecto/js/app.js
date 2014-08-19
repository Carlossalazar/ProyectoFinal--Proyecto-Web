var x = 10;


function prepareBinding() {    
    //$( "#test_button" ).bind( "click", function() { my_alert('text 2');});
    $( "#test_button" ).click(function() { 
        saveStudent();
        console.log('Student was added');
        
    });

    $( "#delete_button" ).click(function() { 
        console.log('llamando delete');
        var id = $(this).data('cedula');
        deleteStudent(id);
    });
    var nombre = 'Bladimir';
    var cedula = '20569805'

    var table = "<table> <tr><th>Name</th><th>Cedula</th></tr><tr><td>" +
                nombre+"</td><td>"+cedula+"</td></tr></table>";
    $('#table_wrapper').html(table);

}

function saveStudent() {
    // obtener datos del form
    //var name = document.getElementById('first_name').value,
     //   last_name = document.getElementById('last_name').value;

    // jquery way:
    var name = $('#first_name').val(),
        last_name = $('#last_name').val();


    // crear objeto estudiante
    var student = { "name": name, "last_name": last_name };
    
    // leer los estudiantes de localstorage
    var students = JSON.parse(localStorage.getItem('students'));
    if (students === null) {
        students = [];
    }

    // agregar el estudiante
    students.push(student);

    // volver guardar en localstoraage
    localStorage.setItem('students',JSON.stringify(students));
}

function my_alert(text) {
    alert(text);
}

function deleteStudent(element) {
    if (confirm('Are you sure you want to delete user ' + element)) {
        alert('User with name: '+element+ ' was deleted');
        document.location.href='login.html';
    } else {
        document.location.href='index.html';
    }
}
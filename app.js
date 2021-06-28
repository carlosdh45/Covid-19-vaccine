// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBmn0d3X_zAOW4T8GGAZufK92hHlnef4yU",
    authDomain: "covid-19-vaccine-83b71.firebaseapp.com",
    projectId: "covid-19-vaccine-83b71",
  });

  var db = firebase.firestore();


  // add member to vaccine db

  function save(){
    var names = document.getElementById('names').value;
    var age = document.getElementById('age').value;
    var card = document.getElementById('cardNumber').value;
    var disease = document.getElementById('disease').value;
    var vaccine = document.getElementById('vaccine').value;
    var date = document.getElementById('date').value

    db.collection('pacientes').add({
        Nombre: names,
        Edad: age,
        Cedula: card,
        Enfermedad: disease,
        Vacuna: vaccine,
        Fecha: date,

    })
    .then((docRef) => {
        console.log("Document writteb with id: ", docRef.id);
        document.getElementById('names').value = '';
        document.getElementById('age').value = '';
        document.getElementById('cardNumber').value = '';
        document.getElementById('disease').value = '';
        document.getElementById('vaccine').value = '';
        document.getElementById('date').value = '';
    })
    .catch((error) => {
        console.error("Error agregando registro" , error);
    });

}


// this fuction brings all data form db 

var people = document.getElementById('pacientes')
db.collection("pacientes").onSnapshot((querySnapshot) => {
  people.innerHTML = ''; 
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      people.innerHTML += ` 
      <tr>
      <th scope="row">${doc.id}</th>
      <td>${doc.data().Nombre}</td>
      <td>${doc.data().Edad}</td>
      <td>${doc.data().Cedula}</td>
      <td>${doc.data().Enfermedad}</td>
      <td>${doc.data().Vacuna}</td>
      <td>${doc.data().Fecha}</td>
      <td><button class="btn btn-danger" onclick="borrar('${doc.id}')">Eliminar</button></td>
      <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().Nombre}','${doc.data().Edad}','${doc.data().Cedula}','${doc.data().Enfermedad}','${doc.data().Vacuna}','${doc.data().Fecha}')">Editar</button></td>
      </tr>
      `
  });
});


// delete people 

function borrar(id) {
    db.collection("pacientes").doc(id).delete().then(() => {
        console.log("Paciente eliminado");

    }).catch((error) => {
        console.log("ha Ocurrido un error eliminando" , error);
    })

}


// edit people

function editar(id , nombre , edad , cedula , enfermedad, vacuna , fecha){
    document.getElementById('names').value = nombre;
    document.getElementById('age').value = edad;
    document.getElementById('cardNumber').value = cedula;
    document.getElementById('disease').value = enfermedad;
    document.getElementById('vaccine').value = vacuna;
    document.getElementById('date').value = fecha;
    var boton = document.getElementById("button");
    boton.innerHTML = "Actualizar Paciente";

    boton.onclick = function(){
        var fireEdit = db.collection("pacientes").doc(id);

        var nombre = document.getElementById('names').value;
        var edad = document.getElementById('names').value;
        var cedula = document.getElementById('names').value;
        var enfermedad = document.getElementById('names').value;
        var vacuna = document.getElementById('names').value;
        var fecha = document.getElementById('names').value;

        return fireEdit.update({
            Nombre: nombre,
            Edad: edad,
            Cedula: cedula,
            Enfermedad: enfermedad,
            Vacuna: vacuna,
            Fecha: fecha,

        })
        .then(() => {
            console.log("Paciente actualizado! ");
            boton.innerText = "Registrar paciente";
            document.getElementById('names').value = '';
            document.getElementById('age').value = '';
            document.getElementById('cardNumber').value = '';
            document.getElementById('disease').value = '';
            document.getElementById('vaccine').value = '';
            document.getElementById('date').value = '';

        })
        .catch((error) => {
            console.log("Error actualizando el paciente" ,error);
        })
    }

}


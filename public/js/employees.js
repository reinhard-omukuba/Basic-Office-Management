firebase.auth().onAuthStateChanged((user) =>{
    if(user){
        //pull add data from the employee collection
        firebase.firestore().collection("employees").get().then((querySnapshot) =>{
            var content = '';
            querySnapshot.forEach((doc) =>{
                var name = doc.data().name;
                var employeeId = doc.data().employeeId;
                var position = doc.data().position;
                var department = doc.data().department;
                var docID = doc.data().docID;

                var viewEmployee = "view-employee.html" + "?" + docID;

                content += '<tr>';
                content += '    <td>'+name+'</td>';
                content += '    <td>'+employeeId+'</td>';
                content += '    <td>'+department+'</td>';
                content += '    <td>'+position+'</td>';
                content += '    <td><a class="btn btn-primary" href="">Edit</a></td>';
                content += '    <td><a class="btn btn-success" href="'+viewEmployee+'">View</a></td>';
                content += '    <td><a class="btn btn-danger" href="">Delete</a></td>';
                content += '</tr>';
            })

            $("#employeeList").append(content);
        })
 

    } else{

    }
})
firebase.auth().onAuthStateChanged((user) =>{
    if(user){

        //add employee to db
        document.getElementById("submit").onclick = function(){
            //upload the image first
            //get file from the input
            var file = document.getElementById("passportPhoto").files[0];
            var name = document.getElementById("name").value;
            var employeeId = document.getElementById("employeeId").value;
            var email = document.getElementById("email").value;
            var employmentDate = document.getElementById("employmentDate").value;
            var department = document.getElementById("department").value;
            var position = document.getElementById("position").value;
            var contract = document.getElementById("contract").value;
            var salary = document.getElementById("salary").value;


            console.log(file.name)
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child("employees/").child(file.name).put(file);

            uploadTask.on('state_changed', (snapshot) =>{

            },(error)=>{
                alert("uploding image not successful");
            },()=>{
                console.log("image successfully uploaded");
                //get download url
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

                    var addEmployee = firebase.firestore().collection("employees").doc();
                    addEmployee.set({
                        name:name,
                        passportPhoto:downloadURL,
                        employeeId:employeeId,
                        email:email,
                        employmentDate:employmentDate,
                        department:department,
                        position:position,
                        contract:contract,
                        salary:salary,
                        docID:addEmployee.id
                    }).then(()=>{
                        window.location.href = "employees.html";
                    })

                })


            }
             
            );

        }

    }else{

    }
})
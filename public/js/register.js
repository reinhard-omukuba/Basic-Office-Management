document.getElementById("signUp").onclick = function(){
    //getting value from html
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    
    var useremail = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //signing up the user
    firebase.auth().createUserWithEmailAndPassword(useremail, password).then((userCredential) =>{
        var user = userCredential.user;

        //

        firebase.firestore().collection("users").doc(user.uid).set({

            userName: name,
            userPhone: phone,
            useremail:useremail
        }).then(() =>{
            window.location.href = "dashboard.html";
        })

        

    }).catch((error) =>{
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    })

}
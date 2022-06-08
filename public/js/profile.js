firebase.auth().onAuthStateChanged((user) =>{
    if(user){
        console.log("user is signed in");
        console.log(user.uid);

        //read data from firestore
        firebase.firestore().collection("users").doc(user.uid).get().then((doc) =>{

            if (doc.exists){

                var name = doc.data().userName;
                var phone = doc.data().userPhone;
                var email = doc.data().useremail;

                //setting data to html

                document.getElementById("username").innerHTML = name;
                document.getElementById("email").innerHTML = email;
                document.getElementById("phone").innerHTML = phone;



            } else{
                console.log("oops! data not abvailable");
            }
        })
        //end read data

        document.getElementById("logout").onclick = function(){

            firebase.auth().signOut().then(()=>{
                window.location.href = "index.html";
            })
        }


    } else{

        window.location.href = "index.html";
    }

})
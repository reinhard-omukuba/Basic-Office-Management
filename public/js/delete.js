//checking out who is logged in
firebase.auth().onAuthStateChanged((user)=>{

    if(user){

        //find the user's ID

        var userId = user.uid;

        //pull data from firestore
        firebase.firestore().collection("users").doc(userId).get().then((doc)=>{

            if(doc.exists){
                //pull exact data
                var name = doc.data().userName;
                var phone = doc.data().userPhone;

                //set the data we have received above to the html elements

                document.getElementById("username").value = name;
                document.getElementById("phone").value = phone;


            }else{

            }
        })
        //end

        //edit information
        document.getElementById("submit").onclick = function(){
            //get value of the inputs from html
            var name = document.getElementById("username").value;
            var phone = document.getElementById("phone").value;

            firebase.firestore().collection("users").doc(userId).update({

                userName:name,
                userPhone: phone

            }).then(()=>{
                window.location.href = "profile.html";
            })
        }


    } else{

    }
})
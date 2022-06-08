firebase.auth().onAuthStateChanged((user) =>{
    if(user){

        console.log("user is signed in");
        console.log(user.uid);
        console.log(user.email);

        document.getElementById("submit").onclick = function(){

            var name = document.getElementById("name").value;
            var desc = document.getElementById("desc").value;
            var color = document.getElementById("color").value;
            var itemCode = document.getElementById("itemCode").value;

            firebase.firestore().collection("inventory").doc().set({

                itemName: name,
                itemDesc: desc,
                itemColor: color,
                itemCode: itemCode

            }).then(() =>{
                window.location.href = "add-inventory.html";
            }).catch((error) =>{
                console.log(error)

            })
        }


    } else{

        window.location.href = "index.html";
    }

})
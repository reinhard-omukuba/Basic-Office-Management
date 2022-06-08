firebase.auth().onAuthStateChanged((user) =>{

    if(user){

        console.log("user is signed in");
        console.log(user.uid);
        console.log(user.email);

        firebase.firestore().collection("inventory").get().then((querySnapshot) =>{
            var count = querySnapshot.size;
            document.getElementById("inventoryCount").innerHTML = count;
        })





        // firebase.firestore().collection("inventory").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         var count = querySnapshot.size;
        //         document.getElementById("inventoryCount").innerHTML = count;

        //     });
        // });






    } else{

        window.location.href = "index.html";
    }

})
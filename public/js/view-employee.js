firebase.auth().onAuthStateChanged((user) =>{
    if(user){

        //get the ID from the previous page
        var queryString = decodeURIComponent(window.location.search);
        var theDocId = queryString.substring(1);

        //pull all data from firebase while filtering useing the docID
        firebase.firestore().collection("employees").doc(theDocId).get().then((doc) =>{

            var name = doc.data().name;
            var passportPhoto = doc.data().passportPhoto;

            document.getElementById("employeeName").innerHTML = name;
            document.getElementById("passportPhoto").src = passportPhoto;

        })

    }else{

    }
})
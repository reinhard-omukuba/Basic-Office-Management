firebase.auth().onAuthStateChanged((user) =>{
    if(user){
        //receive data from the previous page
        var queryString = decodeURIComponent(window.location.search);
        var docID = queryString.substring(1);

        //read data from db
        firebase.firestore().collection("expenses").doc(docID).get().then((doc)=>{
            var amount = doc.data().amount;
            var spentOn = doc.data().spentOn;
            var authorizedBy = doc.data().authorizedBy;

            //setting the above data to html input

            document.getElementById("amount").value = amount;
            document.getElementById("spentOn").value = spentOn;
            document.getElementById("authorizedBy").value = authorizedBy;
        })

        //update the information above

        document.getElementById("submit").onclick = function(){

            //get the data from html
            var amount = document.getElementById("amount").value;
            var spentOn = document.getElementById("spentOn").value;
            var authorizedBy = document.getElementById("authorizedBy").value;

            //

            firebase.firestore().collection("expenses").doc(docID).update({

                amount:amount,
                spentOn:spentOn,
                authorizedBy:authorizedBy


            }).then(() =>{
                window.location.href = "expenses.html";
            })
        }

    } else{

    }
})
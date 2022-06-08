firebase.auth().onAuthStateChanged((user) =>{

    if(user){

        //pull multiple data from database
        
        firebase.firestore().collection("income").get().then((querySnapshot) => {
            var content = '';
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

               var amountFrom = doc.data().amountFrom;
               var amount = doc.data().amount;
               var date = doc.data().date;
               var paymentType = doc.data().paymentType;
               var docId = doc.data().docId;

               var deletePath =  "income.html" + "?" + docId;

               
               content +=' <tr class="table-active">';
                   content +=' <td>' + amountFrom + '</td>';
                   content +=' <td>' + amount + ' </td>';
                   content +=' <td>' + date + '</td>';
                   content +=' <td>' + paymentType + '</td>';
                   content +=' <td><a class="btn btn-danger" href="'+deletePath+'">Delete</a></td>';
                content +='  </tr>';

            });

            $("#incomeList").append(content);
            console.log(content);
        });


        //DELETE DATA

        var querystring = decodeURIComponent(window.location.search);
        var theDocId = querystring.substring(1);

        console.log(theDocId);

        firebase.firestore().collection("income").doc(theDocId).delete().then(()=>{

            window.location.href = "income.html";
        })



    } else{

        window.location.href = "index.html";
    }

})



     
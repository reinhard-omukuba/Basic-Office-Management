firebase.auth().onAuthStateChanged((user) =>{

    if(user){

        //pull multiple data from database
        
        firebase.firestore().collection("inventory").get().then((querySnapshot) => {
            var content = '';
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

               var itemCode = doc.data().itemCode;
               var itemColor = doc.data().itemColor;
               var itemDesc = doc.data().itemDesc;
               var itemName = doc.data().itemName;

               
               content +=' <tr class="table-active">';
                   content +=' <td>' + itemCode + '</td>';
                   content +=' <td>' + itemName + ' </td>';
                   content +=' <td>' + itemDesc + '</td>';
                   content +=' <td>' + itemColor + '</td>';
                content +='  </tr>';

            });

            $("#inventorylist").append(content);
            console.log(content);
        });








        //







    } else{

        window.location.href = "index.html";
    }

})



     
firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        //pull all data from firebase
        firebase.firestore().collection("expenses").get().then((querySnapshot) =>{
            var content = '';
            querySnapshot.forEach((doc) => {

                var amount = doc.data().amount;
                var spentOn = doc.data().spentOn;
                var date = doc.data().date;
                var authorizedBy = doc.data().authorizedBy;
                var docID = doc.data().docID;

                var mylink = "expenses.html" + "?"+ docID ;
                var editLink = "edit-expenses.html" + "?" + docID;

                content+=' <tr>';
                content+='     <td>'+ amount +'</td>';
                content+='     <td>'+spentOn+'</td>';
                content+='     <td>'+date+'</td>';
                content+='     <td>'+authorizedBy+'</td>';
                content+='     <td><a class="btn btn-danger" href="'+mylink+'">Delete</a></td>';
                content+='     <td><a class="btn btn-success" href="'+editLink+'">Edit</a></td>';
                content+='  </tr>'

            });

            $("#expenseList").append(content);
        })

        
        //search data

        document.getElementById("btnSearch").onclick = function(){
            document.getElementById("expenseList").style.display = "none";
            var searchInput =  document.getElementById("searchInput").value;

            //pulling data where the item name is the same as the search input

            firebase.firestore().collection("expenses").where("authorizedBy", "==", searchInput).get().then((querySnapshot) =>{
                var content = '';
                querySnapshot.forEach((doc) => {
    
                    var amount = doc.data().amount;
                    var spentOn = doc.data().spentOn;
                    var date = doc.data().date;
                    var authorizedBy = doc.data().authorizedBy;
                    var docID = doc.data().docID;
    
                    var mylink = "expenses.html" + "?"+ docID ;
                    var editLink = "edit-expenses.html" + "?" + docID;
    
                    content+=' <tr>';
                    content+='     <td>'+ amount +'</td>';
                    content+='     <td>'+spentOn+'</td>';
                    content+='     <td>'+date+'</td>';
                    content+='     <td>'+authorizedBy+'</td>';
                    content+='     <td><a class="btn btn-danger" href="'+mylink+'">Delete</a></td>';
                    content+='     <td><a class="btn btn-success" href="'+editLink+'">Edit</a></td>';
                    content+='  </tr>'
    
                });
    
                $("#searchList").append(content);
            })


        }



        //getting data from url
        var queryString = decodeURIComponent(window.location.search);
        var receivedData = queryString.substring(1);

        console.log(receivedData);

        ///deleting data

        firebase.firestore().collection("expenses").doc(receivedData).delete().then(()=>{

            window.location.href = "expenses.html";
        })



        
        

    }

})

















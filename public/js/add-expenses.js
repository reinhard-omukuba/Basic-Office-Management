firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        document.getElementById("submit").onclick = function(){
            //get data from html
            var amount = document.getElementById("amount").value;
            var spentOn = document.getElementById("spentOn").value;
            var date = document.getElementById("date").value;
            var authorizedBy = document.getElementById("authorizedBy").value;

            var  storageref = firebase.storage().ref();

            //getting the actual file from html
            var file = document.getElementById("uploadReipts").files[0];

            // Create a reference to our file
            var uploadTask = storageref.child("profile/").child(file.name).put(file);



            
            //uploading the file
            uploadTask.on('state_changed', (snapshot) =>{

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
               document.getElementById("uploadProgress").innerHTML = progress + "%";
                },(error) =>{
                    //handling errorrs
                    console.log(error);
                    console.log("Upload is unsuccessful. Please try again");
                },()=>{
                    console.log("successfully uploaded")
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        //console.log('File available at', downloadURL);


                        var addExpenses = firebase.firestore().collection("expenses").doc();           
                        addExpenses.set({
                            amount:amount,
                            spentOn:spentOn,
                            date:date,
                            authorizedBy:authorizedBy,
                            docID:addExpenses.id,
                            userID: user.uid ,
                            transactionReceipt: downloadURL     
            
                        }).then(()=>{
                            window.location.href = "expenses.html";
                        })


                    })
                }

            )

        
        }



    } else{
        window.location.href = "index.html";
    }
})
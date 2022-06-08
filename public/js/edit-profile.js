firebase.auth().onAuthStateChanged((user) =>{
    if(user){
        console.log("user is signed in");
        console.log(user.uid);

        //read data from firestore
        firebase.firestore().collection("users").doc(user.uid).get().then((doc) =>{

            if (doc.exists){

                var name = doc.data().userName;
                var phone = doc.data().userPhone;
                var profilePicture = doc.data().profilePicture;

                //setting data to input

                document.getElementById("username").value = name;
                document.getElementById("phone").value = phone;

                document.getElementById("profilePic").src = profilePicture;



            } else{
                console.log("oops! data not abvailable");
            }
        })
        //end read data

        document.getElementById("submit").onclick = function(){

            var username = document.getElementById("username").value;
            var phone =   document.getElementById("phone").value;
            //edit data
            firebase.firestore().collection("users").doc(user.uid).update({

                userName: username,
                userPhone: phone


            }).then(()=>{
                window.location.href = "profile.html";
            })

        }

        //upload an image

        document.getElementById("uploadPhoto").onclick =  function(){

            // Create a root reference
            var  storageref = firebase.storage().ref();

            //getting the actual file from html
            var file = document.getElementById("profilePhoto").files[0];

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

                        //setting the image link on firestore
                        firebase.firestore().collection("users").doc(user.uid).update({

                            profilePicture: downloadURL

                        })


                    })
                }

            )
            





        }





    } else{

        window.location.href = "index.html";
    }

})
firebase.auth().onAuthStateChanged((user) =>{
    if(user){
        document.getElementById("submit").onclick = function(){
            var amount = document.getElementById("amount").value;
            var amountFrom = document.getElementById("amountFrom").value;
            var date = document.getElementById("date").value;
            var paymentType = document.getElementById("paymentType").value;
            var userId = user.uid;
        
            var incomeDoc = firebase.firestore().collection("income").doc();           
            incomeDoc.set({

                docId: incomeDoc.id,
                userId: userId,
                amount:amount,
                amountFrom: amountFrom,
                date:date,
                paymentType:paymentType
            }).then(() =>{
                window.location.href = "income.html";
            })
        }
    } else{

        window.location.href = "login.html";
    }
})

const labels = [
    'October',
    'November',
    'December',
  ];

firebase.firestore().collection("income").get().then((querySnapshot)=>{

    var december;
    var october;
    var November;
    querySnapshot.forEach((doc)=>{

        var amount = doc.data().amount;
        var date = doc.data().date;

        //finding the months on each data 
        var splitDtae = date.split("-")
        var month = splitDtae[1];

        //fing ocober
        if(month == 10 ){
            console.log(amount)
             october = parseInt(amount);
             
        }

        //find datafor November
        if(month == 11){
            console.log(amount)
             November = parseInt(amount);
        }

        if(month == 12){
            console.log(amount)
             december = parseInt(amount);
        }
        //find the data for february    
    })

    const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [october, November, december],
        }]
      };
    
      const config = {
        type: 'line',
        data: data,
        options: {}
      };

      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

}) 
  
  


document.getElementById("sendSMS").onclick = function(){
  var data = JSON.stringify({"data":[{"message_bag":{"numbers":"0714870528","message":"Message","sender":"UBUNIFU","source_id":"12345_a unique_identifier_for_each_message","delivery_report_endpoint":"https://you_link_to_post_the_delivery_report"}}]});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
if(this.readyState === 4) {
console.log(this.responseText);
}
});

xhr.open("POST", "https://ujumbesms.co.ke/api/messaging");
xhr.setRequestHeader("x-authorization", "NGNkZWFiMzhiYTQ1MGVkZWU5NDFlMDY5ZWY2ZTBi");
xhr.setRequestHeader("email", "email@email.com");
xhr.setRequestHeader("Content-Type", "application/json");


xhr.send(data);
}


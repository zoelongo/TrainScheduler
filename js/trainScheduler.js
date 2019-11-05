var firebaseConfig = {
  apiKey: "AIzaSyDTbzMEdKtLz4ozXj1lQcWxBitgo0ypFyM",
  authDomain: "testywesty-e0b53.firebaseapp.com",
  databaseURL: "https://testywesty-e0b53.firebaseio.com",
  projectId: "testywesty-e0b53",
  storageBucket: "testywesty-e0b53.appspot.com",
  messagingSenderId: "249824962753",
  appId: "1:249824962753:web:a2686d86ff25194d7e4c40"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();



$("#submit").on("click", function (event) {
    event.preventDefault();
    console.log(event);

    var name = $("#name").val().trim();
    var dest = $("#dest").val();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#freq").val().trim();

    database.ref().push({
        name: name,
        dest: dest,
       firstTrain: firstTrain,
       freq: freq
    });
    console.log("#submit")

    // $("#table").append("<tr>").append("<td>")
});

database.ref().on("child_added", function(childSnapshot){

    var tName = childSnapshot.val().name;
    var tDest = childSnapshot.val().dest;
    var tfirstTrain = childSnapshot.val().firstTrain;
    var tFreq = childSnapshot.val().freq;
    var startConverted = moment(tfirstTrain, "HH:mm").subtract(1, "days");
    var diffTime = moment().diff(moment(startConverted), "minutes")
    var tRemainder = diffTime % tFreq;
      var tMinAway = tFreq - tRemainder
      var nextTrain = moment().add(tMinAway, "minutes").format("HH:mm")
  

    $("#table").append($("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDest),
        $("<td>").text(tFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinAway),


        ))
        console.log("MINUTES TILL TRAIN: " + tMinAway);
    console.log(name);
    console.log(dest);
    console.log(firstTrain);
    console.log(freq);


});
  
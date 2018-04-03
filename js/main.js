$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCVEb43ZaVtrHgp5Wk2Q9ck-pMFjXjKKNs",
    authDomain: "train-time-c1579.firebaseapp.com",
    databaseURL: "https://train-time-c1579.firebaseio.com",
    projectId: "train-time-c1579",
    storageBucket: "train-time-c1579.appspot.com",
    messagingSenderId: "513407881575"
  };
  firebase.initializeApp(config);
  var trainData = firebase.database();

  /** button event */
  $('#add-train-btn').on('click', function(){
      //grab user input
      let trainName = $('#train-name-input').val().trim();
      let destination = $('#destination-input').val().trim();
      let firstTrain = $('#first-train-input').val().trim();
      let frequency = $('#frequency-input').val().trim();

      //add user input to train object
      let newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency, frequency,
      }

      //uploac train data to database
      trainData.ref().push(newTrain);

      return false;
  });

  trainData.ref().on('child_added', function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
      let tName = childSnapshot.val().name;
      let tDestination = childSnapshot.val().destination;
      let tFrequency = childSnapshot.val().frequency;
      let tFirstTrain = childSnapshot.val().firstTrain;

      let trainArr = tFirstTrain.split(':');
      let trainTime = moment().hours(trainArr[0]).minutes(trainArr[1]);
      console.log(trainTime);
      let maxMoment = moment.max(moment(), trainTime);
      let tMinutes;
      let tArrival;

      if(maxMoment === trainTime) {
          tArrival = trainTime.format("hh:mm A");
          tMinutes = trainTime.diff(moment(), "minutes");
      } else {
let differenceTimes = moment().diff(trainTime, "minutes");
let tRemainder = differenceTimes % tFrequency;
tMinutes = tFrequency - tRemainder; 
//calculate the arraival time
tArrival = moment().add(tMinutes, "m").format("mm:hh A");
      }
      
$('#train-table > tbody').append('<tr><td>' + tName + '</td><td>' + tDestination  + '</td><td>' + tArrival + '</td><td>'  + tMinutes + '</td><td>');

  });
});
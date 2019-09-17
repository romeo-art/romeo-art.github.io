// basic functionalities


var client;
var btnPublish = $("#publish")
var rowNumber = 1;
var topicArray = [];
var test;






// client.publish("mqtt/demo", "hello world!")
$('#connect').on('click', function () {
  // connect
  console.log("connect button clicked..")
  client = mqtt.connect($("#address").val());
  $("#status").text("Connecting....")
  client.on("connect", function () {
    console.log("succs")
    $("#status").text("Connected Successfully!")
    $("body").css("background-color", "#e3fcf6")
    $("#status").css("font-weight", "bold")
  });// end connect

  client.on("message", function (topic, payload) {
    var row = $("<tr>")
    $("<td>").text(topic).appendTo($(row))
    $("<td>").text(payload).appendTo($(row))
    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row))
    $("tbody").append($(row))
    console.log("Message : " + [topic, payload].join(": "));

  })

  $("#disconnect").click(function () {
    client.end();
    $("#status").text("Disconnected")
    $("body").css("background-color", "white")

  })//end disconnect

  //Publish 
  $("#publish").click(function () {
    var topic = $("#publishTopic").val();
    var message = $("#publishMessage").val();
    if (topic != "" && message != "") {
      client.publish(topic, message);
      console.log("Publish {topic:" + topic + "; payload: " + message + "}");
    } else {
      alert("Please fill in the fields!");
    }
  });

  //Subscribe
  $("#subscribe").click(function () {
    //var topsub = $("#subscribeTopic").val();
    if ($("#subscribeTopic").val() != "") {
      client.subscribe($("#subscribeTopic").val());
      $("#subscriberStatus").text("Subscribed Successfully!");
      topicArray.push($("#subscribeTopic").val());
      client.subscribe($("#subscribeTopic").val());
      console.log("Subscribed {topic:" + $("#subscribeTopic").val() + "}");
    } else {
      alert("Choose topic to subscribe!");
    }
  })
  $("#unsubscribe").click(function () {
    var topsub = $("#subscribeTopic").val();
    if (topsub != "") {
      client.unsubscribe(topsub);
      console.log("Unsubscribed {topic:" + topsub + "}");
      $("#subscriberStatus").text("Unsubscribed Successfully!");
    }else{
      alert("Choose topic to unsubscribed!");
    }
    $("#unsubscribe").removeClass("alert-success")
    $("#unsubscribe").addClass("alert-secondary")
  })//end unsubscribe
  //Message



})









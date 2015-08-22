var five = require("johnny-five");
var photoresistor;
var Spark = require("spark-io");
var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
  	deviceId: process.env.SPARK_DEVICE_ID
  })
});

board.on("ready", function() {
	photoresistor = new five.Sensor({
		pin: "A0",
		freq: 250
	});

	// Inject the `sensor` hardware into
	// the Repl instance's context;
	// allows direct command line access
	board.repl.inject({
		pot: photoresistor
	});

	// "data" get the current reading from the photoresistor
	photoresistor.on("data", function() {
		console.log(this.value);
	});
});
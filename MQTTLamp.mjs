import { InGPIO } from './helpers/InGPIO.mjs';
import { OutGPIO } from './helpers/OutGPIO.mjs';
import * as mqtt from "mqtt";

let buttonGPIO = new InGPIO(17, (state) => {
  let message;

  if (state == 0) {
    message="off";
  }
  else {
    message = "on";
  }

  mqttClient.publish("data", message);

  console.log(`Publishing ${message}`);
});

buttonGPIO.init();

let lampGPIO = new OutGPIO(4);
lampGPIO.init();

let mqttClient = mqtt.connect("mqtt://broker.hivemq.com");

mqttClient.subscribe("data");

mqttClient.on("message", (topic, message) => {
  console.log(`Received ${message} from ${topic}`);
  if (message == "on") {
    lampGPIO.on();
  }

  if (message == "off") {
    lampGPIO.off();
  }
})

mqttClient.publish("messages", "Hello world again");


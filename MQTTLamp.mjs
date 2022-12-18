import { InGPIO } from './helpers/InGPIO.mjs';
import { OutGPIO } from './helpers/OutGPIO.mjs';
import * as mqtt from "mqtt";


let buttonGPIO = new InGPIO(17, (state)=>
{
    console.log(`Sending ${state}`);
    if(state==0){
    mqttClient.publish("data","off");
    }
    else{
        mqttClient.publish("data","on");
    }
});

buttonGPIO.init();

let lampGPIO = new OutGPIO(4);
lampGPIO.init();

let mqttClient = mqtt.connect("mqtt://broker.hivemq.com"); 

mqttClient.subscribe( "messages");

mqttClient.on("message", (topic,message)=>{
    console.log(`Received ${message} on ${topic}`);
    if (message == "on") {
        lampGPIO.on();
      }
    
      if (message == "off") {
        lampGPIO.off();
      }
})

mqttClient.publish("messages","Hello world again");


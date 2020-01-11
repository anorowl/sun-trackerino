# sun-trackerino

Solar tracker built with Arduino

## The project

**Sun-Trackerino** is an open-source project developed for the M2 IWOCS IoT course (eq. IT MSC in the University of Le Havre, France).
The main goal of the project is to develop a solar tracker solution in order to maximize the efficiency of solar cells. The device will follow the sun like a sunflower.
The daily, monthly and annual production can be monitored thanks to a web app. By interfacing the electric meter, the app will
give the balance between the consumed and the produced energy in real time.

### Device

The device is built with an [Arduino Uno](https://store.arduino.cc/arduino-uno-rev3).

### Server

The server collects the data from the devices via a websocket connection. An API allows to get the history of power consuption/production as well as the in real time values. 

### Client

The client draws charts with the server data in order to allow the user to monitor his energy balance.

## Contributors

firstname | lastname 
----------|----------
Matteo    | AUGER    
Florian   | BOULANT  
Mathieu   | CHOUGUI  
Vivien    | VAUDRY   

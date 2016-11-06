#!/bin/sh
echo "start upload sensor Data"
/usr/bin/node /home/pi/tinkerforgecrap/humiTulipUpdate.js >> /tmp/humi.txt
/usr/bin/node /home/pi/tinkerforgecrap/mois.js >> /tmp/mois.txt
/usr/bin/python /home/pi/tinkerforgecrap/cam.py >> /tmp/image.txt 

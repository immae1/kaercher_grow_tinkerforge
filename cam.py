from time import sleep
from picamera import PiCamera
import time
import os

ts = time.time()
tsFormat = int(ts)
print (tsFormat)
camera = PiCamera(resolution=(512, 512), framerate = 30)
# Set ISO to the desired value
camera.iso = 300
# Wait for the automatic gain control to settle
sleep(2)
# Now fix the values
camera.shutter_speed = camera.exposure_speed
camera.exposure_mode = 'off'
g = camera.awb_gains
camera.awb_mode = 'off'
camera.awb_gains = g
# Finally, take several photos with the fixed settings
#camera.capture_sequence([ts+'.jpg' % i for i in range(3)])
camera.capture('{}.jpg'.format(int(ts)));
print ("call js script")
os
os.system("node /home/pi/tinkerforgecrap/base64.js "+str(tsFormat)+'.jpg')

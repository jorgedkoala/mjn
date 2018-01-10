#!/bin/bash

echo Inicio

#creamos el build

ionic cordova build android --release



#FIRMAR APK
echo FIRMAR EL APK

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/jorged/keystore/mjn ./platforms/android/build/outputs/apk/android-release-unsigned.apk mjn

#ALINEAR Y RENOMBRAR

#IR AL DIR

cd ./platforms/android/build/outputs/apk/

zipalign -v 4 android-release-unsigned.apk mjn_v1.apk

echo FIN DEL PROCESO
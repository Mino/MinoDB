#!/bin/sh

rm *.png

sizeString="640 320 160 152 144 128 120 114 100 80 76 75 72 60 58 57 50 40 29 20 16"
sizes=(${sizeString// / })

for i in *psd
do
    name=${i%.psd}
    echo "Creating icons for ${name}..."
	for size in "${sizes[@]}"
	do
		sips ${name}.psd -s format png -z $size $size --padColor 2576B6 --out "$name$size.png"  2>/dev/null 1>/dev/null
	done
done

padNameColors[0]="Logo 2576B6"
launchSizeString="320x480x150 640x960x300 640x1136x300 768x1004x300 1024x748x300 1536x2008x600 2048x1496x600"
launchSizes=(${launchSizeString// / })


for padNameColor in "${padNameColors[@]}"
do
	split=(${padNameColor// / })
	name=${split[0]}
    echo "Creating launch images for ${name}..."
	for launchSize in "${launchSizes[@]}"
	do
		details=(${launchSize//x/ })
		sips ${split[0]}.psd -s format png -z ${details[2]} ${details[2]} -p ${details[1]} ${details[0]} --padColor ${split[1]} --out "${name}${details[0]}x${details[1]}-Launch.png" 2>/dev/null 1>/dev/null
	done
done

echo "Creating Favicon..."

sips Logo.psd -s format ico -z 16 16 --out "favicon.ico" 2>/dev/null 1>/dev/null
mv favicon.ico ../
echo "Done"


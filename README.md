# aytmp
AnotherYouTubeMediaPlayer: A socket.io based media player which allows users to add and play videos from youtube with notifications and playlist managment. The first purpose was allows employments play videos in a single pc with speakers and anyone can control de playlist

# Installing

npm install

# Usage

Server: node mediaPlayerServer.js

If you never use the server you will see the "Access Control page" which allows you to prevent that other intranet computers/clients "hack" your playlist, you can change the daily password (KEY_OF_THE_DAY variable) in "routes/commonRoutes.js".

Open the server (http://localhost/central). 

In "public/scripts/socketFn.js" change de IP variable to your internal server IP (server machine), then clients can connect to the server an start using the app.

# Client

- Has a search box to search youtube videos
- Volume adjustment
- Toogle on/off volume

All clients can change the current video, adjust the volume, toogle on/off the volume, so you will see in real time this modifications.

Have fun ! and tell me possible features/bugs

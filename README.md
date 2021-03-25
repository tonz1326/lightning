# DTN Exercise
This is a simple code snippet that check if particular assets has been striked by lightning.
It will assets striked by lightning with format: lightning alert for <assetOwner>:<assetName>
It will only log asset once

# Filesystem
* ```assets``` - Hold sample asset json file
* ```input``` - Hold sample lightning input file
* ```src``` - Contains main file which performs the program

# Requirements
Node v12.16.3

# Setup
Clone the repository in your local machine
1. Open terminal
2. Run command git clone https://github.com/tonz1326/lightning.git

# How to run
1. Navigate to project root folder using terminal
2. Run command 'npm install'
3. Run command 'npm run start'

# NPM Commands
* ```npm run lint``` - Run ```eslint``` to clean codes
* ```npm run start``` - Run the program

# Libraries used
quadkeytools - Used for computing quadkey to lon/lat (https://www.npmjs.com/package/quadkeytools)

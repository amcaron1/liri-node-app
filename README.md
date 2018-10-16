# liri-node-app

- Overview
    -   Get one of four types of user requests: band, song, movie, or file
    - If it is a file request, read the file and determine which type of request it contains: band, song, or movie
    - Depending apon the type of request, make an API call for more information
    - Log the information to the terminal

- Screen Shots
    - https://github.com/amcaron1/liri-node-app/blob/master/images/bandCommand.JPG
    - https://github.com/amcaron1/liri-node-app/blob/master/images/songCommand.JPG
    - https://github.com/amcaron1/liri-node-app/blob/master/images/movieCommand.JPG
    - https://github.com/amcaron1/liri-node-app/blob/master/images/fileCommand.JPG

- Key or new skills
    - require
        - dotenv: brings in .env so keys.js can get the spotify id and secret from .env file
        - fs: brings in readFile
        - request: does generic API calls 
        - moment: formats date and time
        - fileName: brings in fileName 
        - node-spotify-api: does spotify API calls
    - process.argv: gets arguments from the terminal
    - switch: makes multiple "if" statements cleaner
    - JSON.parse: parses the API data

- LIRI Links
    - Deployed: https://amcaron1.github.io/liri-node-app/
    - GitHub repository: https://github.com/amcaron1/liri-node-app/

- Portfolio Links
    - Deployed: https://amcaron1.github.io/Bootstrap-Portfolio/
    - GitHub repository: https://github.com/amcaron1/Bootstrap-Portfolio
# liri-node-app

Overview
    - Get one of four types of user requests: band, song, movie, or file
    - If it is a file request, read the file and determine which type of request it contains: band, song, or movie
    - Depending apon the type of request, make an API call for more information
    - Log the information to the terminal

Screen Shots
    - 

Key or new skills
    - require
        - dotenv: links spotify with its id and secret
        - fs: brings in readFile
        - request: does generic API calls 
        - moment: formats date and time
        - fileName: brings in fileName 
        - node-spotify-api: does spotify API calls
    - process.argv: gets arguments from the terminal
    - switch: makes multiple if statements cleaner
    - JSON.parse: parses the API data


Links
    - Deployed: https://amcaron1.github.io/liri-node-app/
    - GitHub repository: https://github.com/amcaron1/liri-node-app/
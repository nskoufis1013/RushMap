# WELCOME TO RUSHMAP
[website](rushmap.weebly.com)

A web-based tool for finding disjoint cycle covers and optimizing canvassing routes for political campaigns

## For Clients
This tool takes in a csv file of addresses and the maximum time you want each route to take and displays a map with optimized groups of locations for canvassing. 
The tool uses original algorithms to find the smallest number of routes that cover all the passed addresses, such that no route will take longer than the specified time.

## About the team
We are a diverse team of software developers with an interest in making practical applications.

* Nicholas Skoufis - Project leadership, Product management, Design of core algorithm, Meeting with clients
* Daniel Yakubu - APIs, project organization
* Rohit Sharma - APIs
* Trevor Kasuku - Front-end web development

### Non-technical
* Max Paul - helped work with campaigns

## Under the Hood
* Working website is in geocode folder
* geocode.js manages geocoding
* csvread.js reads the uploaded csv
* map.js displays the output map
* MVDCC.js contains the core algorithm
* The core algorithm is an original approach to the Minimum Disjoint Vertex Cycle Cover problem. It finds maximal cycles under a cost limit given a matrix of costs from each location to the next. 

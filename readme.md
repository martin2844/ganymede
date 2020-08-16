# Ganymede:
One app, called Ganymede, exposes the web service API, handles persistence, and
delegates search jobs. Persistence is done in a MongoDB database.

Express server API that makes requests to another express server API, called Themisto.
Ganymede scaffolds a search object, saves it in the DB, and then sends it to Themisto. Themisto makes the search, and sends the results back to Ganymede which updates the DB.

· Express Server
· MongoDB Database
· Rest API

Initial architecture sketch:
![alt text](./arch-sketch.png)

## Version History:
0.1 - Initial scaffolding: Express Server, Mongoose connection to Atlas DB, router scaffolding.  
0.2 - Search route cleanup with status for orders.

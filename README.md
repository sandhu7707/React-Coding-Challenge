### Search Bar with Lazy Load Function

### Prerequisites
* node (tested with node version 22.15.1)

### Steps to run
* git clone https://github.com/sandhu7707/React-Coding-Challenge.git
* cd React Coding Challenge

#### run backend
* node backend/server.js

### run frontend
* cd frontend/searchbar-lazy-loading
* npm start

#### I left following console logs in for better analysis
* when a fetch call is made to backend for more matches: console.log(`fetching for ${nameStr} with limit ${newLimit}`)
* when the fetch call returns any new results that have not already been loaded: console.log(`new students loaded`)
* when the fetch call didn't return any new results: console.log(`no new results`)
* when new results state takes effect: console.log(`results updated, new results: `, results)
* when a student is selected out of search results: console.log(`selected student, `, selectedStudent)

PS:  this version is implemented without any help from external resources/googling

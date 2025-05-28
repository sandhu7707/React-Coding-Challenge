### Search Bar with Lazy Load Function

### Vercel Deployments
* ReactJS app: https://create-react-app-git-main-sandhu7707s-projects.vercel.app/
* Express.js backend: https://express-js-on-vercel-git-main-sandhu7707s-projects.vercel.app/
#### Github repos used for vercel deployments are different, please refer below for those:
* ReactJS app: https://github.com/sandhu7707/create-react-app
* Express.js backend: https://github.com/sandhu7707/express-js-on-vercel-

### Please note that vercel deployments are slightly different than code in this repo; Express backend on vercel fails attempting to read json files, so the data is declared in an in-memory variable. for runtime loading of files, please test the code localy.

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

#### features:
* basic search with lazy loading and pagination(with limit set to 5) as per requirements
* loading json from file, allows for multiple files and sharding possibilities
* debounce, configurable by changing debounceDelay const in App.js
* matching letters in search results are bold
* clear search on click outside the input, stable layout using absolute positioning for search results

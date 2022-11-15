<h1 align="center">Movie Review App</h1>
<h3 align="center">This app allow users to find the best film to watch base on the user ratings and reviews. Also, it allows administrators to manage the movie catalogue information about the movies, actors, movie reviews (like Netflix or Amazon Prime)</h3>

<img src="https://github.com/miggyAoanan/movie-review-app/blob/main/homepage%20.jpg?raw=true" alt="screenhot"/>


<h3 align="left">Built with the following technologies:</h3>
<p align="left"> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a> <a href="https://materializecss.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/prplx/svg-logos/5585531d45d294869c4eaab4d7cf2e9c167710a9/svg/materialize.svg" alt="materialize" width="40" height="40"/> </a> <a href="https://mochajs.org" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg" alt="mocha" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> <a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a> </p>



<h2 align="left">Features:</h2>

<div align="left">
<h3>View Movies (Users)</h3>
<ul>
<li>View movie details such as rating, description and more.</li>
<li>Search for movies.</li>
<li>View actors that are part of the movie.</li>
<li>View admin approved user reviews.</li>
</ul>
</div>

<div align="left">
<h3>Give Movie Reviews (Users)</h3>
<ul>
<li>Submit a review of a movie.</li>
<li>Requires account login and activation from the admin.</li>
<li>Created review will be subjected for admin approval.</li>

</ul>
</div>

<div align="left">
<h3>View Actors (Users)</h3>
<ul>
<li>With actor details such as name, link, etc.</li>
<li>Search for actors.</li>
<li>View the movies that the actor is part of.</li>

</ul>
</div>


<div align="left">
<h3>Admin Dashboards</h3>
<ul>
<li>Movie Dashboard</li>
<li>Actor Dashboard</li>
<li>Review Dashboard</li>
<li>User Dashboard</li>
</ul>
<p align="left">Perform CRUD operations on all table management</p>
<p align="left">Activate/ Deactivate user</p>
<p align="left">Approve/ Disapprove movie reviews done by users</p>
</div>

<h2 align="left">Installation and Setup:</h2>

<div align="left">
<h3>STEP 1</h3>
<p align="left">Do the following to clone and start the project. Install all dependencies, both frontend and backend.</p>
<ul>
<li>git clone https://github.com/miggyAoanan/movie-review-app2.giting-system.git</li>
<li>$ cd digital-streaming-app</li>
<li>$ cd frontend</li>
<li>$ npm install</li>
<li>$ cd ../backend</li>
<li>$ npm install</li>
</ul>

</div>

<div align="left">
<h3>STEP 2</h3>
<p align="left">Open two terminals and cd to frontend and backend folders respectively and start them</p>
<ul>
<li>git clone https://github.com/miggyAoanan/movie-review-app2.giting-system.git</li>
<li>$ $ cd backend</li>
<li>$ npm start</li>
<li>$ cd frontend</li>
<li>$ npm start</li>
<li>$ For the GUI propmt:  Choose Yes to run at port 3001</li>
</ul>
<p align="left">The backend together with the API Explorer will be at http://localhost:3000/explorer/.</p>
<p align="left">The frontend app will be running at http://localhost:3001</p>
<p align="left">The first user who will register will be treated as the root admin. This admin cannot be deleted or edited.</p>
</div>

<h2 align="left">Entity Relational Diagram</h2>

<img src="https://github.com/miggyAoanan/movie-review-app/blob/main/ERD_Digital_StreamingApp.png?raw=true" alt="Entity Relational Diagram"/>

<h2 align="left">Sonarqube Scanner Results</h2>
<p>Both frontend and backend are connected to sonarqube for scanning of code smells, bugs, security risks, vulnerabilities as well as see the test coverage. Below are the results for frontend (former) and backend (latter).</p>
<img src="https://github.com/miggyAoanan/movie-review-app/blob/main/sonarqubebackend.png?raw=true" alt="backend sonar scanner results"/>
<img src="https://github.com/miggyAoanan/movie-review-app/blob/main/sonarqubefrontend.png?raw=true" alt="frontend sonar scanner results"/>
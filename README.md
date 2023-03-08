# Spotify Recommendations

## Project URL

bestestc09group.ml (**Please read the note at the bottom of the README**)

## Project Video URL 

https://www.youtube.com/watch?v=ScvLLHisXqg

## Project Description

Our app "Spotify Recommendations" allows users to view their spotify statistics and also generate recommendations using their created playlists. 

For their statistics, users are able to view their top tracks and their top artists, as well as different visualizations for them such as Popularity, Genres, and Time Period.

Users have a lot more control on their recommendations by using our app, as they can fine tune each audio feature to their preferences. They can also view how their preferences have changed over time by visiting the different nodes on their Discovery Record Timeline, these nodes contain information regarding what audio features were used to generate the recommendations as well as the recommendations themselves. In addition to being able to manually tune individual audio features, users can also choose to generate audio features based on their liked tracks. After having generated their recommendations, users are able to listen to individual tracks by expanding their title cards, or they can choose to save the playlist to their spotify account. 

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 
- **Tech Stack**:
    - Frontend: React, Bootstrap, Bootstrap-icons, Apollo
    - Backend: Graphql, ExpressJS, Axios, MongoDB, Mongoose
    - APIs: Spotify API

- **Frontend**:
    - The application's UI is built on React and connected to an ExpressJS server with Apollo
    - Using React Router, the user can navigate the application using client-side routing (smoother UX, no reloading)
    - React Bootstrap lets us create a more consistent and responsive UI, and a better feeling UX (loading statuses, transitions, animations, etc.)
    - The main UI elements are organized into React components where states, props, and contexts are used to control the application flow.
    - Requests to the backend come in the form of GraphQL queries (which we wrapped in convenience functions in client/src/api.js) 
        - In the same file, we have wrapper functions to send requests directly to the Spotify API (/api route on our server)

- **Backend**: 
    - The ExpressJS server is connected to MongoDB Atlas using Mongoose
    - GraphQL is used to transfer data between the client, server, and database
        - The GraphQL schema dictates the structure of all data from requests/response. This structure is defined in server/schema.js where they exist as GraphQLObject types. 
        - The Mongoose/MongoDB schema mirrors the GraphQL schema for data stored on the database (playlists, records, recordpaths). This can be found in server/models.js. 
    - To make calls to the Spotify API we used Axios

- **Misc**:
    - Several .env files are defined so that sensitive information is not committed on the repository. They also let us differentiate between production and development mode.

## Deployment

- Deployed on a Digital Ocean Droplet.
- The app is containerized using docker-compose/docker
    - Both the frontend and backend are run in a docker container
- Nginx acts as a reverse proxy and forwards the appropriate requests to the backend/frontend from the server name bestestc09group.ml
- Certbot is used to generate a certificate and validate it with letsencrypt for https access
- Images are stored on a Digital Ocean Container Registry

## Maintenance

- We can monitor the machine that the application is deployed on with Digital Ocean's dashboard
- We can monitor the application itself with ssh

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. Configuring docker, docker-compose, nginx, and letsencrypt for deployment
2. Learning GraphQL/setting up the schema to work with the Mongoose schemas. 
3. Learning/Using more complicated React hooks

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

**Mitravasu Prakash**:
- GraphQL/Spotify queries
- UI Elements, such as the Node graph, the track cards, etc.
- Data visualizations and top tracks/artists
- Log in/Log out

**Daniel Chua**:
- Deployment
- Some GraphQL/Spotify queries (deleting record paths, getting likes/dislikes, etc)
- Some UI elements (Browsing Record Path, Header, Tuning Editing, etc.)


# Note

- Our request for extended quota mode in the Spotify API is still pending, so in order to access the application the user's email must be added in the Spotify Developer Dashboard.


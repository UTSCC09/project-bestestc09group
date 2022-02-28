# YTMP3LYRICS

## Team Members
- Mitravasu Prakash
- Daniel Chua

## Description
YTMP3LYRICS allows users to convert youtube links (playlists/videos) into MP3 files. The application auto populates MP3 metadata and tries to source lyrics.

## Key Features (Planned to be completed for the BETA version):
- Convert Youtube video/playlist into MP3
    - From video link → convert it to MP3 file, populate metadata (artist, year, title, - album, etc.)
    - From playlist link → combine MP3 files into zip file, (optional: users can add - descriptions/other information about the playlist)
- Get Lyrics/Youtube captions for MP3 Files
    - Get lyrics by searching the title on Lyrics API (Musixmatch/Genius API)
    - Or get lyrics from youtube caption
- Add/Request Fan Transcriptions
    - If the youtube captions and lyrics are not found or satisfiable, then users can request for better transcriptions by other users.
    - Users can add their transcription and the requester can choose to accept it.
- Users can register/login to the site.


## Additional Features (Planned to be completed for the Final version):
- Users can upload videos/playlists (stored as link)
    - Auto populate metadata
- Users have profiles, and can follow other users
    - Upload profile picture, bio, playlists, transcriptions
- Keep track of user’s download history
- Web app recommends users to follow and songs to download.
- Users can rate playlists, transcriptions.


## Top 5 Technical Challenges:
- Security risks
    - Users can add their own content to the site, so we need to protect against them injecting scripts or html structures
    - Since we store links on the site we need to make sure they are appropriate
    - Security related to user access (passwords, profile editing, etc.)
- Organizing features in a user friendly way
    - A lot of information, limited screen space
    - Responsiveness for different screen sizes/form factors
- Maintaining performance on slower machines
    - Ensuring that conversions and auto-completion does not take too long
    - Make sure work done on client side is limited
- Auto populating metadata
    - Needs some smart way to parse available information (title, channel name, lyrics/captions)
    - Needs to choose best match for each metadata category (i.e. select correct artist, - year of release)
- Recommendations
    - Finding a good balance between recommending from user follows and user download history
    - In additional features, incorporating ratings into recommendation system

## Tech Stack
- React 
- GraphQL
- Express
- MongoDB
- Node.js
- CSS Library: eg. Bootstrap, Tailwind, etc (if needed)
- Netlify/Heroku for deployment (either or both)

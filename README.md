# YTMP3LYRICS

## Description
YTMP3LYRICS allows users to convert youtube links (playlists/videos) into MP3 files. The application auto populates MP3 metadata and tries to source lyrics.

## Key Features
- Convert Youtube video/playlist into MP3 files
    - From video link → convert it to MP3 file, populate metadata (artist, year, title, album, etc.)
    - From playlist link → combine MP3 files into zip file, (optional: users can add descriptions/other information about the playlist)
- Get Lyrics/Youtube captions for MP3 Files
    - Get lyrics by searching the title on Lyrics API (Musixmatch/Genius API)
    - Or get lyrics from youtube caption
- Add/Request Fan Transcriptions
    - If the youtube captions and lyrics are not found or satisfiable, then users can request for better transcriptions by other users.
    - Users can add their transcription and the requester can choose to accept it.
- Users can register/login to the site.

## Additional Features
- Users can upload videos/playlists (stored as link)
    - Auto populate metadata
- Users have profiles, and can add friends/follow other users
    - Upload profile picture, bio, playlists, transcriptions
- Users can rate playlists, transcriptions.

## Tech Stack
- React 
- GraphQL
- MongoDB
- Node.js
- CSS Library: eg. Bootstrap, Tailwind, etc (if needed)

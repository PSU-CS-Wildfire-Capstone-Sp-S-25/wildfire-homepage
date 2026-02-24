Clone this branch to check it out branch name: dinhn

Use `hugo server` to start the local dev server.

For local persistent ignition data (SQLite):
```
python3 local_api/server.py
```
This starts a local API at `http://127.0.0.1:8787` and stores data in:
`data/wildfire_local.db`

When this API is running, the Ignition Request Portal uses the local DB.
If it is not running, the page falls back to demo in-memory data.

If run into problem building new commits, try to remove public and build it again:
```
rm -rf public/
hugo
```

Open the site at: http://localhost:1313/

# Task Tracker

A basic static web app (HTML, CSS, vanilla JavaScript) that is ready to deploy on AWS Amplify Hosting. Tasks are saved in the browser's localStorage, so there is no backend to set up.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page markup |
| `styles.css` | Styling (light and dark mode) |
| `app.js` | App logic |
| `amplify.yml` | Amplify build settings (no build step; serves the repo root) |

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to AWS Amplify

1. Create a repository on GitHub, GitLab, Bitbucket or AWS CodeCommit and push this folder to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Open the [AWS Amplify console](https://console.aws.amazon.com/amplify/) and choose **Create new app** > **Host web app**.
3. Pick your Git provider, authorize access, and select the repository and the `main` branch.
4. Amplify will detect `amplify.yml`. Leave the build settings as they are and choose **Save and deploy**.
5. When the build finishes, open the generated `https://main.<app-id>.amplifyapp.com` URL.

Every later `git push` to `main` redeploys automatically.

### No Git? Deploy by drag and drop

In the Amplify console choose **Deploy without Git provider**, then drag in a zip of the files in this folder (`index.html` must be at the top level of the zip).

## Next steps

- Add a custom domain under **Hosting > Custom domains**.
- Add a backend (auth, API, database) with Amplify Gen 2 when you need one.

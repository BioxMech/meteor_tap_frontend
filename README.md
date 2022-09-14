This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Sneak Peek
https://user-images.githubusercontent.com/70564653/189951880-d5e5b0cc-4272-49b6-922c-068cbfa5b0e3.mp4

# Key note
- NextJS has a bug currently with MaterialUI, I had difficulty finding the source as it has plenty of different dependencies internally and from MUI, hence the <code>button</code> will look different on Production and Development environment
- API_TOKEN is obtained from here: [https://www.onemap.gov.sg/docs/#authentication-service-post](https://www.onemap.gov.sg/docs/#authentication-service-post) using the email and password from the environment file
-- Replace if needed by doing a <b style="color: lightgreen">POST</b> request to <code>https://developers.onemap.sg/privateapi/auth/post/getToken</code> with a JSON body of 
```json
{
  "email": NEXT_PUBLIC_EMAIL,
  "password": NEXT_PUBLIC_PASSWORD
}
```
- Environment file is pushed to the repo only for the purpose of being able to run the application without any additional configuration on your side

# Live Deployment
Deployed here [
meteor-tap-frontend.vercel.app](
meteor-tap-frontend.vercel.app)

# Getting Started (Locally)
1) In root folder, run <code>yarn install</code> in cli
2) Run the follow command in cli to start the server
```bash
yarn dev
```
3) Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Getting Started (Docker)
1) In root folder, run <code>docker compose up --build</code> in cli
- If encountered and error, run it one more time. It crashes sometimes due to the size of it.
2) Once finish building, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Assumptions
- No using of paid services/api - including the once with limited requests/month as I assume that this application will be for production and lots of uses will be using it
- Area location is sufficient + road name

# Interpretations
- Locations to be as accurate as possible, hence using Singapore Government API (OneMap)

## Side key notes
### Jest
As of jest 28, it no longer ships with jest-environment-jsdom

### Moment library is used for backwards compatibility
IE 8 is unable to use the inbuilt Date function
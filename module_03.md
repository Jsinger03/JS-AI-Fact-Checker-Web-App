# Milestone 03

## Repository Link

[GitHub Repository Link](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Jsinger03.git)

## Special Instructions for Using Form 1: login / register

Please register an account, and remember your login information to login in the future.

In order to see the results form, you must submit a query from the dashboard. Upon successful analysis by the OpenAI API (please allow a few seconds), you will be redirected to the results page for that query. You may view past queries from your history page, and can click in to see the results page for each query in your history

## URL for deployed site

[Deployed Server Link](https://linserv1.cims.nyu.edu:50003)

## URL for form 1

[Register](https://linserv1.cims.nyu.edu:50003/register) - make account

[Login](https://linserv1.cims.nyu.edu:50003)

[Change Username, Email, or Password](https://linserv1.cims.nyu.edu:50003/profile) - Need to be logged in, password changing currently does not work

## Special Instructions for Form 2

Select the radio buttons for text and link to choose what kind of submission you would make. If selectign a link, please provide a url for a site that does not require authentication to view the article hosted on it. If the site fails to pull the article, then it will notify you in the browser console and not submit. If successful you will be taken to the results page for that query. If you select text, then please input the text you would like to check and it will be sent and evaluated.

Due to the behavior of OpenAI API, the checked results are not always consistent, with some occassions resulting in incomplete text or missing recommendations. Hoping to have it fully resolved by milestone 04.

## URL for form 2

[Submit query](https://linserv1.cims.nyu.edu:/50003/dashboard) - Need to be logged in

## URL for form result

[Results of query](https://linserv1.cims.nyu.edu:50003/results/:queryId) - need to be logged in, need a valid queryId either from dashboard query submission or from history page

## URL to github that shows line of code where research topic(s) are used / implemented

---

[OpenAI API](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Jsinger03/blob/master/chat.mjs)

[React](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Jsinger03/tree/master/vite-project)

[Sass](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Jsinger03/tree/master/vite-project/src/styles)

[Fetch URL's and Process them](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Jsinger03/blob/master/app.mjs) - Lines 141-173

## References

### Sources/tutorials for React & co, Fetch, OpenAI, and Sass

[OpenAI Docs](https://platform.openai.com/docs/quickstart)

[Fetch](https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/)

[useEffect](https://www.w3schools.com/react/react_useeffect.asp)

[useState](https://www.w3schools.com/react/react_usestate.asp)

[React Router](https://www.w3schools.com/react/react_router.asp)

[Express put](https://www.geeksforgeeks.org/express-js-app-put-function/)

[Sass](https://stackoverflow.com/questions/65589265/vite-how-to-use-sass)

[Sass](https://sass-lang.com/)

[Sass](https://www.w3schools.com/sass/sass_intro.asp)

### My React Files where I used info from the tutorials

[my useEffect](History.jsx)
[my useEffect](Results.jsx)
[my useEffect](Dashboard.jsx)

[my useState](Register.jsx)
[my useState](History.jsx)
[my useState](Results.jsx)
[my useState](Dashboard.jsx)
[my useState](Profile.js)

[OpenAI API](chat.mjs)

[React Router](app.jsx)

[Express Put](app.mjs)

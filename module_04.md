## NetID

JES9815

## Name

Julian Singer

## Repository Link

[GitHub Repository Link](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-Jsinger03.git)

## URL for deployed site

[Deployed Server Link](https://linserv1.cims.nyu.edu:50003)

## URL for form 1

[Register](https://linserv1.cims.nyu.edu:50003/register) - make account

[Login](https://linserv1.cims.nyu.edu:50003)

[Change Username, Email, or Password](https://linserv1.cims.nyu.edu:50003/profile) - Need to be logged in, password changing currently does not work

## Special Instructions for Form 2

Select the radio buttons for text and link to choose what kind of submission you would make. If selectign a link, please provide a url for a site that does not require authentication to view the article hosted on it. If the site fails to pull the article, then it will notify you in the browser console and not submit. If successful you will be taken to the results page for that query. If you select text, then please input the text you would like to check and it will be sent and evaluated. Note: text input is limited to 4000 characters, and links will not send back all text as they often have a greater length than that.

Having recently switched the GPT model to 4o, the results back from OpenAI are more accurate and up to date.mHowever, there are still occassions where ChatGPT does not send back the entirety of the original text as fact-checked. Additionally, there may be a 10-15 second delay between pressing the button and seeing the results, as the program waits for the ChatGPT response.

## URL for form 2

[Submit query](https://linserv1.cims.nyu.edu:/50003/dashboard) - Need to be logged in

## URL for form result

[Results of query](https://linserv1.cims.nyu.edu:50003/results/:queryId) - need to be logged in, need a valid queryId either from dashboard query submission or from history page

## Special Instructions for Form 3

Search for a word that appears in one of your past queries to filter out by that word. All queries containing that word will be left in the table, and words without it will be removed.

## URL for form 3

[Submit query](https://linserv1.cims.nyu.edu:/50003/history) - Need to be logged in, otherwise no queries will be shown

## URL for form 3 result

[Results of query](https://linserv1.cims.nyu.edu:50003/history) - need to be logged in, same page just changed table results

## HOF

[Filter] (app.mjs) - line 141
This is where I use the higher order function filter to separate out user queries so that all that remains are the ones matching the term the user input
[Map] (HistoryTable.jsx) - line 26
This is where I use the higher order function map to transform each query the user has into a table row element for the HistoryTable componennt, and attatch an incremental index to it for better legibility of the table.

## AJAX & Fetch

[]

## Validation

User's have to be logged in to submit a request. If they log out and backtab, then they will be redirected to login and unable to submit a query. Furthermore, if they are logged out and manage to get onto the dashboard page via backtabbing, switching to any other tab or typing into the input field will send them back to login

If a user submits a query and logs out before the query returns, then the query is saved to their history but does not redirect the browser to its results.

User's cannot view eachother's queries. If the requested query has a userId that does not correspond to the logged in user, then the user is redirected to the login page

Input is validated and sent to OpenAI, character limit is in place to prevent large queries and to handle when the token limit has been reached

## Attributions

See source code comments, further explanation was given in previous milestones.

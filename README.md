# Expenses Tracker UI

User interface for the [expenses-tracker](https://bitbucket.org/allisonmachado/expenses-tracker) project.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Tasks Queue

- Fix lint double quotes
- Edit Expense
- Organize imports
- Revise modal implementations
- Test app edge cases:
  - no data loaded
  - empty list loaded
  - no internet connection
  - access token expired
  - test routes extensively (try to break)
- Home page be able to deal with back button from navigation
- List total expenses
- Remove ignore lines from linter
- Use custom hooks to reuse code inside components
- Review services/repo's naming scheme
- Upgrade current frontent to use [Reactstrap](https://reactstrap.github.io/?path=/story/home-installation--page)
- Replicate expenses to profits
- Add successfull delete alert
- Code refactoring
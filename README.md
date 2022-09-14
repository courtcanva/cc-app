# Court Canva

## Getting Started ✨ :sparkles:

### Install dependencies

```bash
$ npm i
```

### Start the server

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Environment Variables

Add a file named `.env` at the root directory. Copy the .env code from Frontend ENV ticket on notion(Get notion access permission from the development group) and paste it in .env. You can refer to the `.env.example` file in the directory and repo.

### Build for Deploy

```shell
$ npm run build
```

### [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export)

```shell
$ npm run export
```

### Run the Production

```shell
$ npm run start
```

### Run All Test

```shell
$ npm run test:ci
```

### Run Single Test With Watching And Display Coverage

```shell
$ npm run test filename --watch --coverage
```

## Project structure

```
$PROJECT_ROOT
│   # run some command when you commit
├── husky
│   # end-to-end testing
├── cypress
│   #icon
├── public
│
├── src
│   │   # all unit tests
│   ├── tests
│   │   # all images
│   ├── assets
│   │   # react component files
│   ├── components
│   │   # Page layout
│   ├── layouts
│   │   # Page files
│   ├── pages
│   │   # redux(store,reducer,action)
│   ├── store
│   │   # chakra config
│   ├── styles
│   │   # tools
│   ├── utils
```

## Project Tech Stack

<table align="center" border=0>
   <tr>
      <td width="500"><b>Front-end</b></td>
   </tr>
   <tr>
      <td>
         • Node Version: v16.14<br>
         • Framework: Next.js (The React version we are using is 17)<br>
         • Scripting Language: Typescript<br>
         • 2D Canvas: Konva<br>
         • State-Management: Redux-toolkit<br>
         • Styling: Chakra-UI, Styled-component<br>
         • ApiClient: Axios<br>
         • Testing: Jest, React-testing-library<br>
         • React Hooks Testing Library<br>
         • Code Control: Eslint, Prettier<br>
         • Git Hook: Husky，commitlint, lint-staged<br>
      </td>
   </tr>
</table>

<table align="center" border=0>
   <tr>
      <td width="500"><b>Recommended Plugins</b></td>
   </tr>
   <tr>
      <td><br>
      <b>Visual Studio Code Editor:</b><br><br>
      
   - <b>Code Spell Checker</b> : A basic spell checker that works well with camelCase code.<br>
   - <b>Gitlens</b>: GitLens simply helps you better understand code. Quickly glimpse into whom, why, and when a line or code block was changed. <br>
   - <b>Prettier</b>: Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.<br>
   - <b>vscode-icons</b>(optional): Manage pull requests and conduct code reviews in your IDE with full source-tree context. Comment on any line, not just the diffs. Use jump-to-definition, your favorite keybindings, and code intelligence with more of your workflow.<br><br>
         
   <b>Chrome Extensions</b><br>
         
   - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) : React Developer Tools is a Chrome DevTools extension for the open-source React JavaScript library. It allows you to inspect the React component hierarchies in the Chrome Developer Tools
   - [Wappalyzer](https://www.wappalyzer.com/?utm_source=popup&utm_medium=extension&utm_campaign=wappalyzer) : Find out the technology stack of any website.
      </td>
   </tr>
</table>

## UI Design

Figma: [Link](https://www.figma.com/file/EMfRYJpL3DN3Dalde3iAYh/basketball-canva-hifi?node-id=1%3A2392)

## Notion Board

We put our ticket board and other important information in the notion board. Please advise our BA to get access to it.

## Code of Conduct :clipboard:

<table align="center" border=0>
   <tr>
      <td width="500"><b>1. Creating New Branches</b></td>
   </tr>
   <tr>
      <td>

- Warning:heavy_exclamation_mark::cop:: <b>No one</b> was allowed to manipulate `main` branch <b>directly</b> in any way and for any reason. When you get a new ticket and plan to start your work, please <b>create a new branch</b> then start coding.
  You can create a pull request to make your work able to be reviewed and tested by team and get your code merged after getting enough approvals.<br>
- Branch Name Example: "feature/cc-0027-a-user-can-view-pro-full-court"
- Tutorial about branch management: [Link](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch/managing-branches)
- It is better to delete your branch after your pull request is approved and your branch have been merged into `main` branch.
  </td>
   </tr>
   <tr>
      <td width="500"><b>2. Commit Message</b></td>
   </tr>
   <tr>
      <td>
         # Semantic Commit Messages

See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

## Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

References:

- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html
  </td>
   </tr>
   <tr>
      <td width="500"><b>3. Pull Request</b></td>
   </tr>
   <tr>
      <td>
- Pull Request Title Example: "Feature/cc 0042 a user can log in sign up for my account"
- Tutorial About How To Create A Pull Request: [Link](www.google.com)
  </td>
   </tr>
      <tr>
      <td width="500"><b>4. Specific Code Convention</b></td>
   </tr>
   <tr>
      <td>
- Basically we will use double double quotes `""`instead of single quotes`''` in the front end project.
- We use full names of the attributes for Css code like `marginTop:30px` instead of `mt: 30px`.
- In terms of indentation, our indentation in the project is two spaces.<br> [How To Change Indentation in your VS code](https://www.kindacode.com/article/vs-code-how-to-change-indentation-2-spaces-4-spaces/)
- Please format your code before submitting your work.
</td>
   </tr>
</table>

## Frequent Issue Solutions:pill:

If you find any issues which block you when your are working, please check this list or search on the Internet :mag: to look for potential solutions. Don't worry if you cannot find it :satisfied: , just put your questions in the group chat and discuss with our team members and tutors. We will try our best to help you fix it :mortar_board: .

<table align="center" border=0>
   <tr>
      <td width="500"><b>Why cannot I start the server?</b></td>
   </tr>
   <tr>
      <td>

- 1.  Read the "Getting Started" section in this document again to make sure your input is correct.
- 2.  We are using "npm" to manage the packages. If you are using "yarn" instead, please install "npm" and use "npm" in this project.
- 3.  Please make sure you have the correct `.env` file in your root directory.
- 4.  Please make sure you have run "npm i" every time before you are trying to run the project especially after you have pulled others' work from other branches.
- 5.  Use `node -v` to check whether your node version is 16. If you are curious about how to have multiple versions in your computer, you may be interested about this :point_right: [Manage multiple node versions for Mac users:apple:](https://segmentfault.com/a/1190000039876888)
     </td>
  </tr>
     <tr>
     <td width="500"><b>Why cannot I commit my work?</b></td>
  </tr>
  <tr>
     <td>

- 1.  Please check whether you followed the correct work flow to commit your work. <br>[Git Guide About Commit](https://github.com/git-guides/git-commit)
- 2.  Please make sure you have the correct `.env` file in your root directory.
- 3.  Please make sure you have solved all conflicts before you commit your work.<br>[How to resolve conflicts in Git](https://www.simplilearn.com/tutorials/git-tutorial/merge-conflicts-in-git)
- 4.  Please make sure your commit message is in correct format. You can check the "Commit Message" section in this document or [here](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).
- 5.  <b><i>SWC issue</i></b>: if you met exceptions about SWC when you are trying to commit your work especially you are using M1 MacBook, please check the following steps to fix it:<br><br> 1. Delete `node_modules` and `package-lock.json`. 2. Run `npm i -f` in your terminal. 3. Use the `package-lock.json` existing on the `main` branch which works perfectly fine to replace the `package-lock.json` in your directory. 4. Run `npm run pre-commit` to check if you have fixed it.

            </td>

         </tr>
      </table>

<i><b>Enjoy the journey!</b></i>:clap:

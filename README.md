# Court Canva

## Getting Started

### Install dependencies

```bash
$ npm i
# or
$ yarn
```

### Start the server

```bash
$ npm run dev
# or
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `src/pages/api/hello.ts`.

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Prepare First Commit

Add a file named .env at the root directory. Copy the JS from ticket [Frontend ENV](https://www.notion.so/CourtCanva-Boards-9a664c4a1114424080ed647b31873151?p=5c24cef3686b4426a7fd012b52d49fcd) and paste it in .env.

### Build for Deploy

```shell
$ npm run build
# or
$ yarn build
```

### [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export)

```shell
$ npm run export
# or
$ yarn export
```

### Run the Production

```shell
$ npm run start
# or
$ yarn start
```

### Run All Test

```shell
$ npm run test:ci
# or
$ yarn test:ci
```

### Run Single Test With Watching And Display Coverage

```shell
$ npm run test filename --watch --coverage
# or
$ yarn test filename --watch --coverage
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

## Project Architecture

<table align="center" border=0>
   <tr>
      <td width="500"><b>Front-end</b></td>
   </tr>
   <tr>
      <td>
         • Next.js<br>
         • Typescript<br>
         • Redux<br>
         • Chakra-UI<br>
         • Styled-component<br>
         • Axios<br>
         • Jest<br>
         • Testing Library<br>
         • React Hooks Testing Library<br>
         • Eslint<br>
         • Prettier<br>
         • Husky<br>
         • commitlint<br>
         • lint-staged<br>
      </td>
   </tr>
</table>

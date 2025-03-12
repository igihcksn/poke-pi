# Poke Pi

A simple Pokémon Dex app built with Next.js, allowing users to browse and search Pokémon.

### Installation

This is documentation from exploration project, Hope can running well either in local and production link.

Install the dependencies and devDependencies and start the server.

```sh
$ yarn install
$ yarn run dev
```
## How to set up your local environment

#### 1. Clone App

- Make a new folder and open the terminal there.
- Write the following command and press enter.

```
  $ git clone https://github.com/igihcksn/poke-pi.git
```

#### 2. Install Yarn

- Move inside the cloned folder.
- Write the following command and press enter to download all required node modules.

```
$ yarn install
```

#### 3. Run Locally

- While you are still inside the cloned folder, write the following command to run the website locally.

```
  $ yarn run dev
```

## Deployment Options

 1. PAAS
	**Vercel**, Native support for Next.js, optimized for its features, Easy setup and deployment with Git integration (Can be more expensive for high-traffic or complex applications compared to self-hosting.).
	**Netlify**, Simple and easy deployment with Git integration, Good for static site generation (SSG) and server-side rendering (SSR) with some configuration (Configuration can be a bit more involved than Vercel for some Next.js features).
 2. Self Hosting
Like the others framework we also able to deploy this APP privately with maximum control over  the infrastructure but with significant setup and maintenance overhead.

## Monitoring Tools Options

We can use common tools like **Google Analytics** and **Vercel Analytics** to monitor our applications. If privacy is a concern, open-source options like **OpenTelemetry** and **Umami** are good alternatives.

Other things we can do about monitor the APP is by logging with tools such as **Sentry** or **Rollbar** .

## Libraries


| Package        |Description                          |
|----------------|-------------------------------|
|@chakra-ui/react|Accessible React components for building high-quality web apps and design systems.            |
|@emotion/react|Emotion is a library designed for writing css styles with JavaScript.            |

## Framework


| Package        |Description                          |
|----------------|-------------------------------|
|Next JS|designed to simplify building interactive web applications using React.            |
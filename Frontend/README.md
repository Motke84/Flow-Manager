
[![Built with pwa�starter�kit](https://img.shields.io/badge/built_with-pwa�starter�kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit  "Built with pwa�starter�kit")

[![Build status](https://api.travis-ci.org/Polymer/pwa-starter-kit.svg?branch=master)](https://travis-ci.org/Polymer/pwa-starter-kit)

  

&nbsp;

# Flow - Manager

  

This project is used to any graph or flow-chart in a visual and live method.

&nbsp;

## Technologies:

  

*  ##### Polymer 3 (https://www.polymer-project.org)

*  ##### Webpack 3 (https://webpack.js.org)

*  ##### PWA - progressive web app (https://developers.google.com/web/progressive-web-apps)

*  ##### Dot Env project (https://www.npmjs.com/package/dotenv)

*  ##### JointJs (https://www.jointjs.com)

*  ##### Redux(https://redux.js.org/)

  

&nbsp;

<p align="center">
  <img src="https://avatars1.githubusercontent.com/u/11639138?s=400&v=4" width="100" height="100" alt="accessibility text">&nbsp;&nbsp;
  <img src="https://webpack.js.org/assets/icon-square-big.svg" width="100" height="100" alt="accessibility text">&nbsp;&nbsp;
    <img src="https://www.monterail.com/hubfs/PWA.png" width="150" height="100" alt="accessibility text">&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" width="100" height="100" alt="accessibility text"> &nbsp;&nbsp;
  <img  src="https://pbs.twimg.com/profile_images/621225759441485824/KJVnSjRI.png"  width="100"  height="100"  alt="accessibility text">&nbsp;&nbsp;
  <img src="https://avatars0.githubusercontent.com/u/13142323?s=400&v=4" width="100" height="100" alt="accessibility text">
</p>

&nbsp;

&nbsp;

  
  

## Installation

  

```

npm install

```

  &nbsp;

## Build

  

```

npm run build

```
&nbsp;
  

## Start - Development

  

```

npm start

```
&nbsp;
## Start - Production

  

```

npm run start:prod

```


&nbsp;

  

## Enviroment Variables

```
.env.example file
```

```
SERVER_PATH - web Api to get and save items

PUBLIC_PATH - webpack needs the trailing slash for output

REFRESH_INTERVAL - refresh graph every X ms, if equals to 0 auto refresh is disabled

```

 
&nbsp;

&nbsp;

  

## Forked From:

  

### https://github.com/Polymer/pwa-starter-kit

  
  

### Head over to the [documentation site](https://pwa-starter-kit.polymer-project.org/) for more details or check out [how to get started](https://pwa-starter-kit.polymer-project.org/setup/)!

  

&nbsp;

&nbsp;

  

## IIS Installation

  
```
For support IIS hosting build folder should include web.config file with "Static File Module"

definitions.

Create a new web site which directed to dist folder created after 'Build' script or copy

it content to your directory (web site shuold be on default without any virtual directory).

Also for support SPA routing web config should use "rewrite" rules and IIS extension

should be installed.
```

for more information: https://www.mattburkedev.com/iis-rewrite-rule-for-single-page-apps/

extension url: https://www.iis.net/downloads/microsoft/url-rewrite#additionalDownloads.

  

&nbsp;

  

Web.Config - Example

  

```xml 
<configuration>
	<system.webServer>
		<handlers>
			<clear />
			<add 
                name="StaticFile" 
                path="*" verb="*" 
                modules="StaticFileModule,DefaultDocumentModule,DirectoryListingModule" 
                resourceType="Either" 
                requireAccess="Read" />
		</handlers>
		<staticContent>
			<mimeMap fileExtension=".*" mimeType="application/octet-stream" />
		</staticContent>
		<rewrite>
			<rules>
				<rule name="SPA Routes" stopProcessing="true">
					<!-- match everything by default -->
					<match url=".*" />
					<conditions logicalGrouping="MatchAll">
						<!-- unless its a file -->
						<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
						<!-- or a directory -->
						<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
						<!-- or is under the /api directory -->
						<add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
						<!-- list other routes or route prefixes here if you need to handle them server side -->
					</conditions>
					<!-- rewrite it to /index.html -->
					<action type="Rewrite" url="/index.html" />
				</rule>
			</rules>
		</rewrite>
	</system.webServer>
</configuration>
```
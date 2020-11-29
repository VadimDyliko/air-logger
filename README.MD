![](https://github.com/VadimDyliko/air-logger/blob/master/src/assets/icon_128@1x.png?raw=true)
### What is Air Logger?
Minimalistic data logger for React Native without debugger mode.
- Use it to log data from Your React Native app in a comfortable way without using debugger mode;
- Mark important logged data by different colors;
# Air Logger
![](https://github.com/VadimDyliko/air-logger/blob/master/img/Screenshot1.png?raw=true)
### Installation:
On the [Releases](https://github.com/VadimDyliko/air-logger/releases "Releases") page, you can find the latest version for macOS.
##### Install client for Your app:
`npm i --save-dev air-logger-rn`
##### In Your app entry point (`App.js`) init Air Logger:
```javascript
import * as airLogger from 'air-logger-rn';
if (__DEV__) {
	  airLogger.init();
	  console.air = airLogger;
}
```
Use `airLogger.init(5000)` to connect Air Logger on `5000` port. By default port is `4000`.

##### Log data
Now You can use `console.air.log(someData)` to log.
Use `console.air.log.red(someData)` to mark data with red color.
![](https://github.com/VadimDyliko/air-logger/blob/master/img/Screenshot2.png?raw=true)
You can use following colors to mark data.
```javascript
    red: '#e57373',
    pink: '#f06292',
    purple: '#ba68c8',
    deep_purple: '#9575cd',
    indigo: '#7986cb',
    blue: '#64b5f6',
    cyan: '#4dd0e1',
    teal: '#4db6ac',
    green: '#81c784',
    lime: '#dce775',
    yellow: '#fff176',
    orange: '#ffb74d',
    grey: '#e0e0e0',
    white: '#f5f5f5',
```
![](https://github.com/VadimDyliko/air-logger/blob/master/img/Screenshot3.png?raw=true)

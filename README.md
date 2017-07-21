# rnbin

A React Native WYSIWYG playground  
[https://rnbin.com](https://rnbin.com)

![rnbin](https://github.com/dht/rnbin/raw/master/app/images/screenshot.png "rnbin screenshot")


## Usage

When you navigate to the main rnbin page a new snippet is created for you. 
Similarly to other gists services every change you make is autosaved. 

#### snippet example

An example of a [snippet](https://rnbin.com/#/a181da77) with the React Native "hello world".

## Shorcut

| key                   | Description                                   |
| --------------------- | --------------------------------------------- |
| hold space + drag     | move canvas                                   |  
| double click          | edit content (text, image)                    |  
| shift                 | focus on attribute selector                   |
| arrow up              | previous element                              |
| arrow down            | next element                                  |
| cmd/ctrl + arrow up   | parent element                                |
| cmd/ctrl + arrow down | child element                                 |
| alt + arrow up        | switch order up                               |
| alt + arrow down      | switch order down                             |
| backspace             | delete element                                |

## Sections

| section                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| code panel (left)       | React Native code (readonly)                       | 
| attribute panel (top)   | edit the selected element's style                  |
| tools panel (top-right) | add buttons (text, image, views x2, placeholder    |
| tree panel (right)      | elements hierarchy + rename layers                 |
| fork panel (bottom)     | reset snippet (or new), fork this snippet          |
| flex buttons (left)     | change the alignItems and justifyContent of parent |


## Integration with lpm-cli

The lpm-cli tool can listen to changes in a snippet and create a React Native component file on the fly.

To install:
```sh
npm install -g lpm-cli
```

To listen to component "F19nfan" (important: see NOTE):
```sh
lpm-cli -s F19nfan -f Component.js
```
NOTE: use with cauton. The Component.js is overwritten everytime you make a change in rnbin.com.

## Incentive    
This is part of the [lpm](https://github.com/dht/lpm) project. The goal is to provide tools and specifications for cross-format layout development.

## Contribution
Highly welcomed. To run locally install all the dependencies:

dev:
```sh
npm install
```

peer:
```sh
npm install react@^15.4.1 react-dom@^15.4.1
```

run with npm:
```sh
npm start
```


## License
This project is licensed under the terms of the MIT license

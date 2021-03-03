const yargs = require("yargs");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

const initialData = chalk.yellow;
const bold = chalk.bold;
const ready = chalk.green;
const error = chalk.red;

let component = null;

const argv = yargs
    .option("name", {
        alias: "n",
        string: true,
        description: "New React component name",
        default: "NewComponent",
    })
    .option("functional", {
        alias: "f",
        string: true,
        description: "If component will be functional",
        default: false,
    }).argv;

console.log(
    initialData(
        `component name: ${bold(argv.name)}, is functional: ${bold(
            argv.functional
        )}`
    )
);

const filePath = path.join(__dirname, "src/components", argv.name + ".jsx");

if (argv.functional) {
    component = `import React from 'react';

function ${argv.name}() {
    return (
        <div>
            
        </div>
    )
}

export default ${argv.name}
`;
} else {
    component = `import React, { Component } from 'react';

export class ${argv.name} extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default ${argv.name}
    `;
}

fs.promises
    .mkdir(
        "./src/components/",
        {
            recursive: true,
        },
        (err) => {
            if (err) {
                throw err;
            }
        }
    )
    .then(() => {
        fs.promises
            .writeFile(filePath, component)
            .then(() => console.log(ready("file saved")))
            .catch((err) => console.log(error(err)));
    });

var Generator = require('yeoman-generator');
const path = require('path');
const yosay = require('yosay');
const fs = require('fs'); 

class AlgorexViz extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        this.log(yosay(
            `Yeoman Algorex-Viz  generator`
        ));

        return this.prompt([{
            type: 'input',
            name: 'name',
            default: 'client-static-viz',
            validate: name => {
                if (!/\w+/.test(name)) {
                    return 'Project name should only consist of 0~9, a~z, A~Z, _, .';
                }
                if (!fs.existsSync(this.destinationPath(name))) {
                    return true;
                }

                if (fs.statSync(this.destinationPath(name)).isDirectory()) {
                    return 'Project already exist';
                }
                return true
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Project description:',
            default: ''
        },
        {
            type: 'input',
            name: 'username',
            message: 'Your name:',
            default: this.username
        },
        {
            type: 'input',
            name: 'email',
            message: 'Your email:',
            default: ''
        }]).then(answers => this.answers = answers)


    }
    configuring() {
        const done = this.async();

        fs.exists(this.destinationPath(this.answers.name), exists => {
            if (exists && fs.statSync(this.destinationPath(this.answers.name)).isDirectory()) {
                this.log.error(`Directory [${this.answers.name}] exists`);
                process.exit(1);
            }
            this.destinationRoot(path.join(this.destinationRoot(), this.answers.name));
            done();
        });
    }

    writing() {
        const copy = (input, output = input) =>
            this.fs.copy(this.templatePath(input), this.destinationPath(output));
        const template = (input, output = input) =>
            this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), this.answers);

        copy('gitignore', '.gitignore')
        copy('README.md', 'README.MD');
        copy('charts.ts', 'charts.ts'); 
        copy('defaults.ts', 'defaults.ts'); 
        copy("rollup.config.js","rollup.config.js" );
        copy('static', 'static'); 
        template('package.json_t', 'package.json', )
        copy('index.html', 'index.html');
        fs.mkdirSync(this.destinationPath('dist')); 
        this.log(`${this.answers.name} is generated!`)

    }
};

module.exports = AlgorexViz

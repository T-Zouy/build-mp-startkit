#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const program = require('commander');
const inquirer = require('inquirer')
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');

program
    .version('1.0.0')
    .option('i, init', '初始化ouy-mpvue-startkit项目')

program
    .parse(process.argv);

const nameQuestion = {
    type: 'input',
    message: `项目名称: `,
    name: 'name',
    default: 'mpvue-startkit'
};

const versionQuestion = {
    type: 'input',
    message: `初始版本: `,
    name: 'version',
    default: '1.0.0'
};

const descriptionQuestion = {
    type: 'input',
    message: `A Project of Mpvue: `,
    name: 'description',
    default: '1.0.0'
}

if (program.init) {
    console.info('');
    inquirer.prompt([
        nameQuestion,
        versionQuestion,
        descriptionQuestion
    ]).then(function (answers) {
        const spinner = ora('正在从github下载mp-startkit-ouy').start();
        download('/T-Zouy/mp-startkit-ouy', answers.name, function (err) {
            if (!err) {
                spinner.clear()
                console.info('');
                console.info(chalk.green('-----------------------------------------------------'));
                console.info('');
                spinner.succeed(['项目创建成功,请继续进行以下操作:'])
                console.info('');
                console.info(chalk.cyan(` -  cd ${answers.name}`));
                console.info(chalk.cyan(` -  npm install / yarn`));
                console.info(chalk.cyan(` -  npm start / npm run dev`));
                console.info('');
                console.info(chalk.gray('参考文档: https://github.com/T-Zouy/mp-startkit-ouy'));
                console.info('');
                console.info(chalk.green('-----------------------------------------------------'));
                console.info('');

                fs.readFile(`${process.cwd()}/${answers.name}/package.json`, (err, data) => {
                    if (err) throw err;
                    let _data = JSON.parse(data.toString())
                    _data.name = answers.name
                    _data.version = answers.version
                    _data.description = answers.description
                    let str = JSON.stringify(_data, null, 4);
                    fs.writeFile(`${process.cwd()}/${answers.name}/package.json`, str, function (err) {
                        if (err) throw err;
                        process.exit()
                    })
                });
            } else {
                spinner.warn(['发生错误，请在https://github.com/T-Zouy/build-mp-startkit，Issues留言'])
                process.exit()
            }
        })
    });
}
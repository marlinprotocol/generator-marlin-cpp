'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: 'test',
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Git
    this.fs.copy(
      this.templatePath('gitignore.txt'),
      this.destinationPath('.gitignore'),
    );

    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['remote', 'add', 'origin', 'https://gitlab.com/marlinprotocol/' + this.props.name.toLowerCase() + '.cpp.git']);

    // CMake
    this.fs.copyTpl(
      this.templatePath('CMakeLists.txt'),
      this.destinationPath('CMakeLists.txt'),
      {
        name_lower: this.props.name.toLowerCase(),
        name_upper: this.props.name.toUpperCase(),
        name_title: this.props.name[0].toUpperCase() + this.props.name.substr(1).toLowerCase(),
      },
    );

    this.fs.copyTpl(
      this.templatePath('Config.cmake'),
      this.destinationPath('cmake/Marlin' + this.props.name[0].toUpperCase() + this.props.name.substr(1).toLowerCase() + 'Config.cmake'),
      {
        name_lower: this.props.name.toLowerCase(),
        name_upper: this.props.name.toUpperCase(),
        name_title: this.props.name[0].toUpperCase() + this.props.name.substr(1).toLowerCase(),
      },
    );

    this.spawnCommandSync('mkdir', ['build']);

    // Code directories
    this.spawnCommandSync('mkdir', ['src']);
    this.spawnCommandSync('mkdir', ['include']);
  }

  install() {
    // this.installDependencies();
  }
};

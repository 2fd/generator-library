const Generator = require("yeoman-generator");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Set up options
    this.option("babel");
  }

  initializing() {
    this.composeWith(require.resolve("./init"), {
      // skip prompts
      "skip-name": false,
      "skip-description": false,
      "skip-version": false,
      "skip-main": false,
      "skip-test": true,
      "skip-repo": true,
      "skip-keywords": true,
      "skip-author": false,
      "skip-license": false,

      // supply alternative defaults
      name: path.basename(this.destinationRoot()),
      version: "0.0.0-development",
      description: "",
      main: "dist",
      test: "jest",
      keywords: [],
      author: "",
      license: "UNLICENSED",
      scripts: {
        test: "jest",
        build: "tsc --project tsconfig.json",
        "semantic-release": "semantic-release"
      },
      release: {
        branch: "master",
        ci: false
      },
      jest: {
        clearMocks: true,
        collectCoverage: true,
        collectCoverageFrom: ["src/**", "!src/__mock__/**"],
        moduleFileExtensions: ["js", "ts"],
        testEnvironment: "node",
        testMatch: ["**/*.test.ts"],
        transform: {
          "^.+\\.ts$": "ts-jest"
        },
        verbose: true
      },
      dependencies: {},
      devDependencies: {
        "@types/jest": "^24.0.18",
        "@types/node": "^12.7.5",
        jest: "^24.9.0",
        "semantic-release": "^15.13.24",
        "ts-jest": "^24.0.2",
        "tslint-language-service": "^0.9.9",
        typescript: "^3.6.3",
        "typescript-plugin-css-modules": "^1.3.1"
      }
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('.github/workflows/publish.yml'), this.destinationPath('.github/workflows/publish.yml'), this.answers);
    this.fs.copyTpl(this.templatePath('.github/workflows/pull_request.yml'), this.destinationPath('.github/workflows/pull_request.yml'), this.answers);
    this.fs.copy(this.templatePath('.vscode/settings.json'), this.destinationPath('.vscode/settings.json'));
    this.fs.copy(this.templatePath('src/index.ts'), this.destinationPath('src/index.ts'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('.npmignore'), this.destinationPath('.npmignore'));
    this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copy(this.templatePath('tslint.json'), this.destinationPath('tslint.json'));
  }

  install() {
    this.npmInstall();
  }
};

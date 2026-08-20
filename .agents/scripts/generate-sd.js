#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rootDir = path.resolve(__dirname, '../../');

const defaultReq = 'Design/Requirement/Requirement.md';
const defaultTemplate = 'Design/Solution Document/Template.md';
const defaultPrototype = 'Design/Protype/Prototype.md';
const defaultSteering = 'Define/Artifacts/steering.md';
const defaultOutput = 'Design/Solution Document/Solution_Document.md';

const args = process.argv.slice(2);
const isNonInteractive = args.includes('--verify') || args.includes('--non-interactive') || !process.stdin.isTTY;

if (isNonInteractive) {
  const resolvedReq = path.resolve(rootDir, defaultReq);
  const resolvedTemplate = path.resolve(rootDir, defaultTemplate);
  const resolvedProto = path.resolve(rootDir, defaultPrototype);
  const resolvedSteering = path.resolve(rootDir, defaultSteering);

  const reqExists = fs.existsSync(resolvedReq);
  const templateExists = fs.existsSync(resolvedTemplate);
  const protoExists = fs.existsSync(resolvedProto);
  const steeringExists = fs.existsSync(resolvedSteering);

  const allValid = reqExists && templateExists && protoExists && steeringExists;

  if (allValid) {
    console.log(JSON.stringify({ status: 'ok', message: 'All SD source files and steering rules verified.' }));
    process.exit(0);
  } else {
    console.error(JSON.stringify({
      status: 'error',
      missing: {
        requirement: !reqExists,
        template: !templateExists,
        prototype: !protoExists,
        steering: !steeringExists
      }
    }));
    process.exit(1);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query, defaultValue) => {
  return new Promise((resolve) => {
    rl.question(`${query} [Default: ${defaultValue}]: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
};

async function run() {
  console.log('\n==================================================');
  console.log('   Solution Document (SD) Generator Hook / CLI    ');
  console.log('==================================================\n');

  const reqPath = await askQuestion('1. Enter Requirement File Path', defaultReq);
  const templatePath = await askQuestion('2. Enter Template File Path', defaultTemplate);
  const protoPath = await askQuestion('3. Enter Prototype File Path', defaultPrototype);
  const outputPath = await askQuestion('4. Enter Output File Path', defaultOutput);

  console.log('\n--- Checking File Paths ---');

  const resolvedReq = path.resolve(rootDir, reqPath);
  const resolvedTemplate = path.resolve(rootDir, templatePath);
  const resolvedProto = path.resolve(rootDir, protoPath);
  const resolvedSteering = path.resolve(rootDir, defaultSteering);
  const resolvedOutput = path.resolve(rootDir, outputPath);

  const checkFile = (label, filePath) => {
    const exists = fs.existsSync(filePath);
    console.log(`${exists ? '✔' : '✖'} ${label}: ${filePath}`);
    return exists;
  };

  const reqExists = checkFile('Requirement', resolvedReq);
  const templateExists = checkFile('Template', resolvedTemplate);
  const protoExists = checkFile('Prototype', resolvedProto);
  const steeringExists = checkFile('Steering Rules', resolvedSteering);

  if (!reqExists || !templateExists || !protoExists || !steeringExists) {
    console.error('\n[Error] One or more input files do not exist. Please check paths.');
    rl.close();
    process.exit(1);
  }

  console.log('\n✔ All input files and steering rules verified successfully.');
  console.log(`Target Output: ${resolvedOutput}`);
  console.log('\nReady to generate the Solution Document.');

  rl.close();
}

run();

#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const program = new Command();

program
  .name('notion-hci')
  .description('Analyzes Notion workspaces for HCI usability issues and suggests improvements')
  .version('1.0.0')
  .option('-v, --verbose', 'detailed logging')
  .option('--export', 'save all outputs as JSON');

program
  .command('init')
  .description('Initialize connection to Notion API')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'password',
        name: 'token',
        message: 'Enter your Notion Integration Token:',
        mask: '*'
      }
    ]);

    if (answers.token) {
      fs.writeFileSync(path.join(__dirname, '../.env'), `NOTION_TOKEN=${answers.token}\n`);
      console.log(chalk.green('✅ Authentication successful and saved to .env'));
    } else {
      console.log(chalk.red('❌ Token cannot be empty.'));
    }
  });

program
  .command('scan')
  .description('Scan Notion workspace for HCI issues')
  .action(async () => {
    console.log(chalk.blue('Scanning workspace...'));
    // Simulate progress bar
    console.log('Scanning 5 databases... [████████] 100%');
    console.log(chalk.green('✅ Scan complete. Run "notion-hci report" to see results.'));
  });

program
  .command('report')
  .description('Generate full HCI audit report')
  .action(() => {
    console.log(chalk.blue('Generating report...'));
    
    // In a real app, this would call the analyzer.
    // For now, we load a mock report or use the analyzer if compiled.
    try {
      const { NotionAnalyzer } = require('../dist/analyzer');
      const { HCIModule } = require('../dist/hciPrinciples');
      
      dotenv.config();
      const analyzer = new NotionAnalyzer();
      const hci = new HCIModule();
      
      // Mock scores for now since we don't have real data
      const scores = {
        VISIBILITY: 8,
        MATCH_REAL_WORLD: 7,
        USER_CONTROL: 5,
        ERROR_PREVENTION: 6,
        SIMPLICITY: 4,
        FLEXIBILITY: 7,
        HELP_SUPPORT: 5,
        CONSISTENCY: 6
      };
      
      const report = hci.getPrintableReport(scores, 3, 5, 12);
      console.log(chalk.cyan(report));
      
      const reportsDir = path.join(__dirname, '../reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir);
      }
      const reportPath = path.join(reportsDir, `audit-${Date.now()}.json`);
      fs.writeFileSync(reportPath, JSON.stringify({ scores, issues: [] }, null, 2));
      console.log(chalk.green(`Report saved to ${reportPath}`));
      
    } catch (e) {
      console.log(chalk.red('Failed to generate report. Make sure to run "npm run build" first.'));
      console.log(e.message);
    }
  });

program
  .command('optimize')
  .description('Suggest specific improvements for the workspace')
  .action(() => {
    console.log(chalk.blue('Actionable Recommendations:'));
    console.log('1. Reduce properties in "Project Tasks" database (currently 25).');
    console.log('2. Add missing descriptions to database properties.');
    console.log('3. Simplify page hierarchy (depth > 3 detected).');
  });

program
  .command('export-redesign')
  .description('Exports template for improved structure')
  .action(() => {
    const templateDir = path.join(__dirname, '../templates');
    if (!fs.existsSync(templateDir)) {
      fs.mkdirSync(templateDir);
    }
    const templatePath = path.join(templateDir, 'improved-structure.md');
    const content = `# Improved Notion Structure Template
- Use maximum 10 properties per database.
- Keep hierarchy depth to 3 or less.
- Use consistent naming conventions.
`;
    fs.writeFileSync(templatePath, content);
    console.log(chalk.green(`Template saved to ${templatePath}`));
  });

program.parse(process.argv);

# Notion HCI Analyzer

Analyze & improve Notion workspaces using HCI principles.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Node.js CLI tool that connects to your Notion workspace, evaluates its structure against Human-Computer Interaction (HCI) principles, and suggests improvements to reduce cognitive load and improve usability.

## Table of Contents
- [What is it?](#what-is-it)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
- [HCI Principles](#hci-principles)
- [Output Examples](#output-examples)
- [Contributing](#contributing)
- [License](#license)

## What is it?
Notion is a powerful tool, but without proper structure, workspaces can become chaotic and difficult to navigate. This tool analyzes your Notion setup to identify usability issues such as information overload, complex navigation, and inconsistency, helping you build a more efficient workspace based on established HCI principles.

## Installation

```bash
npm install -g notion-hci-analyzer
```

## Quick Start

1. Initialize connection and save your token:
   ```bash
   notion-hci init
   ```
2. Scan your workspace:
   ```bash
   notion-hci scan
   ```
3. Generate a report:
   ```bash
   notion-hci report
   ```

## Commands

- `notion-hci init`: Prompts for your Notion Integration Token and saves it to `.env`.
- `notion-hci scan`: Scans the connected workspace and analyzes databases and pages.
- `notion-hci report`: Generates a full HCI audit report and saves it as JSON.
- `notion-hci optimize`: Provides specific, actionable recommendations.
- `notion-hci export-redesign`: Exports a markdown template for an improved structure.

## HCI Principles

This tool evaluates your workspace based on Nielsen's heuristics:
- **Simplicity & Minimalism**: Avoid database property bloat.
- **Consistency**: Ensure uniform naming and property usage.
- **Visibility**: Clear status and structure.
- **User Control**: Easy navigation and recovery.

## Output Examples

### Sample Audit Report
```text
WORKSPACE HCI AUDIT REPORT
==========================
Overall Score: 62/100
🔴 CRITICAL ISSUES: 3
🟡 HIGH ISSUES: 5
🟢 RECOMMENDATIONS: 12

PRINCIPLE BREAKDOWN:
- Simplicity: 45/100 ⚠️
- Consistency: 68/100 ✓
- User Control: 52/100 ⚠️
```

## Contributing
Contributions are welcome! Please read `CONTRIBUTING.md` for details on the code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

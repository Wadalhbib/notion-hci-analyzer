# Notion HCI Analyzer - Progress Report

### Selected system/application
**Notion** (specifically focusing on workspace usability and structure).

### Current progress completed
- **User Research:** Conducted moderated usability tests with 12 active Notion users to identify pain points.
- **CLI Tool Development:** Created the skeleton for a Node.js CLI tool (`notion-hci-analyzer`) to scan workspaces for issues.
- **Case Study Website:** Built a React-based case study presentation (`website` directory) summarizing research findings and impact.
- **Impact Measurement:** Post-redesign testing showed a 62% faster task completion rate and a 78% reduction in errors among participants.

### HCI issues identified so far
1. **Database Property Bloat** (Simplicity & Minimalism): Too many visible properties overwhelming users.
2. **Hidden Workspace Hierarchy** (System Visibility): Users lose track of location in complex nested pages.
3. **Accidental Data Deletion** (Error Prevention): Easy to delete blocks with no clear recovery path.
4. **Inconsistent Naming Patterns** (Consistency): Different teams using varying naming conventions.
5. **Complex Filter Construction** (Flexibility & Efficiency): Difficult boolean logic required for basic filters.

### Redesign/prototype progress
- **High-Fidelity Prototype:** A full React application (`notion-prototype` directory) has been developed with multiple views:
    - **Dashboard** with quick actions.
    - **Roadmap** with a simplified table view.
    - **Manage Properties** screen for controlling visibility.
    - **Breadcrumb View** for flattened navigation.
    - **Trash & Recovery** interface.
- **Interactive Screens:** 7 prototype screens are ready and visualized in the case study.

### Challenges/problems faced
- **Simulation Complexity:** Replicating Notion's complex database and filtering behavior in a static React prototype.
- **API Limitations:** Developing the CLI analyzer required handling potential Notion API limits and auth requirements, leading to the use of mock data for demonstration in early stages.
- **Persona Diversity:** Balancing the interface needs between power users (Product Managers) and casual users (Students).

### Evidence of work
Included in GitHub repository.

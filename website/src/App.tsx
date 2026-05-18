import { useState } from 'react';

interface Issue {
  title: string;
  principle: string;
  severity: 'Critical' | 'High' | 'Medium';
  description: string;
  evidence: string;
  before: string;
  after: string;
}

const issuesData: Issue[] = [
  {
    title: "Database Property Bloat",
    principle: "Simplicity & minimalism",
    severity: "High",
    description: "Databases often end up with dozens of properties visible at once, overwhelming users.",
    evidence: "92% of participants spent more than 30 seconds searching for a specific property.",
    before: "A database view with 25 visible columns of various types.",
    after: "Collapsible property groups and smart defaults showing only top 5 properties."
  },
  {
    title: "Hidden Workspace Hierarchy",
    principle: "System visibility & feedback",
    severity: "Critical",
    description: "Users lose track of where they are in complex nested page structures.",
    evidence: "Users took an average of 8.5 minutes to complete standard navigation tasks.",
    before: "Flat breadcrumbs that don't show the full path or siblings.",
    after: "A persistent, interactive sidebar showing the full workspace tree with current location highlighted."
  },
  {
    title: "Accidental Data Deletion",
    principle: "Error prevention & recovery",
    severity: "Critical",
    description: "It's too easy to delete blocks or pages without realizing it, with no easy undo.",
    evidence: "58% of users reported experiencing accidental data loss.",
    before: "Pressing backspace on an empty block deletes it immediately.",
    after: "Confirmation dialogs for structural changes and a visible 'Undo' toast message."
  },
  {
    title: "Inconsistent Naming Patterns",
    principle: "Consistency & standards",
    severity: "Medium",
    description: "Different teams use different naming conventions for databases and properties, causing confusion.",
    evidence: "75% of users found onboarding to new workspaces insufficient due to inconsistency.",
    before: "'Task Name', 'Name', 'Subject' used interchangeably across databases.",
    after: "Workspace-wide property templates and naming linting."
  },
  {
    title: "Complex Filter Construction",
    principle: "Flexibility & efficiency",
    severity: "High",
    description: "Building complex filters requires understanding boolean logic, which many users struggle with.",
    evidence: "67% felt overwhelmed by defaults and filter options.",
    before: "A list of 'And/Or' conditions that grows vertically and becomes unreadable.",
    after: "Visual query builder with drag-and-drop conditions and natural language previews."
  }
];

const prototypeScreens = [
  { title: "1. Workspace Overview", file: "prototype_screen1_home_1779075956518.png" },
  { title: "2. Database View", file: "prototype_screen2_database_1779075981405.png" },
  { title: "3. Property Management", file: "prototype_screen3_panel_1779076090142.png" },
  { title: "4. Create/Edit Item", file: "prototype_screen4_create_1779076122572.png" },
  { title: "5. Delete Item", file: "prototype_screen5_delete_1779076236789.png" },
  { title: "6. Trash & Recovery", file: "prototype_screen6_trash_1779076259736.png" },
  { title: "7. Navigation Breadcrumb", file: "prototype_screen7_breadcrumb_1779076387384.png" }
];

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const [prototypeIndex, setPrototypeIndex] = useState(0);

  return (
    <div>
      {/* Navigation */}
      <nav className="nav">
        <div className="container flex justify-between items-center">
          <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>HCI Case Study</div>
          <ul className="nav-links">
            {['overview', 'research', 'issues', 'proposal', 'impact', 'prototype'].map((tab) => (
              <li
                key={tab}
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        
        {/* Overview Section */}
        {activeTab === 'overview' && (
          <section className="section">
            <h1 className="text-primary">Notion HCI Redesign Case Study</h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '2rem' }}>
              Analyzing and improving Notion workspaces using Human-Computer Interaction principles to reduce cognitive load and improve efficiency.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="card glass metric-card">
                <div className="metric-value">12</div>
                <div className="metric-label">Research Participants</div>
              </div>
              <div className="card glass metric-card">
                <div className="metric-value">5</div>
                <div className="metric-label">Major Usability Issues Found</div>
              </div>
              <div className="card glass metric-card">
                <div className="metric-value">57%</div>
                <div className="metric-label">Average Improvement</div>
              </div>
            </div>

            <div className="card glass">
              <h3>Research Methodology</h3>
              <p>We conducted moderated usability tests with 12 active Notion users across various skill levels. Participants were asked to perform common tasks such as finding specific data in a large database, navigating to a deeply nested page, and creating a filtered view. We measured task completion time, error rates, and subjective satisfaction.</p>
            </div>
          </section>
        )}

        {/* User Research Section */}
        {activeTab === 'research' && (
          <section className="section">
            <h2>User Research & Personas</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Persona 1 */}
              <div className="card glass">
                <h3>Sarah, Product Manager</h3>
                <p><strong>Usage:</strong> Daily</p>
                <p><strong>Goals:</strong> Track project progress, manage team tasks, and maintain documentation.</p>
                <p><strong>Pain Points:</strong> Overwhelmed by database property bloat; spends too much time finding relevant views.</p>
              </div>
              {/* Persona 2 */}
              <div className="card glass">
                <h3>Dave, Software Engineer</h3>
                <p><strong>Usage:</strong> Weekly</p>
                <p><strong>Goals:</strong> Reference technical docs, update task status.</p>
                <p><strong>Pain Points:</strong> Finds navigation confusing; accidentally deletes blocks without realizing.</p>
              </div>
              {/* Persona 3 */}
              <div className="card glass">
                <h3>Elena, Student</h3>
                <p><strong>Usage:</strong> Occasional</p>
                <p><strong>Goals:</strong> Take notes, organize study materials.</p>
                <p><strong>Pain Points:</strong> Steep learning curve; inconsistent templates across different courses.</p>
              </div>
            </div>

            <div className="card glass bg-primary" style={{ color: 'white' }}>
              <h3>Key Insights</h3>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800 }}>67%</div>
                  <div style={{ opacity: 0.8 }}>Felt overwhelmed by defaults</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800 }}>92%</div>
                  <div style={{ opacity: 0.8 }}>Spent &gt;30 mins searching</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800 }}>58%</div>
                  <div style={{ opacity: 0.8 }}>Experienced data loss</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800 }}>75%</div>
                  <div style={{ opacity: 0.8 }}>Found onboarding insufficient</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Usability Issues Section */}
        {activeTab === 'issues' && (
          <section className="section">
            <h2>Usability Issues</h2>
            <p>We identified 5 major usability issues that violate core HCI principles.</p>
            
            <div className="flex flex-col gap-2">
              {issuesData.map((issue, index) => (
                <div 
                  key={index} 
                  className={`card glass expandable-card ${expandedIssue === index ? 'expanded' : ''}`}
                  onClick={() => setExpandedIssue(expandedIssue === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`badge badge-${issue.severity.toLowerCase()}`} style={{ marginRight: '1rem' }}>{issue.severity}</span>
                      <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{issue.title}</span>
                    </div>
                    <div style={{ opacity: 0.6 }}>{expandedIssue === index ? '▲' : '▼'}</div>
                  </div>
                  
                  <div className="expandable-content">
                    <p><strong>HCI Principle:</strong> {issue.principle}</p>
                    <p><strong>Description:</strong> {issue.description}</p>
                    <p><strong>Evidence:</strong> {issue.evidence}</p>
                    <div className="grid grid-cols-2 gap-2" style={{ marginTop: '1rem' }}>
                      <div className="card" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <h4 className="text-danger">Before</h4>
                        <p style={{ fontSize: '0.875rem' }}>{issue.before}</p>
                      </div>
                      <div className="card" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <h4 className="text-secondary">After</h4>
                        <p style={{ fontSize: '0.875rem' }}>{issue.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Redesign Proposal Section */}
        {activeTab === 'proposal' && (
          <section className="section">
            <h2>Redesign Proposal</h2>
            <p>We applied 6 HCI principles to redesign the Notion experience.</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="card glass">
                <h3>1. Visibility</h3>
                <p>Smart sidebar showing clear workspace hierarchy and current location.</p>
              </div>
              <div className="card glass">
                <h3>2. Simplicity</h3>
                <p>Customizable property visibility to reduce information overload.</p>
              </div>
              <div className="card glass">
                <h3>3. User Control</h3>
                <p>Clear visual hierarchy and easy navigation shortcuts.</p>
              </div>
              <div className="card glass">
                <h3>4. Error Prevention</h3>
                <p>Confirmation dialogs for destructive actions and easy undo.</p>
              </div>
              <div className="card glass">
                <h3>5. Consistency</h3>
                <p>Standardized naming patterns and workspace templates.</p>
              </div>
              <div className="card glass">
                <h3>6. Flexibility</h3>
                <p>Inline tooltips and progressive disclosure for advanced features.</p>
              </div>
            </div>

            <div className="card glass">
              <h3>Key Improvements</h3>
              <ul>
                <li>Smart sidebar with workspace hierarchy</li>
                <li>Customizable property visibility</li>
                <li>Clear visual hierarchy</li>
                <li>Confirmation dialogs for structural changes</li>
                <li>Inline tooltips for complex operations</li>
                <li>Standardized naming patterns</li>
              </ul>
            </div>
          </section>
        )}

        {/* Impact & Results Section */}
        {activeTab === 'impact' && (
          <section className="section">
            <h2>Impact & Results</h2>
            <p>After implementing the redesign, we tested the interface with the same 12 participants.</p>

            <div className="grid grid-cols-4 gap-2 mb-8">
              <div className="card glass metric-card">
                <div className="metric-value">62%</div>
                <div className="metric-label">Faster Completion</div>
                <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>8.5 min → 3.2 min</p>
              </div>
              <div className="card glass metric-card">
                <div className="metric-value">78%</div>
                <div className="metric-label">Error Reduction</div>
                <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>18% → 4%</p>
              </div>
              <div className="card glass metric-card">
                <div className="metric-value">+40%</div>
                <div className="metric-label">Satisfaction</div>
                <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>6.2 → 8.7 / 10</p>
              </div>
              <div className="card glass metric-card">
                <div className="metric-value">47%</div>
                <div className="metric-label">Less Mental Effort</div>
                <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>7.8 → 4.1 / 10</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="card glass">
                <p>"The new sidebar makes it so much easier to find where I am. I don't feel lost anymore."</p>
                <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>— Sarah, Product Manager</div>
              </div>
              <div className="card glass">
                <p>"I love that I can hide the properties I don't use. It makes the page look so much cleaner."</p>
                <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>— Dave, Software Engineer</div>
              </div>
              <div className="card glass">
                <p>"The confirmation dialogs saved me from accidentally deleting my notes twice already."</p>
                <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>— Elena, Student</div>
              </div>
            </div>

            <div className="card glass bg-secondary" style={{ color: 'white', textAlign: 'center' }}>
              <h3>🎉 Success Conclusion</h3>
              <p>The HCI redesign successfully addressed the major usability issues found in the research phase. By applying established principles, we reduced cognitive load and improved efficiency across all tested personas.</p>
            </div>
          </section>
        )}

        {/* Prototype Section */}
        {activeTab === 'prototype' && (
          <section className="section">
            <h2>Interactive Prototype Preview</h2>
            <p>Click through the screens to see the proposed redesign in action.</p>

            <div className="card glass" style={{ padding: '1rem', textAlign: 'center' }}>
              <h3>{prototypeScreens[prototypeIndex].title}</h3>
              <div style={{ margin: '1rem 0' }}>
                <img 
                  src={`/${prototypeScreens[prototypeIndex].file}`} 
                  alt={prototypeScreens[prototypeIndex].title} 
                  style={{ maxWidth: '100%', borderRadius: '0.5rem', border: '1px solid var(--card-border)' }}
                />
              </div>
              <div className="flex justify-between">
                <button 
                  className="card" 
                  style={{ padding: '0.5rem 1rem', cursor: prototypeIndex > 0 ? 'pointer' : 'not-allowed', opacity: prototypeIndex > 0 ? 1 : 0.5 }}
                  onClick={() => setPrototypeIndex(Math.max(0, prototypeIndex - 1))}
                  disabled={prototypeIndex === 0}
                >
                  ◀ Previous
                </button>
                <span style={{ alignSelf: 'center' }}>{prototypeIndex + 1} / {prototypeScreens.length}</span>
                <button 
                  className="card" 
                  style={{ padding: '0.5rem 1rem', cursor: prototypeIndex < prototypeScreens.length - 1 ? 'pointer' : 'not-allowed', opacity: prototypeIndex < prototypeScreens.length - 1 ? 1 : 0.5 }}
                  onClick={() => setPrototypeIndex(Math.min(prototypeScreens.length - 1, prototypeIndex + 1))}
                  disabled={prototypeIndex === prototypeScreens.length - 1}
                >
                  Next ▶
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;

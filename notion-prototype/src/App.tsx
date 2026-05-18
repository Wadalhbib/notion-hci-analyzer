import { useState } from 'react';
import { 
  Home, 
  Database, 
  Trash2, 
  Settings, 
  Plus, 
  Trash, 
  Undo, 
  User, 
  Calendar, 
  Clock, 
  Search, 
  X,
  Filter,
  Columns,
  CheckCircle,
  FileText,
  ChevronDown,
  Star,
  Share2,
  MoreHorizontal,
  Bell,
  PlusSquare,
  ClipboardList,
  Edit,
  AlertTriangle,
  FolderTree,
  BarChart2,
  Folder,
  File,
  Users,
  Target,
  Zap,
  Bookmark,
  Inbox,
  HelpCircle,
  Check
} from 'lucide-react';

interface Task {
  id: string;
  name: string;
  status: string;
  statusColor: string;
  assignee: string;
  priority: string;
  priorityColor: string;
  date: string;
}

const initialTasks: Task[] = [
  { id: '1', name: "Feature A", status: "In Progress", statusColor: "#3b82f6", assignee: "Sarah Chen", priority: "High", priorityColor: "#ef4444", date: "Oct 15, 2024" },
  { id: '2', name: "Feature B", status: "Planned", statusColor: "#10b981", assignee: "David Lee", priority: "Medium", priorityColor: "#f59e0b", date: "Nov 1, 2024" },
  { id: '3', name: "Feature C", status: "Needs Review", statusColor: "#f59e0b", assignee: "Maria Garcia", priority: "High", priorityColor: "#ef4444", date: "Oct 22, 2024" },
  { id: '4', name: "Marketing Plan", status: "In Progress", statusColor: "#3b82f6", assignee: "Alex Kim", priority: "High", priorityColor: "#ef4444", date: "Oct 30, 2024" },
  { id: '5', name: "Design Updates", status: "Backlog", statusColor: "#6b7280", assignee: "Ben Carter", priority: "Medium", priorityColor: "#f59e0b", date: "Dec 5, 2024" },
];

const availableProperties = [
  'Status', 'Name', 'Done', 'Assignee', 'Date Created', 'Priority', 'Due Date', 'Created By', 'Last Updated', 'Tags', 'Files'
];

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [trash, setTrash] = useState<Task[]>([]);
  const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);
  const [visibleProperties, setVisibleProperties] = useState(availableProperties.slice(0, 6));
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (!taskToDelete) return;

    setTasks(tasks.filter(t => t.id !== id));
    setTrash([...trash, taskToDelete]);
    setCurrentView('roadmap');
    setDeleteCandidate(null);
    showToast("Item moved to trash.");
  };

  const handleRecover = (id: string) => {
    const taskToRecover = trash.find(t => t.id === id);
    if (!taskToRecover) return;

    setTrash(trash.filter(t => t.id !== id));
    setTasks([...tasks, taskToRecover]);
    showToast("Item recovered successfully.");
  };

  const handleCreateTask = () => {
    const newTask: Task = {
      id: String(tasks.length + trash.length + 1),
      name: `New Task ${tasks.length + 1}`,
      status: 'Backlog',
      statusColor: '#6b7280',
      assignee: 'Sarah Chen',
      priority: 'Medium',
      priorityColor: '#f59e0b',
      date: 'Oct 24, 2024'
    };
    setTasks([...tasks, newTask]);
    showToast("New task created in Roadmap.");
    setCurrentView('roadmap');
  };

  const renderSidebar = () => (
    <div className="sidebar">
      <div className="sidebar-header">
        <Database size={24} color="#3b82f6" />
        <span>Notion Premium</span>
      </div>

      <div style={{ marginTop: '8px' }}>
        <div className={`sidebar-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
          <Home size={16} /> Dashboard
        </div>
        <div className={`sidebar-item ${currentView === 'inbox' ? 'active' : ''}`} onClick={() => setCurrentView('inbox')}>
          <Inbox size={16} /> Inbox <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '10px', padding: '1px 5px', borderRadius: '10px' }}>3</span>
        </div>
        <div className={`sidebar-item ${currentView === 'updates' ? 'active' : ''}`} onClick={() => setCurrentView('updates')}>
          <Clock size={16} /> All Updates
        </div>
        <div className="sidebar-item" onClick={() => showToast("Settings opened.")}>
          <Settings size={16} /> Settings & Members
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', padding: '0 8px 4px 8px' }}>FAVORITES</div>
        <div className={`sidebar-item ${currentView === 'roadmap' ? 'active' : ''}`} onClick={() => setCurrentView('roadmap')}>
          <Database size={16} color="#8b5cf6" /> Product Roadmap
        </div>
        <div className="sidebar-item" onClick={() => showToast("OKRs view loaded.")}>
          <FileText size={16} color="#10b981" /> OKRs Q3
        </div>
      </div>

      <div style={{ marginTop: '20px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', padding: '0 8px 4px 8px' }}>WORKSPACE</div>
        
        <div className="sidebar-item" style={{ gap: '4px' }} onClick={() => showToast("Projects folder toggled.")}><ChevronDown size={14} /> <Folder size={14} /> Projects</div>
        <div style={{ paddingLeft: '24px' }}>
          <div className="sidebar-item" onClick={() => showToast("Project Alpha opened.")}><File size={14} /> Project Alpha</div>
          <div className="sidebar-item" onClick={() => showToast("Project Beta opened.")}><File size={14} /> Project Beta</div>
        </div>

        <div className={`sidebar-item ${currentView === 'trash' ? 'active' : ''}`} onClick={() => setCurrentView('trash')}>
          <Trash2 size={16} /> Trash
        </div>
        <div className={`sidebar-item ${currentView === 'breadcrumb' ? 'active' : ''}`} onClick={() => setCurrentView('breadcrumb')}>
          <FolderTree size={16} /> Breadcrumb View
        </div>
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
        <div className="sidebar-item" onClick={() => showToast("Help center opened.")}>
          <HelpCircle size={16} /> Help & Support
        </div>
      </div>
    </div>
  );

  const renderTopBar = (title: string) => (
    <div className="top-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.6, fontSize: '0.9rem' }}>
        <Home size={14} /> &gt; {title}
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{ 
              padding: '0.4rem 1rem 0.4rem 2.2rem', 
              borderRadius: '0.5rem', 
              border: '1px solid var(--border-color)', 
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              fontSize: '0.85rem',
              width: '180px'
            }} 
            onChange={() => showToast("Searching...")}
          />
        </div>
        <Bell size={18} style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => showToast("Notifications opened.")} />
        <Star size={18} style={{ cursor: 'pointer', opacity: 0.7 }} onClick={() => showToast("Added to favorites.")} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => showToast("Profile clicked.")}>
          <div style={{ width: 24, height: 24, background: 'var(--primary-gradient)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>S</div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sarah</span>
        </div>
      </div>
    </div>
  );

  // SCREEN 1: DASHBOARD
  const renderDashboard = () => (
    <div className="main-content">
      {renderTopBar("Workspace Overview")}
      <div className="content-area">
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Welcome back, Sarah!</h1>
            <p style={{ color: 'var(--text-muted)' }}>Here is a glance at your workspace.</p>
          </div>
          <button className="btn btn-primary" onClick={handleCreateTask}><Plus size={16} /> New Page</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="metric-card" onClick={() => showToast("Active projects detailed view.")} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE PROJECTS</div>
              <Database size={16} style={{ color: '#3b82f6' }} />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>14 <span style={{ fontSize: '1rem', color: '#10b981' }}>↑ 3%</span></div>
          </div>
          <div className="metric-card" onClick={() => showToast("Open tasks detailed view.")} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>OPEN TASKS</div>
              <CheckCircle size={16} style={{ color: '#10b981' }} />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>89</div>
          </div>
          <div className="metric-card" onClick={() => showToast("Documents folder opened.")} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>DOCUMENTS</div>
              <FileText size={16} style={{ color: '#8b5cf6' }} />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>1,240</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="metric-card">
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Databases</h3>
              <MoreHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => setCurrentView('roadmap')}>
              <div style={{ fontSize: '20px' }}>🗺️</div>
              <div>
                <div style={{ fontWeight: 600 }}>Product Roadmap 2024</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{tasks.length} items · Active</div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-muted)' }}>12/12, 2024</span>
            </div>
          </div>

          <div className="metric-card">
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Quick Actions</h3>
            <button className="btn" style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '8px' }} onClick={handleCreateTask}>
              <PlusSquare size={16} /> Create New Project
            </button>
            <button className="btn" style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '8px' }} onClick={() => showToast("Meeting scheduled for tomorrow at 10 AM.")}>
              <Calendar size={16} /> Schedule Meeting
            </button>
            <button className="btn" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={handleCreateTask}>
              <ClipboardList size={16} /> Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // SCREEN 2: ROADMAP
  const renderRoadmap = () => (
    <div className="main-content">
      {renderTopBar("Product Roadmap")}
      <div className="content-area">
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Product Roadmap</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Track and manage project features.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn" onClick={() => setCurrentView('manageProps')}><Columns size={16} /> Manage Properties</button>
            <button className="btn" onClick={() => showToast("Filter applied.")}><Filter size={16} /> Filter</button>
            <button className="btn btn-primary" onClick={handleCreateTask}><Plus size={16} /> Add Item</button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div className="filter-tag">
            <span style={{ fontSize: '12px', color: '#3b82f6' }}>🎯</span> Status is In Progress <X size={12} style={{ marginLeft: '4px', cursor: 'pointer' }} onClick={() => showToast("Filter removed.")} />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Name</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td style={{ fontWeight: 600 }}>{task.name}</td>
                  <td>
                    <span style={{ 
                      padding: '0.3rem 0.6rem', 
                      borderRadius: '0.5rem', 
                      fontSize: '0.75rem', 
                      fontWeight: 700,
                      background: `${task.statusColor}20`, 
                      color: task.statusColor,
                      border: `1px solid ${task.statusColor}30`
                    }}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 24, height: 24, background: '#374151', borderRadius: '50%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{task.assignee.split(' ').map(n => n[0]).join('')}</div>
                      {task.assignee}
                    </div>
                  </td>
                  <td>
                    <span style={{ color: task.priorityColor, fontWeight: 700, fontSize: '0.9rem' }}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '0.3rem', borderRadius: '0.375rem' }}
                      onClick={() => { setDeleteCandidate(task.id); setCurrentView('deleteConfirm'); }}
                    >
                      <Trash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // SCREEN 3: MANAGE PROPERTIES (Full Page)
  const renderManageProps = () => (
    <div className="main-content">
      {renderTopBar("Manage Properties")}
      <div className="content-area">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Manage Properties</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Select which properties to display in the database view.</p>

        <div className="table-container" style={{ maxWidth: '500px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {availableProperties.map(prop => (
              <div key={prop} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
                <input 
                  type="checkbox" 
                  checked={visibleProperties.includes(prop)}
                  style={{ accentColor: '#3b82f6', width: '16px', height: '16px' }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setVisibleProperties([...visibleProperties, prop]);
                    } else {
                      setVisibleProperties(visibleProperties.filter(p => p !== prop));
                    }
                  }}
                />
                <span style={{ fontSize: '0.95rem' }}>{prop}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => { setCurrentView('roadmap'); showToast("Properties updated."); }}>
          Save and Return
        </button>
      </div>
    </div>
  );

  // NEW VIEW: INBOX
  const renderInbox = () => (
    <div className="main-content">
      {renderTopBar("Inbox")}
      <div className="content-area">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Inbox</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You have 3 unread notifications.</p>

        <div className="table-container" style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Sarah Chen mentioned you in "Design Updates"</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>"Please review the new layout." · 2 hours ago</div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Task assigned: "Marketing Plan"</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Due Oct 30, 2024 · 5 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // NEW VIEW: UPDATES
  const renderUpdates = () => (
    <div className="main-content">
      {renderTopBar("All Updates")}
      <div className="content-area">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>All Updates</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Recent activity in your workspace.</p>

        <div className="table-container" style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, background: '#3b82f6', borderRadius: '50%' }}></div>
              <div>
                <div style={{ fontWeight: 600 }}>You edited "Product Roadmap"</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Added 2 new items · Just now</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%' }}></div>
              <div>
                <div style={{ fontWeight: 600 }}>Sarah Chen completed task "Feature B"</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Marked as Planned · 1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // REST OF THE VIEWS (TRASH, BREADCRUMB, etc.)
  const renderTrash = () => (
    <div className="main-content">
      {renderTopBar("Trash")}
      <div className="content-area">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Trash</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Items deleted within the last 30 days are listed here for recovery.</p>

        {trash.length === 0 ? (
          <div className="table-container" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <Trash2 size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>Trash is empty.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trash.map(task => (
                  <tr key={task.id}>
                    <td style={{ fontWeight: 600 }}>{task.name}</td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleRecover(task.id)}>
                        <Undo size={14} /> Recover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderBreadcrumb = () => (
    <div className="main-content">
      {renderTopBar("Breadcrumb View")}
      <div className="content-area">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Navigation Hierarchy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>This view demonstrates the flattened navigation structure.</p>

        <div className="table-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            <Home size={20} color="#3b82f6" /> Workspace
            <span style={{ opacity: 0.5 }}>/</span>
            <Database size={20} color="#8b5cf6" /> Product Team
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ fontWeight: 700 }}>Product Roadmap</span>
          </div>
          
          <div className="metric-card" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Current Page: Product Roadmap</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Access this page directly from the sidebar instead of clicking through 4 levels.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeleteConfirm = () => (
    <div className="main-content">
      {renderTopBar("Delete Confirmation")}
      <div className="content-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', marginBottom: '1rem' }}>
          <AlertTriangle size={32} />
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Move to trash?</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Are you sure you want to move this item to the trash? You can recover it within 30 days.</p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-danger" onClick={() => deleteCandidate && handleDelete(deleteCandidate)}>
            Yes, Move to Trash
          </button>
          <button className="btn" onClick={() => setCurrentView('roadmap')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {renderSidebar()}
      
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'roadmap' && renderRoadmap()}
      {currentView === 'manageProps' && renderManageProps()}
      {currentView === 'createItem' && renderCreateTask()} 
      {currentView === 'deleteConfirm' && renderDeleteConfirm()}
      {currentView === 'trash' && renderTrash()}
      {currentView === 'breadcrumb' && renderBreadcrumb()}
      {currentView === 'inbox' && renderInbox()}
      {currentView === 'updates' && renderUpdates()}

      {/* Toast Notification */}
      {toast && (
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          background: '#1f2937', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: '8px', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2000,
          border: '1px solid var(--border-color)'
        }}>
          <Check size={16} style={{ color: '#10b981' }} />
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;

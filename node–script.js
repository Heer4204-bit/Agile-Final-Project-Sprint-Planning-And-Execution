<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Agile Final Project – Sprint Planning & Execution</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
          },
          colors: {
            gh: {
              canvas: '#0d1117',
              subtle: '#161b22',
              inset: '#010409',
              overlay: '#1f242c',
              border: '#30363d',
              borderMuted: '#21262d',
              text: '#e6edf3',
              muted: '#8b949e',
              accent: '#2f81f7',
              accentHover: '#388bfd',
              success: '#238636',
              successText: '#3fb950',
              warning: '#9e6a03',
              warningText: '#d29922',
              danger: '#da3633',
              dangerText: '#f85149',
              purple: '#8957e5',
              purpleText: '#a371f7'
            }
          }
        }
      }
    };
  </script>
  <style>
    /* Custom scrollbar & subtle GitHub-like refinements */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0d1117;
    }
    ::-webkit-scrollbar-thumb {
      background: #30363d;
      border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #484f58;
    }

    .drag-over {
      outline: 2px dashed #2f81f7;
      outline-offset: -2px;
      background-color: rgba(47, 129, 247, 0.08) !important;
    }

    .card-dragging {
      opacity: 0.55;
      transform: scale(0.98);
    }

    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-in {
      animation: fadeSlideIn 0.2s ease-out forwards;
    }
  </style>
</head>
<body class="bg-gh-canvas text-gh-text font-sans antialiased min-h-screen flex flex-col selection:bg-gh-accent/30 selection:text-white">

  <!-- Toast / Status Banner Container (replaces alert/confirm) -->
  <div id="toast-container" class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none"></div>

  <!-- Top GitHub Global Header Bar -->
  <header class="bg-gh-subtle border-b border-gh-border sticky top-0 z-30">
    <div class="max-w-[1600px] mx-auto px-3 sm:px-6 pt-3">
      <!-- Top Row: Brand, Repo Path, Quick Actions -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-3">
        <div class="flex items-center gap-2 sm:gap-3 min-w-0">
          <!-- Octocat-inspired SVG Mark -->
          <div class="w-8 h-8 rounded-full bg-gh-overlay border border-gh-border flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-gh-text" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </div>

          <div class="flex items-center flex-wrap gap-1.5 text-sm sm:text-base truncate">
            <a href="#owner" onclick="event.preventDefault(); switchTab('projects');" class="text-gh-accent hover:underline font-medium">agile-capstone-org</a>
            <span class="text-gh-muted">/</span>
            <a href="#repo" onclick="event.preventDefault(); switchTab('projects');" class="text-gh-accent hover:underline font-semibold">agile-final-project</a>
            <span class="ml-1.5 px-2 py-0.5 text-xs font-medium rounded-full border border-gh-border text-gh-muted bg-gh-canvas">Public</span>
          </div>
        </div>

        <!-- Right Header Controls: Sprint Day Selector, Reset Demo, Save State Indicator -->
        <div class="flex items-center gap-2 flex-wrap">
          <div class="flex items-center gap-1.5 bg-gh-canvas border border-gh-border rounded-md px-2.5 py-1 text-xs">
            <span class="text-gh-muted">Sprint Day:</span>
            <select id="sprint-day-select" onchange="updateSprintDay(this.value)" class="bg-gh-subtle text-gh-text font-mono font-semibold rounded px-1.5 py-0.5 border border-gh-border focus:outline-none focus:border-gh-accent cursor-pointer">
              <option value="1">Day 1</option>
              <option value="2">Day 2</option>
              <option value="3">Day 3</option>
              <option value="4">Day 4</option>
              <option value="5">Day 5</option>
              <option value="6">Day 6</option>
              <option value="7">Day 7</option>
              <option value="8">Day 8</option>
              <option value="9">Day 9</option>
              <option value="10">Day 10</option>
            </select>
          </div>

          <button onclick="resetDemoData()" class="px-3 py-1.5 text-xs font-medium rounded-md bg-gh-subtle hover:bg-gh-overlay text-gh-text border border-gh-border transition flex items-center gap-1.5 cursor-pointer" title="Restore all 7 issues, user stories, sprint capacity, and burndown state">
            <svg class="w-3.5 h-3.5 text-gh-warningText" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Demo Data
          </button>
        </div>
      </div>

      <!-- Repo KPI Strip -->
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 text-xs text-gh-muted border-b border-gh-borderMuted">
        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-gh-successText"></span>
            <strong id="kpi-sprint-name" class="text-gh-text font-medium">Sprint 1: Core Delivery & QA</strong>
          </span>
          <span>•</span>
          <span>Target Capacity: <strong id="kpi-capacity" class="text-gh-text font-mono">34 SP</strong></span>
          <span>•</span>
          <span>Committed: <strong id="kpi-committed" class="text-gh-accent font-mono">0 SP</strong></span>
          <span>•</span>
          <span>Completed: <strong id="kpi-completed" class="text-gh-successText font-mono">0 SP</strong></span>
          <span>•</span>
          <span>Remaining: <strong id="kpi-remaining" class="text-gh-warningText font-mono">0 SP</strong></span>
        </div>
        <div class="text-xs text-gh-muted">
          Auto-saved locally • <span id="kpi-issue-count" class="font-mono text-gh-text">7 Issues (#101–#107)</span>
        </div>
      </div>

      <!-- GitHub Repository Navigation Tabs -->
      <nav class="flex items-center gap-1 overflow-x-auto pt-1 -mb-px" aria-label="Repository navigation">
        <button id="tab-code" onclick="switchTab('code')" class="nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm border-b-2 border-transparent text-gh-muted hover:text-gh-text transition cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span>Code</span>
        </button>

        <button id="tab-issues" onclick="switchTab('issues')" class="nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm border-b-2 border-transparent text-gh-muted hover:text-gh-text transition cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
          <span>Issues</span>
          <span id="badge-issues-open" class="px-1.5 py-0.5 text-xs font-mono rounded-full bg-gh-overlay text-gh-text border border-gh-border">7</span>
        </button>

        <button id="tab-pulls" onclick="switchTab('pulls')" class="nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm border-b-2 border-transparent text-gh-muted hover:text-gh-text transition cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="18" r="3" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 9v12M18 3v12" />
          </svg>
          <span>Pull requests</span>
          <span class="px-1.5 py-0.5 text-xs font-mono rounded-full bg-gh-overlay text-gh-muted border border-gh-border">3</span>
        </button>

        <button id="tab-actions" onclick="switchTab('actions')" class="nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm border-b-2 border-transparent text-gh-muted hover:text-gh-text transition cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <circle cx="12" cy="12" r="9" />
          </svg>
          <span>Actions</span>
        </button>

        <!-- Featured / Active Default Projects Tab -->
        <button id="tab-projects" onclick="switchTab('projects')" class="nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold border-b-2 border-[#f78166] text-gh-text transition cursor-pointer">
          <svg class="w-4 h-4 text-[#f78166]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path stroke-linecap="round" d="M9 4v16M15 4v16" />
          </svg>
          <span>Projects</span>
          <span class="px-1.5 py-0.5 text-[11px] font-mono rounded-full bg-[#f78166]/15 text-[#f78166] border border-[#f78166]/40">Active Board</span>
        </button>
      </nav>
    </div>
  </header>

  <!-- Main Content Container -->
  <main class="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 py-5 space-y-6">

    <!-- ===================================================================== -->
    <!-- VIEW 1: GITHUB PROJECTS TAB (Default Active View)                      -->
    <!-- ===================================================================== -->
    <section id="view-projects" class="space-y-6 animate-in">
      <!-- Project Header & Sub-View Switcher -->
      <div class="bg-gh-subtle border border-gh-border rounded-xl p-4 sm:p-5">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div class="flex items-center flex-wrap gap-2">
              <span class="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-gh-purple/20 text-gh-purpleText border border-gh-purple/40">GitHub Project #1</span>
              <h1 class="text-lg sm:text-xl font-bold text-gh-text">Agile Final Project – Sprint Planning & Execution</h1>
            </div>
            <p class="text-sm text-gh-muted mt-1">
              Unified agile workspace linking <span class="text-gh-text font-medium">7 GitHub Issues (#101–#107)</span>, <span class="text-gh-text font-medium">User Stories</span>, <span class="text-gh-text font-medium">Sprint Capacity</span>, <span class="text-gh-text font-medium">Kanban Workflow</span>, and live <span class="text-gh-text font-medium">Burndown Telemetry</span>.
            </p>
          </div>

          <!-- Project View Switcher: Board | Table | Roadmap -->
          <div class="inline-flex rounded-lg bg-gh-canvas p-1 border border-gh-border self-start lg:self-auto">
            <button id="proj-subview-board" onclick="setProjectSubview('board')" class="proj-subview-btn px-3 py-1.5 text-xs font-medium rounded-md bg-gh-overlay text-gh-text shadow-sm transition cursor-pointer">
              Board View
            </button>
            <button id="proj-subview-table" onclick="setProjectSubview('table')" class="proj-subview-btn px-3 py-1.5 text-xs font-medium rounded-md text-gh-muted hover:text-gh-text transition cursor-pointer">
              Table View
            </button>
            <button id="proj-subview-roadmap" onclick="setProjectSubview('roadmap')" class="proj-subview-btn px-3 py-1.5 text-xs font-medium rounded-md text-gh-muted hover:text-gh-text transition cursor-pointer">
              Roadmap View
            </button>
          </div>
        </div>

        <!-- Project Filter & Group Bar -->
        <div class="mt-4 pt-4 border-t border-gh-borderMuted flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2 flex-1">
            <div class="relative flex-1 min-w-[200px] max-w-md">
              <input id="project-search" oninput="renderAllViews()" type="text" placeholder="Filter by #101-#107, title, user story, assignee..." class="w-full bg-gh-canvas border border-gh-border rounded-md pl-8 pr-3 py-1.5 text-xs text-gh-text placeholder-gh-muted focus:outline-none focus:border-gh-accent" />
              <svg class="w-4 h-4 text-gh-muted absolute left-2.5 top-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path stroke-linecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </div>

            <select id="project-filter-label" onchange="renderAllViews()" class="bg-gh-canvas border border-gh-border rounded-md px-2.5 py-1.5 text-xs text-gh-text focus:outline-none focus:border-gh-accent cursor-pointer">
              <option value="ALL">All Labels</option>
              <option value="epic">epic</option>
              <option value="frontend">frontend</option>
              <option value="backend">backend</option>
              <option value="qa">qa</option>
              <option value="sprint-1">sprint-1</option>
              <option value="bug">bug</option>
              <option value="ux">ux</option>
            </select>

            <select id="project-filter-sprint" onchange="renderAllViews()" class="bg-gh-canvas border border-gh-border rounded-md px-2.5 py-1.5 text-xs text-gh-text focus:outline-none focus:border-gh-accent cursor-pointer">
              <option value="ALL">All Sprints</option>
              <option value="Sprint 1">Sprint 1 (Active)</option>
              <option value="Backlog">Product Backlog</option>
            </select>

            <button onclick="clearProjectFilters()" class="px-2.5 py-1.5 text-xs text-gh-muted hover:text-gh-text border border-gh-border rounded-md bg-gh-canvas transition cursor-pointer">
              Clear Filters
            </button>
          </div>

          <div class="flex items-center gap-2 text-xs text-gh-muted">
            <span>Custom Fields:</span>
            <span class="px-2 py-0.5 rounded bg-gh-canvas border border-gh-border text-gh-text font-mono">Sprint</span>
            <span class="px-2 py-0.5 rounded bg-gh-canvas border border-gh-border text-gh-text font-mono">Story Points</span>
            <span class="px-2 py-0.5 rounded bg-gh-canvas border border-gh-border text-gh-text font-mono">Priority</span>
          </div>
        </div>
      </div>

      <!-- SUBVIEW A: KANBAN BOARD VIEW (Default inside Projects) -->
      <div id="subview-board" class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 class="text-base font-semibold text-gh-text flex items-center gap-2">
              <span>Kanban Workflow Board</span>
              <span class="text-xs font-normal text-gh-muted">(Drag cards across columns or use quick-move arrows)</span>
            </h2>
          </div>
          <div id="kanban-summary-pills" class="flex flex-wrap items-center gap-2 text-xs font-mono"></div>
        </div>

        <!-- 5 Kanban Columns -->
        <div id="kanban-board-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-start"></div>
      </div>

      <!-- SUBVIEW B: GITHUB PROJECTS TABLE VIEW -->
      <div id="subview-table" class="hidden bg-gh-subtle border border-gh-border rounded-xl overflow-hidden">
        <div class="p-4 border-b border-gh-border flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 class="text-base font-semibold text-gh-text">GitHub Projects Custom Field Table</h2>
            <p class="text-xs text-gh-muted">Edit Story Points, Sprint assignment, Status, or Priority inline — changes sync everywhere.</p>
          </div>
          <span id="table-total-sp" class="text-xs font-mono px-2.5 py-1 rounded bg-gh-canvas border border-gh-border text-gh-accent"></span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr class="bg-gh-canvas/80 border-b border-gh-border text-gh-muted text-xs uppercase tracking-wider">
                <th class="py-3 px-3">Issue</th>
                <th class="py-3 px-3">Title & User Story</th>
                <th class="py-3 px-3">Kanban Status</th>
                <th class="py-3 px-3">Sprint</th>
                <th class="py-3 px-3">Priority</th>
                <th class="py-3 px-3">Story Pts</th>
                <th class="py-3 px-3">Assignee</th>
                <th class="py-3 px-3">Issue State</th>
              </tr>
            </thead>
            <tbody id="project-table-body" class="divide-y divide-gh-borderMuted"></tbody>
          </table>
        </div>
      </div>

      <!-- SUBVIEW C: ROADMAP / TIMELINE VIEW -->
      <div id="subview-roadmap" class="hidden bg-gh-subtle border border-gh-border rounded-xl p-4 sm:p-5 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 class="text-base font-semibold text-gh-text">Sprint 1 & Release Roadmap (Days 1–10)</h2>
            <p class="text-xs text-gh-muted">Milestone pacing across engineering, UX, backend APIs, and QA verification.</p>
          </div>
          <span class="text-xs font-mono text-gh-successText bg-gh-success/15 border border-gh-success/30 px-2.5 py-1 rounded">Release Window: 2-Week Sprint</span>
        </div>
        <div id="roadmap-container" class="space-y-3"></div>
      </div>

      <!-- SPRINT PLANNING & BURNDOWN WORKBENCH (Side-by-Side on Desktop) -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <!-- Sprint Planning & Story Points Panel (5 cols) -->
        <div class="xl:col-span-5 bg-gh-subtle border border-gh-border rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div class="space-y-4">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h2 class="text-base font-semibold text-gh-text flex items-center gap-2">
                  <span>Sprint Planning & Story Points</span>
                </h2>
                <p class="text-xs text-gh-muted mt-0.5">Balance committed story points against sprint capacity and adjust estimates.</p>
              </div>
              <span class="px-2 py-0.5 text-xs font-mono rounded bg-gh-accent/15 text-gh-accent border border-gh-accent/30">Fibonacci SP</span>
            </div>

            <!-- Sprint Goal Box -->
            <div class="bg-gh-canvas border border-gh-border rounded-lg p-3">
              <div class="text-[11px] font-semibold uppercase tracking-wider text-gh-muted">Active Sprint Goal</div>
              <p class="text-xs sm:text-sm text-gh-text mt-1">
                Deliver core authentication, real-time task board APIs, responsive Kanban UX, and automated regression suite within <strong class="font-mono text-gh-accent">34 Story Points</strong>.
              </p>
            </div>

            <!-- Capacity Meter -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gh-muted">Sprint Capacity Allocation</span>
                <div class="flex items-center gap-2">
                  <label for="sprint-capacity-input" class="text-gh-muted">Target:</label>
                  <input id="sprint-capacity-input" type="number" min="5" max="100" step="1" onchange="updateSprintCapacity(this.value)" class="w-16 bg-gh-canvas border border-gh-border rounded px-2 py-0.5 text-right font-mono text-gh-text focus:outline-none focus:border-gh-accent" />
                  <span class="font-mono text-gh-muted">SP</span>
                </div>
              </div>

              <div class="w-full h-3 rounded-full bg-gh-canvas border border-gh-border overflow-hidden flex">
                <div id="cap-bar-done" class="bg-gh-successText h-full transition-all duration-300" title="Completed SP"></div>
                <div id="cap-bar-committed" class="bg-gh-accent h-full transition-all duration-300" title="Remaining Committed Sprint SP"></div>
              </div>

              <div id="capacity-stats-text" class="flex flex-wrap justify-between gap-2 text-xs font-mono text-gh-muted"></div>
            </div>

            <!-- Sprint Issues Allocation List -->
            <div class="space-y-2">
              <div class="text-xs font-semibold text-gh-muted uppercase tracking-wider">Issues & Story Point Controls (#101–#107)</div>
              <div id="sprint-planner-list" class="space-y-2 max-h-[340px] overflow-y-auto pr-1"></div>
            </div>
          </div>
        </div>

        <!-- Interactive Burndown Chart Panel (7 cols) -->
        <div class="xl:col-span-7 bg-gh-subtle border border-gh-border rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 class="text-base font-semibold text-gh-text flex items-center gap-2">
                <span>Interactive Sprint Burndown Chart</span>
              </h2>
              <p class="text-xs text-gh-muted mt-0.5">
                Hover over any day node to inspect Ideal vs. Actual remaining story points. Completing Kanban cards or closing issues updates actual burn live.
              </p>
            </div>
            <div class="flex items-center gap-4 text-xs">
              <span class="flex items-center gap-1.5 text-gh-muted">
                <span class="w-3 h-0.5 bg-gh-muted inline-block border-t border-dashed"></span>
                Ideal Burn
              </span>
              <span class="flex items-center gap-1.5 text-gh-text font-medium">
                <span class="w-3 h-1 rounded bg-gh-accent inline-block"></span>
                Actual Remaining SP
              </span>
            </div>
          </div>

          <!-- SVG Chart Wrapper -->
          <div class="relative bg-gh-canvas border border-gh-border rounded-lg p-3">
            <svg id="burndown-svg" viewBox="0 0 760 320" class="w-full h-auto select-none overflow-visible" role="img" aria-label="Sprint Burndown Chart"></svg>
            <!-- Floating Tooltip -->
            <div id="burndown-tooltip" class="hidden pointer-events-none absolute z-20 bg-gh-overlay border border-gh-border rounded-lg px-3 py-2 text-xs shadow-xl"></div>
          </div>

          <!-- Burndown Quick Telemetry Footer -->
          <div id="burndown-metrics" class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs"></div>
        </div>
      </div>

      <!-- PRODUCT BACKLOG & USER STORIES SECTION -->
      <div class="bg-gh-subtle border border-gh-border rounded-xl p-4 sm:p-5 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gh-borderMuted pb-4">
          <div>
            <h2 class="text-base font-semibold text-gh-text">Product Backlog & Structured User Stories</h2>
            <p class="text-xs text-gh-muted mt-0.5">
              User stories (<span class="font-mono text-gh-text">As a [role], I want [feature], so that [value]</span>) with interactive Acceptance Criteria checklists and one-click Sprint / Backlog movement.
            </p>
          </div>

          <div class="flex items-center gap-2 text-xs">
            <label for="backlog-sort" class="text-gh-muted">Sort by:</label>
            <select id="backlog-sort" onchange="renderBacklogAndStories()" class="bg-gh-canvas border border-gh-border rounded-md px-2.5 py-1.5 text-gh-text focus:outline-none focus:border-gh-accent cursor-pointer">
              <option value="id-asc">Issue # (#101 → #107)</option>
              <option value="priority">Priority (Critical → Low)</option>
              <option value="points-desc">Story Points (High → Low)</option>
              <option value="sprint">Sprint Assignment</option>
            </select>
          </div>
        </div>

        <div id="user-stories-list" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- VIEW 2: GITHUB ISSUES TAB (#101 through #107)                        -->
    <!-- ===================================================================== -->
    <section id="view-issues" class="hidden space-y-4 animate-in">
      <div class="bg-gh-subtle border border-gh-border rounded-xl overflow-hidden">
        <!-- Issues Toolbar -->
        <div class="p-4 bg-gh-canvas/70 border-b border-gh-border flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <button onclick="setIssuesStateFilter('ALL')" id="filter-state-ALL" class="issue-state-btn px-3 py-1 rounded-md text-xs font-medium bg-gh-overlay text-gh-text border border-gh-border cursor-pointer">
              All (<span id="count-issues-all">7</span>)
            </button>
            <button onclick="setIssuesStateFilter('Open')" id="filter-state-Open" class="issue-state-btn px-3 py-1 rounded-md text-xs font-medium text-gh-muted hover:text-gh-text border border-transparent cursor-pointer">
              Open (<span id="count-issues-open">0</span>)
            </button>
            <button onclick="setIssuesStateFilter('In Progress')" id="filter-state-In Progress" class="issue-state-btn px-3 py-1 rounded-md text-xs font-medium text-gh-muted hover:text-gh-text border border-transparent cursor-pointer">
              In Progress (<span id="count-issues-progress">0</span>)
            </button>
            <button onclick="setIssuesStateFilter('Closed')" id="filter-state-Closed" class="issue-state-btn px-3 py-1 rounded-md text-xs font-medium text-gh-muted hover:text-gh-text border border-transparent cursor-pointer">
              Closed (<span id="count-issues-closed">0</span>)
            </button>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <input id="issues-search" oninput="renderIssuesTab()" type="text" placeholder="Search issues #101-#107..." class="bg-gh-canvas border border-gh-border rounded-md px-3 py-1.5 text-xs text-gh-text placeholder-gh-muted focus:outline-none focus:border-gh-accent w-full sm:w-60" />
            <select id="issues-label-filter" onchange="renderIssuesTab()" class="bg-gh-canvas border border-gh-border rounded-md px-2.5 py-1.5 text-xs text-gh-text focus:outline-none focus:border-gh-accent cursor-pointer">
              <option value="ALL">Label: All</option>
              <option value="epic">epic</option>
              <option value="frontend">frontend</option>
              <option value="backend">backend</option>
              <option value="qa">qa</option>
              <option value="sprint-1">sprint-1</option>
              <option value="bug">bug</option>
              <option value="ux">ux</option>
            </select>
          </div>
        </div>

        <!-- Issues Rows -->
        <div id="issues-list-container" class="divide-y divide-gh-borderMuted"></div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- VIEW 3: CODE TAB                                                      -->
    <!-- ===================================================================== -->
    <section id="view-code" class="hidden space-y-4 animate-in">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-8 bg-gh-subtle border border-gh-border rounded-xl overflow-hidden">
          <div class="px-4 py-3 bg-gh-canvas/70 border-b border-gh-border flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-gh-accent/15 text-gh-accent font-mono">main</span>
              <span class="text-gh-muted font-mono">agile-sprint-config.json</span>
            </div>
            <span class="text-gh-muted">Latest commit <code class="text-gh-text">8f4e21c</code> • 14 mins ago</span>
          </div>
          <pre class="p-4 text-xs font-mono text-gh-text overflow-x-auto leading-relaxed"><code>{
  "project": "Agile Final Project – Sprint Planning & Execution",
  "repository": "agile-capstone-org/agile-final-project",
  "activeSprint": {
    "name": "Sprint 1: Core Delivery & QA",
    "durationDays": 10,
    "targetCapacitySP": 34,
    "workflowStages": ["Backlog", "To Do / Ready", "In Progress", "In Review", "Done"]
  },
  "trackedIssues": ["#101", "#102", "#103", "#104", "#105", "#106", "#107"],
  "ceremonies": [
    "Product Backlog Refinement",
    "Sprint Planning & Fibonacci Estimation",
    "Daily Standup & Kanban Flow",
    "Sprint Review & Burndown Retrospective"
  ]
}</code></pre>
        </div>

        <div class="lg:col-span-4 bg-gh-subtle border border-gh-border rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-gh-text">Repository Agile Artifacts</h3>
          <p class="text-xs text-gh-muted leading-relaxed">
            This repository documents end-to-end scrum & kanban execution for the Agile Final Project. Jump directly into the live interactive board or inspect the 7 tracked issues.
          </p>
          <div class="space-y-2 pt-1">
            <button onclick="switchTab('projects')" class="w-full py-2 px-3 rounded-md bg-gh-accent hover:bg-gh-accentHover text-white text-xs font-medium transition cursor-pointer">
              Open GitHub Projects Board
            </button>
            <button onclick="switchTab('issues')" class="w-full py-2 px-3 rounded-md bg-gh-canvas hover:bg-gh-overlay text-gh-text border border-gh-border text-xs font-medium transition cursor-pointer">
              View All 7 Issues (#101–#107)
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- VIEW 4: PULL REQUESTS TAB                                             -->
    <!-- ===================================================================== -->
    <section id="view-pulls" class="hidden space-y-3 animate-in">
      <div class="bg-gh-subtle border border-gh-border rounded-xl p-4 sm:p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-semibold text-gh-text">Sprint Pull Requests Linked to Issues</h2>
          <span class="text-xs font-mono text-gh-muted">3 Active PRs</span>
        </div>
        <div class="divide-y divide-gh-borderMuted text-xs sm:text-sm">
          <div class="py-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-gh-successText font-mono font-semibold mr-2">PR #42</span>
              <span class="font-medium text-gh-text">feat(auth): implement JWT session refresh & role guard</span>
              <div class="text-xs text-gh-muted mt-0.5">Closes <button onclick="openIssueDetail(101)" class="text-gh-accent hover:underline font-mono">#101</button> • opened by @priya-dev</div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs bg-gh-success/15 text-gh-successText border border-gh-success/30">Ready for Review</span>
          </div>
          <div class="py-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-gh-purpleText font-mono font-semibold mr-2">PR #45</span>
              <span class="font-medium text-gh-text">feat(kanban): add drag-and-drop WIP column transitions</span>
              <div class="text-xs text-gh-muted mt-0.5">Linked to <button onclick="openIssueDetail(103)" class="text-gh-accent hover:underline font-mono">#103</button> • opened by @arjun-ui</div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs bg-gh-purple/15 text-gh-purpleText border border-gh-purple/30">Merged</span>
          </div>
          <div class="py-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-gh-successText font-mono font-semibold mr-2">PR #48</span>
              <span class="font-medium text-gh-text">test(e2e): add Playwright regression checks for sprint burndown</span>
              <div class="text-xs text-gh-muted mt-0.5">Linked to <button onclick="openIssueDetail(106)" class="text-gh-accent hover:underline font-mono">#106</button> • opened by @neha-qa</div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs bg-gh-warning/15 text-gh-warningText border border-gh-warning/30">Checks Running</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================================================== -->
    <!-- VIEW 5: ACTIONS TAB                                                   -->
    <!-- ===================================================================== -->
    <section id="view-actions" class="hidden space-y-3 animate-in">
      <div class="bg-gh-subtle border border-gh-border rounded-xl p-4 sm:p-5 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-semibold text-gh-text">CI/CD & Agile Automation Workflows</h2>
            <p class="text-xs text-gh-muted">Automated checks validating story point labels, PR links, and unit/integration test suites.</p>
          </div>
          <button onclick="runMockWorkflow()" class="px-3 py-1.5 rounded-md bg-gh-success hover:bg-gh-success/90 text-white text-xs font-medium transition cursor-pointer">
            Trigger Sprint Check Workflow
          </button>
        </div>

        <div id="actions-runs-list" class="divide-y divide-gh-borderMuted text-xs sm:text-sm">
          <div class="py-3 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-gh-successText"></span>
              <div>
                <div class="font-medium text-gh-text">Agile Story Point & Issue Hygiene Check</div>
                <div class="text-xs text-gh-muted">Verified #101–#107 Fibonacci estimates & sprint tags • 18s</div>
              </div>
            </div>
            <span class="font-mono text-xs text-gh-successText">Success</span>
          </div>
          <div class="py-3 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-gh-successText"></span>
              <div>
                <div class="font-medium text-gh-text">Frontend & API Unit Test Suite</div>
                <div class="text-xs text-gh-muted">48/48 specs passed • coverage 91.4% • 42s</div>
              </div>
            </div>
            <span class="font-mono text-xs text-gh-successText">Success</span>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- ===================================================================== -->
  <!-- ISSUE DETAIL & COMMENTS MODAL                                         -->
  <!-- ===================================================================== -->
  <div id="issue-modal" class="fixed inset-0 z-50 hidden bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
    <div class="bg-gh-subtle border border-gh-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in">
      <div class="p-4 sm:p-5 border-b border-gh-border flex items-start justify-between gap-3 sticky top-0 bg-gh-subtle z-10">
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span id="modal-issue-number" class="font-mono text-sm font-bold text-gh-accent">#101</span>
            <span id="modal-issue-state-badge" class="px-2 py-0.5 text-xs font-medium rounded-full"></span>
            <span id="modal-issue-sp-badge" class="px-2 py-0.5 text-xs font-mono rounded bg-gh-canvas border border-gh-border text-gh-text"></span>
          </div>
          <h3 id="modal-issue-title" class="text-base sm:text-lg font-bold text-gh-text mt-1"></h3>
        </div>
        <button onclick="closeIssueModal()" class="p-1.5 rounded-md text-gh-muted hover:text-gh-text hover:bg-gh-overlay transition cursor-pointer" aria-label="Close modal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div id="modal-issue-body" class="p-4 sm:p-5 space-y-4 text-xs sm:text-sm"></div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="border-t border-gh-border bg-gh-subtle py-4 px-4 sm:px-6 text-xs text-gh-muted mt-8">
    <div class="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
      <span>Agile Final Project – Sprint Planning & Execution • Live Synchronized Workspace</span>
      <span>Built with HTML5, Tailwind CSS & Vanilla JS • Zero External Dependencies</span>
    </div>
  </footer>

  <script>
    /**
     * =========================================================================
     * STATE ARCHITECTURE & DEFAULT DATASET (7 ISSUES #101 - #107)
     * =========================================================================
     */
    const STORAGE_KEY = 'agile_final_project_state_v1';

    const KANBAN_COLUMNS = [
      { id: 'Backlog', label: 'Backlog', dotClass: 'bg-gh-muted' },
      { id: 'To Do / Ready', label: 'To Do / Ready', dotClass: 'bg-gh-accent' },
      { id: 'In Progress', label: 'In Progress', dotClass: 'bg-gh-warningText' },
      { id: 'In Review', label: 'In Review', dotClass: 'bg-gh-purpleText' },
      { id: 'Done', label: 'Done', dotClass: 'bg-gh-successText' }
    ];

    const FIBONACCI_POINTS = [1, 2, 3, 5, 8, 13];

    const LABEL_STYLES = {
      'epic': 'bg-gh-purple/20 text-gh-purpleText border-gh-purple/40',
      'frontend': 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      'backend': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      'qa': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      'sprint-1': 'bg-gh-accent/15 text-gh-accent border-gh-accent/30',
      'bug': 'bg-gh-danger/20 text-gh-dangerText border-gh-danger/40',
      'ux': 'bg-pink-500/15 text-pink-300 border-pink-500/30'
    };

    function createInitialState() {
      return {
        activeTab: 'projects',
        projectSubview: 'board',
        issueStateFilter: 'ALL',
        sprintName: 'Sprint 1: Core Delivery & QA',
        sprintCapacity: 34,
        sprintDurationDays: 10,
        currentSprintDay: 6, // Day 6 of 10 by default so burndown shows realistic progress
        // Day-by-day logged completion deltas (SP completed on each day)
        // We compute actual remaining dynamically from current completed SP + historical day progression
        dayBurnOffsets: {
          1: 2,
          2: 5,
          3: 9,
          4: 13,
          5: 18,
          6: 21,
          7: 21,
          8: 21,
          9: 21,
          10: 21
        },
        issues: [
          {
            id: 101,
            title: 'Implement OAuth2 & JWT Role-Based Access Control',
            status: 'Closed', // 'Open' | 'In Progress' | 'Closed'
            kanbanColumn: 'Done', // 'Backlog' | 'To Do / Ready' | 'In Progress' | 'In Review' | 'Done'
            sprint: 'Sprint 1',
            priority: 'Critical',
            storyPoints: 5,
            assignee: '@priya-dev',
            labels: ['backend', 'sprint-1', 'epic'],
            userStory: {
              role: 'Project Member & Scrum Master',
              feature: 'sign in securely with role-based permissions',
              value: 'sprint planning edits and board transitions are authorized safely'
            },
            acceptanceCriteria: [
              { id: '101-ac1', text: 'JWT access and refresh tokens issue and rotate cleanly', done: true },
              { id: '101-ac2', text: 'Unauthorized requests return HTTP 401/403 with clear error payloads', done: true },
              { id: '101-ac3', text: 'Unit & integration tests cover valid and expired token flows', done: true }
            ],
            comments: [
              { author: '@priya-dev', time: 'Day 2', text: 'Token refresh middleware merged and verified against auth suite.' }
            ]
          },
          {
            id: 102,
            title: 'Design Sprint Backlog & Story Point Estimation Matrix',
            status: 'Closed',
            kanbanColumn: 'Done',
            sprint: 'Sprint 1',
            priority: 'High',
            storyPoints: 8,
            assignee: '@arjun-ui',
            labels: ['frontend', 'ux', 'sprint-1'],
            userStory: {
              role: 'Product Owner',
              feature: 'prioritize user stories and assign Fibonacci story points',
              value: 'the team can commit to a realistic sprint scope before Day 1'
            },
            acceptanceCriteria: [
              { id: '102-ac1', text: 'Stories display role, feature, value statement, and AC checklist', done: true },
              { id: '102-ac2', text: 'Committed story points dynamically sum against sprint capacity', done: true },
              { id: '102-ac3', text: 'Mobile and desktop layouts render without horizontal overflow', done: true }
            ],
            comments: [
              { author: '@arjun-ui', time: 'Day 3', text: 'Completed responsive cards and Fibonacci point selector.' }
            ]
          },
          {
            id: 103,
            title: 'Build Interactive 5-Stage Kanban Board with Drag & Drop',
            status: 'In Progress',
            kanbanColumn: 'In Review',
            sprint: 'Sprint 1',
            priority: 'High',
            storyPoints: 8,
            assignee: '@arjun-ui',
            labels: ['frontend', 'sprint-1', 'ux'],
            userStory: {
              role: 'Agile Developer',
              feature: 'drag work items across Backlog, Ready, In Progress, Review, and Done',
              value: 'daily standup status reflects real-time workflow bottlenecks'
            },
            acceptanceCriteria: [
              { id: '103-ac1', text: 'Drag-and-drop and keyboard/button stage moves update card column', done: true },
              { id: '103-ac2', text: 'Column headers show live issue counts and story point totals', done: true },
              { id: '103-ac3', text: 'Moving a card to Done updates burndown remaining story points', done: false }
            ],
            comments: [
              { author: '@arjun-ui', time: 'Day 5', text: 'PR #45 submitted; final check on touch/click stage controls.' }
            ]
          },
          {
            id: 104,
            title: 'Create REST & Sync Engine for Sprint Telemetry & Burndown',
            status: 'In Progress',
            kanbanColumn: 'In Progress',
            sprint: 'Sprint 1',
            priority: 'High',
            storyPoints: 5,
            assignee: '@priya-dev',
            labels: ['backend', 'sprint-1'],
            userStory: {
              role: 'Scrum Master',
              feature: 'compare ideal sprint burndown against actual remaining story points',
              value: 'we can spot scope creep or schedule drift early in the sprint'
            },
            acceptanceCriteria: [
              { id: '104-ac1', text: 'Ideal burndown line scales linearly from total sprint SP to 0 on Day 10', done: true },
              { id: '104-ac2', text: 'Actual burndown updates immediately when story points or Done items change', done: true },
              { id: '104-ac3', text: 'Hover tooltips display exact day, ideal SP, and actual SP', done: false }
            ],
            comments: [
              { author: '@priya-dev', time: 'Day 6', text: 'Interactive SVG burndown plot wired to live sprint state.' }
            ]
          },
          {
            id: 105,
            title: 'Fix Story Point Recalculation Bug When Issue Reopens',
            status: 'Open',
            kanbanColumn: 'To Do / Ready',
            sprint: 'Sprint 1',
            priority: 'Critical',
            storyPoints: 3,
            assignee: '@neha-qa',
            labels: ['bug', 'qa', 'sprint-1'],
            userStory: {
              role: 'QA Engineer',
              feature: 'reopen a completed issue and restore its story points to active scope',
              value: 'regression bugs are never silently dropped from sprint metrics'
            },
            acceptanceCriteria: [
              { id: '105-ac1', text: 'Reopening a Done/Closed issue moves it out of Done and restores remaining SP', done: true },
              { id: '105-ac2', text: 'Audit log records status transition timestamp and actor', done: false }
            ],
            comments: [
              { author: '@neha-qa', time: 'Day 6', text: 'Reproduced edge case when toggling Closed while in To Do column.' }
            ]
          },
          {
            id: 106,
            title: 'Automate End-to-End Regression & Burndown Snapshot Tests',
            status: 'Open',
            kanbanColumn: 'Backlog',
            sprint: 'Backlog',
            priority: 'Medium',
            storyPoints: 5,
            assignee: '@neha-qa',
            labels: ['qa', 'backend'],
            userStory: {
              role: 'QA Lead',
              feature: 'run automated E2E checks across Issues, Kanban, and Projects tabs',
              value: 'every sprint increment ships with verified quality gates'
            },
            acceptanceCriteria: [
              { id: '106-ac1', text: 'Automated test verifies all 7 issues (#101-#107) render accurately', done: false },
              { id: '106-ac2', text: 'CI workflow reports pass/fail status cleanly in Actions tab', done: false }
            ],
            comments: []
          },
          {
            id: 107,
            title: 'Publish Sprint Review Demo Notes & Release Checklist',
            status: 'Open',
            kanbanColumn: 'Backlog',
            sprint: 'Backlog',
            priority: 'Low',
            storyPoints: 2,
            assignee: '@arjun-ui',
            labels: ['ux', 'epic'],
            userStory: {
              role: 'Stakeholder & Course Instructor',
              feature: 'review sprint velocity, burndown outcome, and user story completion',
              value: 'final agile evaluation has transparent evidence and traceability'
            },
            acceptanceCriteria: [
              { id: '107-ac1', text: 'Sprint velocity and completed story points summarized clearly', done: false },
              { id: '107-ac2', text: 'All acceptance criteria traced to corresponding GitHub issues', done: false }
            ],
            comments: []
          }
        ]
      };
    }

    let appState = loadState();

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return createInitialState();
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.issues) || parsed.issues.length !== 7) {
          return createInitialState();
        }
        return parsed;
      } catch (err) {
        console.warn('Failed to load state from localStorage, using default state:', err);
        return createInitialState();
      }
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      } catch (err) {
        console.warn('Could not persist state to localStorage:', err);
      }
    }

    function resetDemoData() {
      appState = createInitialState();
      saveState();
      renderAllViews();
      showToast('Demo data restored: 7 GitHub Issues (#101–#107), Sprint 1 & Burndown reset.', 'success');
    }

    /**
     * =========================================================================
     * TOAST NOTIFICATION HELPER (NO alert() OR confirm())
     * =========================================================================
     */
    function showToast(message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const palette = {
        info: 'bg-gh-overlay border-gh-accent text-gh-text',
        success: 'bg-gh-overlay border-gh-successText text-gh-text',
        warning: 'bg-gh-overlay border-gh-warningText text-gh-text'
      };

      const el = document.createElement('div');
      el.className = `pointer-events-auto border rounded-lg px-3.5 py-2.5 text-xs shadow-xl flex items-center justify-between gap-3 animate-in ${palette[type] || palette.info}`;
      el.innerHTML = `
        <span>${escapeHtml(message)}</span>
        <button onclick="this.parentElement.remove()" class="text-gh-muted hover:text-gh-text font-mono text-xs cursor-pointer">✕</button>
      `;

      container.appendChild(el);
      setTimeout(() => {
        if (el.parentElement) el.remove();
      }, 3600);
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    /**
     * =========================================================================
     * NAVIGATION & SUBVIEW CONTROLS
     * =========================================================================
     */
    function switchTab(tabName) {
      appState.activeTab = tabName;
      saveState();

      const tabs = ['code', 'issues', 'pulls', 'actions', 'projects'];
      tabs.forEach((t) => {
        const btn = document.getElementById(`tab-${t}`);
        const view = document.getElementById(`view-${t}`);
        const isActive = t === tabName;

        if (view) {
          view.classList.toggle('hidden', !isActive);
        }

        if (btn) {
          if (t === 'projects') {
            btn.className = isActive
              ? 'nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold border-b-2 border-[#f78166] text-gh-text transition cursor-pointer'
              : 'nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium border-b-2 border-transparent text-gh-muted hover:text-gh-text transition cursor-pointer';
          } else {
            btn.className = isActive
              ? 'nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold border-b-2 border-[#f78166] text-gh-text transition cursor-pointer'
              : 'nav-tab whitespace-nowrap flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium border-b-2 border-transparent text-gh-muted hover:text-gh-text transition cursor-pointer';
          }
        }
      });

      if (tabName === 'projects') {
        renderBurndownChart();
      } else if (tabName === 'issues') {
        renderIssuesTab();
      }
    }

    function setProjectSubview(subview) {
      appState.projectSubview = subview;
      saveState();

      const subviews = ['board', 'table', 'roadmap'];
      subviews.forEach((sv) => {
        const panel = document.getElementById(`subview-${sv}`);
        const btn = document.getElementById(`proj-subview-${sv}`);
        const active = sv === subview;
        if (panel) panel.classList.toggle('hidden', !active);
        if (btn) {
          btn.className = active
            ? 'proj-subview-btn px-3 py-1.5 text-xs font-medium rounded-md bg-gh-overlay text-gh-text shadow-sm transition cursor-pointer'
            : 'proj-subview-btn px-3 py-1.5 text-xs font-medium rounded-md text-gh-muted hover:text-gh-text transition cursor-pointer';
        }
      });

      renderProjectSubviewContent();
    }

    function clearProjectFilters() {
      const searchEl = document.getElementById('project-search');
      const labelEl = document.getElementById('project-filter-label');
      const sprintEl = document.getElementById('project-filter-sprint');
      if (searchEl) searchEl.value = '';
      if (labelEl) labelEl.value = 'ALL';
      if (sprintEl) sprintEl.value = 'ALL';
      renderAllViews();
      showToast('Project filters cleared.', 'info');
    }

    function getFilteredIssues() {
      const q = (document.getElementById('project-search')?.value || '').trim().toLowerCase();
      const label = document.getElementById('project-filter-label')?.value || 'ALL';
      const sprint = document.getElementById('project-filter-sprint')?.value || 'ALL';

      return appState.issues.filter((issue) => {
        const matchesLabel = label === 'ALL' || issue.labels.includes(label);
        const matchesSprint = sprint === 'ALL' || issue.sprint === sprint;
        const matchesQuery =
          !q ||
          `#${issue.id}`.includes(q) ||
          String(issue.id).includes(q) ||
          issue.title.toLowerCase().includes(q) ||
          issue.assignee.toLowerCase().includes(q) ||
          issue.userStory.feature.toLowerCase().includes(q) ||
          issue.userStory.role.toLowerCase().includes(q);
        return matchesLabel && matchesSprint && matchesQuery;
      });
    }

    /**
     * =========================================================================
     * STATE MUTATION ACTIONS (SYNCHRONIZED ACROSS ALL VIEWS)
     * =========================================================================
     */
    function moveIssueToColumn(issueId, targetColumn) {
      const issue = appState.issues.find((i) => i.id === Number(issueId));
      if (!issue) return;

      issue.kanbanColumn = targetColumn;

      // Sync issue status with Kanban workflow
      if (targetColumn === 'Done') {
        issue.status = 'Closed';
      } else if (targetColumn === 'In Progress' || targetColumn === 'In Review') {
        issue.status = 'In Progress';
      } else {
        // Backlog or To Do / Ready
        if (issue.status === 'Closed') {
          issue.status = 'Open';
        } else if (targetColumn === 'Backlog') {
          issue.status = 'Open';
        }
      }

      saveState();
      renderAllViews();
      showToast(`#${issue.id} moved to "${targetColumn}" (${issue.status}).`, 'success');
    }

    function toggleIssueClosedState(issueId) {
      const issue = appState.issues.find((i) => i.id === Number(issueId));
      if (!issue) return;

      if (issue.status === 'Closed') {
        issue.status = 'Open';
        if (issue.kanbanColumn === 'Done') {
          issue.kanbanColumn = 'To Do / Ready';
        }
        showToast(`Reopened Issue #${issue.id} (${issue.storyPoints} SP restored to active scope).`, 'warning');
      } else {
        issue.status = 'Closed';
        issue.kanbanColumn = 'Done';
        showToast(`Closed Issue #${issue.id} and marked Done (${issue.storyPoints} SP completed).`, 'success');
      }

      saveState();
      renderAllViews();
      if (!document.getElementById('issue-modal').classList.contains('hidden')) {
        openIssueDetail(issue.id);
      }
    }

    function updateIssueStoryPoints(issueId, newPoints) {
      const issue = appState.issues.find((i) => i.id === Number(issueId));
      const pts = Number(newPoints);
      if (!issue || !FIBONACCI_POINTS.includes(pts)) return;

      issue.storyPoints = pts;
      saveState();
      renderAllViews();
      showToast(`#${issue.id} updated to ${pts} Story Points.`, 'info');
    }

    function toggleIssueSprint(issueId) {
      const issue = appState.issues.find((i) => i.id === Number(issueId));
      if (!issue) return;

      if (issue.sprint === 'Sprint 1') {
        issue.sprint = 'Backlog';
        if (issue.kanbanColumn === 'To Do / Ready' || issue.kanbanColumn === 'In Progress') {
          issue.kanbanColumn = 'Backlog';
        }
        showToast(`Moved #${issue.id} back to Product Backlog.`, 'info');
      } else {
        issue.sprint = 'Sprint 1';
        if (issue.kanbanColumn === 'Backlog') {
          issue.kanbanColumn = 'To Do / Ready';
        }
        showToast(`Committed #${issue.id} (${issue.storyPoints} SP) to Sprint 1.`, 'success');
      }

      saveState();
      renderAllViews();
    }

    function updateIssuePriority(issueId, newPriority) {
      const issue = appState.issues.find((i) => i.id === Number(issueId));
      if (!issue) return;
      issue.priority = newPriority;
      saveState();
      renderAllViews();
      showToast(`#${issue.id} priority set to ${newPriority}.`, 'info');
    }

    function toggleAcceptanceCriterion(issueId, acId) {
      const issue = appState.issues.find((i) => i.id === Number(issueId));
      if (!issue) return;
      const ac = issue.acceptanceCriteria.find((item) => item.id === acId);
      if (!ac) return;
      ac.done = !ac.done;

      // If all acceptance criteria are checked on an open/in-progress issue, optionally hint or keep manual control
      saveState();
      renderBacklogAndStories();
      if (!document.getElementById('issue-modal').classList.contains('hidden')) {
        openIssueDetail(issue.id);
      }
    }

    function addIssueComment(issueId, event) {
      event.preventDefault();
      const input = document.getElementById('modal-comment-input');
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;

      const issue = appState.issues.find((i) => i.id === Number(issueId));
      if (!issue) return;

      issue.comments.push({
        author: '@agile-lead',
        time: `Sprint Day ${appState.currentSprintDay}`,
        text
      });
      input.value = '';
      saveState();
      openIssueDetail(issue.id);
      renderIssuesTab();
      showToast(`Comment added to #${issue.id}.`, 'success');
    }

    function updateSprintCapacity(val) {
      const num = Math.max(5, Math.min(120, Number(val) || 34));
      appState.sprintCapacity = num;
      saveState();
      renderAllViews();
      showToast(`Sprint 1 target capacity updated to ${num} Story Points.`, 'info');
    }

    function updateSprintDay(dayVal) {
      const day = Math.max(1, Math.min(appState.sprintDurationDays, Number(dayVal) || 1));
      appState.currentSprintDay = day;
      saveState();
      renderBurndownChart();
      showToast(`Viewing Burndown telemetry at Sprint Day ${day} of ${appState.sprintDurationDays}.`, 'info');
    }

    function runMockWorkflow() {
      const list = document.getElementById('actions-runs-list');
      if (!list) return;
      const sprintIssues = appState.issues.filter((i) => i.sprint === 'Sprint 1');
      const spSum = sprintIssues.reduce((acc, i) => acc + i.storyPoints, 0);

      const row = document.createElement('div');
      row.className = 'py-3 flex items-center justify-between gap-2 animate-in';
      row.innerHTML = `
        <div class="flex items-center gap-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-gh-successText"></span>
          <div>
            <div class="font-medium text-gh-text">Manual Sprint Readiness & Burndown Audit</div>
            <div class="text-xs text-gh-muted">Sprint 1 has ${sprintIssues.length} issues (${spSum} SP committed) • just now</div>
          </div>
        </div>
        <span class="font-mono text-xs text-gh-successText">Success</span>
      `;
      list.prepend(row);
      showToast('Workflow completed: Sprint readiness check passed.', 'success');
    }

    /**
     * =========================================================================
     * METRICS CALCULATIONS
     * =========================================================================
     */
    function computeSprintMetrics() {
      const sprintIssues = appState.issues.filter((i) => i.sprint === 'Sprint 1');
      const committedSP = sprintIssues.reduce((sum, i) => sum + i.storyPoints, 0);
      const completedSP = sprintIssues
        .filter((i) => i.kanbanColumn === 'Done' || i.status === 'Closed')
        .reduce((sum, i) => sum + i.storyPoints, 0);
      const remainingSP = Math.max(0, committedSP - completedSP);
      const allPoints = appState.issues.reduce((sum, i) => sum + i.storyPoints, 0);

      return {
        sprintIssues,
        committedSP,
        completedSP,
        remainingSP,
        allPoints,
        capacity: appState.sprintCapacity
      };
    }

    /**
     * =========================================================================
     * RENDERERS: HEADER KPIs, KANBAN BOARD, TABLE, ROADMAP
     * =========================================================================
     */
    function renderHeaderKPIs() {
      const m = computeSprintMetrics();
      document.getElementById('kpi-sprint-name').textContent = appState.sprintName;
      document.getElementById('kpi-capacity').textContent = `${m.capacity} SP`;
      document.getElementById('kpi-committed').textContent = `${m.committedSP} SP`;
      document.getElementById('kpi-completed').textContent = `${m.completedSP} SP`;
      document.getElementById('kpi-remaining').textContent = `${m.remainingSP} SP`;

      const openOrActiveCount = appState.issues.filter((i) => i.status !== 'Closed').length;
      document.getElementById('badge-issues-open').textContent = openOrActiveCount;

      const daySelect = document.getElementById('sprint-day-select');
      if (daySelect) daySelect.value = String(appState.currentSprintDay);

      const capInput = document.getElementById('sprint-capacity-input');
      if (capInput && document.activeElement !== capInput) {
        capInput.value = String(appState.sprintCapacity);
      }
    }

    function renderProjectSubviewContent() {
      if (appState.projectSubview === 'board') {
        renderKanbanBoard();
      } else if (appState.projectSubview === 'table') {
        renderProjectTable();
      } else if (appState.projectSubview === 'roadmap') {
        renderRoadmapView();
      }
    }

    function renderKanbanBoard() {
      const grid = document.getElementById('kanban-board-grid');
      const pills = document.getElementById('kanban-summary-pills');
      if (!grid) return;

      const filtered = getFilteredIssues();
      const filteredIds = new Set(filtered.map((i) => i.id));

      if (pills) {
        pills.innerHTML = KANBAN_COLUMNS.map((col) => {
          const cards = appState.issues.filter((i) => i.kanbanColumn === col.id);
          const pts = cards.reduce((s, i) => s + i.storyPoints, 0);
          return `<span class="px-2 py-0.5 rounded bg-gh-canvas border border-gh-border text-gh-muted">${col.label}: <strong class="text-gh-text">${pts} SP</strong></span>`;
        }).join('');
      }

      grid.innerHTML = KANBAN_COLUMNS.map((col, colIndex) => {
        const colIssues = appState.issues.filter((i) => i.kanbanColumn === col.id);
        const colPoints = colIssues.reduce((sum, i) => sum + i.storyPoints, 0);

        const cardsHtml = colIssues.map((issue) => {
          const isDimmed = !filteredIds.has(issue.id);
          const prevCol = colIndex > 0 ? KANBAN_COLUMNS[colIndex - 1].id : null;
          const nextCol = colIndex < KANBAN_COLUMNS.length - 1 ? KANBAN_COLUMNS[colIndex + 1].id : null;

          const labelsHtml = issue.labels
            .map((lbl) => {
              const cls = LABEL_STYLES[lbl] || 'bg-gh-overlay text-gh-muted border-gh-border';
              return `<span class="px-1.5 py-0.5 text-[10px] font-medium rounded-full border ${cls}">${escapeHtml(lbl)}</span>`;
            })
            .join('');

          return `
            <article
              draggable="true"
              ondragstart="handleDragStart(event, ${issue.id})"
              ondragend="handleDragEnd(event)"
              class="bg-gh-subtle border border-gh-border hover:border-gh-accent/70 rounded-lg p-3 space-y-2.5 shadow-xs transition cursor-grab active:cursor-grabbing ${isDimmed ? 'opacity-35' : ''}"
            >
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5">
                  <span class="font-mono text-xs font-semibold text-gh-muted">#${issue.id}</span>
                  <span class="px-1.5 py-0.5 text-[10px] font-mono rounded ${issue.sprint === 'Sprint 1' ? 'bg-gh-accent/15 text-gh-accent' : 'bg-gh-canvas text-gh-muted border border-gh-border'}">${issue.sprint}</span>
                </div>
                <span class="px-2 py-0.5 text-xs font-mono font-semibold rounded bg-gh-canvas border border-gh-border text-gh-text">${issue.storyPoints} SP</span>
              </div>

              <button onclick="openIssueDetail(${issue.id})" class="text-left text-xs sm:text-sm font-semibold text-gh-text hover:text-gh-accent leading-snug block w-full cursor-pointer">
                ${escapeHtml(issue.title)}
              </button>

              <p class="text-[11px] text-gh-muted line-clamp-2">
                As a <span class="text-gh-text">${escapeHtml(issue.userStory.role)}</span>, I want <span class="text-gh-text">${escapeHtml(issue.userStory.feature)}</span>.
              </p>

              <div class="flex flex-wrap gap-1">${labelsHtml}</div>

              <div class="pt-2 border-t border-gh-borderMuted flex items-center justify-between gap-1 text-[11px]">
                <span class="font-mono text-gh-muted truncate">${escapeHtml(issue.assignee)}</span>
                <div class="flex items-center gap-1">
                  ${prevCol ? `<button onclick="moveIssueToColumn(${issue.id}, '${prevCol}')" title="Move left to ${prevCol}" class="px-1.5 py-0.5 rounded bg-gh-canvas hover:bg-gh-overlay border border-gh-border text-gh-muted hover:text-gh-text cursor-pointer">←</button>` : ''}
                  ${nextCol ? `<button onclick="moveIssueToColumn(${issue.id}, '${nextCol}')" title="Move right to ${nextCol}" class="px-1.5 py-0.5 rounded bg-gh-canvas hover:bg-gh-overlay border border-gh-border text-gh-muted hover:text-gh-text cursor-pointer">→</button>` : ''}
                </div>
              </div>
            </article>
          `;
        }).join('');

        return `
          <div
            data-column="${col.id}"
            ondragover="handleDragOver(event)"
            ondragleave="handleDragLeave(event)"
            ondrop="handleDrop(event, '${col.id}')"
            class="bg-gh-canvas/75 border border-gh-border rounded-xl p-3 flex flex-col min-h-[340px] transition"
          >
            <div class="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-gh-borderMuted">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-2.5 h-2.5 rounded-full shrink-0 ${col.dotClass}"></span>
                <h3 class="text-xs font-semibold text-gh-text truncate">${col.label}</h3>
                <span class="px-1.5 py-0.2 text-[11px] font-mono rounded-full bg-gh-subtle border border-gh-border text-gh-muted">${colIssues.length}</span>
              </div>
              <span class="text-xs font-mono text-gh-muted shrink-0">${colPoints} SP</span>
            </div>

            <div class="space-y-2.5 flex-1">
              ${cardsHtml || `<div class="h-28 rounded-lg border border-dashed border-gh-borderMuted flex items-center justify-center text-xs text-gh-muted">Drop issue card here</div>`}
            </div>
          </div>
        `;
      }).join('');
    }

    function renderProjectTable() {
      const tbody = document.getElementById('project-table-body');
      const totalBadge = document.getElementById('table-total-sp');
      if (!tbody) return;

      const list = getFilteredIssues();
      const sumPts = list.reduce((s, i) => s + i.storyPoints, 0);
      if (totalBadge) totalBadge.textContent = `Showing ${list.length} of 7 issues • ${sumPts} SP`;

      tbody.innerHTML = list.map((issue) => {
        const spOptions = FIBONACCI_POINTS.map(
          (pt) => `<option value="${pt}" ${issue.storyPoints === pt ? 'selected' : ''}>${pt} SP</option>`
        ).join('');

        const colOptions = KANBAN_COLUMNS.map(
          (c) => `<option value="${c.id}" ${issue.kanbanColumn === c.id ? 'selected' : ''}>${c.label}</option>`
        ).join('');

        const stateBadge = issue.status === 'Closed'
          ? `<span class="px-2 py-0.5 text-xs rounded-full bg-gh-purple/20 text-gh-purpleText border border-gh-purple/40">Closed</span>`
          : issue.status === 'In Progress'
          ? `<span class="px-2 py-0.5 text-xs rounded-full bg-gh-warning/20 text-gh-warningText border border-gh-warning/40">In Progress</span>`
          : `<span class="px-2 py-0.5 text-xs rounded-full bg-gh-success/20 text-gh-successText border border-gh-success/40">Open</span>`;

        return `
          <tr class="hover:bg-gh-canvas/50 transition">
            <td class="py-3 px-3 font-mono font-semibold text-gh-accent whitespace-nowrap">#${issue.id}</td>
            <td class="py-3 px-3 min-w-[220px]">
              <button onclick="openIssueDetail(${issue.id})" class="font-semibold text-gh-text hover:text-gh-accent text-left block cursor-pointer">${escapeHtml(issue.title)}</button>
              <div class="text-xs text-gh-muted mt-0.5">As a ${escapeHtml(issue.userStory.role)}, I want ${escapeHtml(issue.userStory.feature)}</div>
            </td>
            <td class="py-3 px-3">
              <select onchange="moveIssueToColumn(${issue.id}, this.value)" class="bg-gh-canvas border border-gh-border rounded px-2 py-1 text-xs text-gh-text cursor-pointer">
                ${colOptions}
              </select>
            </td>
            <td class="py-3 px-3">
              <button onclick="toggleIssueSprint(${issue.id})" class="px-2 py-1 rounded text-xs font-mono border cursor-pointer ${issue.sprint === 'Sprint 1' ? 'bg-gh-accent/15 text-gh-accent border-gh-accent/30' : 'bg-gh-canvas text-gh-muted border-gh-border'}">
                ${issue.sprint}
              </button>
            </td>
            <td class="py-3 px-3">
              <select onchange="updateIssuePriority(${issue.id}, this.value)" class="bg-gh-canvas border border-gh-border rounded px-2 py-1 text-xs text-gh-text cursor-pointer">
                <option value="Critical" ${issue.priority === 'Critical' ? 'selected' : ''}>Critical</option>
                <option value="High" ${issue.priority === 'High' ? 'selected' : ''}>High</option>
                <option value="Medium" ${issue.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="Low" ${issue.priority === 'Low' ? 'selected' : ''}>Low</option>
              </select>
            </td>
            <td class="py-3 px-3">
              <select onchange="updateIssueStoryPoints(${issue.id}, this.value)" class="bg-gh-canvas border border-gh-border rounded px-2 py-1 text-xs font-mono text-gh-text cursor-pointer">
                ${spOptions}
              </select>
            </td>
            <td class="py-3 px-3 font-mono text-xs text-gh-muted whitespace-nowrap">${escapeHtml(issue.assignee)}</td>
            <td class="py-3 px-3 whitespace-nowrap">
              <button onclick="toggleIssueClosedState(${issue.id})" title="Click to toggle Open / Closed" class="cursor-pointer">
                ${stateBadge}
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function renderRoadmapView() {
      const container = document.getElementById('roadmap-container');
      if (!container) return;

      const windows = {
        101: { start: 10, end: 35, label: 'Days 1–3' },
        102: { start: 10, end: 45, label: 'Days 1–4' },
        103: { start: 25, end: 75, label: 'Days 3–7' },
        104: { start: 35, end: 85, label: 'Days 4–8' },
        105: { start: 50, end: 90, label: 'Days 5–9' },
        106: { start: 60, end: 100, label: 'Days 6–10' },
        107: { start: 75, end: 100, label: 'Days 8–10' }
      };

      const list = getFilteredIssues();
      container.innerHTML = list.map((issue) => {
        const w = windows[issue.id] || { start: 10, end: 80, label: 'Sprint 1' };
        const isDone = issue.kanbanColumn === 'Done' || issue.status === 'Closed';
        const barColor = isDone ? 'bg-gh-successText' : issue.sprint === 'Sprint 1' ? 'bg-gh-accent' : 'bg-gh-purpleText';

        return `
          <div class="bg-gh-canvas border border-gh-border rounded-lg p-3 space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div class="flex items-center gap-2 min-w-0">
                <span class="font-mono font-bold text-gh-accent">#${issue.id}</span>
                <button onclick="openIssueDetail(${issue.id})" class="font-semibold text-gh-text hover:text-gh-accent truncate cursor-pointer">${escapeHtml(issue.title)}</button>
              </div>
              <div class="flex items-center gap-2 font-mono text-gh-muted shrink-0">
                <span>${w.label}</span>
                <span>•</span>
                <span class="text-gh-text">${issue.storyPoints} SP</span>
                <span>•</span>
                <span>${issue.kanbanColumn}</span>
              </div>
            </div>
            <div class="w-full h-3 rounded-full bg-gh-subtle relative overflow-hidden border border-gh-borderMuted">
              <div style="left: ${w.start}%; width: ${Math.max(8, w.end - w.start)}%;" class="absolute top-0 bottom-0 rounded-full ${barColor} opacity-85 transition-all"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    /**
     * =========================================================================
     * RENDERER: SPRINT PLANNING & STORY POINTS PANEL
     * =========================================================================
     */
    function renderSprintPlanner() {
      const m = computeSprintMetrics();
      const donePct = m.capacity > 0 ? Math.min(100, (m.completedSP / m.capacity) * 100) : 0;
      const committedRemainingPct = m.capacity > 0 ? Math.min(100 - donePct, (m.remainingSP / m.capacity) * 100) : 0;

      const barDone = document.getElementById('cap-bar-done');
      const barComm = document.getElementById('cap-bar-committed');
      if (barDone) barDone.style.width = `${donePct}%`;
      if (barComm) barComm.style.width = `${committedRemainingPct}%`;

      const overCapacity = m.committedSP > m.capacity;
      const statsEl = document.getElementById('capacity-stats-text');
      if (statsEl) {
        statsEl.innerHTML = `
          <span>Committed: <strong class="${overCapacity ? 'text-gh-dangerText' : 'text-gh-accent'}">${m.committedSP} / ${m.capacity} SP</strong>${overCapacity ? ' (Over Capacity!)' : ''}</span>
          <span>Done: <strong class="text-gh-successText">${m.completedSP} SP</strong></span>
          <span>Left in Sprint: <strong class="text-gh-warningText">${m.remainingSP} SP</strong></span>
        `;
      }

      const listEl = document.getElementById('sprint-planner-list');
      if (!listEl) return;

      listEl.innerHTML = appState.issues.map((issue) => {
        const inSprint = issue.sprint === 'Sprint 1';
        const isDone = issue.kanbanColumn === 'Done' || issue.status === 'Closed';

        const spButtons = FIBONACCI_POINTS.map((pt) => {
          const active = issue.storyPoints === pt;
          return `<button onclick="updateIssueStoryPoints(${issue.id}, ${pt})" class="px-1.5 py-0.5 text-[11px] font-mono rounded border transition cursor-pointer ${active ? 'bg-gh-accent text-white border-gh-accent font-bold' : 'bg-gh-subtle text-gh-muted hover:text-gh-text border-gh-border'}">${pt}</button>`;
        }).join('');

        return `
          <div class="bg-gh-canvas border border-gh-border rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="font-mono text-xs font-bold text-gh-accent">#${issue.id}</span>
                <span class="text-xs font-medium text-gh-text truncate">${escapeHtml(issue.title)}</span>
                ${isDone ? '<span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-gh-success/20 text-gh-successText">DONE</span>' : ''}
              </div>
              <div class="flex items-center gap-1 mt-1.5 flex-wrap">
                <span class="text-[10px] text-gh-muted mr-1">SP:</span>
                ${spButtons}
              </div>
            </div>

            <button onclick="toggleIssueSprint(${issue.id})" class="px-2.5 py-1 rounded text-xs font-medium border shrink-0 transition cursor-pointer ${inSprint ? 'bg-gh-accent/15 text-gh-accent border-gh-accent/40 hover:bg-gh-danger/15 hover:text-gh-dangerText hover:border-gh-danger/40' : 'bg-gh-subtle text-gh-muted hover:text-gh-text border-gh-border'}">
              ${inSprint ? '✓ In Sprint 1' : '+ Add to Sprint'}
            </button>
          </div>
        `;
      }).join('');
    }

    /**
     * =========================================================================
     * RENDERER: INTERACTIVE SVG BURNDOWN CHART (DAYS 1 TO 10)
     * =========================================================================
     */
    function renderBurndownChart() {
      const svg = document.getElementById('burndown-svg');
      const tooltip = document.getElementById('burndown-tooltip');
      const metricsEl = document.getElementById('burndown-metrics');
      if (!svg) return;

      const m = computeSprintMetrics();
      const totalDays = appState.sprintDurationDays; // 10 days
      const currentDay = appState.currentSprintDay;
      const startPoints = Math.max(1, m.committedSP);

      const width = 760;
      const height = 320;
      const padLeft = 52;
      const padRight = 24;
      const padTop = 20;
      const padBottom = 42;
      const plotW = width - padLeft - padRight;
      const plotH = height - padTop - padBottom;

      const maxY = Math.max(startPoints, m.capacity, 10);
      const yMaxCeil = Math.ceil(maxY / 5) * 5;

      const xForDay = (dayIndexZeroBased) => padLeft + (dayIndexZeroBased / (totalDays - 1)) * plotW;
      const yForPoints = (pts) => padTop + plotH - (Math.max(0, pts) / yMaxCeil) * plotH;

      // Build day points from Day 1 (index 0) to Day 10 (index 9)
      const dataPoints = [];
      for (let i = 0; i < totalDays; i++) {
        const dayNum = i + 1;
        // Ideal linear burndown from startPoints on Day 1 down to 0 on Day 10
        const idealRemaining = Number((startPoints * (1 - i / (totalDays - 1))).toFixed(1));

        let actualRemaining = null;
        if (dayNum <= currentDay) {
          if (dayNum === currentDay) {
            // Exact live remaining SP from active Sprint 1 issues
            actualRemaining = m.remainingSP;
          } else {
            // Historical progression relative to total committed SP & current completion
            const progressRatio = i / Math.max(1, currentDay - 1);
            const burnedSoFar = m.completedSP * Math.min(1, progressRatio * 0.92);
            actualRemaining = Math.max(0, Math.round(startPoints - burnedSoFar));
          }
        }

        dataPoints.push({
          dayNum,
          idealRemaining,
          actualRemaining,
          x: xForDay(i),
          yIdeal: yForPoints(idealRemaining),
          yActual: actualRemaining !== null ? yForPoints(actualRemaining) : null
        });
      }

      // Grid lines & Y-axis labels
      let gridHtml = '';
      const steps = 5;
      for (let s = 0; s <= steps; s++) {
        const val = Math.round((yMaxCeil / steps) * s);
        const y = yForPoints(val);
        gridHtml += `
          <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#21262d" stroke-width="1" />
          <text x="${padLeft - 10}" y="${y + 4}" text-anchor="end" fill="#8b949e" font-size="11" font-family="ui-monospace, monospace">${val}</text>
        `;
      }

      // X-axis labels (Day 1 .. Day 10)
      const xLabelsHtml = dataPoints
        .map((pt) => {
          const isCurrent = pt.dayNum === currentDay;
          return `
            <text x="${pt.x}" y="${height - 12}" text-anchor="middle" fill="${isCurrent ? '#2f81f7' : '#8b949e'}" font-weight="${isCurrent ? '700' : '400'}" font-size="11" font-family="ui-monospace, monospace">
              D${pt.dayNum}
            </text>
          `;
        })
        .join('');

      // Ideal Line Path
      const idealPath = dataPoints
        .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.yIdeal.toFixed(1)}`)
        .join(' ');

      // Actual Line Path (only up to currentDay)
      const actualPts = dataPoints.filter((pt) => pt.actualRemaining !== null);
      const actualPath = actualPts
        .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.yActual.toFixed(1)}`)
        .join(' ');

      // Area under Actual line
      const actualAreaPath = actualPts.length > 1
        ? `${actualPath} L ${actualPts[actualPts.length - 1].x.toFixed(1)} ${yForPoints(0).toFixed(1)} L ${actualPts[0].x.toFixed(1)} ${yForPoints(0).toFixed(1)} Z`
        : '';

      // Interactive hover circles & invisible hit targets
      const interactiveNodes = dataPoints
        .map((pt) => {
          const idealDot = `<circle cx="${pt.x.toFixed(1)}" cy="${pt.yIdeal.toFixed(1)}" r="3.5" fill="#8b949e" opacity="0.7" />`;
          const actualDot = pt.actualRemaining !== null
            ? `<circle cx="${pt.x.toFixed(1)}" cy="${pt.yActual.toFixed(1)}" r="5" fill="#2f81f7" stroke="#0d1117" stroke-width="2" />`
            : '';
          const hitZone = `
            <rect
              x="${pt.x - plotW / totalDays / 2}"
              y="${padTop}"
              width="${plotW / totalDays}"
              height="${plotH}"
              fill="transparent"
              class="cursor-pointer"
              onmouseenter="showBurndownHover(event, ${pt.dayNum}, ${pt.idealRemaining}, ${pt.actualRemaining === null ? 'null' : pt.actualRemaining})"
              onmousemove="moveBurndownHover(event)"
              onmouseleave="hideBurndownHover()"
            />
          `;
          return idealDot + actualDot + hitZone;
        })
        .join('');

      svg.innerHTML = `
        <defs>
          <linearGradient id="burnAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2f81f7" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#2f81f7" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        ${gridHtml}
        <text x="14" y="${padTop + plotH / 2}" transform="rotate(-90 14 ${padTop + plotH / 2})" text-anchor="middle" fill="#8b949e" font-size="11">Story Points Remaining</text>
        ${actualAreaPath ? `<path d="${actualAreaPath}" fill="url(#burnAreaGrad)" />` : ''}
        <path d="${idealPath}" fill="none" stroke="#8b949e" stroke-width="2" stroke-dasharray="6 5" />
        ${actualPath ? `<path d="${actualPath}" fill="none" stroke="#2f81f7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />` : ''}
        ${xLabelsHtml}
        ${interactiveNodes}
      `;

      // Update metric cards under chart
      const currentIdeal = dataPoints[currentDay - 1]?.idealRemaining ?? 0;
      const variance = Number((m.remainingSP - currentIdeal).toFixed(1));
      const varianceLabel = variance <= 0 ? `${Math.abs(variance)} SP ahead / on track` : `${variance} SP above ideal`;
      const varianceColor = variance <= 0 ? 'text-gh-successText' : 'text-gh-warningText';

      if (metricsEl) {
        metricsEl.innerHTML = `
          <div class="bg-gh-canvas border border-gh-border rounded-lg p-2.5">
            <div class="text-[11px] text-gh-muted">Sprint 1 Scope</div>
            <div class="text-sm font-mono font-bold text-gh-text mt-0.5">${m.committedSP} SP</div>
          </div>
          <div class="bg-gh-canvas border border-gh-border rounded-lg p-2.5">
            <div class="text-[11px] text-gh-muted">Actual Remaining</div>
            <div class="text-sm font-mono font-bold text-gh-accent mt-0.5">${m.remainingSP} SP</div>
          </div>
          <div class="bg-gh-canvas border border-gh-border rounded-lg p-2.5">
            <div class="text-[11px] text-gh-muted">Day ${currentDay} Ideal</div>
            <div class="text-sm font-mono font-bold text-gh-muted mt-0.5">${currentIdeal} SP</div>
          </div>
          <div class="bg-gh-canvas border border-gh-border rounded-lg p-2.5">
            <div class="text-[11px] text-gh-muted">Burn Variance</div>
            <div class="text-xs font-mono font-bold ${varianceColor} mt-1">${varianceLabel}</div>
          </div>
        `;
      }

      if (tooltip) tooltip.classList.add('hidden');
    }

    function showBurndownHover(event, dayNum, idealSP, actualSP) {
      const tooltip = document.getElementById('burndown-tooltip');
      if (!tooltip) return;

      const actualText = actualSP === null
        ? `<span class="text-gh-muted">Not yet reached (Day ${dayNum})</span>`
        : `<strong class="font-mono text-gh-accent">${actualSP} SP</strong>`;

      tooltip.innerHTML = `
        <div class="font-semibold text-gh-text mb-1">Sprint Day ${dayNum} of ${appState.sprintDurationDays}</div>
        <div class="flex justify-between gap-4"><span class="text-gh-muted">Ideal Remaining:</span><span class="font-mono text-gh-text">${idealSP} SP</span></div>
        <div class="flex justify-between gap-4"><span class="text-gh-muted">Actual Remaining:</span>${actualText}</div>
      `;
      tooltip.classList.remove('hidden');
      moveBurndownHover(event);
    }

    function moveBurndownHover(event) {
      const tooltip = document.getElementById('burndown-tooltip');
      const svg = document.getElementById('burndown-svg');
      if (!tooltip || !svg || tooltip.classList.contains('hidden')) return;

      const rect = svg.parentElement.getBoundingClientRect();
      let x = event.clientX - rect.left + 12;
      let y = event.clientY - rect.top - 12;

      if (x + 190 > rect.width) x = Math.max(8, event.clientX - rect.left - 195);
      if (y < 8) y = 8;

      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    }

    function hideBurndownHover() {
      const tooltip = document.getElementById('burndown-tooltip');
      if (tooltip) tooltip.classList.add('hidden');
    }

    /**
     * =========================================================================
     * RENDERER: PRODUCT BACKLOG & USER STORIES
     * =========================================================================
     */
    function renderBacklogAndStories() {
      const container = document.getElementById('user-stories-list');
      if (!container) return;

      const sortMode = document.getElementById('backlog-sort')?.value || 'id-asc';
      const priorityRank = { Critical: 4, High: 3, Medium: 2, Low: 1 };

      const sorted = [...appState.issues].sort((a, b) => {
        if (sortMode === 'priority') {
          return (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0);
        }
        if (sortMode === 'points-desc') {
          return b.storyPoints - a.storyPoints;
        }
        if (sortMode === 'sprint') {
          return a.sprint.localeCompare(b.sprint);
        }
        return a.id - b.id;
      });

      container.innerHTML = sorted.map((issue) => {
        const doneCount = issue.acceptanceCriteria.filter((ac) => ac.done).length;
        const totalAc = issue.acceptanceCriteria.length;
        const inSprint = issue.sprint === 'Sprint 1';

        const acHtml = issue.acceptanceCriteria
          .map(
            (ac) => `
            <label class="flex items-start gap-2 text-xs cursor-pointer select-none group">
              <input
                type="checkbox"
                ${ac.done ? 'checked' : ''}
                onchange="toggleAcceptanceCriterion(${issue.id}, '${ac.id}')"
                class="mt-0.5 rounded border-gh-border bg-gh-canvas text-gh-accent focus:ring-0 cursor-pointer"
              />
              <span class="${ac.done ? 'line-through text-gh-muted' : 'text-gh-text group-hover:text-white'}">${escapeHtml(ac.text)}</span>
            </label>
          `
          )
          .join('');

        return `
          <div class="bg-gh-canvas border border-gh-border rounded-xl p-4 flex flex-col justify-between space-y-3">
            <div class="space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-gh-accent">#${issue.id}</span>
                  <span class="px-2 py-0.5 text-[11px] font-mono rounded ${inSprint ? 'bg-gh-accent/15 text-gh-accent border border-gh-accent/30' : 'bg-gh-subtle text-gh-muted border border-gh-border'}">${issue.sprint}</span>
                  <span class="px-2 py-0.5 text-[11px] rounded bg-gh-subtle border border-gh-border text-gh-muted">${issue.priority}</span>
                </div>
                <span class="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-gh-subtle border border-gh-border text-gh-text">${issue.storyPoints} SP</span>
              </div>

              <button onclick="openIssueDetail(${issue.id})" class="text-sm font-bold text-gh-text hover:text-gh-accent text-left block cursor-pointer">
                ${escapeHtml(issue.title)}
              </button>

              <!-- Structured User Story Statement -->
              <div class="bg-gh-subtle/90 border border-gh-borderMuted rounded-lg p-3 text-xs leading-relaxed">
                <span class="text-gh-muted">As a</span> <strong class="text-gh-text">${escapeHtml(issue.userStory.role)}</strong>,
                <span class="text-gh-muted">I want</span> <strong class="text-gh-accent">${escapeHtml(issue.userStory.feature)}</strong>,
                <span class="text-gh-muted">so that</span> <strong class="text-gh-successText">${escapeHtml(issue.userStory.value)}</strong>.
              </div>

              <!-- Acceptance Criteria Checklist -->
              <div class="space-y-1.5 pt-1">
                <div class="flex items-center justify-between text-[11px] text-gh-muted font-medium">
                  <span>Acceptance Criteria</span>
                  <span class="font-mono">${doneCount}/${totalAc} completed</span>
                </div>
                <div class="space-y-1.5">${acHtml}</div>
              </div>
            </div>

            <div class="pt-3 border-t border-gh-borderMuted flex items-center justify-between gap-2 text-xs">
              <span class="text-gh-muted font-mono">Stage: <strong class="text-gh-text">${issue.kanbanColumn}</strong></span>
              <button onclick="toggleIssueSprint(${issue.id})" class="px-3 py-1 rounded-md font-medium border transition cursor-pointer ${inSprint ? 'bg-gh-subtle text-gh-muted hover:text-gh-text border-gh-border' : 'bg-gh-accent hover:bg-gh-accentHover text-white border-gh-accent'}">
                ${inSprint ? 'Move to Backlog' : 'Move to Sprint 1'}
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    /**
     * =========================================================================
     * RENDERER: ISSUES TAB (#101 THROUGH #107)
     * =========================================================================
     */
    function setIssuesStateFilter(stateFilter) {
      appState.issueStateFilter = stateFilter;
      saveState();
      renderIssuesTab();
    }

    function renderIssuesTab() {
      const container = document.getElementById('issues-list-container');
      if (!container) return;

      const q = (document.getElementById('issues-search')?.value || '').trim().toLowerCase();
      const labelFilter = document.getElementById('issues-label-filter')?.value || 'ALL';
      const stateFilter = appState.issueStateFilter || 'ALL';

      // Update filter counts
      document.getElementById('count-issues-all').textContent = appState.issues.length;
      document.getElementById('count-issues-open').textContent = appState.issues.filter((i) => i.status === 'Open').length;
      document.getElementById('count-issues-progress').textContent = appState.issues.filter((i) => i.status === 'In Progress').length;
      document.getElementById('count-issues-closed').textContent = appState.issues.filter((i) => i.status === 'Closed').length;

      ['ALL', 'Open', 'In Progress', 'Closed'].forEach((st) => {
        const btn = document.getElementById(`filter-state-${st}`);
        if (!btn) return;
        const active = stateFilter === st;
        btn.className = active
          ? 'issue-state-btn px-3 py-1 rounded-md text-xs font-semibold bg-gh-overlay text-gh-text border border-gh-border cursor-pointer'
          : 'issue-state-btn px-3 py-1 rounded-md text-xs font-medium text-gh-muted hover:text-gh-text border border-transparent cursor-pointer';
      });

      const filtered = appState.issues.filter((issue) => {
        const matchesState = stateFilter === 'ALL' || issue.status === stateFilter;
        const matchesLabel = labelFilter === 'ALL' || issue.labels.includes(labelFilter);
        const matchesQuery =
          !q ||
          `#${issue.id}`.includes(q) ||
          String(issue.id).includes(q) ||
          issue.title.toLowerCase().includes(q) ||
          issue.assignee.toLowerCase().includes(q);
        return matchesState && matchesLabel && matchesQuery;
      });

      if (filtered.length === 0) {
        container.innerHTML = `<div class="p-8 text-center text-sm text-gh-muted">No issues match the current filter criteria.</div>`;
        return;
      }

      container.innerHTML = filtered.map((issue) => {
        const isClosed = issue.status === 'Closed';
        const statusIcon = isClosed
          ? `<svg class="w-4 h-4 text-gh-purpleText shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/></svg>`
          : issue.status === 'In Progress'
          ? `<svg class="w-4 h-4 text-gh-warningText shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v5l3 2"/></svg>`
          : `<svg class="w-4 h-4 text-gh-successText shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`;

        const labelsHtml = issue.labels
          .map((lbl) => {
            const cls = LABEL_STYLES[lbl] || 'bg-gh-overlay text-gh-muted border-gh-border';
            return `<span class="px-2 py-0.5 text-[11px] font-medium rounded-full border ${cls}">${escapeHtml(lbl)}</span>`;
          })
          .join('');

        return `
          <div class="p-4 hover:bg-gh-canvas/50 transition flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="flex items-start gap-3 min-w-0">
              ${statusIcon}
              <div class="space-y-1 min-w-0">
                <div class="flex items-center flex-wrap gap-2">
                  <button onclick="openIssueDetail(${issue.id})" class="text-sm sm:text-base font-semibold text-gh-text hover:text-gh-accent text-left cursor-pointer">
                    ${escapeHtml(issue.title)}
                  </button>
                  ${labelsHtml}
                </div>
                <div class="text-xs text-gh-muted flex flex-wrap items-center gap-2">
                  <span class="font-mono font-semibold text-gh-text">#${issue.id}</span>
                  <span>•</span>
                  <span>Status: <strong class="text-gh-text">${issue.status}</strong></span>
                  <span>•</span>
                  <span>Kanban: <strong class="text-gh-text">${issue.kanbanColumn}</strong></span>
                  <span>•</span>
                  <span>Sprint: <strong class="text-gh-accent">${issue.sprint}</strong></span>
                  <span>•</span>
                  <span>Assignee: <span class="font-mono text-gh-text">${escapeHtml(issue.assignee)}</span></span>
                  <span>•</span>
                  <span>💬 ${issue.comments.length}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0 self-end md:self-center">
              <span class="px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-gh-canvas border border-gh-border text-gh-text">${issue.storyPoints} SP</span>
              <button onclick="toggleIssueClosedState(${issue.id})" class="px-3 py-1.5 rounded-md text-xs font-medium border transition cursor-pointer ${isClosed ? 'bg-gh-subtle hover:bg-gh-overlay text-gh-text border-gh-border' : 'bg-gh-purple/15 hover:bg-gh-purple/25 text-gh-purpleText border-gh-purple/40'}">
                ${isClosed ? 'Reopen Issue' : 'Close Issue'}
              </button>
              <button onclick="openIssueDetail(${issue.id})" class="px-3 py-1.5 rounded-md text-xs font-medium bg-gh-canvas hover:bg-gh-overlay text-gh-text border border-gh-border transition cursor-pointer">
                Details
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    /**
     * =========================================================================
     * ISSUE DETAIL MODAL
     * =========================================================================
     */
    function openIssueDetail(issueId) {
      const issue = appState.issues.find((i) => i.id === Number(issueId));
      if (!issue) return;

      const modal = document.getElementById('issue-modal');
      document.getElementById('modal-issue-number').textContent = `#${issue.id}`;
      document.getElementById('modal-issue-title').textContent = issue.title;
      document.getElementById('modal-issue-sp-badge').textContent = `${issue.storyPoints} Story Points`;

      const stateBadge = document.getElementById('modal-issue-state-badge');
      stateBadge.textContent = issue.status;
      stateBadge.className = issue.status === 'Closed'
        ? 'px-2.5 py-0.5 text-xs font-medium rounded-full bg-gh-purple/20 text-gh-purpleText border border-gh-purple/40'
        : issue.status === 'In Progress'
        ? 'px-2.5 py-0.5 text-xs font-medium rounded-full bg-gh-warning/20 text-gh-warningText border border-gh-warning/40'
        : 'px-2.5 py-0.5 text-xs font-medium rounded-full bg-gh-success/20 text-gh-successText border border-gh-success/40';

      const acChecklist = issue.acceptanceCriteria
        .map(
          (ac) => `
          <label class="flex items-start gap-2 text-xs cursor-pointer">
            <input type="checkbox" ${ac.done ? 'checked' : ''} onchange="toggleAcceptanceCriterion(${issue.id}, '${ac.id}')" class="mt-0.5 rounded border-gh-border bg-gh-canvas text-gh-accent cursor-pointer" />
            <span class="${ac.done ? 'line-through text-gh-muted' : 'text-gh-text'}">${escapeHtml(ac.text)}</span>
          </label>
        `
        )
        .join('');

      const commentsHtml = issue.comments.length
        ? issue.comments
            .map(
              (c) => `
            <div class="bg-gh-canvas border border-gh-border rounded-lg p-3 text-xs space-y-1">
              <div class="flex justify-between text-gh-muted">
                <strong class="text-gh-text font-mono">${escapeHtml(c.author)}</strong>
                <span>${escapeHtml(c.time)}</span>
              </div>
              <p class="text-gh-text">${escapeHtml(c.text)}</p>
            </div>
          `
            )
            .join('')
        : `<p class="text-xs text-gh-muted">No comments yet. Add a standup or review note below.</p>`;

      const colOptions = KANBAN_COLUMNS.map(
        (c) => `<option value="${c.id}" ${issue.kanbanColumn === c.id ? 'selected' : ''}>${c.label}</option>`
      ).join('');

      document.getElementById('modal-issue-body').innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gh-canvas border border-gh-border rounded-lg p-3 text-xs">
          <div>
            <span class="text-gh-muted block">Assignee</span>
            <strong class="font-mono text-gh-text">${escapeHtml(issue.assignee)}</strong>
          </div>
          <div>
            <span class="text-gh-muted block">Sprint</span>
            <strong class="text-gh-accent">${escapeHtml(issue.sprint)}</strong>
          </div>
          <div>
            <span class="text-gh-muted block">Kanban Stage</span>
            <select onchange="moveIssueToColumn(${issue.id}, this.value)" class="mt-0.5 w-full bg-gh-subtle border border-gh-border rounded px-2 py-1 text-xs text-gh-text cursor-pointer">
              ${colOptions}
            </select>
          </div>
        </div>

        <div class="bg-gh-canvas border border-gh-border rounded-lg p-3 space-y-1">
          <div class="text-xs font-semibold text-gh-muted uppercase tracking-wider">User Story</div>
          <p class="text-xs sm:text-sm text-gh-text">
            As a <strong class="text-gh-text">${escapeHtml(issue.userStory.role)}</strong>, I want <strong class="text-gh-accent">${escapeHtml(issue.userStory.feature)}</strong>, so that <strong class="text-gh-successText">${escapeHtml(issue.userStory.value)}</strong>.
          </p>
        </div>

        <div class="space-y-2">
          <div class="text-xs font-semibold text-gh-muted uppercase tracking-wider">Acceptance Criteria</div>
          <div class="bg-gh-canvas border border-gh-border rounded-lg p-3 space-y-2">${acChecklist}</div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button onclick="toggleIssueClosedState(${issue.id})" class="px-3 py-1.5 rounded-md text-xs font-medium border cursor-pointer ${issue.status === 'Closed' ? 'bg-gh-success/20 text-gh-successText border-gh-success/40' : 'bg-gh-purple/20 text-gh-purpleText border-gh-purple/40'}">
            ${issue.status === 'Closed' ? 'Reopen Issue' : 'Mark Issue Closed'}
          </button>
          <button onclick="toggleIssueSprint(${issue.id})" class="px-3 py-1.5 rounded-md text-xs font-medium bg-gh-canvas hover:bg-gh-overlay text-gh-text border border-gh-border cursor-pointer">
            ${issue.sprint === 'Sprint 1' ? 'Remove from Sprint 1' : 'Assign to Sprint 1'}
          </button>
        </div>

        <div class="border-t border-gh-border pt-4 space-y-3">
          <div class="text-xs font-semibold text-gh-muted uppercase tracking-wider">Activity & Comments (${issue.comments.length})</div>
          <div class="space-y-2">${commentsHtml}</div>
          <form onsubmit="addIssueComment(${issue.id}, event)" class="flex gap-2 pt-1">
            <input id="modal-comment-input" type="text" required placeholder="Write a sprint progress or blocker comment..." class="flex-1 bg-gh-canvas border border-gh-border rounded-md px-3 py-1.5 text-xs text-gh-text placeholder-gh-muted focus:outline-none focus:border-gh-accent" />
            <button type="submit" class="px-3 py-1.5 rounded-md bg-gh-accent hover:bg-gh-accentHover text-white text-xs font-medium transition cursor-pointer">Comment</button>
          </form>
        </div>
      `;

      modal.classList.remove('hidden');
    }

    function closeIssueModal() {
      const modal = document.getElementById('issue-modal');
      if (modal) modal.classList.add('hidden');
    }

    /**
     * =========================================================================
     * DRAG & DROP HANDLERS FOR KANBAN BOARD
     * =========================================================================
     */
    let draggedIssueId = null;

    function handleDragStart(event, issueId) {
      draggedIssueId = issueId;
      event.dataTransfer.setData('text/plain', String(issueId));
      event.dataTransfer.effectAllowed = 'move';
      if (event.currentTarget) {
        event.currentTarget.classList.add('card-dragging');
      }
    }

    function handleDragEnd(event) {
      if (event.currentTarget) {
        event.currentTarget.classList.remove('card-dragging');
      }
      document.querySelectorAll('.drag-over').forEach((el) => el.classList.remove('drag-over'));
    }

    function handleDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      const colEl = event.currentTarget;
      if (colEl && !colEl.classList.contains('drag-over')) {
        colEl.classList.add('drag-over');
      }
    }

    function handleDragLeave(event) {
      const colEl = event.currentTarget;
      if (colEl && !colEl.contains(event.relatedTarget)) {
        colEl.classList.remove('drag-over');
      }
    }

    function handleDrop(event, targetColumn) {
      event.preventDefault();
      const colEl = event.currentTarget;
      if (colEl) colEl.classList.remove('drag-over');

      const rawId = event.dataTransfer.getData('text/plain') || draggedIssueId;
      draggedIssueId = null;
      if (rawId) {
        moveIssueToColumn(Number(rawId), targetColumn);
      }
    }

    /**
     * =========================================================================
     * MASTER RENDER ORCHESTRATOR & INITIALIZATION
     * =========================================================================
     */
    function renderAllViews() {
      renderHeaderKPIs();
      renderProjectSubviewContent();
      renderSprintPlanner();
      renderBurndownChart();
      renderBacklogAndStories();
      renderIssuesTab();
    }

    window.addEventListener('DOMContentLoaded', () => {
      switchTab(appState.activeTab || 'projects');
      setProjectSubview(appState.projectSubview || 'board');
      renderAllViews();

      // Close modal on Escape key or backdrop click
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeIssueModal();
      });

      const modal = document.getElementById('issue-modal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeIssueModal();
        });
      }
    });
  </script>
</body>
</html>

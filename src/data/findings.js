export const findings = [
  {
    id: 'F-007',
    severity: 'Critical',
    confidence: 84,
    title: 'Key-person clauses in 3 vendor contracts triggered by CFO departure, cascading to IT migration and service agreement compliance.',
    evidenceChain: [
      'CFO exit → key-person clause triggered (3 contracts)',
      '→ IT vendor continuity compromised',
      '→ migration timeline +4 months',
      '→ service agreement breach window opens',
    ],
    sources: 'contract_vendor_007.pdf §4.2(b), hris_termination_record_2024-11-03, it_migration_plan_v3.xlsx',
    action: 'Vendor notification workflow executed',
  },
  {
    id: 'F-011',
    severity: 'Critical',
    confidence: 91,
    title: 'Revenue concentration: top 3 customers = 67% of ARR with no expansion pipeline. Two contracts renewing in 90 days.',
    evidenceChain: [
      '3 accounts = 67% revenue',
      '→ 2 renewals in 90 days, no CSM assigned',
      '→ $4.2M ARR at risk',
    ],
    sources: 'crm_pipeline_export.json, contract_master_schedule.xlsx',
    action: 'Retention simulation queued',
  },
  {
    id: 'F-003',
    severity: 'High',
    confidence: 97,
    title: 'Management reporting diverges from source systems. Board deck shows 94% retention. CRM shows 81%.',
    evidenceChain: [
      'Board deck: 94% retention',
      '→ CRM actual: 81%',
      '→ 13-point gap unexplained in any document',
    ],
    sources: 'board_deck_q3.pdf slide 14, crm_pipeline_export.json',
    action: 'Metric reconciliation in progress',
  },
]

export const simulations = [
  {
    label: 'Restructure vendor relationships',
    selected: true,
    cost: '$340K',
    timeline: '6 wk',
    outcome: '$4.2M ARR protected',
  },
  {
    label: 'Hold and monitor',
    selected: false,
    cost: '$0',
    timeline: '—',
    outcome: '2 renewals in 90 days with no CSM assigned',
  },
  {
    label: 'Accelerate IT migration',
    selected: false,
    cost: '$1.2M',
    timeline: '12 wk',
    outcome: 'Removes single-vendor dependency',
  },
]

export const commandCenterPanels = [
  {
    id: 'connected',
    headline: 'Building the picture.',
    highlightWord: 'picture',
    subhead: 'Company data. Connected across every system.',
    body: 'Financials, contracts, customers, operations, support, engineering. Siloed in ten systems today. Connected in one knowledge layer by us. What\'s driving revenue down. What\'s driving costs up. Where the dependencies are that nobody mapped. Why.',
  },
  {
    id: 'investigation',
    headline: 'Doing the work.',
    highlightWord: 'work',
    subhead: 'Investigation. Stress-testing. Action.',
    body: 'See what\'s actually wrong, with evidence behind every claim. See the full range of actions you can take, not just the obvious ones, ranked by cost, impact, and time.',
  },
  {
    id: 'evidence',
    headline: 'Owning the outcome.',
    highlightWord: 'outcome',
    subhead: 'Where the operator works. Evidence behind everything.',
    body: 'You see what\'s on fire, what\'s drifting, and what needs your decision. You drill into the evidence behind any finding. You track whether the actions you took are working. This is where the turnaround gets managed, not in a slide deck.',
  },
]

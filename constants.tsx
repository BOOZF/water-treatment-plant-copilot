
import { AlarmSituation, AlarmItem, AssetHealth } from './types';

export const MOCK_SITUATIONS: AlarmSituation[] = [
  {
    id: 'sit-1',
    title: 'Pump P-101 Degradation – Affecting Downstream Analyzers',
    riskScore: 88,
    criticalCount: 2,
    warningCount: 3,
    symptomCount: 12,
    status: 'active'
  },
  {
    id: 'sit-2',
    title: 'Post-Filtration Turbidity Spike - Filter Bed 4',
    riskScore: 75,
    criticalCount: 1,
    warningCount: 4,
    symptomCount: 8,
    status: 'active'
  },
  {
    id: 'sit-3',
    title: 'Low Chemical Dosing Pressure - System 2',
    riskScore: 45,
    criticalCount: 0,
    warningCount: 2,
    symptomCount: 5,
    status: 'investigating'
  }
];

export const MOCK_ALARM_ITEMS: Record<string, AlarmItem[]> = {
  'sit-1': [
    {
      id: 'a-1',
      timestamp: '2023-11-24 09:15:02',
      assetName: 'P-101 (Main Feed Pump)',
      description: 'Bearing Temperature High (High-High Limit)',
      isRootCause: true,
      type: 'CRITICAL',
      explanation: 'Vibration frequency analysis shows primary harmonic at 2x motor speed, indicating mechanical misalignment causing friction.'
    },
    {
      id: 'a-2',
      timestamp: '2023-11-24 09:16:10',
      assetName: 'FT-101 (Flow Transmitter)',
      description: 'Flow Rate Erratic - Oscillating Output',
      isRootCause: false,
      type: 'SYMPTOM',
      explanation: 'Flow instability is a direct result of the pump speed hunting to compensate for mechanical resistance.'
    }
  ],
  'sit-2': [
    {
      id: 'a-4',
      timestamp: '2023-11-24 10:22:15',
      assetName: 'Filter Bed FB-04',
      description: 'Backwash Cycle Failed / Incomplete',
      isRootCause: true,
      type: 'CRITICAL',
      explanation: 'Differential pressure sensors indicate media clogging. Predictive model suggests air scour valve failed to actuate.'
    },
    {
      id: 'a-5',
      timestamp: '2023-11-24 10:25:00',
      assetName: 'AT-404 (Turbidity Analyzer)',
      description: 'Turbidity Limit Exceeded (>0.5 NTU)',
      isRootCause: false,
      type: 'WARNING',
      explanation: 'Symptom of filter breakthrough following the failed backwash sequence.'
    }
  ],
  'sit-3': [
    {
      id: 'a-6',
      timestamp: '2023-11-24 11:05:40',
      assetName: 'Dosing Pump DP-202',
      description: 'Diaphragm Rupture Alert',
      isRootCause: true,
      type: 'WARNING',
      explanation: 'Internal pressure switch detected oil-side contamination, indicative of a diaphragm failure.'
    },
    {
      id: 'a-7',
      timestamp: '2023-11-24 11:06:12',
      assetName: 'PS-202 (Pressure Switch)',
      description: 'Low Discharge Pressure',
      isRootCause: false,
      type: 'SYMPTOM',
      explanation: 'Loss of system pressure due to pump failure. Standard secondary alarm.'
    }
  ]
};

export const MOCK_ASSETS: AssetHealth[] = [
  {
    id: 'ast-1',
    name: 'Raw Water Pump P-101',
    healthScore: 68,
    direction: 'degrading',
    riskLevel: 'Medium',
    operatingWindow: '14 Days',
    lastTraining: '2023-11-01',
    modelVersion: 'v2.4.1',
    confidence: 0.94,
    drivers: [
      { name: 'Motor Current', currentValue: '145A', baseline: '130A', deviation: 11.5, importance: 'Indicates torque demand' },
      { name: 'Bearing Temp', currentValue: '82°C', baseline: '65°C', deviation: 26.1, importance: 'Primary failure indicator' },
      { name: 'Vibration', currentValue: '4.2 mm/s', baseline: '2.8 mm/s', deviation: 50.0, importance: 'Mechanical imbalance' }
    ]
  },
  {
    id: 'ast-2',
    name: 'Ozone Generator G-03',
    healthScore: 92,
    direction: 'stable',
    riskLevel: 'Low',
    operatingWindow: '60+ Days',
    lastTraining: '2023-11-15',
    modelVersion: 'v2.1.0',
    confidence: 0.88,
    drivers: [
      { name: 'Gas Flow', currentValue: '12 kg/h', baseline: '12 kg/h', deviation: 0, importance: 'Normal' },
      { name: 'Cooling Temp', currentValue: '22°C', baseline: '21°C', deviation: 4.7, importance: 'Normal' }
    ]
  },
  {
    id: 'ast-3',
    name: 'Filter Valve FV-402',
    healthScore: 42,
    direction: 'degrading',
    riskLevel: 'High',
    operatingWindow: '3 Days',
    lastTraining: '2023-10-20',
    modelVersion: 'v3.0.1',
    confidence: 0.97,
    drivers: [
      { name: 'Actuator Torque', currentValue: '88 Nm', baseline: '45 Nm', deviation: 95.5, importance: 'Valve sticking' },
      { name: 'Stroke Time', currentValue: '14s', baseline: '8s', deviation: 75.0, importance: 'Mechanical obstruction' }
    ]
  }
];

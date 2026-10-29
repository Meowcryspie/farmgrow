export interface Tank {
  id: string;
  name: string;
  subLabel: string;
  ec: number;
  temp: number;
  dosesPerHour: number;
  totalDoses: number;
  target: number;
  isOffline?: boolean;
  lastSeen?: string;
  note?: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  tanks: Tank[];
}

export interface AdminDevice {
  id: string;
  tankName: string;
  farmName: string;
  customer: string;
  status: 'Online' | 'Alarm' | 'Offline';
  ec: number;
  wifiDbm: number | null; // null if offline
  firmware: string;
  lastSeen: string;
}

export interface AttentionItem {
  deviceId: string;
  tankAndFarm: string;
  customer: string;
  issue: string;
  since: string;
  status: 'Alarm' | 'Offline' | 'Weak signal' | 'Update failed';
}

export interface LocationStat {
  name: string;
  online: number;
  total: number;
}

export interface RecentActivityItem {
  id: string;
  text: string;
  time: string;
  dotColor: 'green' | 'red' | 'grey' | 'amber';
}

export interface MessageLogEntry {
  time: string;
  direction: 'Device to server' | 'App to device';
  topic: string;
  payload: string;
  isRefused?: boolean;
}

export interface WaitingDevice {
  deviceId: string;
  registered: string;
  waiting: string;
  status: 'Not scanned yet' | 'Scanned, waiting for WiFi';
}

export interface WifiNetwork {
  ssid: string;
  bars: number;
  locked: boolean;
}

export const INITIAL_ALARM_LIMITS = {
  low: 1.4,
  high: 2.2,
};

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'farm-1',
    name: 'Farm One',
    location: 'Cameron Highlands',
    tanks: [
      {
        id: 'f1-t1',
        name: 'Tank 1',
        subLabel: 'Lettuce bay',
        ec: 1.72,
        temp: 22.4,
        dosesPerHour: 3,
        totalDoses: 128,
        target: 1.8,
      },
      {
        id: 'f1-t2',
        name: 'Tank 2',
        subLabel: 'Tomato bay',
        ec: 2.31,
        temp: 23.1,
        dosesPerHour: 5,
        totalDoses: 96,
        target: 2.0,
        note: 'above High 2.2: Alarm',
      },
      {
        id: 'f1-t3',
        name: 'Tank 3',
        subLabel: 'Herb bay',
        ec: 1.48,
        temp: 21.8,
        dosesPerHour: 2,
        totalDoses: 212,
        target: 1.5,
      },
    ],
  },
  {
    id: 'farm-2',
    name: 'Farm Two',
    location: 'Kuala Selangor',
    tanks: [
      {
        id: 'f2-t1',
        name: 'Tank 1',
        subLabel: 'Row bed 1',
        ec: 1.65,
        temp: 22.9,
        dosesPerHour: 3,
        totalDoses: 75,
        target: 1.6,
      },
      {
        id: 'f2-t2',
        name: 'Tank 2',
        subLabel: 'Row bed 2',
        ec: 1.58,
        temp: 22.7,
        dosesPerHour: 2,
        totalDoses: 88,
        target: 1.6,
      },
      {
        id: 'f2-t3',
        name: 'Tank 3',
        subLabel: 'Row bed 3',
        ec: 1.92,
        temp: 23.4,
        dosesPerHour: 4,
        totalDoses: 140,
        target: 1.6,
        note: 'Adjusting',
      },
      {
        id: 'f2-t4',
        name: 'Tank 4',
        subLabel: 'Row bed 4',
        ec: 1.61,
        temp: 22.5,
        dosesPerHour: 0,
        totalDoses: 61,
        target: 1.6,
        isOffline: true,
        lastSeen: '2 h ago',
        note: 'Offline, last seen 2 h ago',
      },
    ],
  },
];

// Baseline history patterns (to shift by tank.ec - 1.72)
export const BASE_HISTORY_24H = [1.78, 1.74, 1.70, 1.76, 1.84, 1.80, 1.73, 1.69, 1.75, 1.82, 1.77, 1.72];
export const BASE_HISTORY_7D = [1.82, 1.78, 1.75, 1.83, 1.79, 1.71, 1.76, 1.84, 1.80, 1.74, 1.69, 1.77, 1.81, 1.72];

export const RECENT_DOSES = [
  { time: '14:02', description: 'Nutrient A, +0.1 EC' },
  { time: '12:40', description: 'Nutrient A, +0.1 EC' },
  { time: '10:15', description: 'Nutrient A, +0.1 EC' },
];

export const WIFI_NETWORKS: WifiNetwork[] = [
  { ssid: 'GreenLeaf-2.4G', bars: 3, locked: true },
  { ssid: 'Farm-Office', bars: 4, locked: true },
  { ssid: 'Guest-Open', bars: 1, locked: false },
];

// Admin Overview Data
export const FLEET_KPI = {
  registered: 248,
  registeredSubtitle: '12 added this week',
  onlineNow: 228,
  onlineNowSubtitle: '95.4% of 239 paired devices',
  needAttention: 17,
  needAttentionSubtitle: '11 offline, 6 in alarm',
  waitingPair: 9,
  waitingPairSubtitle: 'Oldest registered 6 days ago',
};

export const FLEET_ONLINE_24H_POINTS = [
  95.1, 95.4, 95.0, 94.8, 95.6, 95.9, 95.2, 92.1, 93.4, 94.9, 95.3, 95.5, 95.4,
];

export const FLEET_LOCATIONS: LocationStat[] = [
  { name: 'Cameron Highlands', online: 51, total: 52 },
  { name: 'Kuala Selangor', online: 44, total: 46 },
  { name: 'Johor Bahru', online: 41, total: 41 },
  { name: 'Kuching', online: 34, total: 37 },
  { name: 'Penang', online: 33, total: 34 },
  { name: 'Kota Kinabalu', online: 25, total: 29 },
];

export const ATTENTION_LIST: AttentionItem[] = [
  {
    deviceId: 'ECM-4F2A-91C7',
    tankAndFarm: 'Tank 2, Farm One',
    customer: 'GreenLeaf Agro',
    issue: 'EC 2.31, above limit 2.2',
    since: '14 min',
    status: 'Alarm',
  },
  {
    deviceId: 'ECM-7C3D-0B52',
    tankAndFarm: 'Tank 4, Farm Two',
    customer: 'GreenLeaf Agro',
    issue: 'No signal',
    since: '2 h',
    status: 'Offline',
  },
  {
    deviceId: 'ECM-6A02-5F19',
    tankAndFarm: 'Tank 3, Greenhouse B',
    customer: 'Sunrise Greens',
    issue: 'EC 1.28, below limit 1.4',
    since: '1 h',
    status: 'Alarm',
  },
  {
    deviceId: 'ECM-1E88-D4A0',
    tankAndFarm: 'Tank 1, Hydro Bay',
    customer: 'Borneo Hydro',
    issue: 'Weak WiFi, -82 dBm',
    since: '5 h',
    status: 'Weak signal',
  },
  {
    deviceId: 'ECM-3B6E-88C1',
    tankAndFarm: 'Tank 2, Row 3',
    customer: 'Borneo Hydro',
    issue: 'Firmware update failed',
    since: '3 h',
    status: 'Update failed',
  },
  {
    deviceId: 'ECM-D951-2C77',
    tankAndFarm: 'Tank 1, Nursery',
    customer: 'Penang Leaf Co.',
    issue: 'No signal',
    since: '1 d',
    status: 'Offline',
  },
];

export const RECENT_ACTIVITY: RecentActivityItem[] = [
  {
    id: 'act-1',
    text: 'ECM-0F44-A1B9 paired by Penang Leaf Co.',
    time: '12 min ago',
    dotColor: 'green',
  },
  {
    id: 'act-2',
    text: 'Alarm: ECM-4F2A-91C7 above its high limit',
    time: '14 min ago',
    dotColor: 'red',
  },
  {
    id: 'act-3',
    text: 'Firmware 1.4.0 rolled out to 40 devices',
    time: '2 h ago',
    dotColor: 'green',
  },
  {
    id: 'act-4',
    text: 'Batch of 24 devices registered',
    time: 'Yesterday',
    dotColor: 'grey',
  },
  {
    id: 'act-5',
    text: 'ECM-D951-2C77 lost connection',
    time: '1 day ago',
    dotColor: 'amber',
  },
];

// Admin Devices Table (10 sample rows)
export const ADMIN_DEVICES: AdminDevice[] = [
  {
    id: 'ECM-4F2A-91C7',
    tankName: 'Tank 2',
    farmName: 'Farm One',
    customer: 'GreenLeaf Agro',
    status: 'Alarm',
    ec: 2.31,
    wifiDbm: -61,
    firmware: '1.3.1',
    lastSeen: '8 s ago',
  },
  {
    id: 'ECM-8D14-6E02',
    tankName: 'Tank 1',
    farmName: 'Farm One',
    customer: 'GreenLeaf Agro',
    status: 'Online',
    ec: 1.72,
    wifiDbm: -58,
    firmware: '1.3.1',
    lastSeen: '6 s ago',
  },
  {
    id: 'ECM-2B90-C7F3',
    tankName: 'Tank 3',
    farmName: 'Farm One',
    customer: 'GreenLeaf Agro',
    status: 'Online',
    ec: 1.48,
    wifiDbm: -66,
    firmware: '1.3.1',
    lastSeen: '11 s ago',
  },
  {
    id: 'ECM-7C3D-0B52',
    tankName: 'Tank 4',
    farmName: 'Farm Two',
    customer: 'GreenLeaf Agro',
    status: 'Offline',
    ec: 1.61,
    wifiDbm: null,
    firmware: '1.3.1',
    lastSeen: '2 h ago',
  },
  {
    id: 'ECM-6A02-5F19',
    tankName: 'Tank 3',
    farmName: 'Greenhouse B',
    customer: 'Sunrise Greens',
    status: 'Alarm',
    ec: 1.28,
    wifiDbm: -64,
    firmware: '1.3.1',
    lastSeen: '9 s ago',
  },
  {
    id: 'ECM-1E88-D4A0',
    tankName: 'Tank 1',
    farmName: 'Hydro Bay',
    customer: 'Borneo Hydro',
    status: 'Online',
    ec: 1.55,
    wifiDbm: -82,
    firmware: '1.2.0',
    lastSeen: '14 s ago',
  },
  {
    id: 'ECM-3B6E-88C1',
    tankName: 'Tank 2',
    farmName: 'Row 3',
    customer: 'Borneo Hydro',
    status: 'Online',
    ec: 1.83,
    wifiDbm: -70,
    firmware: '1.2.0',
    lastSeen: '20 s ago',
  },
  {
    id: 'ECM-D951-2C77',
    tankName: 'Tank 1',
    farmName: 'Nursery',
    customer: 'Penang Leaf Co.',
    status: 'Offline',
    ec: 1.90,
    wifiDbm: null,
    firmware: '1.3.1',
    lastSeen: '1 d ago',
  },
  {
    id: 'ECM-0F44-A1B9',
    tankName: 'Tank 1',
    farmName: 'Block A',
    customer: 'Penang Leaf Co.',
    status: 'Online',
    ec: 1.66,
    wifiDbm: -55,
    firmware: '1.4.0',
    lastSeen: '5 s ago',
  },
  {
    id: 'ECM-5E27-3D68',
    tankName: 'Tank 1',
    farmName: 'Greenhouse A',
    customer: 'Sunrise Greens',
    status: 'Online',
    ec: 1.74,
    wifiDbm: -60,
    firmware: '1.4.0',
    lastSeen: '7 s ago',
  },
];

// Device Detail (ECM-4F2A-91C7) Specific Mock Data
export const DEVICE_DETAIL_24H_EC = [
  1.95, 2.00, 2.02, 1.98, 2.05, 2.10, 2.08, 2.15, 2.20, 2.26, 2.29, 2.31,
];

export const DEVICE_MESSAGE_LOG: MessageLogEntry[] = [
  {
    time: '16:52:08',
    direction: 'Device to server',
    topic: 'tank2/ec',
    payload: '2.31',
  },
  {
    time: '16:52:08',
    direction: 'Device to server',
    topic: 'tank2/temp',
    payload: '23.1',
  },
  {
    time: '16:50:41',
    direction: 'App to device',
    topic: 'cmd/target',
    payload: '2.0, acknowledged',
  },
  {
    time: '16:47:15',
    direction: 'App to device',
    topic: 'cmd/limit.high',
    payload: '2.2, acknowledged',
  },
  {
    time: '16:47:02',
    direction: 'App to device',
    topic: 'cmd/target',
    payload: '5.2, refused: outside safe range 0.5 to 4.0',
    isRefused: true,
  },
  {
    time: '16:40:00',
    direction: 'Device to server',
    topic: 'status',
    payload: 'online, wifi -61 dBm',
  },
];

// Provisioning Waiting Units
export const PROVISIONING_WAITING: WaitingDevice[] = [
  {
    deviceId: 'ECM-A310-77D2',
    registered: '22 Oct',
    waiting: '6 days',
    status: 'Not scanned yet',
  },
  {
    deviceId: 'ECM-A311-0C5E',
    registered: '22 Oct',
    waiting: '6 days',
    status: 'Not scanned yet',
  },
  {
    deviceId: 'ECM-A312-9B41',
    registered: '22 Oct',
    waiting: '6 days',
    status: 'Not scanned yet',
  },
  {
    deviceId: 'ECM-B204-1F88',
    registered: '25 Oct',
    waiting: '3 days',
    status: 'Scanned, waiting for WiFi',
  },
  {
    deviceId: 'ECM-B205-6E3A',
    registered: '25 Oct',
    waiting: '3 days',
    status: 'Not scanned yet',
  },
  {
    deviceId: 'ECM-C118-D790',
    registered: '27 Oct',
    waiting: '1 day',
    status: 'Not scanned yet',
  },
];

import React, { createContext, useContext, useState } from 'react';
import type { Farm, Tank } from '../mockData';
import {
  INITIAL_FARMS,
  INITIAL_ALARM_LIMITS,
} from '../mockData';

export type TankStatusType = 'Offline' | 'Alarm' | 'Adjusting' | 'In range' | 'Dosing paused' | 'Dosing up' | 'Above target';

export interface TankStatusResult {
  label: TankStatusType;
  color: 'grey' | 'red' | 'amber' | 'green';
}

export interface PairingState {
  claimCode: string;
  selectedWifi: string;
  wifiPassword: string;
  farmChoice: string;
  tankName: string;
  cropArea: string;
}

export interface AppContextType {
  farms: Farm[];
  alarmLimits: { low: number; high: number };
  dosingModes: Record<string, 'Auto' | 'Pause'>;
  pendingTargets: Record<string, { value: number; isPending: boolean; isConfirmed: boolean }>;
  pairingState: PairingState;
  batchNotice: { count: number; firmware: string; batchId: string } | null;
  setTankTarget: (farmId: string, tankId: string, newTarget: number) => void;
  setAlarmLimits: (limits: { low: number; high: number }) => void;
  setDosingMode: (tankId: string, mode: 'Auto' | 'Pause') => void;
  doseOnce: (farmId: string, tankId: string) => void;
  updatePairingState: (updates: Partial<PairingState>) => void;
  registerBatch: (count: number, firmware: string) => void;
  clearBatchNotice: () => void;
  getTankStatus: (tank: Tank, isGaugeContext?: boolean) => TankStatusResult;
  getFarmChip: (farm: Farm) => { text: string; color: 'red' | 'amber' | 'green' };
  getDashboardTotals: () => {
    totalTanks: number;
    onlineCount: number;
    alarmCount: number;
    offlineCount: number;
  };
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [alarmLimits, setAlarmLimitsState] = useState(INITIAL_ALARM_LIMITS);
  const [dosingModes, setDosingModes] = useState<Record<string, 'Auto' | 'Pause'>>({});
  const [pendingTargets, setPendingTargets] = useState<
    Record<string, { value: number; isPending: boolean; isConfirmed: boolean }>
  >({});
  const [pairingState, setPairingState] = useState<PairingState>({
    claimCode: 'ECM-4F2A-91C7',
    selectedWifi: 'GreenLeaf-2.4G',
    wifiPassword: '••••••••••••',
    farmChoice: 'Farm One, Cameron Highlands',
    tankName: 'Tank 4',
    cropArea: 'Spinach bay',
  });
  const [batchNotice, setBatchNotice] = useState<{
    count: number;
    firmware: string;
    batchId: string;
  } | null>(null);

  const setAlarmLimits = (limits: { low: number; high: number }) => {
    // Round to 1 decimal place
    const low = Math.round(limits.low * 10) / 10;
    const high = Math.round(limits.high * 10) / 10;
    setAlarmLimitsState({ low, high });
  };

  const setDosingMode = (tankId: string, mode: 'Auto' | 'Pause') => {
    setDosingModes((prev) => ({ ...prev, [tankId]: mode }));
  };

  const setTankTarget = (farmId: string, tankId: string, newTarget: number) => {
    const rounded = Math.round(newTarget * 10) / 10;
    // Set pending state
    setPendingTargets((prev) => ({
      ...prev,
      [tankId]: { value: rounded, isPending: true, isConfirmed: false },
    }));

    // Update tank immediately in farms so values reflect
    setFarms((prevFarms) =>
      prevFarms.map((farm) => {
        if (farm.id !== farmId) return farm;
        return {
          ...farm,
          tanks: farm.tanks.map((t) => (t.id === tankId ? { ...t, target: rounded } : t)),
        };
      })
    );

    // 900ms simulated confirmation round trip
    setTimeout(() => {
      setPendingTargets((prev) => ({
        ...prev,
        [tankId]: { value: rounded, isPending: false, isConfirmed: true },
      }));
    }, 900);
  };

  const doseOnce = (farmId: string, tankId: string) => {
    setFarms((prev) =>
      prev.map((f) => {
        if (f.id !== farmId) return f;
        return {
          ...f,
          tanks: f.tanks.map((t) =>
            t.id === tankId ? { ...t, totalDoses: t.totalDoses + 1 } : t
          ),
        };
      })
    );
  };

  const updatePairingState = (updates: Partial<PairingState>) => {
    setPairingState((prev) => ({ ...prev, ...updates }));
  };

  const registerBatch = (count: number, firmware: string) => {
    setBatchNotice({
      count,
      firmware,
      batchId: 'B-1028-A',
    });
  };

  const clearBatchNotice = () => {
    setBatchNotice(null);
  };

  const getTankStatus = (tank: Tank, isGaugeContext = false): TankStatusResult => {
    // 1. Offline flag set: "Offline" (grey)
    if (tank.isOffline) {
      return { label: 'Offline', color: 'grey' };
    }

    // When on Gauge screen and Pause is selected
    const mode = dosingModes[tank.id] || 'Auto';
    if (isGaugeContext && mode === 'Pause') {
      return { label: 'Dosing paused', color: 'grey' };
    }

    // 2. EC below Low or above High: "Alarm" (red)
    if (tank.ec < alarmLimits.low || tank.ec > alarmLimits.high) {
      return { label: 'Alarm', color: 'red' };
    }

    // 3. EC differs from target by more than 0.11: "Adjusting" (amber)
    const diff = tank.ec - tank.target;
    if (Math.abs(diff) > 0.11) {
      if (isGaugeContext) {
        if (diff < 0) {
          return { label: 'Dosing up', color: 'amber' };
        } else {
          return { label: 'Above target', color: 'amber' };
        }
      }
      return { label: 'Adjusting', color: 'amber' };
    }

    // 4. Otherwise "In range" (green)
    return { label: 'In range', color: 'green' };
  };

  const getFarmChip = (farm: Farm): { text: string; color: 'red' | 'amber' | 'green' } => {
    let alarms = 0;
    let adjusting = 0;
    let offline = 0;

    farm.tanks.forEach((tank) => {
      const status = getTankStatus(tank);
      if (status.label === 'Alarm') alarms++;
      else if (status.label === 'Adjusting') adjusting++;
      else if (status.label === 'Offline') offline++;
    });

    if (alarms > 0) {
      return {
        text: `${alarms} alarm${alarms > 1 ? 's' : ''}`,
        color: 'red',
      };
    }

    if (adjusting > 0 || offline > 0) {
      const parts: string[] = [];
      if (adjusting > 0) parts.push(`${adjusting} adjusting`);
      if (offline > 0) parts.push(`${offline} offline`);
      return {
        text: parts.join(', '),
        color: 'amber',
      };
    }

    return {
      text: 'All in range',
      color: 'green',
    };
  };

  const getDashboardTotals = () => {
    let totalTanks = 0;
    let onlineCount = 0;
    let alarmCount = 0;
    let offlineCount = 0;

    farms.forEach((farm) => {
      farm.tanks.forEach((tank) => {
        totalTanks++;
        if (tank.isOffline) {
          offlineCount++;
        } else {
          onlineCount++;
        }
        const status = getTankStatus(tank);
        if (status.label === 'Alarm') {
          alarmCount++;
        }
      });
    });

    return {
      totalTanks,
      onlineCount,
      alarmCount,
      offlineCount,
    };
  };

  return (
    <AppContext.Provider
      value={{
        farms,
        alarmLimits,
        dosingModes,
        pendingTargets,
        pairingState,
        batchNotice,
        setTankTarget,
        setAlarmLimits,
        setDosingMode,
        doseOnce,
        updatePairingState,
        registerBatch,
        clearBatchNotice,
        getTankStatus,
        getFarmChip,
        getDashboardTotals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

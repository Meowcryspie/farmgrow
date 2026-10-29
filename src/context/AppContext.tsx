import React, { createContext, useContext, useState, useEffect } from 'react';
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

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface DosingProgressState {
  isDosing: boolean;
  progress: number;
  ml: number;
}

export interface AppContextType {
  farms: Farm[];
  alarmLimits: { low: number; high: number };
  dosingModes: Record<string, 'Auto' | 'Pause'>;
  pendingTargets: Record<string, { value: number; isPending: boolean; isConfirmed: boolean }>;
  pairingState: PairingState;
  batchNotice: { count: number; firmware: string; batchId: string } | null;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  deviceFrame: boolean;
  setDeviceFrame: (enabled: boolean) => void;
  isLiveTelemetry: boolean;
  setIsLiveTelemetry: (active: boolean) => void;
  activeToast: ToastMessage | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: () => void;
  dosingProgress: Record<string, DosingProgressState>;
  setTankTarget: (farmId: string, tankId: string, newTarget: number) => void;
  setAlarmLimits: (limits: { low: number; high: number }) => void;
  setDosingMode: (tankId: string, mode: 'Auto' | 'Pause') => void;
  doseOnce: (farmId: string, tankId: string, ml?: number) => void;
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

  // Theme & Modern Appearance States
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      const saved = localStorage.getItem('ec-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {}
    return 'system';
  });

  const [deviceFrame, setDeviceFrameState] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ec-device-frame') !== 'false';
    } catch {
      return true;
    }
  });

  const [isLiveTelemetry, setIsLiveTelemetry] = useState<boolean>(true);
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);
  const [dosingProgress, setDosingProgress] = useState<Record<string, DosingProgressState>>({});

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    try {
      const meta = document.querySelector('meta[name="color-scheme"]');
      if (newTheme === 'system') {
        localStorage.removeItem('ec-theme');
        if (meta) meta.setAttribute('content', 'light dark');
        document.documentElement.removeAttribute('data-theme');
      } else {
        localStorage.setItem('ec-theme', newTheme);
        if (meta) meta.setAttribute('content', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    } catch {}
  };

  const setDeviceFrame = (val: boolean) => {
    setDeviceFrameState(val);
    try {
      localStorage.setItem('ec-device-frame', String(val));
    } catch {}
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setActiveToast({ id, title, message, type });
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  // Auto-dismiss toasts after 4 seconds
  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeToast]);

  // Live telemetry micro-drift simulation
  useEffect(() => {
    if (!isLiveTelemetry) return;
    const interval = setInterval(() => {
      setFarms((prevFarms) =>
        prevFarms.map((farm) => ({
          ...farm,
          tanks: farm.tanks.map((tank) => {
            if (tank.isOffline) return tank;
            // Subtle jitter +/- 0.015
            const jitter = (Math.random() - 0.49) * 0.02;
            const newEc = Math.round(Math.max(1.1, Math.min(2.7, tank.ec + jitter)) * 100) / 100;
            const tempJitter = (Math.random() - 0.5) * 0.1;
            const newTemp = Math.round((tank.temp + tempJitter) * 10) / 10;
            return {
              ...tank,
              ec: newEc,
              temp: newTemp,
            };
          }),
        }))
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [isLiveTelemetry]);

  const setAlarmLimits = (limits: { low: number; high: number }) => {
    const low = Math.round(limits.low * 10) / 10;
    const high = Math.round(limits.high * 10) / 10;
    setAlarmLimitsState({ low, high });
    showToast('Alarm Thresholds Updated', `Low: ${low.toFixed(1)} EC · High: ${high.toFixed(1)} EC`, 'info');
  };

  const setDosingMode = (tankId: string, mode: 'Auto' | 'Pause') => {
    setDosingModes((prev) => ({ ...prev, [tankId]: mode }));
    showToast(`Dosing Mode: ${mode}`, `Mode for ${tankId} switched to ${mode}`, mode === 'Auto' ? 'success' : 'warning');
  };

  const setTankTarget = (farmId: string, tankId: string, newTarget: number) => {
    const rounded = Math.round(newTarget * 10) / 10;
    setPendingTargets((prev) => ({
      ...prev,
      [tankId]: { value: rounded, isPending: true, isConfirmed: false },
    }));

    setFarms((prevFarms) =>
      prevFarms.map((farm) => {
        if (farm.id !== farmId) return farm;
        return {
          ...farm,
          tanks: farm.tanks.map((t) => (t.id === tankId ? { ...t, target: rounded } : t)),
        };
      })
    );

    setTimeout(() => {
      setPendingTargets((prev) => ({
        ...prev,
        [tankId]: { value: rounded, isPending: false, isConfirmed: true },
      }));
      showToast('Setpoint Confirmed', `Controller synced target to ${rounded.toFixed(1)} mS/cm`, 'success');
    }, 850);
  };

  const doseOnce = (farmId: string, tankId: string, ml = 20) => {
    if (dosingProgress[tankId]?.isDosing) return;

    setDosingProgress((prev) => ({
      ...prev,
      [tankId]: { isDosing: true, progress: 15, ml },
    }));

    showToast('Dosing In Progress', `Injecting ${ml}ml into ${tankId}...`, 'info');

    let prog = 15;
    const interval = setInterval(() => {
      prog += 25;
      if (prog >= 100) {
        clearInterval(interval);
        setDosingProgress((prev) => ({
          ...prev,
          [tankId]: { isDosing: false, progress: 100, ml },
        }));

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

        showToast('Dosing Complete', `Successfully injected ${ml}ml nutrient mix. Pump pressure nominal.`, 'success');
      } else {
        setDosingProgress((prev) => ({
          ...prev,
          [tankId]: { isDosing: true, progress: prog, ml },
        }));
      }
    }, 400);
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
    if (tank.isOffline) {
      return { label: 'Offline', color: 'grey' };
    }

    const mode = dosingModes[tank.id] || 'Auto';
    if (isGaugeContext && mode === 'Pause') {
      return { label: 'Dosing paused', color: 'grey' };
    }

    if (tank.ec < alarmLimits.low || tank.ec > alarmLimits.high) {
      return { label: 'Alarm', color: 'red' };
    }

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
        theme,
        setTheme,
        deviceFrame,
        setDeviceFrame,
        isLiveTelemetry,
        setIsLiveTelemetry,
        activeToast,
        showToast,
        dismissToast,
        dosingProgress,
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

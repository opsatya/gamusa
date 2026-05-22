import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface User {
  phone: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  phone: string;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = 'gamusa_auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readAuthStorage = (): {
  isAuthenticated: boolean;
  user: User | null;
  phone: string;
} | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const writeAuthStorage = (value: {
  isAuthenticated: boolean;
  user: User | null;
  phone: string;
}) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const stored = readAuthStorage();
    if (stored) {
      setIsAuthenticated(Boolean(stored.isAuthenticated));
      setUser(stored.user);
      setPhone(stored.phone || '');
    }
  }, []);

  useEffect(() => {
    writeAuthStorage({ isAuthenticated, user, phone });
  }, [isAuthenticated, user, phone]);

  const sendOtp = async (phoneValue: string) => {
    if (!/^[0-9]{10}$/.test(phoneValue)) {
      throw new Error('Phone must be exactly 10 digits');
    }
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    setPhone(phoneValue);
  };

  const verifyOtp = async (phoneValue: string, otp: string) => {
    if (!/^[0-9]{6}$/.test(otp)) {
      throw new Error('Invalid OTP. Please try again.');
    }
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    if (otp !== '123456') {
      throw new Error('Invalid OTP. Please try again.');
    }
    setUser({ phone: phoneValue, name: 'Gamusa Shopper' });
    setIsAuthenticated(true);
    setPhone(phoneValue);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPhone('');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({ isAuthenticated, user, phone, sendOtp, verifyOtp, logout }),
    [isAuthenticated, user, phone]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

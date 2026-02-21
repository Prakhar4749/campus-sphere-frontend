import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));
  const [loading, setLoading] = useState(true);

  const decodeAndSetUser = (jwtToken) => {
    try {
      const decoded = jwtDecode(jwtToken);
      console.info('[AuthContext] Decoded JWT payload:', decoded);
      
      // In some JWTs, the role might be a single string or a nested object/array.
      // Based on the user's provided token, it's a string: "DEPT_ADMIN"
      const roleFromToken = decoded.role || decoded.userRole || decoded.roles?.[0];
      
      console.info(`[AuthContext] Extracted role from token: ${roleFromToken}`);

      // Map the token claims to a user object
      const userData = {
        id: decoded.userId || decoded.id || decoded.sub, // Fallback to sub (email) if ID is not in token
        email: decoded.sub,
        role: roleFromToken,
        status: decoded.status,
        ...decoded
      };
      
      setUser(userData);
      if (roleFromToken) {
        localStorage.setItem('user_role', roleFromToken);
        localStorage.setItem('user_id', userData.id);
      } else {
        console.warn('[AuthContext] No role key found in token payload during decoding');
      }
      return userData;
    } catch (error) {
      console.error('[AuthContext] Failed to decode token:', error);
      logout();
      return null;
    }
  };

  const login = (userData, jwtToken) => {
    console.info(`[AuthContext] Processing login for: ${userData?.email || 'unknown'}`);
    localStorage.setItem('jwt_token', jwtToken);
    setToken(jwtToken);
    
    // Always decode token to get the "source of truth" for the role
    const decodedUser = decodeAndSetUser(jwtToken);
    
    // If userData (response from server) has an id, merge it into the user state
    if (userData?.userId || userData?.id) {
      setUser(prev => ({ 
        ...prev, 
        id: userData.userId || userData.id,
        ...userData 
      }));
      localStorage.setItem('user_id', userData.userId || userData.id);
    }
    
    if (decodedUser) {
        console.info(`[AuthContext] Session established for role: ${decodedUser.role}`);
    }
  };

  const logout = () => {
    console.info('[AuthContext] Clearing session and redirecting to login');
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  };

  useEffect(() => {
    const initializeAuth = () => {
      const savedToken = localStorage.getItem('jwt_token');
      if (savedToken) {
        console.info('[AuthContext] Initializing session from saved token');
        decodeAndSetUser(savedToken);
      } else {
        console.info('[AuthContext] No session token found');
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      role: user?.role || localStorage.getItem('user_role'), 
      login, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
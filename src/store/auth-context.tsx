import { useContext, useEffect, createContext, ReactNode } from 'react';
import { User } from 'model';
import { routes } from 'routes';
import { AppRouteType } from 'types';
import { useMergeState } from 'hooks';
import { authService } from 'services';
import { LogoAnimation } from 'components';
import { getAccessToken, removeToken, setToken } from 'services/token.service';
import {
  matchPath,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import workspaceService from 'services/workspace.services';
import { useAppDispatch } from 'store';
import { initMyWorkspace } from 'store/my-workspace.slice';
import { useTranslation } from 'react-i18next';

interface AuthContextType {
  isFirstLoading: boolean;
  loading: boolean;
  accessToken: null | string | undefined;
  profile: null | User;
  language: string;
  isAuth: boolean;
  onSignInWithPassword: (credentials: {
    email: string;
    password: string;
  }) => Promise<any>;
  onSignUpWithPassword: (data: User) => Promise<any>;
  onSignUpWithGoogle: (token: string, data: User) => Promise<any>;
  onSignUpWithMicrosoft: (token: string, data: User) => Promise<any>;
  onSignInWithGoogle: (token: string) => Promise<any>;
  onSignInWithMicrosoft: (token: string) => Promise<any>;
  onSignOut: () => void;
  onChangeLanguage: (language: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isFirstLoading: true,
  loading: false,
  accessToken: null,
  profile: null,
  isAuth: false,
  language: 'en',
  onSignInWithPassword: () => Promise.resolve(),
  onSignUpWithPassword: () => Promise.resolve(),
  onSignUpWithGoogle: () => Promise.resolve(),
  onSignUpWithMicrosoft: () => Promise.resolve(),
  onSignInWithGoogle: () => Promise.resolve(),
  onSignInWithMicrosoft: () => Promise.resolve(),
  onSignOut: () => {},
  onChangeLanguage: () => { },
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const accessToken = getAccessToken();
  const { i18n } = useTranslation();

  // get the current path with query params
  const [userData, setUserData] = useMergeState({
    isFirstLoading: true,
    loading: false,
    accessToken,
    isAuth: false,
    profile: null,
    language: 'en',
  });

  const currentPage = routes?.find((_: AppRouteType) =>
    matchPath(_.path, location.pathname) ? true : false
  );
    
  useEffect(() => {
    if (!userData?.accessToken) {
      setUserData({ isFirstLoading: false });
    }

    if (!currentPage) {
      navigate('/', { replace: true });
    }
    if (!userData?.accessToken && currentPage?.auth) {
      setUserData({ isFirstLoading: false });
      navigate(
        { pathname: '/auth' },
        { replace: true }
      ); // If not authenticated, force log in
    }
    if (userData?.accessToken && !userData.profile) {
      getProfileAndMyWorkspace();
    }
  }, [userData?.accessToken, currentPage]);

  useEffect(() => {
    if (userData?.accessToken && userData?.profile) {
      // check permission
      if (currentPage?.roles) {
        navigate('/404', { replace: true });
      } else if (!currentPage?.auth && !currentPage?.isPublic) {
        // if already signed in, auto redirect to homepage if accesss to non-auth page
        navigate('/', { replace: true });
      }
    }
  }, [userData?.accessToken, userData?.profile, currentPage]);

  const onSignInWithPassword = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      setUserData({ loading: true });
      const { token } = await authService.signInWithPassword(credentials);
      setSearchParams(searchParams);
      setToken(token);
      console.log(token)
      setUserData({ accessToken: token });
    } catch (error: any) {
      setUserData({ isFirstLoading: false, loading: false });
      throw error;
    }
  };

  const onSignUpWithGoogle = async (token: string, data: User) => {
    try {
      setUserData({ loading: true });
      const { registerUserOutput } = await authService.googleRegister({
        token,
        data
      });
      const accessToken = registerUserOutput?.token;
      setSearchParams(searchParams);
      setToken(accessToken);
      setUserData({ accessToken });
    } catch (error) {
      console.log(error);
      setUserData({ isFirstLoading: false, loading: false });
      throw error;
    }
  };

  const onSignInWithGoogle = async (token: string) => {
    try {
      setUserData({ loading: true });
      const { isExist, token: accessToken } = await authService.googleLogin({ token });
      if (isExist && accessToken) {
        setSearchParams(searchParams);
        setToken(accessToken);
        setUserData({ accessToken });
      }
    } catch (error: any) {
      setUserData({ isFirstLoading: false, loading: false });
      throw error;
    }
  };

  const onSignUpWithMicrosoft = async (token: string, data: User) => {
    try {
      setUserData({ loading: true });
      const { registerUserOutput } = await authService.microsoftRegister({
        token,
        data,
      });
      const accessToken = registerUserOutput?.token;
      setSearchParams(searchParams);
      setToken(accessToken);
      setUserData({ accessToken });
    } catch (error) {
      console.log(error);
      setUserData({ isFirstLoading: false, loading: false });
      throw error;
    }
  };

  const onSignInWithMicrosoft = async (token: string) => {
    try {
      setUserData({ loading: true });
      const { isExist, token: accessToken } = await authService.microsoftLogin({
        token,
      });
      if (isExist && accessToken) {
        setSearchParams(searchParams);
        setToken(accessToken);
        setUserData({ accessToken });
      }
    } catch (error: any) {
      setUserData({ isFirstLoading: false, loading: false });
      throw error;
    }
  };

  const onSignUpWithPassword = async (data: User) => {
    try {
      setUserData({ loading: true });
      const { registerUserOutput } = await authService.signUpWithPassword(data);
      const accessToken = registerUserOutput?.token;
      setSearchParams(searchParams);
      setToken(accessToken);
      setUserData({ accessToken });
    } catch (error: any) {
      console.log(error);
      setUserData({ isFirstLoading: false, loading: false });
      throw error;
    }
  };

  const getProfileAndMyWorkspace = async () => {
    try {
      setUserData({ loading: true });
      const user = await authService.profile();
      const workspace = await workspaceService.getMyWorkspace({
        include: 'Projects'
      });
      dispatch(initMyWorkspace(workspace));
      setUserData({
        isFirstLoading: false,
        loading: false,
        profile: user,
        isAuth: true,
      });
      if (currentPage?.name === 'Auth') {
        navigate('/', { replace: true });
      }
    } catch (error: any) {
      onSignOut();
    }
  };

  const onSignOut = async () => {
    try {
      if (userData?.profile) {
        await authService.signOut();
      }
    } catch (error) {}
    dispatch(initMyWorkspace(null));
    setUserData({
      isFirstLoading: false,
      loading: false,
      accessToken: null,
      idToken: null,
      isAuth: false,
      profile: null,
    });
    removeToken();
    navigate(
      { pathname: '/auth' },
      { replace: true }
    ); // If not authenticated, force log in
  };

  const onChangeLanguage = async (language: string) => {
    i18n.changeLanguage(language);
    setUserData({ language });
  };

  return (
    <AuthContext.Provider
      value={{
        onSignInWithPassword,
        onSignUpWithPassword,
        onSignUpWithGoogle,
        onSignUpWithMicrosoft,
        onSignInWithGoogle,
        onSignInWithMicrosoft,
        onSignOut,
        onChangeLanguage,
        isFirstLoading: userData.isFirstLoading,
        loading: userData.loading,
        accessToken: userData.accessToken,
        profile: userData.profile,
        language: userData.language || 'en',
        isAuth: userData.isAuth,
      }}
    >
      {userData?.isFirstLoading || currentPage?.roles ? (
        <LogoAnimation appendToBody />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;

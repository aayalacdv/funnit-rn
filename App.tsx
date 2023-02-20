import { NativeBaseProvider } from 'native-base';
import UserContextProvider from './context/UserContextProvider';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { NavigationSetup } from './screens/NavigationSetup';
import { useSavedCredentials } from './hooks/useSavedCredentials';
import { useCallback, useContext, useEffect } from 'react';
import { UserContext } from './context/user-context';


const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 2 } } })
export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <UserContextProvider>
          <NavigationSetup />
        </UserContextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

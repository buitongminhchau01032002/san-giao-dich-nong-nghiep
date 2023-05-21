import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppTabsNavigator from './AppTabsNavigator';
import NAVIGATION_KEY from '../constants/NavigationKey';
import HomeScreen from '../screens/HomeScreen';
import SamplePopupScreen from '../screens/SamplePopupScreen';
import ProductListScreen from '../screens/ProductListScreen';

export default function Navigation() {
    // hooks
    // action
    const prepare = async () => {
        // await waitAsyncAction(2000);
        // rehydrate
        // const token = (await storage.get('token')) ?? '';
        // dispatch(reLogin({ token: token }));
        // dispatch(
        //     changeApplicationState({
        //         isAppReady: true,
        //     }),
        // );
    };

    return (
        <NavigationContainer onReady={prepare}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
    // const isAppReady = useAppSelector((state) => state.application.isAppReady);
    // const { isLogin } = useAppSelector((state) => state.auth);
    const isLogin = true;
    // console.log(isAppReady);
    // if (!isAppReady) {
    //     return <IntroScreen />;
    // }
    return (
        <Stack.Navigator>
            {!isLogin ? (
                <Stack.Screen name={NAVIGATION_KEY.Auth} component={AuthNavigator} options={{ headerShown: false }} />
            ) : (
                <>
                    <Stack.Screen
                        name={NAVIGATION_KEY.AppTabs}
                        component={AppTabsNavigator}
                        options={{ headerShown: false }}
                    />
                </>
            )}
            <Stack.Group navigationKey={isLogin ? 'user' : 'guest'} screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name={NAVIGATION_KEY.SamplePopup}
                    component={SamplePopupScreen}
                    options={{ headerShown: true }}
                />
            </Stack.Group>

            <Stack.Group navigationKey={isLogin ? 'user' : 'guest'} screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name={NAVIGATION_KEY.ProductList}
                    component={ProductListScreen}
                    options={{ 
                        title:"Phân loại",
                        headerShown: true }}
                />
            </Stack.Group>
            
        </Stack.Navigator>
    );
}

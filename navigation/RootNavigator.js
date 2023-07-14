import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppTabsNavigator from './AppTabsNavigator';
import NAVIGATION_KEY from '../constants/NavigationKey';
import SamplePopupScreen from '../screens/SamplePopupScreen';
import DetailProductScreen from '../screens/DetailProductScreen';
import SupplierRegisterScreen from '../screens/UserScreens/SupplierRegister/RegisterScreen';
import SellProductScreen from '../screens/UserScreens/SellProduct';

import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors/userSelector';
import QuotationDetailScreen from '../screens/QuotationScreen/QuotationDetailScreen';

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
    // const isLogin = true;
    const user = useSelector(userSelector);
    // console.log(isAppReady);
    // if (!isAppReady) {
    //     return <IntroScreen />;
    // }
    return (
        <Stack.Navigator>
            {!user ? (
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
            <Stack.Group navigationKey={user ? 'user' : 'guest'} screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name={NAVIGATION_KEY.SamplePopup}
                    component={SamplePopupScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name={NAVIGATION_KEY.Cart}
                    component={CartScreen}
                    options={{
                        title: 'Giỏ hàng',
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name={NAVIGATION_KEY.ProductList}
                    component={ProductListScreen}
                    options={{
                        title: 'Phân loại',
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name={NAVIGATION_KEY.DetailProduct}
                    component={DetailProductScreen}
                    options={{ title: 'Chi tiết', headerShown: true }}
                />

                <Stack.Screen
                    name={NAVIGATION_KEY.SupplierRegister}
                    options={{
                        title: 'Đăng ký nhà cung cấp',
                        headerBackTitleVisible: false,
                        headerBackTitle: null,
                    }}
                    component={SupplierRegisterScreen}
                />
                <Stack.Screen
                    name={NAVIGATION_KEY.SellProduct}
                    options={{
                        title: 'Đăng bán sản phẩm',
                        headerBackTitleVisible: false,
                        headerBackTitle: null,
                    }}
                    component={SellProductScreen}
                />
                <Stack.Screen
                    name={NAVIGATION_KEY.QuotationDetail}
                    options={{
                        title: 'Chi tiết báo giá',
                        headerBackTitleVisible: false,
                        headerBackTitle: null,
                    }}
                    component={QuotationDetailScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

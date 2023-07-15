import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NAVIGATION_KEY from '../constants/NavigationKey';
import HomeScreen from '../screens/HomeScreen';
import { MyTabBar } from './MyTabBar';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { IconButton, useTheme } from 'native-base';
import UserScreen from '../screens/UserScreens/UserScreen';
import QuotationScreen from '../screens/QuotationScreen';
import AllProductListScreen from '../screens/ProductListScreen/allProduct';
import { useNavigation } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

export default function AppTabsNavigator() {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <BottomTab.Navigator
            initialRouteName={NAVIGATION_KEY.Home}
            tabBar={(props) => <MyTabBar {...props} />}
            screenOptions={{
                headerShadowVisible: false,
                headerRight: () => (
                    <IconButton
                        onPress={() => navigation.navigate(NAVIGATION_KEY.Cart)}
                        mr={2}
                        icon={<AntDesign name="shoppingcart" size={24} color="#444" />}
                    />
                ),
            }}
        >
            <BottomTab.Screen
                name={NAVIGATION_KEY.Home}
                component={HomeScreen}
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: () => <Ionicons name="home-outline" size={24} color={colors.primary[500]} />,
                }}
            />
            <BottomTab.Screen
                name={NAVIGATION_KEY.Quotation}
                component={QuotationScreen}
                options={{
                    title: 'Báo giá',
                    tabBarIcon: () => <Ionicons name="pricetag-outline" size={24} color={colors.primary[500]} />,
                }}
            />
            <BottomTab.Screen
                name="Search"
                component={AllProductListScreen}
                options={{
                    title: 'Tìm kiếm',
                    tabBarIcon: () => <Ionicons name="search-outline" size={24} color={colors.primary[500]} />,
                }}
            />
            <BottomTab.Screen
                name={NAVIGATION_KEY.User}
                component={UserScreen}
                options={{
                    title: 'Cá nhân',
                    tabBarIcon: () => <AntDesign name="user" size={24} color={colors.primary[500]} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

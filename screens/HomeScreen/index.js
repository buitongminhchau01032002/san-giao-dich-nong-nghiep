import { Button, Center, Text } from 'native-base';
import NAVIGATION_KEY from '../../constants/NavigationKey';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';

function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    return (
        <Center flex={1}>
            <Text mb={6}>Home Screen 🔥</Text>
            <Button onPress={() => navigation.navigate(NAVIGATION_KEY.SamplePopup)}>Open Popup</Button>
            <Button onPress={() => navigation.navigate(NAVIGATION_KEY.ProductList)}>ProductList Screen</Button>
            <Button onPress={() => navigation.navigate(NAVIGATION_KEY.Cart)}>Cart Screen</Button>
            <Button onPress={() => navigation.navigate(NAVIGATION_KEY.DetailProduct)}>Open Detail Product</Button>
            <Button onPress={() => dispatch(userActions.logout())}>Logout</Button>
        </Center>
    );
}

export default HomeScreen;

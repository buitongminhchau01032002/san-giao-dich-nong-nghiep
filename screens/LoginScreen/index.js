import { Center, Text, Input, Button, View, Image, useToast } from 'native-base';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import NAVIGATION_KEY from '../../constants/NavigationKey';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';
import API from '../../constants/Api';

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const toast = useToast();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const showClick = () => setShow(!show);
    const [loading, setLoading] = useState(false);
    // const forgetPassword = () => {};

    async function handleLogin() {
        try {
            setLoading(true);
            const res = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await res.json();
            if (data.error) {
                toast.show({ description: data.error.message });
                console.log(data.error);
                return;
            }
            dispatch(userActions.login(data));
            toast.show({ description: 'Đăng nhập thành công!' });
        } catch (error) {
            console.log(error);
            toast.show({ description: 'Something went wrong!' });
        } finally {
            setLoading(false);
        }
    }
    return (
        <Center flex={1}>
            <Text fontSize={22} marginBottom={'10'} fontWeight={'medium'}>
                Đăng nhập
            </Text>
            <Input
                marginBottom={'30'}
                width={'300'}
                height={'10'}
                fontSize={'16'}
                variant="underlined"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                _light={{
                    placeholderTextColor: 'blueGray.400',
                }}
                _dark={{
                    placeholderTextColor: 'blueGray.50',
                }}
            />
            <Input
                width={'300'}
                height={'10'}
                fontSize={'16'}
                variant="underlined"
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                _light={{
                    placeholderTextColor: 'blueGray.400',
                }}
                _dark={{
                    placeholderTextColor: 'blueGray.50',
                }}
                type={show ? 'text' : 'password'}
                InputRightElement={
                    <Button
                        pb={0}
                        backgroundColor={'transparent'}
                        justifyContent={'center'}
                        ml={1}
                        roundedLeft={0}
                        roundedRight="md"
                        onPress={showClick}
                    >
                        {show ? (
                            <Ionicons name="eye-outline" size={24} color="black" />
                        ) : (
                            <Ionicons name="eye-off-outline" size={24} color="black" />
                        )}
                    </Button>
                }
            />

            {/* <Text
                onPress={forgetPassword}
                fontSize={12}
                marginTop={2}
                fontStyle={'italic'}
                alignSelf={'flex-end'}
                marginRight={10}
                fontWeight={'light'}
            >
                Quên mật khẩu ?
            </Text> */}
            <Button
                isDisabled={loading}
                fontSize={'16'}
                margin={'10'}
                borderRadius={'30'}
                width={'300'}
                onPress={handleLogin}
            >
                ĐĂNG NHẬP
            </Button>
            <View marginBottom={10} flexDirection={'row'}>
                <Text>Chưa có tài khoản ? </Text>
                <Text color={'darkBlue.500'} onPress={() => navigation.navigate(NAVIGATION_KEY.Signup)}>
                    Đăng ký ngay
                </Text>
            </View>
            <Image
                borderRadius={'10'}
                source={{
                    uri: 'https://i.pinimg.com/564x/b7/fd/93/b7fd938fc2d1ac2f51cd5aa888c014d8.jpg',
                }}
                alt="Alternate Text"
                width={200}
                height={200}
            />
        </Center>
    );
}

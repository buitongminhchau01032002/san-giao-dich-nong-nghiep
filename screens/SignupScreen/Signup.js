import { Center, Text, Input, Button, View, Image, useToast } from 'native-base';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import NAVIGATION_KEY from '../../constants/NavigationKey';
import API from '../../constants/Api';
import { userActions } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

export default function SignupScreen({ navigation }) {
    const dispatch = useDispatch();
    const toast = useToast();
    const [show, setShow] = useState(false);
    const showClick = () => setShow(!show);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignup() {
        if (confirmPassword !== password) {
            toast.show({ description: 'Mật khẩu xác nhận không khớp!' });
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`${API}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    phone,
                    name,
                }),
            });
            const data = await res.json();
            if (data.error) {
                toast.show({ description: data.error.message });
                console.log(data.error);
                return;
            }
            dispatch(userActions.login(data));
            toast.show({ description: 'Đăng ký thành công!' });
        } catch (error) {
            console.log(error);
            toast.show({ description: 'Có lỗi xảy ra!' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Center flex={1}>
            <Text fontSize={22} marginBottom={'10'} fontWeight={'medium'}>
                Đăng ký
            </Text>
            <Input
                marginBottom={'30'}
                width={'300'}
                height={'10'}
                fontSize={'16'}
                variant="underlined"
                placeholder="Email"
                _light={{
                    placeholderTextColor: 'blueGray.400',
                }}
                _dark={{
                    placeholderTextColor: 'blueGray.50',
                }}
                value={email}
                onChangeText={setEmail}
            />
            <Input
                marginBottom={'30'}
                width={'300'}
                height={'10'}
                fontSize={'16'}
                variant="underlined"
                placeholder="Họ và tên"
                _light={{
                    placeholderTextColor: 'blueGray.400',
                }}
                _dark={{
                    placeholderTextColor: 'blueGray.50',
                }}
                value={name}
                onChangeText={setName}
            />
            <Input
                marginBottom={'30'}
                width={'300'}
                height={'10'}
                fontSize={'16'}
                variant="underlined"
                placeholder="Điện thoại"
                _light={{
                    placeholderTextColor: 'blueGray.400',
                }}
                _dark={{
                    placeholderTextColor: 'blueGray.50',
                }}
                value={phone}
                onChangeText={setPhone}
            />
            <Input
                width={'300'}
                marginBottom={'30'}
                height={'10'}
                fontSize={'16'}
                variant="underlined"
                placeholder="Mật khẩu"
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
                value={password}
                onChangeText={setPassword}
            />
            <Input
                width={'300'}
                height={'10'}
                fontSize={'16'}
                variant="underlined"
                placeholder="Xác nhận mật khẩu"
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
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Button
                isDisabled={loading}
                fontSize={'16'}
                margin={'10'}
                borderRadius={'30'}
                width={'300'}
                onPress={handleSignup}
            >
                ĐĂNG KÝ
            </Button>
            <View marginBottom={10} flexDirection={'row'}>
                <Text>Đã có tài khoản ? </Text>
                <Text color={'darkBlue.500'} onPress={() => navigation.navigate(NAVIGATION_KEY.Login)}>
                    Đăng nhập
                </Text>
            </View>
        </Center>
    );
}

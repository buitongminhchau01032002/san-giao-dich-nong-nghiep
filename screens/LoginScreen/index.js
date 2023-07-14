import { Center, Text, Input, Button, View, Image, useToast, FormControl } from 'native-base';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import NAVIGATION_KEY from '../../constants/NavigationKey';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';
import API from '../../constants/Api';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validateScheme = Yup.object({
    email: Yup.string().required('Vui lòng điền email'),
    password: Yup.string().required('Vui lòng điền mật khẩu'),
});
const initFormValue = {
    email: '',
    password: '',
};

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const toast = useToast();
    const [show, setShow] = useState(false);
    const showClick = () => setShow(!show);
    const [loading, setLoading] = useState(false);
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);

    // const forgetPassword = () => {};

    async function handleLogin(values) {
        console.log('12312');
        try {
            const res = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
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
            toast.show({ description: ' Có lỗi xảy ra!' });
        } finally {
            setLoading(false);
        }
    }
    return (
        <Formik
            initialValues={initFormValue}
            validationSchema={validateScheme}
            onSubmit={(values) => handleLogin(values)}
            validateOnChange={isValidateOnChange}
        >
            {({ handleSubmit, handleChange, errors, values, validateForm, setFieldValue }) => (
                <Center p="4" m={4} flex={1}>
                    <Text fontSize={22} marginBottom={'10'} fontWeight={'medium'}>
                        Đăng nhập
                    </Text>
                    <FormControl isRequired isInvalid={!!errors.email}>
                        <FormControl.Label>Tên tài khoản</FormControl.Label>
                        <Input
                            width={'300'}
                            height={'10'}
                            fontSize={'16'}
                            variant="underlined"
                            placeholder="Nhập email của bạn"
                            value={values.email}
                            
                            onChangeText={handleChange('email')}
                            _light={{
                                placeholderTextColor: 'blueGray.400',
                            }}
                            _dark={{
                                placeholderTextColor: 'blueGray.50',
                            }}
                        />
                        <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={!!errors.email}>
                        <FormControl.Label>Mật khẩu</FormControl.Label>
                        <Input
                            width={'300'}
                            height={'10'}
                            fontSize={'16'}
                            variant="underlined"
                            placeholder="Nhập mật khẩu"
                            value={values.password}
                            onChangeText={handleChange('password')}
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
                        <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
                    </FormControl>
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
                        disabled={loading}
                        onPressIn={() => {
                            setIsValidateOnChange(true);
                            setLoading(true);
                            validateForm()
                                .then(() => {
                                    console.log('then');
                                    handleSubmit();
                                })
                                .catch(() => {
                                    console.log('catch');
                                    setLoading(false);
                                });
                        }}
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
            )}
        </Formik>
    );
}

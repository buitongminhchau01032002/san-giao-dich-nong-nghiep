import { Center, Text, Input, Button, View, Image, useToast,FormControl } from 'native-base';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import NAVIGATION_KEY from '../../constants/NavigationKey';
import API from '../../constants/Api';
import { userActions } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validateScheme = Yup.object({
    email: Yup.string().required('Vui lòng điền email').email('Email không đúng định dạng'),
    name: Yup.string().required('Vui lòng điền tên'),
    phonenumber: Yup.string().required('Vui lòng điền số điện thoại'),
    password: Yup.string().required('Vui lòng điền mật khẩu'),
    repassword: Yup.string().required('Vui lòng xác nhận mật khẩu'),
});
const initFormValue = {
    email: '',
    name: '',
    phonenumber: '',
    password: '',
    repassword: '',
};

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
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);

    async function handleSignup(values) {
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
                body: JSON.stringify(values),
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
        <Formik
            initialValues={initFormValue}
            validationSchema={validateScheme}
            onSubmit={(values) => handleSignup(values)}
            validateOnChange={isValidateOnChange}
        >
            {({ handleSubmit, handleChange, errors, values, validateForm, setFieldValue }) => (
                <Center p="4" m={4} flex={1}>
            <Text fontSize={22} marginBottom={'10'} fontWeight={'medium'}>
                Đăng ký
            </Text>
            <FormControl isRequired isInvalid={!!errors.email}>
            <FormControl.Label>Email</FormControl.Label>

            <Input
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
                value={values.email}
                onChangeText={handleChange('email')}
            />
            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl mt={3} isRequired isInvalid={!!errors.name}>
            <FormControl.Label>Họ và tên</FormControl.Label>

            <Input
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
                value={values.name}
                onChangeText={handleChange('name')}
            />
            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            </FormControl>
            
            <FormControl mt={3} isRequired isInvalid={!!errors.phonenumber}>
            <FormControl.Label>Số Điện Thoại</FormControl.Label>
            <Input
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
                value={values.phonenumber}
                onChangeText={handleChange('phonenumber')}
            />
            <FormControl.ErrorMessage>{errors.phonenumber}</FormControl.ErrorMessage>
            </FormControl>
            
            <FormControl mt={3} isRequired isInvalid={!!errors.password}>
            <FormControl.Label>Mật khẩu</FormControl.Label>
            <Input
                width={'300'}
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
                value={values.password}
                onChangeText={handleChange('password')}
            />
            <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
            </FormControl>
            
            <FormControl mt={3} isRequired isInvalid={!!errors.repassword}>
            <FormControl.Label>Xác nhận mật khẩu</FormControl.Label>
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
                value={values.repassword}
                onChangeText={handleChange('repassword')}
            />
<FormControl.ErrorMessage>{errors.repassword}</FormControl.ErrorMessage>
            </FormControl>
            
            <Button
                isDisabled={loading}
                fontSize={'16'}
                margin={'10'}
                borderRadius={'30'}
                width={'300'}
                onPressIn={() => {
                    setIsValidateOnChange(true);
                    validateForm()
                        .then(() => {
                            console.log('then');
                            handleSubmit();
                        })
                       
                }}            >
                ĐĂNG KÝ
            </Button>
            <View marginBottom={10} flexDirection={'row'}>
                <Text>Đã có tài khoản ? </Text>
                <Text color={'darkBlue.500'} onPress={() => navigation.navigate(NAVIGATION_KEY.Login)}>
                    Đăng nhập
                </Text>
            </View>
        </Center>
            )}
            </Formik>
    );
}

import { Button, Center, Text, Input, View, FormControl,ScrollView,Toast } from 'native-base';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import ImageInput from '../SellProduct/components/ImageInput';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/selectors/userSelector';
import API from '../../../constants/Api';

const validateScheme = Yup.object({
    brandName: Yup.string().required('Vui lòng điền tên thương hiệu'),
    address: Yup.string().required('Vui lòng điền địa chỉ nhà vườn'),
    scale: Yup.string().required('Vui lòng điền quy mô nhà vườn'),
    capicity: Yup.string().required('Vui lòng điền sản lượng cung cấp'),
    description: Yup.string().required('Vui lòng giới thiệu nhà vườn'),
    imageSeller: Yup.string().required('Vui lòng thêm hình ảnh nhà vườn'),
});

const initFormValue = {
    
    brandName: '',
    address:'',
    scale: '',
    capicity: '',
    description: '',
    imageSeller: '',
};
function SupplierRegisterScreen({ navigation }) {
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const user=useSelector(userSelector)
    async function handleSellerRegister(values) {
        try {
            setLoading(true);
            const res = await fetch(`${API}/users/register-seller`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify({...values,phone:user.phone}),
            });
            const data = await res.json();
            if (data.error) {
                Toast.show({ description: data.error.message });
                console.log(data.error);
                return;
            }
            Toast.show({ description: 'Đã trở thành nhà cung cấp!' });
            navigation.goBack();
        } catch (error) {
            console.log(error);
            Toast.show({ description: 'Có lỗi xảy ra!' });
        } finally {
            setLoading(false);
        }
    }
    return (
        <View flex={1}>
            <View
                py={4}
                pb={2}
                justifyContent={'flex-start'}
                alignItems={'flex-end'}
                h={'88'}
                bg={'white'}
                flexDirection={'row'}
                shadow={2}
            >
                <Text
                    px={4}
                    onPress={() => navigation.goBack()}
                    fontWeight={'normal'}
                    color={'red.500'}
                    fontSize={18}
                    mr={3}
                >
                    Trở về
                </Text>
                <Text fontWeight={'semibold'} fontSize={17}>
                    Trở thành nhà cung cấp
                </Text>
                <Text
                    px={4}
                    onPress={() => navigation.goBack()}
                    fontWeight={'normal'}
                    color={'red.500'}
                    fontSize={18}
                ></Text>
            </View>
            <ScrollView>

            <Formik
                initialValues={initFormValue}
                validationSchema={validateScheme}
                onSubmit={(values) => handleSellerRegister(values)}
                validateOnChange={isValidateOnChange}
            >
                {({ handleSubmit, handleChange, errors, values, validateForm, setFieldValue }) => (
                        <View p="4" m={4} borderRadius={10} bg="white">
                        <View pt={4} pl={4} pr={4} width={'full'}>
                            <FormControl isRequired isInvalid={!!errors.brandName}>
                                <FormControl.Label>Tên thương hiệu</FormControl.Label>
                                <Input
                                    fontSize={18}
                                    fontWeight={'medium'}
                                    variant="underlined"
                                    value={values.brandName}
                                    onChangeText={handleChange('brandName')}
                                />
                                <FormControl.ErrorMessage>{errors.brandName}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View pt={4} pl={4} pr={4} width={'full'}>
                            <FormControl isRequired isInvalid={!!errors.address}>
                                <FormControl.Label>Địa chỉ nhà vườn</FormControl.Label>
                                <Input
                                    fontSize={18}
                                    fontWeight={'medium'}
                                    variant="underlined"
                                    value={values.address}
                                    onChangeText={handleChange('address')}
                                />
                                <FormControl.ErrorMessage>{errors.address}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View pt={4} pl={4} pr={4} width={'full'}>
                            <FormControl isRequired isInvalid={!!errors.scale}>
                                <FormControl.Label>Quy mô nhà vườn</FormControl.Label>
                                <Input
                                    keyboardType='numeric'
                                    fontSize={18}
                                    fontWeight={'medium'}
                                    variant="underlined"
                                    value={values.scale}
                                    onChangeText={handleChange('scale')}
                                />
                                <FormControl.ErrorMessage>{errors.scale}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View pt={4} pl={4} pr={4} width={'full'}>
                            <FormControl isRequired isInvalid={!!errors.capicity}>
                                <FormControl.Label>Sản lượng cung cấp</FormControl.Label>
                                <Input
                                    fontSize={18}
                                    fontWeight={'medium'}
                                    variant="underlined"
                                    value={values.capicity}
                                    onChangeText={handleChange('capicity')}
                                />
                                <FormControl.ErrorMessage>{errors.capicity}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <View pt={4} pl={4} pr={4} width={'full'}>
                            <FormControl isRequired isInvalid={!!errors.description}>
                                <FormControl.Label>Giới thiệu nhà vườn</FormControl.Label>
                                <Input
                                    fontSize={18}
                                    fontWeight={'medium'}
                                    variant="underlined"
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                />
                                <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>

                        <View flexDirection={'row'} pt={4} pl={4} pr={4} width={'full'}>
                        <FormControl isRequired isInvalid={!!errors.imageSeller} mt="4">
                                <FormControl.Label>Hình ảnh sản phẩm</FormControl.Label>
                                <ImageInput
                                    mt="2"
                                    initValue={values.imageSeller}
                                    onChange={(imageSeller) => setFieldValue('imageSeller', imageSeller)}
                                />
                                <FormControl.ErrorMessage>{errors.imageSeller}</FormControl.ErrorMessage>
                            </FormControl>
                        </View>
                        <Button
                                rounded="full"
                                mt="4"
                                disabled={loading}
                                onPressIn={() => {
                                    setIsValidateOnChange(true);
                                    setLoading(true);
                                    validateForm().then(() => {
                                        handleSubmit();
                                    });
                                }}
                            >
                                ĐĂNG KÍ
                            </Button>
                    </View>
                )}
            </Formik>
            </ScrollView>
        </View>
    );
}

export default SupplierRegisterScreen;

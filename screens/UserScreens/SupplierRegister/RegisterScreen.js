import { Button, Center, Text, Input, View, FormControl,ScrollView } from 'native-base';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import ImageInput from '../SellProduct/components/ImageInput';
const validateScheme = Yup.object({
    brand: Yup.string().required('Vui lòng điền tên thương hiệu'),
    scale: Yup.number('Vui lòng nhập số').required('Vui lòng điền quy mô nhà vườn'),
    capicity: Yup.string().required('Vui lòng điền sản lượng cung cấp'),
    description: Yup.string().required('Vui lòng giới thiệu nhà vườn'),
    image: Yup.string().required('Vui lòng thêm hình ảnh nhà vườn'),
});

const initFormValue = {
    brand: '',
    scale: '',
    capicity: '',
    description: '',
    image: '',
};
function SupplierRegisterScreen({ navigation }) {
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSellerRegister(values) {}
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
                            <FormControl isRequired isInvalid={!!errors.brand}>
                                <FormControl.Label>Tên thương hiệu</FormControl.Label>
                                <Input
                                    fontSize={18}
                                    fontWeight={'medium'}
                                    variant="underlined"
                                    value={values.brand}
                                    onChangeText={handleChange('brand')}
                                />
                                <FormControl.ErrorMessage>{errors.brand}</FormControl.ErrorMessage>
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
                        <FormControl isRequired isInvalid={!!errors.image} mt="4">
                                <FormControl.Label>Hình ảnh sản phẩm</FormControl.Label>
                                <ImageInput
                                    mt="2"
                                    initValue={values.image}
                                    onChange={(image) => setFieldValue('image', image)}
                                />
                                <FormControl.ErrorMessage>{errors.image}</FormControl.ErrorMessage>
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

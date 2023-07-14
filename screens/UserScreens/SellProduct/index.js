import { Button, Select, Center, Text, Input, View, ScrollView, HStack, FormControl, Toast } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ImageInput from './components/ImageInput';
import { Platform } from 'react-native';
import API from '../../../constants/Api';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/selectors/userSelector';

const validateScheme = Yup.object({
    name: Yup.string().required('Tên sản phẩm là bắt buộc'),
    category: Yup.string().required('Danh mục là bắt buộc'),
    price: Yup.number().required('Giá là bắt buộc').min(1, 'Giá phải lớn hơn 0'),
    unit: Yup.string().required('Đơn vị là bắt buộc'),
    quantity: Yup.number().required('Số lượng là bắt buộc').min(1, 'Số lượng phải lớn hơn 0'),
    minPurchase: Yup.number().required('Số lượng tối thiểu là bắt buộc').min(1, 'Số lượng tối thiểu phải lớn hơn 0'),
    description: Yup.string().required('Mô tả sản phẩm là bắt buộc'),
    image: Yup.string().required('Hình ảnh là bắt buộc'),
});
const initFormValue = {
    name: '',
    category: '',
    price: '',
    unit: '',
    quantity: '',
    minPurchase: '',
    description: '',
    image: '',
};

function SellProductScreen({ navigation }) {
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);
    const user = useSelector(userSelector);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const formikRef = useRef();

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const res = await fetch(`${API}/categories`);
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleCreateProduct(values) {
        try {
            setLoading(true);
            const res = await fetch(`${API}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (data.error) {
                Toast.show({ description: data.error.message });
                console.log(data.error);
                return;
            }
            formikRef.current?.resetForm();
            Toast.show({ description: 'Đăng bán thành công!' });
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
                    mr={8}
                >
                    Trở về
                </Text>
                <Text fontWeight={'semibold'} fontSize={17}>
                    Đăng bán sản phẩm
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
                    innerRef={formikRef}
                    initialValues={initFormValue}
                    validationSchema={validateScheme}
                    onSubmit={(values) => handleCreateProduct(values)}
                    validateOnChange={isValidateOnChange}
                >
                    {({ handleSubmit, handleChange, errors, values, validateForm, setFieldValue }) => (
                        <View p="4" m={4} borderRadius={10} bg="white">
                            <FormControl isRequired isInvalid={!!errors.name}>
                                <FormControl.Label>Tên sản phẩm</FormControl.Label>
                                <Input
                                    fontSize={16}
                                    variant="underlined"
                                    placeholder="VD: Dưa hấu không hạt"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                />
                                <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl mt="4" isRequired isInvalid={!!errors.category}>
                                <FormControl.Label>Danh mục</FormControl.Label>
                                <Select
                                    mt={1}
                                    placeholder="Chọn danh mục"
                                    accessibilityLabel="Chọn danh mục"
                                    fontSize={14}
                                    selectedValue={values.category}
                                    onValueChange={handleChange('category')}
                                >
                                    {categories?.map((category) => (
                                        <Select.Item key={category._id} label={category.name} value={category._id} />
                                    ))}
                                </Select>
                                <FormControl.ErrorMessage>{errors.category}</FormControl.ErrorMessage>
                            </FormControl>

                            <HStack mt="4" space={5}>
                                <FormControl flex="1" mtFormControl="4" isRequired isInvalid={!!errors.price}>
                                    <FormControl.Label>Giá bán</FormControl.Label>
                                    <Input
                                        keyboardType="numeric"
                                        fontSize={16}
                                        variant="underlined"
                                        placeholder="VD: 10000"
                                        rightElement={<Text fontSize={16}>₫</Text>}
                                        value={values.price}
                                        onChangeText={handleChange('price')}
                                    />
                                    <FormControl.ErrorMessage>{errors.price}</FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={!!errors.unit} flex="1">
                                    <FormControl.Label>Đơn vị</FormControl.Label>
                                    <Select
                                        fontSize={14}
                                        placeholder="Đơn vị"
                                        selectedValue={values.unit}
                                        onValueChange={handleChange('unit')}
                                    >
                                        <Select.Item label="Kg" value="kg" />
                                        <Select.Item label="Tạ" value="tạ" />
                                        <Select.Item label="Tấn" value="tấn" />
                                        <Select.Item label="Bó" value="bó" />
                                        <Select.Item label="Gói" value="gói" />
                                        <Select.Item label="Thùng" value="thùng" />
                                    </Select>
                                    <FormControl.ErrorMessage>{errors.unit}</FormControl.ErrorMessage>
                                </FormControl>
                            </HStack>

                            <HStack mt="4" space={5}>
                                <FormControl isRequired isInvalid={!!errors.quantity} flex="1">
                                    <FormControl.Label>Số lượng</FormControl.Label>
                                    <Input
                                        keyboardType="numeric"
                                        fontSize={16}
                                        variant="underlined"
                                        placeholder="VD: 1000"
                                        value={values.quantity}
                                        onChangeText={handleChange('quantity')}
                                    />
                                    <FormControl.ErrorMessage>{errors.quantity}</FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={!!errors.minPurchase} flex="1">
                                    <FormControl.Label>Mua tối thiểu</FormControl.Label>
                                    <Input
                                        keyboardType="numeric"
                                        fontSize={16}
                                        variant="underlined"
                                        placeholder="VD: 10"
                                        value={values.minPurchase}
                                        onChangeText={handleChange('minPurchase')}
                                    />
                                    <FormControl.ErrorMessage>{errors.minPurchase}</FormControl.ErrorMessage>
                                </FormControl>
                            </HStack>

                            <FormControl isRequired isInvalid={!!errors.description} mt="4">
                                <FormControl.Label>Giới thiệu sản phẩm</FormControl.Label>
                                <Input
                                    multiline={true}
                                    fontSize={16}
                                    variant="underlined"
                                    placeholder="VD: Sản phẩm tươi ngon từ Đà Lạt."
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                />
                                <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={!!errors.image} mt="4">
                                <FormControl.Label>Hình ảnh sản phẩm</FormControl.Label>
                                <ImageInput
                                    mt="2"
                                    initValue={values.image}
                                    onChange={(image) => setFieldValue('image', image)}
                                />
                                <FormControl.ErrorMessage>{errors.image}</FormControl.ErrorMessage>
                            </FormControl>
                            <Button
                                rounded="full"
                                mt="4"
                                disabled={loading}
                                onPressIn={() => {
                                    setIsValidateOnChange(true);
                                    validateForm().then(() => {
                                        handleSubmit();
                                    });
                                }}
                            >
                                ĐĂNG BÁN
                            </Button>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );
}

export default SellProductScreen;

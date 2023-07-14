import { Button, Select, Center, Text, Input, View, ScrollView, HStack, FormControl, Toast } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { userSelector } from '../../redux/selectors/userSelector';
import API from '../../constants/Api';
import { useSelector } from 'react-redux';

const validateScheme = Yup.object({
    productName: Yup.string().required('Tên sản phẩm là bắt buộc'),
    category: Yup.string().required('Danh mục là bắt buộc'),
    quantity: Yup.number().required('Số lượng là bắt buộc'),
    unit: Yup.string().required('Đơn vị là bắt buộc'),
    price: Yup.number().required('Giá là bắt buộc'),
    description: Yup.string().required('Mô tả là bắt buộc'),
});
const initFormValue = {
    productName: '',
    category: '',
    quantity: '',
    unit: '',
    price: '',
    description: '',
};

function CreateQuotationRequestScreen({ navigation }) {
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

    async function handleCreateQuotationRequest(values) {
        try {
            console.log('post');
            setLoading(true);
            const res = await fetch(`${API}/quotation-requests`, {
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
            Toast.show({ description: 'Tạo báo giá thành công!' });
        } catch (error) {
            console.log(error);
            Toast.show({ description: 'Có lỗi xảy ra!' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <View flex={1}>
            <ScrollView>
                <Formik
                    innerRef={formikRef}
                    initialValues={initFormValue}
                    validationSchema={validateScheme}
                    onSubmit={(values) => handleCreateQuotationRequest(values)}
                    validateOnChange={isValidateOnChange}
                >
                    {({ handleSubmit, handleChange, errors, values, validateForm, setFieldValue }) => (
                        <View p="4" m={4} borderRadius={10} bg="white">
                            <FormControl isRequired isInvalid={!!errors.productName}>
                                <FormControl.Label>Tên sản phẩm</FormControl.Label>
                                <Input
                                    fontSize={16}
                                    variant="underlined"
                                    placeholder="VD: Dưa hấu không hạt"
                                    value={values.productName}
                                    onChangeText={handleChange('productName')}
                                />
                                <FormControl.ErrorMessage>{errors.productName}</FormControl.ErrorMessage>
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
                                <FormControl flex="1" isRequired isInvalid={!!errors.price}>
                                    <FormControl.Label>Giá mong muốn</FormControl.Label>
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

                            <FormControl mt="4" isRequired isInvalid={!!errors.quantity} flex="1">
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

                            <FormControl isRequired isInvalid={!!errors.description} mt="4">
                                <FormControl.Label>Mô tả sản phẩm</FormControl.Label>
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

                            <Button
                                rounded="full"
                                mt="4"
                                disabled={loading}
                                onPress={() => {
                                    setIsValidateOnChange(true);
                                    validateForm().then(() => {
                                        handleSubmit();
                                    });
                                }}
                            >
                                TẠO BÁO GIÁ
                            </Button>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );
}

export default CreateQuotationRequestScreen;

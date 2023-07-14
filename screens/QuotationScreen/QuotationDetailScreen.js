import { Box, Button, FormControl, HStack, Image, Input, ScrollView, Text, Toast, View } from 'native-base';
import { useEffect, useState } from 'react';
import API from '../../constants/Api';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';
import { useRef } from 'react';

function QuotationCard({ quotation, onChange }) {
    const user = useSelector(userSelector);
    async function handleAbort() {
        try {
            const res = await fetch(`${API}/quotations/update-state/${quotation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify({
                    state: 'abort',
                }),
            });
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            onChange();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAccept() {
        try {
            const res = await fetch(`${API}/quotations/update-state/${quotation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify({
                    state: 'confirm',
                }),
            });
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            onChange();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box
            p="3"
            mt="2"
            rounded="8"
            bg="white"
            borderWidth={1}
            borderColor={
                quotation?.state === 'pending' ? 'yellow.400' : quotation?.state === 'abort' ? 'red.400' : 'green.400'
            }
        >
            <HStack alignItems="center">
                <Image alt="" src={quotation?.seller?.avatar} bg="gray.300" rounded="full" w="6" h="6" />
                <Text color="gray.700" pl="2">
                    {quotation?.seller?.name}
                </Text>
            </HStack>
            <Text fontSize={18} bold color="primary.600">
                {quotation?.price + '₫'}
            </Text>
            {quotation?.description && <Text color="gray.600">{quotation?.description}</Text>}
            <HStack justifyContent="space-between">
                <Box>
                    {quotation?.state === 'pending' && (
                        <Text fontWeight="medium" color="yellow.600">
                            Đang chờ
                        </Text>
                    )}
                    {quotation?.state === 'abort' && (
                        <Text fontWeight="medium" color="red.600">
                            Đã huỷ
                        </Text>
                    )}
                    {quotation?.state === 'confirm' && (
                        <Text fontWeight="medium" color="green.600">
                            Đã xác nhận
                        </Text>
                    )}
                </Box>
                {quotation?.state === 'pending' && (
                    <HStack space={2}>
                        <Pressable onPress={handleAbort}>
                            <Text color="red.600" underline>
                                Huỷ
                            </Text>
                        </Pressable>
                        <Pressable onPress={handleAccept}>
                            <Text color="green.600" underline>
                                Xác nhận
                            </Text>
                        </Pressable>
                    </HStack>
                )}
            </HStack>
        </Box>
    );
}

const validateScheme = Yup.object({
    price: Yup.number().required('Giá là bắt buộc').min(1, 'Giá phải lớn hơn 0'),
});
const initFormValue = {
    price: '',
    description: '',
};

export default function QuotationDetailScreen({ navigation, route }) {
    const { quotationRequestId } = route.params;
    const [quotationRequest, setQuotationRequest] = useState(null);
    const [quotations, setQuotations] = useState([]);
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);
    const user = useSelector(userSelector);
    const [loading, setLoading] = useState(false);
    const [isShowList, setIsShowList] = useState(true);
    const formikRef = useRef();
    useEffect(() => {
        fetchQuotationRequest();
        fetchQuotations();
    }, []);

    async function handleCreateQuotation(values) {
        try {
            setLoading(true);
            const res = await fetch(`${API}/quotations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify({ ...values, request: quotationRequest._id }),
            });
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                Toast.show({ description: data.error.message });
                return;
            }
            formikRef.current?.resetForm();
            Toast.show({ description: 'Tạo báo giá thành công' });
            fetchQuotations();
        } catch (error) {
            console.log(error);
            Toast.show({ description: 'Có lỗi xảy ra!' });
        } finally {
            setLoading(false);
        }
    }

    async function fetchQuotationRequest() {
        try {
            const res = await fetch(`${API}/quotation-requests/${quotationRequestId}`);
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            setQuotationRequest(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchQuotations() {
        try {
            const res = await fetch(`${API}/quotations/of-request/${quotationRequestId}`);
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            console.log('data', data);

            setQuotations(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box flex={1} p="3">
            <Box mb="3" p="3" bg="white" rounded={8}>
                <HStack alignItems="center">
                    <Image alt="" src={quotationRequest?.user?.avatar} bg="gray.300" rounded="full" w="6" h="6" />
                    <Text color="gray.700" pl="2">
                        {quotationRequest?.user?.name}
                    </Text>
                </HStack>
                <Text fontSize={18} bold>
                    {quotationRequest?.productName}
                </Text>
                <HStack>
                    <Text color="primary.600">{quotationRequest?.category?.name}</Text>
                    <Text>{' | '}</Text>
                    <Text>Số lượng: {quotationRequest?.quantity + ' ' + quotationRequest?.unit}</Text>
                </HStack>
                <HStack justifyContent="space-between" alignItems="flex-end">
                    <Text fontSize={18} bold color="primary.600">
                        {quotationRequest?.price + '₫'}
                    </Text>
                    <Text fontSize="12">
                        {moment(quotationRequest?.startDate).format('DD/MM/YYYY') +
                            ' - ' +
                            moment(quotationRequest?.endDate).format('DD/MM/YYYY')}
                    </Text>
                </HStack>
            </Box>

            {!isShowList && (
                <Box my="3" bg="white" rounded={8}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={initFormValue}
                        validationSchema={validateScheme}
                        onSubmit={(values) => handleCreateQuotation(values)}
                        validateOnChange={isValidateOnChange}
                    >
                        {({ handleSubmit, handleChange, errors, values, validateForm, setFieldValue }) => (
                            <View p="4" m={4} borderRadius={10} bg="white">
                                <FormControl mt="4" isRequired isInvalid={!!errors.price}>
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
                                <Button rounded="full" mt="4" bg="yellow.600" onPress={() => setIsShowList(true)}>
                                    DANH SÁCH BÁO GIÁ
                                </Button>
                            </View>
                        )}
                    </Formik>
                </Box>
            )}

            {isShowList && (
                <>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize={18} fontWeight="medium" onPress={handleCreateQuotation}>
                            Danh sách báo giá
                        </Text>
                        <Button onPress={() => setIsShowList(false)}>Tạo báo giá</Button>
                    </HStack>
                    <ScrollView>
                        {quotations?.map((quotation) => (
                            <QuotationCard
                                key={quotation._id}
                                quotation={quotation}
                                onChange={() => fetchQuotations()}
                            />
                        ))}
                    </ScrollView>
                </>
            )}
        </Box>
    );
}

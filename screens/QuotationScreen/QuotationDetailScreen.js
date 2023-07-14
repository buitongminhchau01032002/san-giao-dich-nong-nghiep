import { Box, HStack, Image, ScrollView, Text } from 'native-base';
import { useEffect, useState } from 'react';
import API from '../../constants/Api';
import moment from 'moment';
import { Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';

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

export default function QuotationDetailScreen({ navigation, route }) {
    const { quotationRequestId } = route.params;
    const [quotationRequest, setQuotationRequest] = useState(null);
    const [quotations, setQuotations] = useState([]);
    useEffect(() => {
        fetchQuotationRequest();
        fetchQuotations();
    }, []);

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
            <Text fontSize={18} fontWeight="medium">
                Danh sách báo giá
            </Text>
            <ScrollView>
                {quotations?.map((quotation) => (
                    <QuotationCard key={quotation._id} quotation={quotation} onChange={() => fetchQuotations()} />
                ))}
            </ScrollView>
        </Box>
    );
}

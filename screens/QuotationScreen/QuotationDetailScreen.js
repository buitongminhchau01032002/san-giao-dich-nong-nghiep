import { Box, HStack, Image, Text } from 'native-base';
import { useEffect, useState } from 'react';
import API from '../../constants/Api';
import moment from 'moment';

export default function QuotationDetailScreen({ navigation, route }) {
    const { quotationRequestId } = route.params;
    const [quotationRequest, setQuotationRequest] = useState(null);
    const [quotations, setQuotations] = useState([]);
    useEffect(() => {
        fetchQuotationRequest();
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
        </Box>
    );
}

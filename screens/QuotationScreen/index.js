import { Box, Button, Center, HStack, ScrollView, Text } from 'native-base';
import { useEffect } from 'react';
import { useState } from 'react';
import API from '../../constants/Api';
import QuotationRequestCard from '../../components/QuotationRequestCard';

export default function QuotationScreen() {
    const [quotationRequests, setQuotationRequests] = useState([]);

    useEffect(() => {
        fetchQuotationRequests();
    }, []);

    async function fetchQuotationRequests() {
        try {
            const res = await fetch(`${API}/quotation-requests`);
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            setQuotationRequests(data);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(quotationRequests);

    return (
        <Box px="3">
            <HStack justifyContent="space-between" alignItems="center">
                <Text bold fontSize="18">
                    Danh sách yêu cầu
                </Text>
                <Button>Tạo yêu cầu</Button>
            </HStack>

            <ScrollView>
                {quotationRequests.map((quotationRequest) => (
                    <QuotationRequestCard key={quotationRequest._id} quotationRequest={quotationRequest} />
                ))}
                {quotationRequests.map((quotationRequest) => (
                    <QuotationRequestCard key={quotationRequest._id} quotationRequest={quotationRequest} />
                ))}
                {quotationRequests.map((quotationRequest) => (
                    <QuotationRequestCard key={quotationRequest._id} quotationRequest={quotationRequest} />
                ))}
                {quotationRequests.map((quotationRequest) => (
                    <QuotationRequestCard key={quotationRequest._id} quotationRequest={quotationRequest} />
                ))}
                {quotationRequests.map((quotationRequest) => (
                    <QuotationRequestCard key={quotationRequest._id} quotationRequest={quotationRequest} />
                ))}
                {quotationRequests.map((quotationRequest) => (
                    <QuotationRequestCard key={quotationRequest._id} quotationRequest={quotationRequest} />
                ))}
            </ScrollView>
        </Box>
    );
}

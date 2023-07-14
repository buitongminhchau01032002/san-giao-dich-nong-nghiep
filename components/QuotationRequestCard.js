import { useNavigation } from '@react-navigation/native';
import moment from 'moment/moment';
import { Box, HStack, Image, Pressable, Text } from 'native-base';
import NAVIGATION_KEY from '../constants/NavigationKey';

export default function QuotationRequestCard({ quotationRequest }) {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() =>
                navigation.navigate(NAVIGATION_KEY.QuotationDetail, { quotationRequestId: quotationRequest._id })
            }
        >
            <Box mb="3" p="3" bg="white" rounded={8}>
                <HStack alignItems="center">
                    <Image alt="" src={quotationRequest?.user?.avatar} bg="gray.300" rounded="full" w="6" h="6" />
                    <Text color="gray.700" pl="2">
                        {quotationRequest?.user?.name}
                    </Text>
                </HStack>
                <Text fontSize={18} bold>
                    {quotationRequest.productName}
                </Text>
                <HStack>
                    <Text color="primary.600">{quotationRequest.category?.name}</Text>
                    <Text>{' | '}</Text>
                    <Text>Số lượng: {quotationRequest?.quantity + ' ' + quotationRequest.unit}</Text>
                </HStack>
                <HStack justifyContent="space-between" alignItems="flex-end">
                    <Text fontSize={18} bold color="primary.600">
                        {quotationRequest.price + '₫'}
                    </Text>
                    <Text fontSize="12">
                        {moment(quotationRequest.startDate).format('DD/MM/YYYY') +
                            ' - ' +
                            moment(quotationRequest.endDate).format('DD/MM/YYYY')}
                    </Text>
                </HStack>
            </Box>
        </Pressable>
    );
}

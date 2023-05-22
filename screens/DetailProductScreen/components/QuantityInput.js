import { Feather } from '@expo/vector-icons';
import { Center, HStack, IconButton, Text, View } from 'native-base';

export default function QuantityInput({ value = 1, max, min, setValue }) {
    function increase() {
        const newValue = value + 1;
        if (newValue > max) {
            return;
        }
        setValue(newValue);
    }
    function decrease() {
        const newValue = value - 1;
        if (newValue < min) {
            return;
        }
        setValue(newValue);
    }
    return (
        <HStack>
            <IconButton
                borderColor="gray.500"
                borderWidth="1"
                size={9}
                onPress={decrease}
                icon={<Feather name="minus" size={20} color="black" />}
            />
            <Center borderWidth="1" borderColor="gray.500" w="20">
                <Text>{value}</Text>
            </Center>
            <IconButton
                borderColor="gray.500"
                borderWidth="1"
                size={9}
                onPress={increase}
                icon={<Feather name="plus" size={20} color="black" />}
            />
        </HStack>
    );
}

import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Box, Center, HStack, Pressable, Image, VStack, Flex, Text } from 'native-base';
import AppColors from '../constants/AppColors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
const UpAndDownItem = props => {
    const [number, setNumber] = useState(1);
    const decrease = () => {
        if (number == 0) return;
        setNumber(number - 1);
      };
    const increase = () => {
        setNumber(number + 1);
      };
    return (
        <Box style={styles.container}>
            <Pressable style={[styles.squareButton, styles.updownButton]}
            onPress={increase}>
                <Center>
                    <Text fontWeight={800}>+</Text>
                </Center>
            </Pressable>
            <TextInput style={[styles.squareButton, styles.quantityBox]} defaultValue={number?.toString()} value={number?.toString()} keyboardType = 'numeric' numeric 
            onChangeText={(textValue) => {
                if(!isNaN(textValue) && !isNaN(parseInt(textValue))) {
                    setNumber(parseInt(textValue))
                  } else if (textValue === "") {
                    setNumber(0)
                  }
           }}>
                
            </TextInput>
            <Pressable style={[styles.squareButton, styles.updownButton]}
            onPress={decrease}
            >
                <Center>
                    <Text fontWeight={800}> - </Text>
                </Center>
            </Pressable>
        </Box>
    );
};
const styles = StyleSheet.create({
    squareButton: {
        borderColor: '#1FA97C',
        borderWidth: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flexDirection: 'row',
        height:26,
        flex: 1,
    },
    updownButton: {
        flex: 1,
    },
    quantityBox: {
        flex: 2,
        textAlign:'center'
    },
});
export default UpAndDownItem;

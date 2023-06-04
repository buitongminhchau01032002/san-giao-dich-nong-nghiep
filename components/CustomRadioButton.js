import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Box, Center, HStack, Pressable, Image, VStack, Flex, Text } from 'native-base';
import AppColors from '../constants/AppColors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CustomRadioButton() {
    const [checked, setChecked] = React.useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    return (
        <Pressable
        onPress={toggleCheckbox}>
            {
            (checked == true) ? <>
            <Ionicons style={styles.alignCenter} name="checkmark-circle" size={25} color="#1FA97C" />
            </> : <>
            <Ionicons style={styles.alignCenter} name="ellipse" size={25} color="#D9D9D9" /></>}
        </Pressable>
    );
}
const styles = StyleSheet.create({
    alignCenter: {
        alignSelf: 'center',
    },
});
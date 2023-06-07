import React from 'react';
import { HStack, Input, Text, View } from 'native-base';
import { StyleSheet, SafeAreaView, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProductSearchBar = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="Tìm kiếm"></TextInput>
            <Ionicons style={styles.searchIcon} name="search-outline" size={30} color="#000" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

        height: 53,
        width: '92%',
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 10,
    },
    searchIcon: {
        paddingRight: 10,
        paddingLeft: 10,
        alignSelf: 'center',
    },
    textInput: {
        flex: 1,
        fontSize: 17,
    },
});

export default ProductSearchBar;

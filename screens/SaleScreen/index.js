import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

import { Button, Center, Row, ScrollView, Text, View, Image } from 'native-base';
import NAVIGATION_KEY from '../../constants/NavigationKey';

// import { Dropdown } from 'react-native-material-dropdown-v2';

function SaleScreen() {
    const [valueName, onChangeName] = React.useState('');
    const [isActiveName, setActiveName] = React.useState(false);

    const [valuePrice, onChangePrice] = React.useState('');
    const [isActivePrice, setActivePrice] = React.useState(false);

    const [valueAmount, onChangeAmount] = React.useState('');
    const [isActiveAmount, setActiveAmount] = React.useState(false);

    const [valueMin, onChangeMin] = React.useState('');
    const [isActiveMin, setActiveMin] = React.useState(false);

    const [valueDesc, onChangeDesc] = React.useState('');
    const [isActiveDesc, setActiveDesc] = React.useState(false);

    const [valueDetail, onChangeDetail] = React.useState('');
    const [isActiveDetail, setActiveDetail] = React.useState(false);

    const [valueCate, onChangeCate] = React.useState('');
    const [isActiveCate, setActiveCate] = React.useState(false);

    const [valueUnit, onChangeUnit] = React.useState('');
    const [isActiveUnit, setActiveUnit] = React.useState(false);

    let data = [{
        value: 'Trái cây',
    }, {
        value: 'Hoa tươi',
    }, {
        value: 'Rau Củ Quả',
    }];
    // const  selectedCategory = ""
    // const  selectedUnit = ""

    return (
        <ScrollView flex={1} backgroundColor={'white'}>
            <View style={styles.view_row}>
                <TextInput
                    style={{
                        flex: 1,
                        height: 56,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: isActiveName ? 'black' : '#D3D3D3',
                        marginRight: 10
                    }}
                    value={valueName}
                    placeholder='Tên sản phẩm'
                    maxLength={256}
                    onChangeText={text => onChangeName(text)}

                    onFocus={() => setActiveName(true)}
                    onBlur={() => setActiveName(false)}
                />
                {/* <Dropdown flex={1} style={styles.dropdown}
                    data={data}
                    placeholder="Danh mục"
                    onChangeText
                /> */}

                <TextInput
                    style={{
                        flex: 1,
                        height: 56,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: isActiveCate ? 'black' : '#D3D3D3',
                        marginRight: 10
                    }}
                    value={valueCate}
                    placeholder='Danh mục'
                    maxLength={256}
                    onChangeText={text => onChangeCate(text)}

                    onFocus={() => setActiveCate(true)}
                    onBlur={() => setActiveCate(false)}
                />
            </View>

            <View style={styles.view_row}>
                <TextInput
                    style={{
                        flex: 1,
                        height: 56,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: isActivePrice ? 'black' : '#D3D3D3',
                        marginRight: 10
                    }}
                    value={valuePrice}
                    placeholder='Giá bán'
                    maxLength={256}
                    onChangeText={text => onChangePrice(text)}

                    onFocus={() => setActivePrice(true)}
                    onBlur={() => setActivePrice(false)}
                />
                {/* <Dropdown flex={1} style={styles.dropdown}
                    data={data}
                    placeholder="Đơn vị"
                /> */}

                <TextInput
                    style={{
                        flex: 1,
                        height: 56,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: isActiveUnit ? 'black' : '#D3D3D3',
                        marginRight: 10
                    }}
                    value={valueUnit}
                    placeholder='Đơn vị'
                    maxLength={256}
                    onChangeText={text => onChangeUnit(text)}

                    onFocus={() => setActiveUnit(true)}
                    onBlur={() => setActiveUnit(false)}
                />
            </View>

            <View style={styles.view_row}>
                <TextInput
                    style={{
                        flex: 1,
                        height: 56,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: isActiveAmount ? 'black' : '#D3D3D3',
                        marginRight: 10
                    }}
                    value={valueAmount}
                    placeholder='Tổng số lượng'
                    maxLength={256}
                    onChangeText={text => onChangeAmount(text)}

                    onFocus={() => setActiveAmount(true)}
                    onBlur={() => setActiveAmount(false)}
                />
                <TextInput
                    style={{
                        flex: 1,
                        height: 56,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: isActiveMin ? 'black' : '#D3D3D3',
                        marginLeft: 10,
                    }}
                    value={valueMin}
                    placeholder='SL mua tối thiểu'
                    maxLength={256}
                    onChangeText={text => onChangeMin(text)}

                    onFocus={() => setActiveMin(true)}
                    onBlur={() => setActiveMin(false)}
                />
            </View>
            <View style={styles.view_row}>
                <TextInput
                    style={{
                        flex: 1,
                        height: 56,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: isActiveDesc ? 'black' : '#D3D3D3',
                        marginRight: 40
                    }}
                    value={valueDesc}
                    placeholder='Mô tả sản phẩm'
                    maxLength={256}
                    onChangeText={text => onChangeDesc(text)}

                    onFocus={() => setActiveDesc(true)}
                    onBlur={() => setActiveDesc(false)}
                />
            </View>

            <View style={styles.view_row}>
                <TextInput
                    style={{
                        flex: 1,
                        height: 56,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: isActiveDetail ? 'black' : '#D3D3D3',
                        marginRight: 40
                    }}
                    value={valueDetail}
                    placeholder='Giới thiệu sản phẩm'
                    maxLength={256}
                    onChangeText={text => onChangeDetail(text)}

                    onFocus={() => setActiveDetail(true)}
                    onBlur={() => setActiveDetail(false)}
                />
            </View>
            <Text
                style={{
                    color: '#808080',
                    fontSize: 20,
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    marginHorizontal: 8,
                    marginVertical: 8
                }}
            >
                Hình ảnh sản phẩm
            </Text>
            <View style={styles.view_row}>
                <Button
                    fontSize={'16'}
                    borderRadius={'30'}
                    width={'24'}
                >
                    CHỌN ẢNH</Button>
            </View>

            <Button
                fontSize={'16'}
                margin={'10'}
                borderRadius={'30'}
                width={'300'}
            >
                ĐĂNG BÁN</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view_row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginHorizontal: 8,
        marginVertical: 8
    },

    // dropdown: {
    //     fontSize: 20,
    //     backgroundColor: '#ffffff',
    //     marginLeft: 10
    // }
});

export default SaleScreen;

import { Button, Select, Center, Text, Input, View } from 'native-base';
import { useState } from 'react';

function SellProductScreen({ navigation }) {
    return (
        <View paddingLeft={2} paddingRight={2} margin={4} borderRadius={10} bg={'white'} flex={1}>
            <View pt={4} pl={4} pr={4} pb={2} width={'full'}>
                <View flexDirection={'row'}>
                    <Text fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                        Tên sản phẩm
                    </Text>
                    <Text fontSize={14} fontWeight={'bold'} color={'red.900'}>
                        *
                    </Text>
                </View>

                <Input fontSize={18} fontWeight={'medium'} variant="underlined" />
            </View>

            <View
                justifyContent={'space-between'}
                alignItems={'center'}
                flexDirection={'row'}
                pt={2}
                pl={4}
                pr={4}
                width={'full'}
            >
                <Text fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                    Danh mục
                </Text>
                <Select placeholder="Chọn danh mục" width={150}>
                    <Select.Item label="Trái cây" value="key0" />
                    <Select.Item label="Rau củ" value="key1" />
                    <Select.Item label="Debit Card" value="key2" />
                    <Select.Item label="Credit Card" value="key3" />
                    <Select.Item label="Net Banking" value="key4" />
                </Select>
            </View>
            <View justifyContent={'space-between'} flexDirection={'row'} pt={4} pl={4} pr={4} width={'full'}>
                <View width={'32'}>
                    <Text fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                        Giá bán
                    </Text>
                    <Input fontSize={18} fontWeight={'medium'} variant="underlined" />
                </View>
                <View>
                    <Text marginBottom={1.5} fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                        Đơn vị
                    </Text>
                    <Select placeholder="Chọn Đơn vị" width={150}>
                        <Select.Item label="Trái cây" value="key0" />
                        <Select.Item label="Rau củ" value="key1" />
                        <Select.Item label="Debit Card" value="key2" />
                        <Select.Item label="Credit Card" value="key3" />
                        <Select.Item label="Net Banking" value="key4" />
                    </Select>
                </View>
            </View>
            <View justifyContent={'flex-start'} flexDirection={'row'} pt={4} pl={4} pr={4} width={'full'}>
                <View marginRight={4} width={'32'}>
                    <Text fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                        Giá bán
                    </Text>
                    <Input fontSize={18} fontWeight={'medium'} variant="underlined" />
                </View>
                <View width={'32'}>
                    <Text fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                        Mua tối thiểu
                    </Text>
                    <Input fontSize={18} fontWeight={'medium'} variant="underlined" />
                </View>
            </View>
            <View pt={4} pl={4} pr={4} width={'full'}>
                <Text fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                    Giới thiệu sản phẩm
                </Text>
                <Input multiline={true} fontSize={18} fontWeight={'medium'} variant="underlined" />
            </View>
            <View flexDirection={'row'} pt={4} pl={4} pr={4} width={'full'}>
                <Text marginRight={4} fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                    Hình ảnh sản phẩm
                </Text>
                <Button borderRadius={20} padding={-1} width={20} height={6}>
                    <Text color={'white'} fontSize={12} fontWeight={'medium'}>
                        Chọn ảnh
                    </Text>
                </Button>
            </View>
            <View mt={2} background={'gray.100'} height={40}></View>
            <Button alignSelf={'center'} borderRadius={20} marginTop={4} padding={-1} width={40} height={10}>
                Đăng bán
            </Button>
        </View>
    );
}

export default SellProductScreen;

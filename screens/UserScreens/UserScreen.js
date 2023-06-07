import { Button, Center, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';
import NAVIGATION_KEY from '../../constants/NavigationKey';

function UserScreen({ navigation }) {
    return (
        <View bg={'#1FA97C'} flex={1}>
            <View margin={4} flexDirection={'row'}>
                <View marginRight={5} borderRadius={'50'} height={'20'} width={'20'} bg={'white'}></View>
                <View alignSelf={'center'}>
                    <Text fontWeight={'semibold'} fontSize={18}>
                        Nguyễn Văn A
                    </Text>
                    <Text fontWeight={'light'} fontSize={14}>
                        Nhà cung cấp
                    </Text>
                </View>
            </View>
            <View paddingTop={'4'} bg={'white'} borderRadius={24} height={'full'}>
                <TouchableOpacity onPress={() => navigation.navigate(NAVIGATION_KEY.SupplierRegister)}>
                    <View
                        paddingRight={4}
                        paddingLeft={4}
                        height={12}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        flexDirection={'row'}
                    >
                        <View flexDirection={'row'}>
                            <Entypo name="shop" size={24} color="black" />
                            <Text fontSize={'16'}> Trở thành nhà cung cấp</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </View>
                </TouchableOpacity>
                <View marginBottom={2} marginLeft={6} marginRight={6} height={'0.5'} backgroundColor={'gray.300'} />
                <TouchableOpacity onPress={() => navigation.navigate(NAVIGATION_KEY.SellProduct)}>
                    <View
                        paddingRight={4}
                        paddingLeft={4}
                        height={12}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        flexDirection={'row'}
                    >
                        <View flexDirection={'row'}>
                            <Feather name="shopping-bag" size={24} color="black" />
                            <Text fontSize={'16'}> Đăng bán sản phẩm</Text>
                        </View>
                        <AntDesign name="right" size={20} color="black" />
                    </View>
                </TouchableOpacity>
                <View marginLeft={6} marginRight={6} height={'0.5'} backgroundColor={'gray.300'} />
            </View>
        </View>
    );
}

export default UserScreen;

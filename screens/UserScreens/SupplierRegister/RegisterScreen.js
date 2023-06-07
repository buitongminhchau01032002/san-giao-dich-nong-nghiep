import { Button, Center, Text,Input, View } from 'native-base';

function SupplierRegisterScreen({ navigation }) {
    return (
        <View paddingLeft={2} paddingRight={2} margin={4} borderRadius={10} bg={'white'} flex={1}>
                <View  pt={4} pl={4} pr={4} pb={2}  width={'full'}>
                    <View flexDirection={'row'}>
                        <Text  fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                          Chủ sở hữu  
                        </Text>
                        <Text   fontSize={14} fontWeight={'bold'} color={'red.900'}>
                          *
                        </Text>
                    </View>
                    
                    <Input fontSize={18}  fontWeight={'medium'}   variant="underlined" />
                </View>
                <View  pt={4} pl={4} pr={4} width={'full'}>
                    <Text  fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                          Thương hiệu 
                    </Text>
                    <Input fontSize={18}  fontWeight={'medium'}   variant="underlined" />
                </View>
                <View  pt={4} pl={4} pr={4} width={'full'}>
                    <Text  fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                          Quy mô nhà vườn 
                    </Text>
                    <Input fontSize={18}  fontWeight={'medium'}   variant="underlined" />
                </View>
                <View  pt={4} pl={4} pr={4} width={'full'}>
                    <Text  fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                         Sản lượng cung cấp
                    </Text>
                    <Input fontSize={18}  fontWeight={'medium'}   variant="underlined" />
                </View>
                <View  pt={4} pl={4} pr={4} width={'full'}>
                    <Text  fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                         Giới thiệu nhà vườn
                    </Text>
                    <Input multiline={true} fontSize={18}  fontWeight={'medium'}   variant="underlined" />
                </View>
                <View flexDirection={'row'} pt={4} pl={4} pr={4} width={'full'}>
                    <Text marginRight={4}  fontSize={14} color={'gray.500'} fontWeight={'medium'}>
                        Hình ảnh nhà vườn
                    </Text>
                    <Button borderRadius={20} padding={-1} width={20} height={6} >
                      <Text color={'white'} fontSize={12} fontWeight={'medium'}>
                        Chọn ảnh
                      </Text>
                    </Button>
                </View>
                <View mt={2} background={'gray.100'} height={40}>

                </View>
                <Button alignSelf={'center'} borderRadius={20} marginTop={4} padding={-1} width={40} height={10} >
                      Đăng kí
                </Button>
            
            
        </View>
    );
}

export default SupplierRegisterScreen;

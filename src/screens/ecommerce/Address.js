import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import MyStatusBar from '../../components/MyStatusbar';
import MyHeader from '../../components/MyHeader';
import { Colors } from '../../assets/style';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import { SCREEN_HEIGHT } from '../../config/Screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Address = ({navigation, dispatch,addressData}) => {

    useEffect(() => {
        dispatch(EcommerceActions.getaddresscart());
    },[dispatch]);

    const deleteAddress=(id)=>{
        requestData={
           id:id
         }
       dispatch(EcommerceActions.getdeleteaddresscart(requestData));

     }
    const addNewAddress = () => {
        // Logic to add a new address (e.g., open a modal or navigate to a form screen)
        navigation.navigate('Addaddress')
    };

    const renderAddressItem = ({ item }) => (
        <View style={{paddingHorizontal:10}}>
        <TouchableOpacity style={styles.addressItem}
        onPress={() => {
            dispatch(EcommerceActions.setaddressCart(item));
            navigation.navigate('cart');
        }}>
              <View style={{ position: "absolute", right: 10, top: 5 }}>
                <TouchableOpacity
                    onPress={() => {
                        deleteAddress(item?._id);
                    }}
                    style={{padding:5, }}
                >
                    <AntDesign name="delete" size={25} color="#FE6006" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('updateaddress',{addressId:item});
                    }}
                    style={{padding:5, }}
                >

                    <AntDesign name="edit" size={25} color="#FE6006" />
                </TouchableOpacity>
            </View>
            <Text style={styles.addressTitle}>Name: {item.name}</Text>
            <Text style={styles.addressDetails}>Phone: {item.phone}</Text>
            <Text style={styles.addressDetails}>Address: {item.house}{`,`} {item.area},{item.city}, {item.state}, {item.pincode}</Text>
         </TouchableOpacity>
         </View>
    );

  return (
    <View>
         <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
         <MyHeader title={'Address'} navigation={navigation} />
       
       <FlatList
                data={addressData?.data}
                renderItem={renderAddressItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>No addresses found</Text>
                )}
            />
            {/* Button to add new address */}
            <TouchableOpacity style={styles.addButton} onPress={addNewAddress}>
                <Icon name="add" size={30} color="white" />
            </TouchableOpacity>
           
    </View>
  )
}

const mapDispatchToProps = dispatch => ({dispatch});

const mapStateToProps = state => ({
    addressData: state.ecommerce.addressData,
})

export default connect(mapStateToProps,mapDispatchToProps)(Address)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f2f2f2',
    },
    addressItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    addressTitle: {
        fontSize: 15,
        color:"#555"
    },
    addressDetails: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: '#aaa',
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
        backgroundColor: Colors.primaryDark,
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        top:SCREEN_HEIGHT * 0.9
    },
})
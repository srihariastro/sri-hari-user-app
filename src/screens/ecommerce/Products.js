import { View, Text, FlatList, StyleSheet, ImageBackground, Image, Linking } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { TouchableOpacity } from 'react-native'
import { SCREEN_WIDTH } from '../../config/Screen'
import LinearGradient from 'react-native-linear-gradient'
import { showNumber } from '../../utils/services'
import { colors, getFontSize } from '../../config/Constants1'
import * as EcommerceActions from '../../redux/actions/ecommerceActions'
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { base_url, img_url } from '../../config/constants'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Products = ({ navigation, route, productsData, dispatch }) => {
    console.log(productsData, "productsData")
    const { t } = useTranslation();
    const { _id, categoryName } = route?.params

    useEffect(() => {
        dispatch(EcommerceActions.getProducts(_id))
    }, [])

    const getPercentage = (totalData, value) => {
        let totalDataVal = Number(totalData);
        let valueData = Number(value);


        if (isNaN(totalDataVal) || isNaN(valueData)) {
            return "Invalid input";
        }

        if (totalDataVal <= 0) {
            return "Total data must be greater than zero";
        }

        if (valueData < 0) {
            return "Value cannot be negative";
        }
        let data = (valueData / totalDataVal) * 100;
        return parseFloat(data.toFixed(2));
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background_theme5 }}>
            <MyStatusBar backgroundColor={colors.background_theme5} barStyle={'light-content'} />

            <MyHeader title={categoryName ?? 'Astro Mall'} navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: "white", }}>

                <FlatList ListHeaderComponent={<>
                    {productsData && categoriesInfo()}
                </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
                />
                {submitInfo()}
            </View>


        </View>
    )

    function submitInfo() {
        const phoneNumber = '8800247824';

        const handlePress = () => {
            Linking.openURL(`tel:${phoneNumber}`);
        };
        return (
            <View style={{
                marginBottom: 10
            }}>
                <TouchableOpacity style={{ backgroundColor: Colors.greenDark, marginBottom: Sizes.fixPadding, paddingVertical: Sizes.fixPadding, justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH * 0.15, borderRadius: 100, height: SCREEN_WIDTH * 0.15, position: 'absolute', bottom: Sizes.fixPadding * 4, right: Sizes.fixPadding }} 
                onPress={handlePress}>
                    <Ionicons name="call" color={colors.white_color} size={Sizes.fixPadding * 2} />
                </TouchableOpacity>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(EcommerceActions.addToCart(productsData[0]?._id))}
                        style={{
                            backgroundColor: "#FC4B00",
                            //paddingVertical: Sizes.fixPadding,
                            width: 160,
                            height: 50,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >

                        <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.white, textAlign: 'center' }}> {t('add_cart')}</Text>


                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    function categoriesInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    //onPress={() => navigation.navigate('productDetails', { productData: item })}
                    activeOpacity={0.8}
                    style={styles.container}
                >



                    <View
                        style={styles.imageItem}
                    >
                        <View style={styles.itemImage}>

                            <Image
                                style={{ width: '100%', height: '100%', backgroundColor: "white" }}
                                source={{ uri: img_url + item?.image }}

                            />

                        </View>



                    </View>

                    <View
                        style={{ marginTop: 20, marginBottom: 25 }}

                    >
                        <Text
                            style={{ color: "black", fontSize: getFontSize(1.6) }}
                        >
                            {item?.productName}

                        </Text>

                        <Text
                            style={{ color: "#128800", fontSize: getFontSize(1.6) }}>
                            {showNumber(item?.price)}
                            &nbsp;&nbsp;
                            <Text style={{ textDecorationLine: 'line-through', color: '#f28d77' }}>{showNumber(item?.mrp)}</Text></Text>
                        <Text>
                            {getPercentage(item?.mrp, item?.price)} % OFF
                        </Text>


                    </View>

                    {descriptionInfo(item)}



                </TouchableOpacity>
            )
        }
        return (
            <FlatList data={productsData} numColumns={2} renderItem={renderItem} />
        )
    }

    function descriptionInfo(item) {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>{item?.description}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    productsData: state.ecommerce.productsData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Products)

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginBottom: Sizes.fixPadding * 2,
        marginLeft: SCREEN_WIDTH * 0.065,
        flex: 1,
        display: "flex",
        flexDirection: "column",

    },
    itemContainer: {

        // borderRadius: Sizes.fixPadding,


        // elevation: 5
    },
    imageItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    itemImage: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_WIDTH * 0.6,

    }
})
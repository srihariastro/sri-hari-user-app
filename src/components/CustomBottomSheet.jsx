import React from "react";
import { Modal, View, Text, TouchableWithoutFeedback, StyleSheet,  TouchableOpacity,Dimensions, } from "react-native";
import { colors } from "../config/Constants1";
const { width, height } = Dimensions.get('screen');
const CustomBottomSheet = ({ visible, onClose, children, title }) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.titleContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            </View>
            

            
            {children}

            
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    
  },
  modalContainer: {
    backgroundColor: "white",
    //padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // alignItems: "center",
    height:height/2 
  },
  titleContainer:{
  backgroundColor:colors.background_theme5,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  height:40,
  alignContent:"center",
  justifyContent:"center"
  },
  title: {
    fontSize: 18,
    //fontWeight: "bold",
    color:"black",
    //marginBottom: 15,
    textAlign:"center"
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
  },
  closeText: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomBottomSheet;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Image, Button, View, Text, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ocr from 'react-native-tesseract-ocr';

const tessOption = {
   whitelist : null,
   blacklist : null
};

export default class imagepicker extends Component {
   state = {
     avatarSource: null,
     text: ''
   }

   selectImage = async () => {
     ImagePicker.showImagePicker({noData:true,mediaType:'photo'}, (response) => {
     console.log('Response = ', response);
     if (response.didCancel) {
       console.log('User cancelled image picker');
     } else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
     } else if (response.customButton) {
       console.log('User tapped custom button: ', response.customButton);
     } else {
       // You can also display the image using data:
       // const source = { uri: 'data:image/jpeg;base64,' + response.data };

       this.setState({
         avatarSource: response.uri,
       });
       this.extractText(response.path);
     }
   });
   }

   extractText(imgPath) {
     Ocr.recognize(imgPath,'LANG_ENGLISH', tessOption)
     .then((res) => this.setState({ text: res }));
   }

   render() {
     let buttonOnly = (
       <View>
        <Button title='Select Image' onPress={()=>{this.selectImage()}}/>
       </View>
       )

       let buttonWithContent = (
         <ScrollView>
         {
           this.state.avatarSource && <Image source={{uri:this.state.avatarSource}} style={{width:'80%', height:200, resizeMode:'contain'}}/>
         }
         <Button title="Select Image" onPress={this.selectImage}/>
         <Text>{this.state.text}</Text>
         </ScrollView>

         )
     return (
       <View style={styles.container}>
        {!this.state.avatarSource && buttonOnly}
        {this.state.avatarSource && buttonWithContent}
       </View>
      //  <View style={styles.container}>
      //
      //  {
      //    this.state.avatarSource && <Image source={{uri:this.state.avatarSource}} style={{width:'80%', height:200, resizeMode:'contain'}}/>
      //  }
      //
      //  <Button title="Select Image" onPress={this.selectImage}/>
      //  </View>
      //
      // <ScrollView>
      // <Text>{this.state.text}</Text>
      // </ScrollView>
     );
   }
 }

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
 });

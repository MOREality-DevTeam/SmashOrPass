import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  // const addImage = () => { };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

/* return (
  <View style={imageUploaderStyles.container}>
    {
      image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    }

    <View style={imageUploaderStyles.uploadBtnContainer}>
      <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
        <Text>{image ? 'Edit' : 'Upload'} Image</Text>
        <AntDesign name="camera" size={20} color="black" />
      </TouchableOpacity>
    </View>


  </View>

);
}

const imageUploaderStyles = StyleSheet.create({
container: {
  elevation: 2,
  height: 200,
  width: 200,
  backgroundColor: '#efefef',
  position: 'relative',
  borderRadius: 999,
  overflow: 'hidden',
},
uploadBtnContainer: {
  opacity: 0.7,
  position: 'absolute',
  right: 0,
  bottom: 0,
  backgroundColor: 'lightgrey',
  width: '100%',
  height: '25%',
},
uploadBtn: {
  display: 'flex',
  alignItems: "center",
  justifyContent: 'center'
}
}); */
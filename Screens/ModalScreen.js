import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from "twrnc";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AntDesign } from '@expo/vector-icons';
//import UploadImage from "../components/UploadImage";
import * as ImagePicker from "expo-image-picker";



const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = false; //!image || !job || !age;

  /*   const checkForCameraRollPermission = async () => {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  
      if (status !== "granted") {
        alert("Please grant camera roll permissions inside your system's settings");
      }
      else {
        console.log("Media permissions are granted");
      }
    }; */

  /* useEffect(() => {
    checkForCameraRollPermission();
  }, []); */

  /* const addImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionAsync();

    if (status !== "granted") {
      alert("Please grant camera roll permissions inside your system's settings");
    }
    else {
      console.log("Media permissions are granted");
    }
    image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(image);

    setImage(image);

    console.log(image);

    if (!image.cancelled) {
      setImage(image);
    }

  }; */



  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timeStamp: serverTimestamp(),
    }).then(() => {
      navigation.navigate("Home");
    }).catch((error) => {
      alert(error.message);
    });
    console.log(image);
  };

  return (
    <View style={tw`flex-1 items-center pt-1`}>
      <Image
        style={tw`h-20 w-full`}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />

      <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw`text-center text-red-400 p-4 font-bold`}>
        Step 1: The Profile Pic
      </Text>

      {/* <View style={styles.container}>
        <View style={imageUploaderStyles.container}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
              <Text>{image ? 'Edit' : 'Upload'} Image</Text>
              <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ marginVertical: 20, fontSize: 16 }}>Welcome, FuzzySid</Text>
      </View> */}

      <TextInput
        value={image}
        onChangeText={setImage}
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter a Profile Pic URL"
      />

      <Text style={tw`text-center text-red-400 p-4 font-bold`}>
        Step 2: The Job
      </Text>

      <TextInput
        value={job}
        onChangeText={setJob}
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter your occupation"
      />

      <Text style={tw`text-center text-red-400 p-4 font-bold`}>
        Step 3: The Age
      </Text>

      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw`text-center text-xl pb-2`}
        placeholder="Enter your age"
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={[tw`w-64 p-3 rounded-xl absolute bottom-10 bg-red-400`,
        incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`]}
        onPress={updateUserProfile}
      >
        <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
});

export default ModalScreen;
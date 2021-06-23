import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity,SafeAreaView, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import * as ImagePicker from 'expo-image-picker';


const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export default function App() {
      const [hasPermission, setHasPermission] = useState(null);
      const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
      const [isPreview, setIsPreview] = useState(false);
      const [isCameraReady, setIsCameraReady] = useState(false);
      const [isVideoRecording, setIsVideoRecording] = useState(false);
      const [videoSource, setVideoSource] = useState(null);
      const cameraRef = useRef();

      useEffect(() => {
            (async () => {
              const { status } = await Camera.requestPermissionsAsync();
              setHasPermission(status === "granted");
            })();
          }, []);

          const onCameraReady = () => {
                setIsCameraReady(true);
              };

         const takePicture = async () => {
              if (cameraRef.current) {
                  const options = { quality: 0.5, base64: true, skipProcessing: true };
                  const data = await cameraRef.current.takePictureAsync(options);
                  const source = data.uri;
                if (source) {
                    await cameraRef.current.pausePreview();
                    setIsPreview(true);
                    console.log("picture source", source);
                }
             }
          };

          // GALLERYYY
         const [selectedImage, setSelectedImage] = React.useState(null);
              let openImagePickerAsync = async () => {
              let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
               
                   if (permissionResult.granted === false) {
                     alert('Permission to access camera roll is required!');
                     return;
                   }
                   let pickerResult = await ImagePicker.launchImageLibraryAsync();
                   if (pickerResult.cancelled === true) {
                   return;                           
                   }       
                   setSelectedImage({ localUri: pickerResult.uri });                    
                 };
                 if (selectedImage !== null) {
                   return (
                     <View style={styles.container}>
                       <Image
                         source={{ uri: selectedImage.localUri }}
                         style={styles.thumbnail}
                       />
                       <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
                              <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />                     
                              <View style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]} />                       
                            </TouchableOpacity> 
                     </View>
                   );
                 }
               
                  const recordVideo = async () => {
                        if (cameraRef.current) {
                          try {
                            const videoRecordPromise = cameraRef.current.recordAsync();    
                        if (videoRecordPromise) {           
                            setIsVideoRecording(true);               
                            const data = await videoRecordPromise;              
                            const source = data.uri;                 
                        if (source) {                  
                            setIsPreview(true);                 
                             console.log("video source", source);
                            setVideoSource(source);                 
                         }
                        }
                       } catch (error) {
                           console.warn(error);
                         }
                     }
                  };

                      const stopVideoRecording = () => {      
                            if (cameraRef.current) {       
                              setIsPreview(false);             
                              setIsVideoRecording(false);          
                              cameraRef.current.stopRecording();
                            }                  
                          };
                        
                          const switchCamera = () => {                   
                            if (isPreview) {                      
                              return;
                            }
                        
                            setCameraType((prevCameraType) =>
                              prevCameraType === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                          };

                          const cancelPreview = async () => {
                            await cameraRef.current.resumePreview();
                            setIsPreview(false);
                            setVideoSource(null);
                          };
                       
                          const renderCancelPreviewButton = () => (   
                            <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
                              <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />                     
                              <View style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]} />                       
                            </TouchableOpacity>                       
                          );
                       
                          const renderVideoPlayer = () => (
                            <Video
                              source={{ uri: videoSource }}
                              shouldPlay={true}
                              style={styles.media}
                            />
                          );
                       
                          const renderVideoRecordIndicator = () => (
                            <View style={styles.recordIndicatorContainer}>
                              <View style={styles.recordDot} />
                              <Text style={styles.recordTitle}>{"Enregistrement..."}</Text>
                            </View>
                     
                          );



                //  RENDER (front)
                            
    const renderCaptureControl = () => (
    <View style={styles.control}>                 
       <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
            <MaterialIcons name="flip-camera-ios" size={38} color="#f7fd04" />
       </TouchableOpacity>

          
        <TouchableOpacity
            activeOpacity={0.7}
             disabled={!isCameraReady}
             onLongPress={recordVideo}
             onPressOut={stopVideoRecording}
             onPress={takePicture}
             style={styles.capture}
           />


       <TouchableOpacity disabled={!isCameraReady} onPress={openImagePickerAsync}>
            <MaterialIcons name="photo-library" size={38} color="#f7fd04" />
       </TouchableOpacity>

    </View> );
                        
        if (hasPermission === null) {
              return <View />;
         }
        if (hasPermission === false) {
             return <Text style={styles.text}>Veuillez autoriser l'accès à la camera</Text>;
         }


            return (
               <SafeAreaView style={styles.container}>
                                  <Camera
                                    ref={cameraRef}
                                    style={styles.container}
                                    type={cameraType}
                                    flashMode={Camera.Constants.FlashMode.on}
                                    onCameraReady={onCameraReady}
                                    onMountError={(error) => {
                                      console.log("cammera error", error);       
                                    }}  />
                                  <View style={styles.container}>                           
                                    {isVideoRecording && renderVideoRecordIndicator()}                           
                                    {videoSource && renderVideoPlayer()}                  
                                    {isPreview && renderCancelPreviewButton()}                         
                                    {!videoSource && !isPreview && renderCaptureControl()}                       
                                  </View>
                                
                                </SafeAreaView>
                                );                       
                            }


          const styles = StyleSheet.create({                            
               container: {                              
                 ...StyleSheet.absoluteFillObject,                              
               },  

                    closeButton: {                             
                      position: "absolute",                               
                      top: 33,                                
                      left: 18,                            
                      height: 30,
                      width: 30,                             
                      borderRadius: Math.floor(closeButtonSize / 2),                              
                      justifyContent: "center",                               
                      alignItems: "center",                             
                      backgroundColor: "#f7fd04",                                
                      opacity: 0.9,                                
                      zIndex: 2,                             
                },            
                  media: {                            
                     ...StyleSheet.absoluteFillObject,                            
                  },             
                     closeCross: {                               
                     width: "100%",                           
                     height: 1,                             
                     backgroundColor: "black"                       
                     },           
                    control: {                             
                    position: "absolute",                             
                    flexDirection: "row",                              
                    bottom: 38,                               
                    width: "100%",                            
                    alignItems: "center",                            
                    justifyContent: "center",                              
                    },                             
                    capture: {                            
                      backgroundColor: "#f5f6f5",                              
                      borderRadius: 5,                               
                      height: captureSize,                              
                      width: captureSize,                               
                      borderRadius: Math.floor(captureSize / 2),                                
                      marginHorizontal: 31,                              
                     }, 
                     recordIndicatorContainer: {
                     flexDirection: "row",                               
                     position: "absolute",                              
                     top: 25,                            
                     alignSelf: "center",                          
                     justifyContent: "center",                            
                     alignItems: "center",                            
                     backgroundColor: "transparent",                              
                     opacity: 0.7,                          
                  },                          
                  recordTitle: {                           
                  fontSize: 14,                            
                  color: "#ffffff",
                  textAlign: "center",                              
                 },                              
                  recordDot: {                             
                  borderRadius: 3,                              
                  height: 6,                               
                  width: 6,                                
                  backgroundColor: "#ff0000",                                
                  marginHorizontal: 5,                               
             },   
             thumbnail: {
              width: 'auto',
              height: '100%',
              resizeMode: "contain",
              backgroundColor: "#fff8d9",
            },                           
              text: {                                
                color: "#fff",
          }
   });

   
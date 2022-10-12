import {Button, Image, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MapView, {
  Marker,
  Callout,
  Polygon,
  LatLng,
  Region,
} from 'react-native-maps';

// const renderDetails = () => {
//   console.log('render is called');
//   return (
//     <View
//       style={{
//         position: 'absolute',
//         bottom: 50,
//         height: 200,
//         width: 200,
//         backgroundColor: 'red',
//       }}>
//       <Text style={{color: 'blue'}}>There are the details</Text>
//     </View>
//   );
// };

const Markers = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const poi = [
    {title: 'Chaptal1', latitude: 48.876476, longitude: 2.374477},
    {title: 'Chaptal2', latitude: 48.838693, longitude: 2.360308},
    {title: 'Chaptal3', latitude: 48.846417, longitude: 2.297068},
    {title: 'Chaptal4', latitude: 48.792327, longitude: 2.151392},
  ];

  const [data, setData] = useState(poi);

  const displayCard = (marker: {
    title: string;
    latitude: number;
    longitude: number;
  }) => {
    return(
      <View style={{height: 200, width: 200, backgroundColor: "white"}}>
        <Text>{marker.title}</Text>
      </View>
    )
    console.log(marker.title);
  };


  const displayModal = () => {
    setModalVisible(true);
    console.log('display modal');
    return (
      <View
        style={{
          backgroundColor: 'red',
          height: 200,
          width: 200,
          position: 'absolute',
          bottom: 0,
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'blue',
              height: 200,
              width: 200,
              position: 'absolute',
              bottom: 0,
            }}>
            <Text>yooo</Text>
            <Button onPress={() => setModalVisible(false)} title="close" />
          </View>
        </Modal>
      </View>
    );
  };


  return (
    <View>
      <View>
        {data.map(marker => {
          return (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              onPress={() => displayCard(marker)}>
              <Callout>
                <Text>
                  <Image
                    source={require('../src/images/nerd.png')}
                    resizeMode="cover"
                    style={{height: 100, width: 100}}
                  />
                </Text>
                <Text>22222222</Text>
              </Callout>
            </Marker>
          );
        })}

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'blue',
            height: 200,
            width: 200,
            position: 'absolute',
            bottom: 0,
          }}>
          <Text>yooo</Text>
          <Button onPress={() => setModalVisible(false)} title="close" />
        </View>
      </Modal>
    </View>
  );
};

export default Markers;

const styles = StyleSheet.create({});

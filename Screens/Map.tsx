import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {
  Marker,
  Callout,
  Polygon,
  LatLng,
  Region,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import Markers from '../Components/Markers';
// import Carousel from 'react-native-snap-carousel';

const poi = [
  {title: 'Chaptal1', latitude: 48.876476, longitude: 2.374477},
  {title: 'Chaptal2', latitude: 48.838693, longitude: 2.360308},
  {title: 'Chaptal3', latitude: 48.846417, longitude: 2.297068},
  {title: 'Chaptal4', latitude: 48.792327, longitude: 2.151392},
];

const Map = () => {
  const [initialPosition, setInitialPosition] = useState<Region>();
  const [data, setData] = useState(poi);

  const displayCard = (marker: {
    title: string;
    latitude: number;
    longitude: number;
  }) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          width: 200,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
        }}>
        <Text>{marker.title}</Text>
      </View>
    );
    console.log(marker.title);
  };

  const requestLocationPermission = () => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(response => {
          // console.log('iphone ' + response);
          response === 'granted' && locateCurrentPosition();
        })
        .catch(err => console.log(err));
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(response => {
        // console.log('android ' + response);
        response === 'granted' && locateCurrentPosition();
      });
    }
  };
  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(JSON.stringify(position));
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.035,
        };
        setInitialPosition(region);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 48.861436,
          longitude: 2.340236,
          latitudeDelta: 0.3,
          longitudeDelta: 0.1,
        }}>
        {/* <Markers /> */}
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
                <Text>{marker.title}</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      {/* <Text style={styles.test}>This text</Text> */}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  test: {
    // ...StyleSheet.absoluteFillObject,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    backgroundColor: 'white',
  },
});

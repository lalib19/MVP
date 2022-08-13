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

const Map = () => {
  const [initialPosition, setInitialPosition] = useState<Region>();

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
      {/* <Text>Map</Text> */}
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 48.861436,
          longitude: 2.340236,
          latitudeDelta: 0.3,
          longitudeDelta: 0.1,
        }}>
        {/* <Polygon
          coordinates={[
            {latitude: 48.79232732156863, longitude: 2.151392362336927},
            {latitude: 48.6, longitude: 2.2},
            {latitude: 48.5, longitude: 2.3},
          ]}
        /> */}
        <Markers />
      </MapView>
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
});

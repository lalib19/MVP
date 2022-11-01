import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, Callout, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import Markers from '../Components/Markers';
import useApiData from '../api/useApiData';

const Map = () => {
  const [initialPosition, setInitialPosition] = useState<Region>();
  const {data, isLoaded} = useApiData(
    'https://data.education.gouv.fr/api/v2/catalog/datasets/fr-en-annuaire-education/records?where=code_postal%3D%2275009%22&limit=100&offset=0',
  );
  const [currentSchool, setCurrentSchool] = useState<any>();

  const onMarkerPressed = (marker: any) => {
    setCurrentSchool(marker);
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

  if (!isLoaded) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        onPress={() => setCurrentSchool(undefined)}
        initialRegion={initialPosition}>
        {data.map((marker, index) => {
          return (
            <Marker
              coordinate={{
                latitude: marker.record.fields.latitude,
                longitude: marker.record.fields.longitude,
              }}
              key={index}
              onPress={() => onMarkerPressed(marker)}></Marker>
          );
        })}
      </MapView>
      {currentSchool && (
        <View style={styles.encart}>
          <Text style={styles.title}>
            {currentSchool.record.fields.nom_etablissement}
          </Text>
          <View style={styles.separer}></View>
          <View style={styles.body}>
            <Text>
              {currentSchool.record.fields.type_etablissement + ' '}
              {currentSchool.record.fields.statut_public_prive}
            </Text>
            <Text>Adresse: {currentSchool.record.fields.adresse_1}</Text>
            <Text>Téléphone: {currentSchool.record.fields.telephone}</Text>
            {currentSchool.record.fields.web && (
              <Text>
                Site web:{' '}
                <Text
                  style={{color: 'blue', textDecorationLine: 'underline'}}
                  onPress={() =>
                    Linking.openURL(currentSchool.record.fields.web)
                  }>
                  {currentSchool.record.fields.web}
                </Text>
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  encart: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 200,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    width: '90%',
    textAlign: 'left',
  },
  separer: {
    borderWidth: 0.2,
    width: '70%',
    height: 0.1,
  },
});

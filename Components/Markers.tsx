import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {
  Marker,
  Callout,
  Polygon,
  LatLng,
  Region,
} from 'react-native-maps';

const renderDetails = () => {
  console.log('render is called');
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 50,
        height: 200,
        width: 200,
        backgroundColor: 'red',
      }}>
      <Text style={{color: 'blue'}}>There are the details</Text>
    </View>
  );
};
const Markers = () => {
  return (
    <View>
      <Marker
        onPress={renderDetails}
        coordinate={{
          latitude: 48.877306,
          longitude: 2.311723,
        }}
        title="La Manu">
        <Callout>
          <Text>
            <Image
              source={require('../src/images/nerd.png')}
              resizeMode="cover"
              style={{height: 100, width: 100}}
            />
          </Text>
          <Text>1111111</Text>
        </Callout>
      </Marker>
      <Marker
        coordinate={{
          latitude: 48.876476,
          longitude: 2.374477,
        }}
        title="La Manu">
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
      <Marker
        coordinate={{
          latitude: 48.838693,
          longitude: 2.360308,
        }}
        title="La Manu">
        <Callout>
          <Text>
            <Image
              source={require('../src/images/nerd.png')}
              resizeMode="cover"
              style={{height: 100, width: 100}}
            />
          </Text>
          <Text>3333333333</Text>
        </Callout>
      </Marker>
      <Marker
        coordinate={{
          latitude: 48.846417,
          longitude: 2.297068,
        }}
        title="La Manu">
        <Callout
          style={{
            flex: 1,
            backgroundColor: 'blue',
          }}>
          <Text
            style={{
              flex: 1,
              backgroundColor: 'red',
            }}>
            <Image
              source={require('../src/images/nerd.png')}
              resizeMode="cover"
              style={{height: 100, width: 100}}
            />
          </Text>
          <Text style={{backgroundColor: 'green'}}>444444444</Text>
        </Callout>
      </Marker>
      <Marker
        coordinate={{
          latitude: 48.79232732156863,
          longitude: 2.151392362336927,
        }}
        title="La Manu">
        <Callout>
          <Text>
            <Image
              source={require('../src/images/nerd.png')}
              resizeMode="cover"
              style={{height: 100, width: 100}}
            />
          </Text>
          <Text>WOWOWOW</Text>
        </Callout>
      </Marker>
    </View>
  );
};

export default Markers;

const styles = StyleSheet.create({});

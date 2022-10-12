import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const displayModal = () => {
    setModalVisible(true);
    console.log('display modal');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          height: 200,
          width: 200,
          // position: 'absolute',
          // bottom: 0,
        }}>
        <Modal
          animationType="fade"
          transparent={false}
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
              // position: 'absolute',
              // bottom: 0,
            }}>
            <Text>yooo</Text>
            <Button onPress={() => setModalVisible(false)} title="close" />
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="display modal" onPress={() => setModalVisible(true)} />
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              // flex: 1,
              backgroundColor: 'blue',
              height: 200,
              width: 200,
              // position: 'absolute',
              // bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>yooo</Text>
            <Button onPress={() => setModalVisible(false)} title="close" />
          </View>
        </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';

const Scanner = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    Linking.openURL(data)

    // await fetch('https://centerdaniil-b74b6-default-rtdb.firebaseio.com/scanner.json', {
    //   mode: 'no-cors',
    //   method: 'POST',
    //   body: JSON.stringify({
    //     testQRCOde: data,
    //     date: new Date()
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default Scanner;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    height: 300,
    borderColor: 'red',
    borderWidth: 2
  }
})

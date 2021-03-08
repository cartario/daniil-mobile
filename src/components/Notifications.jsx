import React from 'react';
import { Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsComponent = () => {
  const [expoPushToken, setExpoPushToken] = React.useState('');

  async function sendPushNotification(expoPushToken) {
    const messageExample = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title2',
      body: 'And here is the body!',
      data: { someData: 'goes here2' },
    };

    const messagesExample = [
      {
        to: expoPushToken,
        sound: 'default',
        body: 'Hello world!',
      },
      {
        to: expoPushToken,
        badge: 1,
        body: "You've got mail",
      },
      {
        to: [expoPushToken, expoPushToken], //несколько устройств
        body: 'Breaking news!',
      },
    ];

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageExample),
    });
  }

  const saveExpoPushTokenToFirebase = async (token) => {
    const responseTokens = await fetch(
      'https://daniil-mobile-default-rtdb.firebaseio.com/expoTokens.json',
    );
    const tokens = await responseTokens.json();

    const isTokenExist =
      tokens &&
      Object.values(tokens)
        .map((item) => item.token)
        .includes(token); //существует ли уже

    if (isTokenExist) {
      return;
    }

    await fetch('https://daniil-mobile-default-rtdb.firebaseio.com/expoTokens.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      saveExpoPushTokenToFirebase(token);
    });
  }, []);

  return (
    <View>
      {/* <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      /> */}
    </View>
  );
};

export default NotificationsComponent;

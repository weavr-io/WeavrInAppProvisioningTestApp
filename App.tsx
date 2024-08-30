/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  AddToWalletButton,
  GooglePayCheckResult,
  canAddCardToWallet,
  checkGooglePayAvailability,
  initWPP,
} from '@weavr-io/push-provisioning-react-native';
import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    initWPP(token);

    checkGooglePayAvailability().then((res: GooglePayCheckResult) => {
      if (res.errorMessage) {
        console.log(res.errorMessage);
        return;
      }
      console.log('Google Pay is available: ' + res.isAvailable);
    });
  }, []);

  const canAddToWallet = async () => {
    console.log('Checking for Can Add to Wallet');

    // Perform a card status check to see if card can be added
    canAddCardToWallet('6751', 'mastercard', 'phone').then(res => {
      console.log(res);
      Alert.alert('Can Add to Wallet', res);
    });
  };

  const asset = require('./assets/Add-to-Google-Pay-Button-dark-no-shadow.png');
  const assetSource = Image.resolveAssetSource(asset);
  const token = '<token>';
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />

        <View style={{width: '65%', alignSelf: 'center'}}>
          <Button title="Can Add To Wallet" onPress={canAddToWallet} />
        </View>
        {/*
            cardholderNames - String representing the names of the cardholder
            panLastFour - String representing the last four digits of the payment card number
            cardDescription - A meaningful description of the card. This description is visible in the Apple wallet when the provisioning process is started
            cardToken - String that uniquely identifies the card
            cardImage - CGImage representing the unique card artwork shown when the provisioning process is started
        */}
        <AddToWalletButton
          androidAssetSource={assetSource}
          iOSButtonStyle="onLightBackground"
          style={styles.payButton}
          cardHolderName={'Gordon Farrugia'}
          cardDescription="test iOS wallet extension"
          cardLastFour={'0049'}
          cardBrand={'mastercard'}
          cardId={'111261918672650256'}
          authenticationToken={token}
          // debug
          onComplete={({error}) => {
            Alert.alert(
              error ? error.code : 'Success',
              error
                ? error.message
                : 'Card was successfully added to the wallet.',
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  payButton: {
    width: '65%',
    height: 50,
    marginTop: 60,
    alignSelf: 'center',
  },
});

export default App;

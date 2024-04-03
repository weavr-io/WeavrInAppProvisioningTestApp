/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  AddToWalletButton,
  canAddCardToWallet,
} from '@weavr-io/push-provisioning-react-native';
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    // Perform a card status check to see if card can be added
    canAddCardToWallet('6751', 'mastercard').then(res => {
      console.log(res);
    });
  }, []);
  const asset = require('./assets/Add-to-Google-Pay-Button-dark-no-shadow.png');
  const assetSource = Image.resolveAssetSource(asset);
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
        <AddToWalletButton
          androidAssetSource={assetSource}
          iOSButtonStyle="onLightBackground"
          style={styles.payButton}
          cardHolderName={'Gordon Farrugia'}
          cardDescription="Description"
          cardLastFour={'6571'}
          cardBrand={'mastercard'}
          cardId={'111261918672650256'}
          authenticationToken={
            'eyJraWQiOiJnZW5lcmF0b3IiLCJhbGciOiJFUzI1NiJ9.eyJTWVNURU0iOiJmYWxzZSIsInN1YiI6IlJPT1QsMTA0MTg4Mjg1NzI1Mzc2NTIxIiwiVE9LRU5fUFJPVklERVIiOiJFTUFJTF9BTkRfUEFTU1dPUkQiLCJSQU5ET00iOiItMjM5MjI4MjQxNDgzMTQ2MDEzNCIsIklERU5USVRZX0lEIjoiMTA0MTg4Mjg1NzI1Mzc2NTIxIiwiSURFTlRJVFlfVFlQRSI6ImNvbnN1bWVycyIsIlBFUlBFVFVBTCI6ImZhbHNlIiwiVE9LRU5fVFlQRSI6IkFDQ0VTUyIsIlRFTkFOVF9JRCI6IjIiLCJJTVBFUlNPTkFUT1JfU0VTU0lPTl9JRCI6IjAiLCJTRVNTSU9OX0lEIjoiMTExMjYxOTA0NzkzMzA1MTA0IiwiUFJPR1JBTU1FX0lEIjoiMTAzMDc5MDg4NjU2MjIwMTY4IiwiREVWSUNFX0lEIjoiIiwiSU1QRVJTT05BVEVEIjoiZmFsc2UiLCJBVVRIX0dST1VQX0lEIjoiIn0.KkbylGKxLUIjWuP05s47kyPxLB1pNiLoE5_gdMoQqtRbz_wKOF-RKRezXFs3EQSPJA2wD4NGmkaQELcXfckyWA'
          }
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
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
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

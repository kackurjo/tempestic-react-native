import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View, Image } from 'react-native';
import { Feather } from "@expo/vector-icons";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RPH = (percentage) => {
  return (percentage / 100) * screenHeight;
};

const RPW = (percentage) => {
  return (percentage / 100) * screenWidth;
};

export default function Navbar(props) {
  const [tmpPlace, setTmpPlace] = useState(props.place);

  return (
    <View style={styles.bar}>
      <View style={styles.tempestDiv}>
        <Image
          style={styles.navImage}
          source={require('../assets/tempestic-transparent.png')}
        />
      </View>
      <View style={styles.searchDiv}>
        <TextInput
          style={styles.input}
          onChangeText={setTmpPlace}
          value={tmpPlace}
          placeholder="Place"
        />
        <View>
          <Feather
            name="search"
            size={RPH(2.5)}
            color="black"
            onPress={() => {
              props.setPlace(tmpPlace);
              props.updateWeather();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: RPW(100),
    height: RPH(10),
    flexDirection: 'row'
  },
  tempestDiv: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: RPW(46),
    height: RPH(10)
  },
  navImage: {
    width: RPW(60),
    height: RPH(10)
  },
  searchDiv: {
    flex: 1,
    width: RPW(46),
    height: RPH(5),
    marginRight: RPW(2),
    justifyContent: 'end',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF'
  },
  input: {
    padding: 10,
    width: RPW(45)
  },
});

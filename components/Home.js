import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import ImageGetter from '../helpers/ImageGetter';
import { AntDesign } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RPH = (percentage) => {
  return (percentage / 100) * screenHeight;
};

const RPW = (percentage) => {
  return (percentage / 100) * screenWidth;
};

const gap = 12;
const itemPerRow = 3;
const totalGapSize = (itemPerRow - 1) * gap;
const windowWidth = screenWidth;
const childWidth = (windowWidth - totalGapSize) / itemPerRow;

export default function Home(props) {
  const {
    weatherToday,
    weekWeather,
    selectedHour,
    setSelectedHour,
    selectedDay,
    setSelectedDay,
    confHours,
    confDate,
    updateWeather,
    place
  } = props;

  return (
    <>
      {(weatherToday && weekWeather) && (
        <>
          <View style={styles.topWrapper}>
            <View style={styles.topLeft}>
              <Image
                style={styles.weatherIcon}
                source={ImageGetter(weatherToday[selectedHour].smartsymbol)}
              />
            </View>
            <View style={styles.topRight}>
              <Text style={styles.celsiusText}>Weather in {place}</Text>
              <Text style={styles.celsiusText}>{weatherToday[selectedHour].smartsymboltext}</Text>
              <Text style={styles.celsiusText}>{weatherToday[selectedHour].temperature}°C</Text>
              <View style={styles.windVeiw}>
                <Text style={styles.whiteText}>Wind Speed</Text>
                <Text style={styles.whiteText}>{weatherToday[selectedHour].windspeedms}m/s</Text>
              </View>
              <View style={{
                justifyContent: 'space-between',
                width: RPW(40),
                flexDirection: 'row'
              }}
              >
                <Text style={styles.whiteText}>Wind Direction</Text>
                <AntDesign
                  name='arrowup'
                  size={24}
                  color='white'
                  style={{
                    transform: [{ rotate: '45deg' }],
                  }}
                />
              </View>
              <View style={styles.windVeiw}>
                <Text style={styles.whiteText}>Humidity</Text>
                <Text style={styles.whiteText}>{weatherToday[selectedHour].Humidity}</Text>
              </View>
            </View>
          </View>
          <View style={styles.hourWrapper}>
            {weatherToday.map((val, idx) => (
              <TouchableHighlight
                key={idx}
                onPress={() => {
                  setSelectedHour(idx);
                }}
              >
                <View
                  key={idx}
                  style={[
                    styles.hourView,
                    (idx === selectedHour) ? { backgroundColor: '#00000010' } : { backgroundColor: '#00000060' }
                  ]}
                >
                  <Text key={val.time} style={styles.whiteText}>{confHours(val.time)}</Text>
                  <Image
                    key={val.smartsymbol}
                    style={styles.hourWeatherIcon}
                    source={ImageGetter(val.smartsymbol)}
                  />
                  <Text key={val.temperature} style={styles.whiteText}>{val.temperature}°C</Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
          <View style={styles.botWrapper}>
            {weekWeather.map((val, idx) => (
              <TouchableHighlight
                key={idx}
                onPress={() => {
                  updateWeather(val.time);
                  setSelectedDay(idx);
                  setSelectedHour(0);
                }}
              >
                <View
                  style={[
                    styles.dateView,
                    (idx === selectedDay) ? { backgroundColor: '#00000010' } : { backgroundColor: '#00000060' }
                  ]}
                >
                  <Image
                    key={val.smartsymbol}
                    style={styles.botWeatherIcon}
                    source={ImageGetter(val.smartsymbol)}
                  />
                  <Text style={styles.whiteText}>{confDate(val.time)}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </>
      )
      }
    </>
  );
}

const styles = StyleSheet.create({
  topWrapper: {
    width: RPW(96),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RPW(2),
    color: '#FFF',
    flexDirection: 'row'
  },
  topLeft: {
    width: RPW(43),
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    color: '#FFF',
  },
  weatherIcon: {
    width: RPW(20),
    height: RPW(20)
  },
  topRight: {
    width: RPW(43),
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    color: '#FFF',
  },
  celsiusText: {
    fontSize: 30,
    margin: 0,
    color: '#FFF'
  },
  whiteText: {
    color: '#FFF'
  },
  windVeiw: {
    justifyContent: 'space-between',
    width: RPW(40),
    flexDirection: 'row'
  },
  hourWrapper: {
    width: RPW(97),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    color: '#FFF',
    paddingVertical: RPW(2),
    paddingHorizontal: 0,
  },
  hourView: {
    marginTop: RPH(0.5),
    marginHorizontal: RPW(0.1),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RPH(1),
  },
  hourWeatherIcon: {
    height: RPH(5)
  },
  botWrapper: {
    width: RPW(100),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 50
  },
  dateView: {
    marginTop: RPH(0.5),
    marginHorizontal: RPW(0.1),
    borderRadius: 10,
    paddingVertical: RPW(2),
    paddingHorizontal: 0,
    width: RPW(40),
    maxHeight: RPH(20),
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

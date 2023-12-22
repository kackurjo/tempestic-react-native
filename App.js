import parse from 'date-fns/parse';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { getWeathertoday, getWeekWeather } from './helpers/Requests';
import { Dimensions, StyleSheet, View, ScrollView  } from 'react-native';
import Home from './components/Home';
import Navbar from './components/Navbar';

// green: #87CEEB
// oceanblue: #6b92bb
// pink: #bb6bba
// tempestic-skin: #bb946c

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const RPH = (percentage) => {
  return (percentage / 100) * screenHeight;
};

const RPW = (percentage) => {
  return (percentage / 100) * screenWidth;
};

export default function App() {
  const [place, setPlace] = useState('helsinki');
  const [weatherToday, setWeatherToday] = useState();
  const [weekWeather, setWeekWeather] = useState();
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const fetchWeather = async () => {
    try {
      const endDate = new Date();
      endDate.setHours(23, 59, 59);
      setWeatherToday(await getWeathertoday(place, endDate));
      setWeekWeather(await getWeekWeather(place));
    } catch (error) {
      console.log(error);
    }
  }

  const confHours = (date) => {
    const newDate = parse(date, "yyyyMMdd'T'HHmmss", new Date());
    return `${newDate.getHours()}:00`;
  }

  const confDate = (date) => {
    const newDate = parse(date, "yyyyMMdd'T'HHmmss", new Date());
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
  }

  const updateTodayWeather = async (date) => {
    const endDate = parse(date, "yyyyMMdd'T'HHmmss", new Date());
    endDate.setHours(23, 59, 59);
    setWeatherToday(undefined);
    setWeatherToday(await getWeathertoday(place, endDate));
  }

  const updateWeather = async () => {
    setSelectedHour(0);
    setSelectedDay(0);
    setWeatherToday(undefined);
    setWeekWeather(undefined);
    const endDate = new Date();
    endDate.setHours(23, 59, 59);
    setWeatherToday(await getWeathertoday(place, endDate));
    setWeekWeather(await getWeekWeather(place));
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Navbar setPlace={setPlace} place={place} updateWeather={updateWeather} />
      <Home
        weatherToday={weatherToday}
        weekWeather={weekWeather}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        confHours={confHours}
        confDate={confDate}
        updateWeather={updateTodayWeather}
        place={place}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#58bac9',
    paddingTop: 30
  },
});

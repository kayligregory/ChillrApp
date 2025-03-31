import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Papa from 'papaparse';

const Chillr = () => {
  const [flights, setFlights] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCSV();
  }, []);

  const fetchCSV = async () => {
    try {
      const csvAsset = Asset.fromModule(require('../../assets/data/full-flight-data.csv'));
      await csvAsset.downloadAsync();
      const csvUri = csvAsset.localUri || csvAsset.uri;
      const response = await FileSystem.readAsStringAsync(csvUri);
      const parsed = Papa.parse(response, { header: true });

      const validFlights = parsed.data.filter((trip) => trip['Flight Number'] && trip['Departure Time']);
      setFlights(validFlights);
    } catch (error) {
      console.error('CSV Load Error:', error);
    }
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 20 }}>Chillr</Text>
      {flights.map((trip, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('TripDetails', { trip })}
          style={{
            backgroundColor: '#000',
            padding: 20,
            borderRadius: 24,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>
            {trip['Trip Name'] || `MyTrip #${index + 1}`}
          </Text>
          <Text style={{ color: '#fff' }}>Flight: {trip['Flight Number']}</Text>
          <Text style={{ color: '#fff' }}>On Time - Departs at {trip['Departure Time']}</Text>
          <Text style={{ color: '#fff' }}>Gate: {trip['Gate'] || 'Unknown'}</Text>
          <Text style={{ color: '#fff' }}>{trip['Checked In'] === 'yes' ? 'Checked In' : 'Check-In Unavailable'}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Chillr;
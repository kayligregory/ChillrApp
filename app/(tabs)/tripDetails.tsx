import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const TripDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { trip } = route.params || {};

  if (!trip) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No trip data available.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: 'blue', marginBottom: 20 }}>Back to Trips</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 20 }}>{trip['Trip Name'] || 'Trip Details'}</Text>
      <Text>Flight Number: {trip['Flight Number']}</Text>
      <Text>Departure Time: {trip['Departure Time']}</Text>
      <Text>Arrival Time: {trip['Arrival Time']}</Text>
      <Text>Gate: {trip['Gate'] || 'Unknown'}</Text>
      <Text>Baggage: {trip['Baggage'] || 'N/A'}</Text>
      <Text>Status: {trip['Status'] || 'Unknown'}</Text>
    </View>
  );
};

export default TripDetails;
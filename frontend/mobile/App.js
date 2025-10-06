import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Provider as PaperProvider, Card, Text } from 'react-native-paper';

const personas = [
  { title: 'Consumer Wallet', description: 'Manage balances, off-ramps, and transfers.' },
  { title: 'Merchant Console', description: 'Track daily settlements and refunds.' },
  { title: 'Admin Oversight', description: 'Handle compliance alerts and approval queues.' }
];

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text variant="headlineMedium">Digital Asset Mobile</Text>
          {personas.map((persona) => (
            <Card key={persona.title} style={{ marginTop: 16 }}>
              <Card.Title title={persona.title} />
              <Card.Content>
                <Text>{persona.description}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

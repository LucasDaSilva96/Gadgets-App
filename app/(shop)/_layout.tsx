import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

type Props_TabBarIcon = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
};

function TaBarIcon({ color, name }: Props_TabBarIcon) {
  return <FontAwesome name={name} size={24} style={{ color }} />;
}

export default function TabsLayout() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#1BC464',
          tabBarInactiveTintColor: '#7F8C8D',
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            tabBarIcon: ({ color }) => <TaBarIcon name='home' color={color} />,
            title: 'Shop',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='orders'
          options={{
            tabBarIcon: ({ color }) => <TaBarIcon name='book' color={color} />,
            title: 'Orders',
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

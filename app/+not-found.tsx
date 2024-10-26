import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';

export default function NotFoundPage() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View style={styles.container}>
        <Link href='/' style={styles.linkStyle}>
          <Text>Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkStyle: {
    color: 'black',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
});

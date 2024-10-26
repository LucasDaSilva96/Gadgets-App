import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PRODUCTS } from '../../assets/products';
import { ProductListItem } from '../../components/product-list-item';
import { ListHeader } from '../../components/list-header';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={<ListHeader />}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: 'space-between',
  },
});

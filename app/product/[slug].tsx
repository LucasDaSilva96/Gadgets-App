import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { PRODUCTS } from '../../assets/products';
import { useCartStore } from '../../stores/cart-store';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProductDetails() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const toasts = useToast();

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return <Redirect href='/404' />;

  const { items, addItem, incrementItem, decrementItem } = useCartStore();

  const cartItem = items.find((i) => i.id === product.id);

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const increaseQuantity = () => {
    if (quantity >= product.maxQuantity) {
      toasts.show('Max quantity reached ❌', {
        type: 'error',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
        normalColor: '#000',
      });
      return;
    }
    incrementItem(product.id);
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if ((cartItem && cartItem.quantity <= 1) || quantity <= 1) return;
    decrementItem(product.id);
    setQuantity((prev) => prev - 1);
  };

  const addToCart = () => {
    const item = {
      id: product.id,
      title: product.title,
      image: product.heroImage,
      price: product.price,
      quantity,
    };
    addItem(item);
    setQuantity(cartItem ? cartItem.quantity : 1);
    toasts.show('Added to cart 🛒', {
      type: 'success',
      placement: 'top',
      duration: 1500,
      animationType: 'slide-in',
      normalColor: '#28a745',
    });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.title }} />

      <Image source={product.heroImage} style={styles.heroImage} />

      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.title}>Title: {product.title}</Text>
        <Text style={styles.slug}>Slug: {product.slug}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Unit Price: ${product.price.toFixed(2)}
          </Text>
          <Text style={styles.price}>Total Price: ${totalPrice}</Text>
        </View>

        <FlatList
          data={product.imagesUrl}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesContainer}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>
              <AntDesign name='minus' size={24} color='white' />
            </Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={increaseQuantity}
          >
            <Text style={styles.quantityButtonText}>
              <AntDesign name='plus' size={24} color='white' />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: '#555',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  price: {
    fontWeight: 'bold',
    color: '#000',
  },

  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 18,
    color: '#f00',
    textAlign: 'center',
    marginTop: 20,
  },
});

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const initialItems = ["BMW", "Mercedes", "Audi", "Honda", "Ferrari", "Lexus", "Toyota"];

const Oefening6 = () => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const newItems = items.filter((item, index) => index !== randomIndex);

        setItems(newItems);
      } else {
        setItems(initialItems);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <View>
      <Text>Total: {items.length}</Text>
      <Text>Remaining Items:</Text>
      <View>
        {items.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
    </View>
  );
};

export default Oefening6;

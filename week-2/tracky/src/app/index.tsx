import Button from "@design/Button/Button";
import TextField from "@design/Form/TextField";
import Logo from "@design/Logo/Logo";
import ThemedText from "@design/Typography/ThemedText";
import DefaultView from "@design/View/DefaultView";
import { Variables } from "@style/theme";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleInput = (name: string, value: string) => {
    setData(() => ({ ...data, [name]: value }));
  };

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />

      <DefaultView>
        <Logo style={styles.logo} />
        <ThemedText type="title" style={styles.title}>
          Login met je account
        </ThemedText>

        <TextField
          label="Email"
          name="email"
          placeholder="john@doe.com"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={(email) => handleInput("email", email)}
          value={data.email}
        />

        <TextField
          label="Password"
          name="password"
          secureTextEntry={true}
          onChangeText={(password) => handleInput("password", password)}
          value={data.password}
        />

        <Button
          style={styles.button}
          onPress={() => {
            router.push("/(tabs)");
          }}
        >
          Login
        </Button>
      </DefaultView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: Variables.sizes["2xl"],
  },
  button: {
    marginTop: Variables.sizes.sm,
  },
  logo: {
    marginHorizontal: "auto",
    marginTop: Variables.sizes["5xl"],
    marginBottom: Variables.sizes["2xl"],
  },
});

export default Login;

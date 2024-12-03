import { login } from "@core/modules/auth/api";
import Button from "@design/Button/Button";
import TextField from "@design/Form/TextField";
import Logo from "@design/Logo/Logo";
import ThemedText from "@design/Typography/ThemedText";
import DefaultView from "@design/View/DefaultView";
import { Variables } from "@style/theme";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ErrorMessage from "@design/Alert/ErrorMessage";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState<unknown | null>(null);

  const handleInput = (name: string, value: string) => {
    setData(() => ({ ...data, [name]: value }));
  };

  const handleSubmit = () => {
    login(data)
      .then(() => {
        // FIXME: Temporary solution to navigate to the home screen
        setTimeout(() => {
          router.push("/(app)/(tabs)");
        }, 1000);
      })
      .catch((error) => {
        setError(error);
      });
  };

  /*
   * TODO validation
   */

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView keyboardShouldPersistTaps="always">
        <DefaultView>
          <Logo style={styles.logo} />
          <ThemedText type="title" style={styles.title}>
            Login met je account
          </ThemedText>

          {!!error && <ErrorMessage error={error} />}

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

          <Button style={styles.button} onPress={handleSubmit}>
            Login
          </Button>
        </DefaultView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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

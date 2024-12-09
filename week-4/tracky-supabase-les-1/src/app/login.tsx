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
import { useAuthContext } from "@functional/Auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [data, setData] = useState({ email: "", password: "" });

  // file refactored to React-Query (useMutation) compared to class recording

  const handleInput = (name: string, value: string) => {
    setData(() => ({ ...data, [name]: value }));
  };

  const { mutate, error, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: () => {
      router.push("/(app)/(tabs)");
    },
  });

  const handleSubmit = () => {
    mutate(data);
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
            disabled={isPending}
          />

          <TextField
            label="Password"
            name="password"
            secureTextEntry={true}
            onChangeText={(password) => handleInput("password", password)}
            value={data.password}
            disabled={isPending}
          />

          <Button style={styles.button} onPress={handleSubmit} disabled={isPending}>
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

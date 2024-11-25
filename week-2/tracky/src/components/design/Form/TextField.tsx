import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import React from "react";
import isVoid from "@core/utils/isVoid";
import { Variables } from "@style/theme";
import FieldError from "@design/Form/FieldError";
import Label from "@design/Form/Label";

export type TextFieldProps = TextInputProps & {
  name: string;
  value: string;
  label?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  inputRef?: React.Ref<TextInput>;
  error?: string | null;
};

const TextField = ({
  name,
  value,
  label,
  onChangeText,
  placeholder,
  style,
  disabled = false,
  inputRef,
  error,
  ...rest
}: TextFieldProps) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Label>{label}</Label>}
      <View style={[styles.background, !isVoid(error) && styles.backgroundError]}>
        <TextInput
          style={styles.input}
          value={value}
          editable={!disabled}
          onChangeText={onChangeText}
          ref={inputRef}
          placeholder={placeholder}
          {...rest}
        />
      </View>
      {!isVoid(error) && <FieldError>{error}</FieldError>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: Variables.sizes.sm,
  },
  background: {
    width: "100%",
    backgroundColor: Variables.colors.white,
    paddingVertical: Variables.sizes.sm,
    paddingHorizontal: Variables.sizes.md,
    borderRadius: Variables.sizes.xs,
    borderWidth: 1,
    borderColor: Variables.colors.primary["100"],
  },
  backgroundError: {
    borderColor: Variables.colors.error["500"],
  },
  input: {
    fontSize: Variables.textSizes.default,
    fontFamily: Variables.fonts.default,
    color: Variables.colors.text,
  },
});

export default TextField;

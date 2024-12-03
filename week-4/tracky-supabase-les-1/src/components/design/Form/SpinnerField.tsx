import { StyleSheet, StyleProp, View, ViewStyle } from "react-native";
import React, { Ref } from "react";
import { Variables } from "@style/theme";
import { Picker, PickerProps } from "@react-native-picker/picker";
import Label from "./Label";
import isEmptyText from "@core/utils/isEmptyText";
import FieldError from "./FieldError";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";

type SpinnerOption<T> = {
  label: string;
  value?: T;
};

export type SpinnerFieldProps<T = ItemValue> = {
  name: string;
  value: T;
  label?: string;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  options: SpinnerOption<T>[];
  disabled?: boolean;
  error?: string | null;
} & PickerProps;

const SpinnerField = <T extends ItemValue>({
  name,
  value,
  label,
  onChange,
  style,
  placeholder,
  options,
  disabled = false,
  error,
  ...rest
}: SpinnerFieldProps<T>) => {
  // add empty option
  options = [{ label: "-- Choose " }, ...options];

  return (
    <View style={[styles.container, style]}>
      {label && <Label>{label}</Label>}
      <View style={[styles.background, !isEmptyText(error) && styles.backgroundError]}>
        <Picker
          selectedValue={value}
          style={styles.input}
          enabled={!disabled}
          onValueChange={(value) => onChange(value as T)}
          dropdownIconColor={Variables.colors.text}
          {...rest}
        >
          {options.map((item: SpinnerOption<T>) => (
            <Picker.Item key={item.label} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      {!isEmptyText(error) && <FieldError>{error}</FieldError>}
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
    paddingVertical: 0,
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

export default SpinnerField;

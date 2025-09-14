import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 5,
  },
  link: {
    color: colors.secondary,
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 10,
    textAlign: "center",
  },
});

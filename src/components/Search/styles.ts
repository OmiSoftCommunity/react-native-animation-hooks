import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  placeholder: {
    position: "absolute",
    zIndex: -1,
    color: "#aaa",
  },
  search: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
  },
  input: {
    flex: 1,
    height: "100%",
  },
  cancel: {
    marginLeft: 16,
  },
  cancelText: {
    color: "#333",
    fontSize: 16,
  },
});

export default styles;

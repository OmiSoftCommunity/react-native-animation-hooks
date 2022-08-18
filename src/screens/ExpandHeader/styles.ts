import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    position: "absolute",
    zIndex: 1,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 350,
  },
  info: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
});

export default styles;

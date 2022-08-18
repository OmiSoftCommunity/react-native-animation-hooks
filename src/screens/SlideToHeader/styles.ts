import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  content: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 24,
    fontWeight: "600",
    fontSize: 32,
  },
  description: {
    fontSize: 16,
  },
});

export default styles;

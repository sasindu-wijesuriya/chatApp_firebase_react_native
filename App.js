import { StyleSheet, SafeAreaView } from "react-native";
import SingleChat from "./screens/SingleChat";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SingleChat />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

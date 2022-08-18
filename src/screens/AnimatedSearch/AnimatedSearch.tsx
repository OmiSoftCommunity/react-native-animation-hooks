import React from "react";
import styles from "./styles";
import Search from "~components/Search";
import Layout from "~components/Layout";
import { KeyboardAvoidingView, ScrollView } from "native-base";

const AnimatedSearch: React.FC = () => {
  return (
    <KeyboardAvoidingView style={styles.avoidingView}>
      <Layout title="Animated search">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}
          bounces={false}
        >
          <Search />
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default AnimatedSearch;

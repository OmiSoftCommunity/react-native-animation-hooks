import React from 'react';
import {Center} from 'native-base';
import Layout from '~components/Layout';
import Box from '~components/Box';
import styles from './styles';
import {useIosWidget} from '~hooks/useIosWidget';

const IosWidget: React.FC = () => {
  const animatedWidget = useIosWidget();

  return (
    <Layout title="iOS-like widget">
      <Center flexGrow="1">
        <Box style={[styles.box, animatedWidget.style]} />
      </Center>
    </Layout>
  );
};

export default IosWidget;

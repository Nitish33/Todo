import React, {useMemo} from 'react';
import {Pressable} from 'react-native';
import H1 from '@components/AppText/H1';
import Styles from './styles';

interface Props {
  title: string;
  onPress?: () => void;

  type?: 'primary' | 'secondary' | 'success';
}

const AppButton = (props: Props) => {
  const {type = 'primary'} = props;

  const color = useMemo(() => {
    switch (type) {
      case 'secondary':
        return 'rgb(250, 50, 50)';

      case 'success':
        return 'green';

      default:
        return 'transparent';
    }
  }, [type]);

  return (
    <Pressable
      onPress={props.onPress}
      style={[Styles.container, {backgroundColor: color}]}>
      <H1>{props.title}</H1>
    </Pressable>
  );
};

export default AppButton;

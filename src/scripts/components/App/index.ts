import { App as Container } from './App';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';

export default connect((state: AppState) => ({
  selectedImage: state.image.selectedImage,
  position: state.image.position,
}))(Container);

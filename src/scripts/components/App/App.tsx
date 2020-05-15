import React from 'react';
import { AltEditor } from '../AltEditor';
import { Position } from '../../reducer/imageReducer';
import { deselectImageAction } from '../../actions';
import { store } from '../../store';

export type InjectProps = {
  selectedImage: HTMLImageElement;
  position: Position;
};

export class App extends React.Component<InjectProps> {
  render() {
    const { position, selectedImage } = this.props;

    return (
      <AltEditor
        selectedImage={selectedImage}
        position={position}
        onClose={() => {
          store.dispatch(deselectImageAction());
        }}
        onSave={this.handleSubmit}
      />
    );
  }

  private handleSubmit = (value: string) => {
    this.props.selectedImage.setAttribute('alt', value);
  };
}

import * as React from 'react';
import styled from 'styled-components';
import { Position } from '../../reducer';

const Form = styled.form<{ position: Position }>`
  position: absolute !important;
  top: ${({ position }) => `${window.pageYOffset + position.top}px`} !important;
  left: ${({ position }) => `${position.left}px`} !important;
  padding: 1em !important;
  border-radius: 4px !important;
  background-color: #efefef !important;

  & :focus {
    outline: none !important;
    box-shadow: 0 0 0 3px rgba(59, 196, 157, 0.75) !important;
  }
`;

const Label = styled.label`
  margin-bottom: 8px !important;
  overflow: visible !important;

  & > span {
    margin-bottom: 4px !important;
  }
`;

const Input = styled.input`
  border: 1px solid #757575 !important;
`;

const SubmitModule = styled.div`
  display: flex !important;
  align-items: center !important;
`;

const Message = styled.p`
  margin-left: 8px !important;
`;

const CloseButton = styled.button`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  transform: translate(16px, -16px) !important;
  width: 32px;
  height: 32px;
  border-radius: 50% !important;
  border: 1px solid #555 !important;
  font-weight: bold !important;
`;

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  selectedImage: HTMLImageElement;
  position: Position;
  onSave?: Function;
  onClose?: Function;
};

type State = {
  value: string;
  altUpdateSuccess: boolean;
};

export class AltEditor extends React.PureComponent<Props, State> {
  public state: State = {
    value: '',
    altUpdateSuccess: false,
  };

  public render(): React.ReactNode {
    const { selectedImage, position, onSave, onClose, ...rest } = this.props;
    const { altUpdateSuccess } = this.state;

    if (selectedImage == null) {
      return null;
    }

    return (
      <Form position={position} onSubmit={this.handleSubmit} {...rest}>
        <Label>
          <span>
            id:<code>{selectedImage.id}</code>の代替テキスト
          </span>
          <Input type="text" value={this.state.value} onChange={this.handleChangeInputValue} />
        </Label>
        <SubmitModule>
          <button className="c-button" type="submit">
            保存
          </button>
          <Message role="alert">{altUpdateSuccess ? '✅ 保存しました' : null}</Message>
        </SubmitModule>
        <CloseButton type="button" aria-label="閉じる" onClick={this.handleClickCloseButton}>
          <svg viewBox="0 0 12 12" width="12" height="12">
            <line x1="2" y1="10" x2="10" y2="2" stroke="#222" strokeWidth="2" />
            <line x1="2" y1="2" x2="10" y2="10" stroke="#222" strokeWidth="2" />
          </svg>
        </CloseButton>
      </Form>
    );
  }

  public componentDidUpdate(prevProps: Props, prevState: State): void {
    const { selectedImage } = this.props;
    if (prevProps.selectedImage !== selectedImage && selectedImage != null) {
      this.setState({
        value: selectedImage.alt,
        altUpdateSuccess: false,
      });
    }
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.props.onSave != null) {
      this.props.onSave(this.state.value);
    }
    if (this.props.selectedImage.alt === this.state.value) {
      this.setState({
        altUpdateSuccess: true,
      });
    }
  };

  private handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
      altUpdateSuccess: false,
    });
  };

  private handleClickCloseButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.props.onClose != null) {
      this.props.onClose();
    }
  };
}

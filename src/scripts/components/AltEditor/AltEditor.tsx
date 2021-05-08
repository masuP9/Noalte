import React from 'react';
import styled from 'styled-components';

export type Position = {
  left: number;
  top: number;
};

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  selectedImage: HTMLImageElement;
  onClose: () => void;
};

const MARGIN_BETWEEN_FORM_AND_IMAGE = 12;

const getPositionFromImage = (image: HTMLImageElement): Position => {
  const rect = image.getBoundingClientRect();

  return {
    left: rect.right + MARGIN_BETWEEN_FORM_AND_IMAGE,
    top: window.pageYOffset + rect.top,
  };
};

export const AltEditor: React.VFC<Props> = ({ selectedImage, onClose, ...rest }) => {
  const [value, setValue] = React.useState('');
  const [position, setPosition] = React.useState<Position>({ left: 0, top: 0 });
  const [altUpdateSuccess, setAltUpdateSuccess] = React.useState(false);
  const imageObserver = React.useMemo(
    () =>
      new MutationObserver((records) => {
        records.forEach((record) => {
          const { target, oldValue, attributeName } = record;
          if (
            target instanceof HTMLImageElement &&
            attributeName !== null &&
            oldValue !== target.getAttribute(attributeName)
          ) {
            setPosition(getPositionFromImage(target));
          }
        });
      }),
    [],
  );

  React.useEffect(() => {
    setValue(selectedImage.alt);
    setPosition(getPositionFromImage(selectedImage));
    imageObserver.observe(selectedImage, { attributeFilter: ['style'] });

    return () => {
      imageObserver.disconnect();
    };
  }, [selectedImage, imageObserver]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    selectedImage.setAttribute('alt', value);
    setAltUpdateSuccess(true);
  };

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setAltUpdateSuccess(false);
  };

  const handleClickCloseButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose();
  };

  return (
    <Form position={position} onSubmit={handleSubmit} {...rest}>
      <Label>
        <span>
          id:<code>{selectedImage.id}</code>の代替テキスト
        </span>
        <Input type="text" value={value} onChange={handleChangeInputValue} />
      </Label>
      <SubmitModule>
        <button type="submit">保存</button>
        <Message role="alert">{altUpdateSuccess ? '✅ 保存しました' : null}</Message>
      </SubmitModule>
      <CloseButton type="button" aria-label="閉じる" onClick={handleClickCloseButton}>
        <svg viewBox="0 0 12 12" width="12" height="12">
          <line x1="2" y1="10" x2="10" y2="2" stroke="#222" strokeWidth="2" />
          <line x1="2" y1="2" x2="10" y2="10" stroke="#222" strokeWidth="2" />
        </svg>
      </CloseButton>
    </Form>
  );
};

type FormProps = {
  readonly position: Position;
};

const Form = styled.form<FormProps>`
  position: absolute !important;
  z-index: 1 !important;
  top: ${({ position }) => `${position.top}px`} !important;
  left: ${({ position }) => `${position.left}px`} !important;
  padding: 1em !important;
  border-radius: 4px !important;
  background-color: #efefef !important;

  & :focus {
    outline: none !important;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.75) !important;
  }
`;

const Label = styled.label`
  margin-bottom: 8px !important;
  overflow: visible !important;

  & > span {
    display: block;
    margin-bottom: 4px !important;
  }
`;

const Input = styled.input`
  margin-bottom: 8px !important;
  padding: 4px 8px !important;
  border: 1px solid #757575 !important;
  border-radius: 4px !important;
  background-color: white !important;
`;

const SubmitModule = styled.div`
  display: flex !important;
  align-items: center !important;

  & > button {
    all: initial;
    background-color: #157660;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    color: white;
  }
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
  background-color: white !important;
  font-weight: bold !important;
`;

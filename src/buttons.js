export const squareButton = {
  pseudo: true,
  display: 'inline-block',
  verticalAlign: 'middle',
  textAlign: 'center',
  fontSize: '16px',
  minWidth: '20%',
  fontFamily: 'inherit',
  fontWeight: 'extraBold',
  lineHeight: 'condensed',
  appearance: 'none',
  cursor: 'pointer',
  color: 'white',
  boxShadow: 'none',
  backgroundColor: 'transparent',
  textDecoration: 'none',
  transition: 'box-shadow 0.125s ease-out 0s',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'currentcolor',
  px: '1rem',
  py: '2rem'
};

export const disabledSquareButton = {
  ...squareButton,
  cursor: 'default',
  color: 'gray'
};

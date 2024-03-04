import { Box } from '@mui/material';

enum ButtonType {
  View = 'View',
  Join = 'Join',
  Cancel = 'Cancel',
  Leave = 'Leave',
}

interface ButtonTypeProps {
  type: ButtonType;
}

const Buttons = ({ type }: ButtonTypeProps) => {
  let btnText, btnBgColor, btnColor, btnBorder, btnPadding;

  switch (type) {
    case ButtonType.Join:
      btnText = 'Join';
      btnBgColor = '#576BCD';
      btnColor = 'var(--primary-color)';
      btnPadding = '12px 20px';
      break;
    case ButtonType.Leave:
      btnText = 'Leave';
      btnBgColor = '#EF6060';
      btnColor = 'var(--primary-color)';
      btnPadding = '12px 16px';
      break;
    case ButtonType.Cancel:
      btnText = 'No';
      btnBgColor = 'transparent';
      btnColor = '#FC7171';
      btnBorder = '2px solid #FC7171';
      btnPadding = '10px 21px';
      break;
    default:
      btnText = 'View';
      btnBgColor = '#ECF1F5';
      btnColor = 'rgba(29, 36, 79, .6)';
      btnPadding = '12px 18px';
      break;
  }

  return (
    <Box
      sx={{
        maxWidth: '64px',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '4px',
        textAlign: 'center',
        fontFamily: 'Figtree-SemiBold, sans-serif',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '1',
        cursor: 'pointer',
        color: btnColor,
        backgroundColor: btnBgColor,
        border: btnBorder,
        padding: btnPadding,
      }}
      onClick={() => console.log('click')}
    >
      {btnText}
    </Box>
  );
};

export default Buttons;

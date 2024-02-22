import { Box } from '@mui/material';

interface ButtonProps {
  backgroundColor: string;
  color: string;
  textAlign: string;
  text: string;
  action: () => void;
  width?: string;
  padding?: string;
  borderRadius?: string;
  lineHeight?: string;
}

const Button = ({ text = 'Submit an initiative' }: ButtonProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--secondary-color)',
        color: 'var(--primary-color)',
        padding: '12px 20px',
        textAlign: 'center',
        borderRadius: '63px',
        width: 'max-content',
        cursor: 'pointer',
        fontFamily: 'Figtree-Semibold, sans-serif',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '1',
      }}
    >
      {text}
    </Box>
  );
};
export default Button;

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SauronContext from '../context/SauronContext';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ResultModal() {
  const {
    showModal,
    scores,
    selectedLocation,
    actions: { setShowModal },
  } = React.useContext(SauronContext);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const renderResult = () => {
    if (scores.myScore === scores.enemyScore) {
      return 'Draw!';
    }

    if (scores.myScore > scores.enemyScore) {
      return 'Win!';
    }

    if (scores.myScore < scores.enemyScore) {
      return 'Defeat!';
    }
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {renderResult()}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            You can retry by closing this modal and starting again
          </Typography>
          <Grid>
            <img src={selectedLocation?.thumbnail} width='100%' />
          </Grid>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

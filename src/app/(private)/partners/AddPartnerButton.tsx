import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddPartnerForm from './AddPartnerForm';

export default function AddPartnerButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant='contained' color='primary'>Crear socio</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute' as 'absolute',
            left: '50%',
            mt: 2,
            width: 480,
            transform: 'translateX(-50%)',
            maxHeight: '90vh',
            overflowY: 'scroll',
        }}>
            <AddPartnerForm close={() => setOpen(false)} />
        </Box>
      </Modal>
    </div>
  );
}

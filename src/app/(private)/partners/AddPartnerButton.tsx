/*import * as React from 'react';
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
*/

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddPartnerForm from './AddPartnerForm';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} variant='contained' color='primary'>Crear socio</Button>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <AddPartnerForm close={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

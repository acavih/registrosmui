import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation';
import { trpcClient } from '@/app/_trpc/client';

export default function EditResourceButton({r, type}) {
    const [nameResource, setNameResource] = React.useState(r.name)
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const updateResource = trpcClient.resources.update.useMutation({
        onSuccess: () => {
            router.refresh()
            handleClose()
        }
    })

    return (
        <React.Fragment>
            <Button size='small' disableElevation variant="contained" onClick={handleClickOpen}>
                Editar recurso
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault()
                        updateResource.mutate({ name: type, value: nameResource, id: r.id })
                    },
                }}
            >
                <DialogTitle>Editar recurso</DialogTitle>
                <DialogContent>
                    <TextField autoFocus label="Nuevo nombre del recurso" variant="standard"
                        onChange={(event) => setNameResource(event.target.value)}
                        value={nameResource}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Editar recurso</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

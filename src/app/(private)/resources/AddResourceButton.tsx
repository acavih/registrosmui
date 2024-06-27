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

export default function AddResourceButton({type}) {
    const [nameResource, setNameResource] = React.useState('')
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const addResource = trpcClient.resources.create.useMutation({
        onSuccess: () => {
            setNameResource('')
            router.refresh()
            handleClose()
        }
    })

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Añadiir recurso
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault()
                        addResource.mutate({ name: type, value: nameResource })
                    },
                }}
            >
                <DialogTitle>Crear recurso</DialogTitle>
                <DialogContent>
                    <TextField autoFocus label="Nombre del recurso" variant="standard"
                        onChange={(event) => setNameResource(event.target.value)}
                        value={nameResource}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Crear recurso</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

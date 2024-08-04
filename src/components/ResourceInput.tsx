import { trpcClient } from "@/app/_trpc/client"
import { Autocomplete, TextField } from "@mui/material"
import { useEffect } from "react"

type ResourceProps = {
    resourceName: string
    multiple?: boolean,
    initialValue?: string
    onChange: (value: string) => void
    label?: string
}

export default function ResourceInput({multiple = false, resourceName, onChange, initialValue, label = '', ...other}: ResourceProps) {
    const {data: resources = [], isLoading} = trpcClient.resources.get.useQuery<any[]>({name: resourceName as any})
    const inputLabel = label ?? resourceName

    useEffect(() => {
        if (!isLoading)
            console.log('RESURCE INPUT', resourceName, initialValue, resources.find((resource) => resource.name === initialValue))
    }, [isLoading])

    if (isLoading) {
        return (
            <Autocomplete loading={true} disabled={true} multiple={multiple} options={[]}
                renderInput={(params) => (<TextField {...params} label={'Cargando... ' + inputLabel} />)}
            />
        )
    }

    return (
        <Autocomplete
            loading={isLoading} disabled={isLoading}
            multiple={multiple} options={resources}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (<TextField {...params} label={inputLabel} />)}
            defaultValue={resources.find((resource) => resource.name === initialValue)}
            onChange={(_, value: any) => {
                //alert(value.id)
                onChange(value.name)
            }}
        />
    )
}
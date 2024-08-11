import { trpcClient } from "@/app/_trpc/client"
import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useState } from "react"

type ResourceProps = {
    resourceName: string
    multiple?: boolean,
    initialValue?: string
    label?: string
    onChange: (value: string) => void
}

export default function ResourceInput({label = '', multiple = false, resourceName, onChange, initialValue, ...other}: ResourceProps) {
    const {data: resources = [], isLoading} = trpcClient.resources.get.useQuery<any[]>({name: resourceName as any})
    const [value, setValue] = useState(initialValue)

    console.log(initialValue, resources)

    return (
        <Autocomplete
            loading={isLoading} disabled={isLoading}
            multiple={multiple} options={resources}
            getOptionLabel={(option) => option.name ?? ''}
            renderInput={(params) => (<TextField {...params} label={label ?? resourceName} />)}
            value={value}
            onChange={(_, value: any) => {
                //alert(value.id)
                console.log('ONCHANGE', value)
                setValue(value)
                onChange(value.name)
            }}
        />
    )
}
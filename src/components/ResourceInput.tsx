import { trpcClient } from "@/app/_trpc/client"
import { Autocomplete, TextField } from "@mui/material"
import { useEffect } from "react"

type ResourceProps = {
    resourceName: string
    multiple?: boolean,
    initialValue?: string
    onChange: (value: string) => void
}

export default function ResourceInput({multiple = false, resourceName, onChange, initialValue, ...other}: ResourceProps) {
    const {data: resources = [], isLoading} = trpcClient.resources.get.useQuery<any[]>({name: resourceName as any})

    return (
        <Autocomplete
            loading={isLoading} disabled={isLoading}
            multiple={multiple} options={resources}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (<TextField {...params} label={resourceName} />)}
            defaultValue={resources.find((resource) => resource.name === initialValue)}
            onChange={(_, value: any) => {
                //alert(value.id)
                onChange(value.name)
            }}
        />
    )
}
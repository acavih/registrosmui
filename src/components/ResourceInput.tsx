import { trpcClient } from "@/app/_trpc/client"
import { Autocomplete, TextField } from "@mui/material"
import { useEffect } from "react"

type ResourceProps = {
    resourceName: string
    multiple?: boolean
    onChange: (value: string) => void
}

export default function ResourceInput({multiple = false, resourceName, onChange}: ResourceProps) {
    const {data: resources = []} = trpcClient.resources.get.useQuery<any[]>({name: resourceName as any})

    return (
        <Autocomplete
            multiple={multiple} options={resources}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (<TextField {...params} label={resourceName} />)}

            onChange={(_, value: any) => {
                //alert(value.id)
                onChange(value.id)
            }}
        />
    )
}
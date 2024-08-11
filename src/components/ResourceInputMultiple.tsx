import { trpcClient } from "@/app/_trpc/client"
import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useState } from "react"

type ResourceProps = {
    resourceName: string
    multiple?: boolean,
    initialValue?: any
    label?: string
    onChange: (value: string[]) => void
}

export default function ResourceInputMultiple({multiple = false, resourceName, onChange, initialValue, label, ...other}: ResourceProps) {
    const {data: resources = [], isLoading} = trpcClient.resources.get.useQuery<any[]>({name: resourceName as any})
    const nameInitials = initialValue.map(a => a.name)
    const [value, setValue] = useState<any[]>( [] )

    useEffect(() => {
        if (isLoading) return
        setValue(resources.filter(r => nameInitials.includes(r.name)))
        console.log(label, resources.filter(r => nameInitials.includes(r.name)))
    }, [isLoading, resources])

    if (isLoading) {
        return (
            <Autocomplete loading={true} disabled={true} options={[]} value={[]}
            renderInput={(params) => (<TextField {...params} label={label ?? resourceName} />)}
            />
        )
    }

    return (
        <Autocomplete
            loading={isLoading} disabled={isLoading}
            multiple={multiple} options={resources}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (<TextField {...params} label={label ?? resourceName} />)}
            value={value}
            onChange={(_, value: any) => {
                //alert(value.id)
                setValue(value)
                onChange(value.map(v => v.name))
            }}
        />
    )
}
export function getDataForChart (data) {
    const dataa: any[] = []

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            dataa.push({ id: key, value: element, label: key })
        }
    }

    return data
}
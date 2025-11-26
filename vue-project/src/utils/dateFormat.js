export function dateFormat(data){
    data = new Date(data)
    const year = data.getFullYear();
    const month = data.getMonth() + 1 < 10 ? '0'+ data.getMonth() : data.getMonth();
    const date = data.getDate() + 1 < 10 ? '0'+ data.getDate() : data.getDate();
    return `${year}-${month}-${date}`;
}
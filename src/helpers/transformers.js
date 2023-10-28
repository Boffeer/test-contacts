export const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);

    return `${day}.${month}.${year}`
}
export const getLinkTel = (formattedTel, countryCode = '+7') => {
    let numericTel  = formattedTel.replace(countryCode, '').replace(/\D/g, '');

    const telLink = `tel:${countryCode}${numericTel}`;

    return telLink;
}

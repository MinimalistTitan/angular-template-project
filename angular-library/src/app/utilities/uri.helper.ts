
//? Combine string url format.
export const toUrlString = (url: string, baseUrl?: string) => (new URL(url, baseUrl)).toString();

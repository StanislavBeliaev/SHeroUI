export type Props = {
    params: Promise<{ city: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

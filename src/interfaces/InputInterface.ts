export default  interface InputInterface {
    label? : string | '',
    inputType?: string | 'text',
    placeholder?: string | '',
    className? : string | '',
    widthClass?: string | '',
    value?: string | number,
    onChange?: (e:any) => void
}
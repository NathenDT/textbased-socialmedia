export default function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

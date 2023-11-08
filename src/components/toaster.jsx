
import { useToast } from "@chakra-ui/toast";
export const Toaster = (props) => {
    let {
        msg,
        status
    } = props
    const toast = useToast()

    const notify = () => {
        toast({ title: msg, status: status })
    }


    return notify
}
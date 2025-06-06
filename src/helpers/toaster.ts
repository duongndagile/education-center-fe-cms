import { createStandaloneToast } from "@chakra-ui/toast";

const { ToastContainer, toast } = createStandaloneToast({defaultOptions: {duration: 3000, position: "top-right"}});

export { ToastContainer, toast as toaster };
'use client'
//to render context, a react hook providing state to entire aplication
//done on client side

import {FC, ReactNode} from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (
    <>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
    </>)
}

export default Providers
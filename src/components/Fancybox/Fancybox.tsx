import React, { useEffect, ReactNode } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '../../assets/scss/lib/_fancybox.scss';

// Typage des props
interface FancyboxProps {
    delegate?: string;
    options?: Record<string, unknown>;
    children: ReactNode;
}

const Fancybox: React.FC<FancyboxProps> = ({ delegate = '[data-fancybox]', options = {}, children }) => {
    useEffect(() => {
        NativeFancybox.bind(delegate, options);

        return () => {
            NativeFancybox.destroy();
        };
    }, [delegate, options]);

    return <>{children}</>;
};

export default Fancybox;

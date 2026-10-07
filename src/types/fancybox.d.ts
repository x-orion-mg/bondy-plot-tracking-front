declare module '@fancyapps/ui/dist/fancybox.esm.js' {
    interface FancyboxOptions {
        [key: string]: unknown; // Pour permettre des options dynamiques
    }

    export const Fancybox: {
        bind: (selector: string, options?: Record<string, unknown>) => void;
        show: (items: { src: string; type: string }[]) => void;
        destroy: () => void;
    };
}
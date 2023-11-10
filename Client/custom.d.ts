declare namespace JSX {
    interface IntrinsicElements {
        script: React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement> & {
            chat?: string;
        };
    }
}

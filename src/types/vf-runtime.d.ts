declare module "@run-slicer/vf/vf.wasm-runtime.js" {
    export function load(
        _wasmPath: string,
        _options?: { noAutoImports?: boolean; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<{ exports: { decompile: (_name: string, _options: any) => Promise<string>; }; }>;
}

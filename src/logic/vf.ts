import { load } from "@run-slicer/vf/vf.wasm-runtime.js";
import wasmPath from "@run-slicer/vf/vf.wasm?url";

export type Options = Record<string, string>;

export interface TokenCollector {
    start: (_content: string) => void;
    visitClass: (_start: number, _length: number, _declaration: boolean, _name: string) => void;
    visitField: (
        _start: number,
        _length: number,
        _declaration: boolean,
        _className: string,
        _name: string,
        _descriptor: string
    ) => void;
    visitMethod: (
        _start: number,
        _length: number,
        _declaration: boolean,
        _className: string,
        _name: string,
        _descriptor: string
    ) => void;
    visitParameter: (
        _start: number,
        _length: number,
        _declaration: boolean,
        _className: string,
        _methodName: string,
        _methodDescriptor: string,
        _index: number,
        _name: string
    ) => void;
    visitLocal: (
        _start: number,
        _length: number,
        _declaration: boolean,
        _className: string,
        _methodName: string,
        _methodDescriptor: string,
        _index: number,
        _name: string
    ) => void;
    end: () => void;
}

export interface Config {
    source?: (_name: string) => Promise<Uint8Array | null>;
    resources?: string[];
    options?: Options;
    tokenCollector?: TokenCollector;
}

// Copied from ../node_modules/@run-slicer/vf/vf.js as I needed to get the correct import paths
let decompileFunc: ((_name: string, _options: Config) => Promise<string>) | null = null;

export const decompile = async (name: string, options: Config) => {
    if (!decompileFunc) {
        try {
            const { exports } = await load(wasmPath, { noAutoImports: true });

            decompileFunc = exports.decompile;
        } catch (e) {
            console.warn("Failed to load WASM module (non-compliant browser?), falling back to JS implementation", e);
            const { decompile: decompileJS } = await import("@run-slicer/vf/vf.runtime.js");

            decompileFunc = decompileJS;
        }
    }

    return decompileFunc!(name, options);
};

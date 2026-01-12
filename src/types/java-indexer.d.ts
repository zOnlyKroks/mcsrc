// Type declarations for TeaVM-generated Java indexer modules

declare module "*/java.js" {
    export function index(_data: ArrayBufferLike): void;
    export function getUsage(_key: string): string[];
    export function getUsageSize(): number;
    export function getBytecode(_classData: ArrayBufferLike[]): string;
    export function getClassData(): string[];
}

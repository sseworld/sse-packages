declare function genSaltSync(rounds?: number): string;
declare function genSalt(rounds: number, callback: (error: Error | null, salt?: string) => void): void;
declare function hashSync(data: string, salt?: string, progress?: () => void): string;
declare function hash(data: string, salt: string, progress?: () => void, callback?: (error: any, encrypted?: string) => void): void;
declare function compareSync(data: string, encrypted: string): boolean;
declare function compare(data: string, encrypted: string, callback: (error: any, same?: boolean) => void): void;
declare function getRounds(encrypted: string): number;
export { genSaltSync, genSalt, hashSync, hash, compareSync, compare, getRounds, };
//# sourceMappingURL=index.d.ts.map
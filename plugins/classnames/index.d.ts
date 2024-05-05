// LICENSE is MIT
//
// Copyright (c) 2024
//   SSE World <https://github.com/sseworld>

export type Value = string | boolean | undefined | null;
export type Mapping = Record<string, any>;
export interface ArgumentArray extends Array<Argument> {}
export interface ReadonlyArgumentArray extends ReadonlyArray<Argument> {}
export type Argument = Value | Mapping | ArgumentArray | ReadonlyArgumentArray;

/**
 * A simple JavaScript utility for conditionally joining classNames together.
 */
export default function classNames(...args: ArgumentArray): string;

import { get } from "svelte/store";
interface PointInterface {
    x: number;
    y: number;
}

class Point implements PointInterface {
    x = 0;
    y = 0;
};

export { Point };
export type { PointInterface };
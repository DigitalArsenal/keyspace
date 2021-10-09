import { compute_rest_props } from 'svelte/internal';
import App from './App.svelte';
import { Point } from "./stores/store";
import type { PointInterface } from "./stores/store";

const pt = new Point();

class NewPoint implements PointInterface {
	x = 0;
	y = 0;
	z = 0;
};
const pt2 = new NewPoint();

console.log(pt, pt2);

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;
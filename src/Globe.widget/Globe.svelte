<script lang="ts">
    globalThis.loadGlobex = () => {
        const viewer = new globalThis.Cesium.Viewer("cesiumContainer");
        viewer.scene.globe.enableLighting = true;
        viewer.scene.debugShowFramesPerSecond = true;
        globalThis.viewer = viewer; //Open console to debug app
    };
</script>

<svelte:head>
    <script type="module">
        import * as Cesium from "../lib/Globex.mjs";
        globalThis.Cesium = Cesium;
        globalThis.loadGlobex();
    </script>
</svelte:head>
<div id="cesiumContainer" style="height:50vh" />

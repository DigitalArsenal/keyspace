<script>
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import Grid from "../Grid.widget/Grid.svelte";

  //<Grid cssString="height:100%" grid data={[{ test: "a" }]} />

  const routes = {
    "/": wrap({
      component: Grid,
      props: { cssString: "height:100%" },
    }),
  };
</script>

<Router {routes} />

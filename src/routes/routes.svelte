<script context="module" type="ts">
  interface IRouteParameter {
    component: any;
    conditions?: any;
    props?: Object;
    userData?: any;
    _svelteparouter?: Boolean;
    icon?: any;
  }

  interface IRouteMap<T> {
    [index: string]: T;
    [index: number]: T;
  }
  export const routes: IRouteMap<IRouteParameter> = {
    "/": {
      icon: database,
      ...wrap({
        component: Grid,
        props: { cssString: "height:100%" }
      })
    }
  };
</script>

<script type="ts">
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import Grid from "../Grid.widget/Grid.svelte";
  import { user, addressBook, database } from "svelte-awesome/icons";

  //<Grid cssString="height:100%" grid data={[{ test: "a" }]} />
</script>

<Router {routes} />

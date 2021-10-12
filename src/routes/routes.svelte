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
    "/userprofile": {
      icon: idBadge,
      ...wrap({
        component: UserProfile,
      }),
    },
    "/addressbook": {
      icon: addressBook,
      ...wrap({
        component: AddressBook,
        props: { cssString: "height:100%" },
      }),
    },
    "/database": {
      icon: database,
      ...wrap({
        component: Grid,
        props: { cssString: "height:100%" },
      }),
    },
    "/settings": {
      icon: gear,
      ...wrap({
        component: Settings,
        props: { cssString: "height:100%" },
      }),
    },
  };
</script>

<script type="ts">
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import Grid from "../Grid/Grid.svelte";
  import UserProfile from "../UserProfile/UserProfile.svelte";
  import AddressBook from "../AddressBook/AddressBook.svelte";
  import Settings from "../Settings/Settings.svelte";

  import {
    user,
    addressBook,
    database,
    idBadge,
    gear,
  } from "svelte-awesome/icons";

  //<Grid cssString="height:100%" grid data={[{ test: "a" }]} />
</script>

<Router {routes} />

<script context="module" type="ts">
  import { isLoggedIn } from "../stores/keyprofile.store";
  import { get } from "svelte/store";
  import { push } from "svelte-spa-router";

  interface IRouteParameter {
    component: any;
    conditions?: any;
    props?: Object;
    userData?: any;
    _svelteparouter?: Boolean;
    icon?: any;
    name?: string;
  }

  interface IRouteMap<T> {
    [index: string]: T;
    [index: number]: T;
  }

  export const routes: IRouteMap<IRouteParameter> = {
    "/": {
      name: "HOME",
      icon: home,
      ...wrap({
        component: MainPage,
      }),
    },
    "/keyprofile": {
      ...wrap({
        component: keyprofile,
        conditions: [
          () => {
            if (!get(isLoggedIn)) {
              push("/login");
              return false;
            }
            return true;
          },
        ],
      }),
    },
    "/login": {
      name: "LOGIN",
      icon: idBadge,
      ...wrap({
        component: Login,
        conditions: [
          () => {
            if (get(isLoggedIn)) {
              push("/keyprofile");
              return false;
            }
            return true;
          },
        ],
      }),
    },
    "/importkey": {
      ...wrap({
        component: ImportKey,
      }),
    },
    "/addressbook": {
      name: "DIRECTORY",
      icon: addressBook,
      ...wrap({
        component: AddressBook,
        props: { cssString: "height:100%" },
      }),
    },
    "/database": {
      name: "DATABASE",
      icon: database,
      ...wrap({
        component: Grid,
        props: { cssString: "height:100%" },
      }),
    },
    "/settings": {
      name: "SETTINGS",
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
  import MainPage from "../MainPage/MainPage.svelte";
  import Grid from "../Grid/Grid.svelte";
  import keyprofile from "../KeyProfile/ProfilePage.svelte";
  import Login from "../Login/Login.svelte";
  import ImportKey from "../Login/ImportKey.svelte";
  import AddressBook from "../AddressBook/AddressBook.svelte";
  import Settings from "../Settings/Settings.svelte";

  import {
    addressBook,
    database,
    idBadge,
    gear,
    home,
  } from "svelte-awesome/icons";

  //<Grid cssString="height:100%" grid data={[{ test: "a" }]} />
</script>

<Router {routes} />

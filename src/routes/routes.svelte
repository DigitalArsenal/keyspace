<script context="module" type="ts">
  import {
    masterNode,
    xpubMasterNode,
    xprivMasterNode,
    Seed,
  } from "../stores/userprofile.store";
  import { push } from "svelte-spa-router";
  import { get } from "svelte/store";

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

  const loggedIn = (): Boolean => {
    return !!(get(masterNode) || get(xpubMasterNode) || get(xprivMasterNode));
  };

  export const routes: IRouteMap<IRouteParameter> = {
    "/": {
      name: "HOME",
      icon: home,
      ...wrap({
        component: MainPage,
      }),
    },
    "/userprofile": {
      ...wrap({
        component: UserProfile,
        conditions: [
          () => {
            if (!loggedIn()) {
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
            if (loggedIn()) {
              push("/userprofile");
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
  import UserProfile from "../UserProfile/ProfilePage.svelte";
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

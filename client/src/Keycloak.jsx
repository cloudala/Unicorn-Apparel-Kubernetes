import Keycloak from "keycloak-js";
const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
const keycloak = new Keycloak({
 url: keycloakUrl,
 realm: "keycloak-react-auth",
 clientId: "unicorn-apparel",
});

export default keycloak;
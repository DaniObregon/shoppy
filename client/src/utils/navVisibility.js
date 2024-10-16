// /src/utils/navVisibility.js
export const getVisibleNavItems = (role_id) => {
    const navConfig = {
      client: [
        {
          label: "Capilares",
          path: "/capilares",
          children: [
            {
              label: "Coloración",
              path: "/coloracion",
            },
            {
              label: "Styling",
              path: "/styling",
            },
            {
              label: "HairCare",
              path: "/haircare",
            },
            {
              label: "Forma",
              path: "/forma",
            },
          ],
        },
        {
          label: "Manos y Uñas",
          path: "/manos-y-unas",
          children: [
            {
              label: "Prueba children",
              path: "/coloracion",
            },
          ],
        },
        {
          label: "Maquillaje",
          path: "/maquillaje",
        },
        {
          label: "Equipamientos",
          path: "/equipamientos",
        },
        {
          label: "Estética y Spa",
          path: "/estetica-y-spa",
        },
      ],
      admin: [
        {
          label: "Admin Panel",
          path: "/admin-panel",
        },
      ],
      owner: [
        {
          label: "Owner Dashboard",
          path: "/owner-dashboard",
        },
      ],
    };
  
    // Configurar los items visibles según el rol del usuario.
    if (role_id === 1 || role_id === null) {
      return navConfig.client;
    } else if (role_id === 2) {
      return [...navConfig.client, ...navConfig.admin];
    } else if (role_id === 3) {
      return [...navConfig.client, ...navConfig.admin, ...navConfig.owner];
    }
    return [];
  };
  
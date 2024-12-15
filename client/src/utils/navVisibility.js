export const getVisibleNavItems = (role_id) => {
    const navConfig = {
      client: [
        {
          label: "Categorias",
          path: "/categorias",
          children: [
            {
              label: "Tecnologia",
              path: "/tecnologia",
            },
            {
              label: "Electro",
              path: "/electro",
            },
            {
              label: "Herramientas",
              path: "/herramientas",
            },
            {
              label: "Juguetes",
              path: "/juguetes",
            },
            {
              label: "Jardin",
              path: "/jardin",
            },
            {
              label: "Zapatillas",
              path: "/zapatillas",
            },
            {
              label: "OFERTAS!",
              path: "/ofertas",
            },
          ],
        },
        {
          label: "Todos los productos",
          path: "/todos-los-productos",
        },
        {
          label: "¿Donde estamos?",
          path: "/donde-estamos",
        },
        {
          label: "Quienes somos...",
          path: "/quienes-somos",
        },
        {
          label: "Contactanos",
          path: "/contactanos",
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
  
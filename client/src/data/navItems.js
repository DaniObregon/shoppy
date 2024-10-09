import { useNavigate } from "react-router-dom";

export const NAV_ITEMS = (role_id) => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Capilares",
      onClick: () => navigate("/capilares"),
      children: [
        {
          label: "Coloración",
          onClick: () => navigate("/coloracion"),
        },
        {
          label: "Styling",
          onClick: () => navigate("/styling"),
        },
        {
          label: "HairCare",
          onClick: () => navigate("/haircare"),
        },
        {
          label: "Forma",
          onClick: () => navigate("/forma"),
        },
      ],
    },
    {
      label: "Manos y Uñas",
      onClick: () => navigate("/manos-y-unas"),
      children: [
        {
          label: "Prueba children",
          onClick: () => navigate("/coloracion"),
        },
      ],
    },
    {
      label: "Maquillaje",
      onClick: () => navigate("/maquillaje"),
    },
    {
      label: "Equipamientos",
      onClick: () => navigate("/equipamientos"),
    },
    {
      label: "Estética y Spa",
      onClick: () => navigate("/estetica-y-spa"),
    },
  ];

  if (role_id >= 2) {
    items.push({
      label: "Admin Panel",
      onClick: () => navigate("/admin-panel"), // Ruta correcta para el panel de admin
    });
  }
  return items;
};

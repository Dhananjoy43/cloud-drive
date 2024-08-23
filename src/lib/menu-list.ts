import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Video,
  Image
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Transformations",
          active: pathname.includes("/transformations"),
          icon: SquarePen,
          submenus: [
            {
              href: "/transformations",
              label: "Smart Crop",
              active: pathname === "/transformations/smart-crop"
            },
            {
              href: "/transformations/generative-fill",
              label: "Generative Fill",
              active: pathname === "/transformations/generative-fill"
            },
            {
              href: "/transformations/compress-video",
              label: "Compress Video",
              active: pathname === "/transformations/compress-video"
            }
          ]
        },
        {
          href: "/images",
          label: "images",
          active: pathname.includes("/images"),
          icon: Image,
          submenus: []
        },
        {
          href: "/videos",
          label: "Videos",
          active: pathname.includes("/videos"),
          icon: Video,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}

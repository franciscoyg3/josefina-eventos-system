export type GalleryCategory = "Casamentos" | "Festas" | "Catering";

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

import { useStoreSelector } from "@/store/hooks";

export const getColor = (location: string) =>
  useStoreSelector(
    (state) => state.tile.court?.find((tile) => tile.location.includes(location))?.color
  );

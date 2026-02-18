


export const BASE_PADDING = 12;

export const LEVEL_PADDING = 12;


export const getItemPadding = (level: number, isFile: boolean) => {
  
    const fileOffset = isFile ? 16 : 0; // Additional offset for files to align with folder icons

    return BASE_PADDING + level * LEVEL_PADDING + fileOffset;

}
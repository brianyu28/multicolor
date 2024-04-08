export interface Color {
  name?: string;
  red: number;
  green: number;
  blue: number;
}

export const WHITE: Color = {
  red: 255,
  green: 255,
  blue: 255,
};

export const BLACK: Color = {
  red: 0,
  green: 0,
  blue: 0,
};

function valueToHex(value: number): string {
  const hexValue = value.toString(16);
  return hexValue.length == 1 ? `0${hexValue}` : hexValue;
}

// Logic adapted from https://github.com/woocommerce/woocommerce/blob/master/includes/wc-formatting-functions.php
export function colorIsLight(color: Color): boolean {
  return (color.red * 299 + color.green * 587 + color.blue * 114) / 1000 > 155;
}

export function colorToHexString(color: Color): string {
  return (
    "#" +
    valueToHex(color.red) +
    valueToHex(color.green) +
    valueToHex(color.blue)
  );
}

export function hexStringToColor(hexString: string): Color | null {
  if (hexString.startsWith("#")) {
    hexString = hexString.slice(1);
  }

  // Allow 3-digit hex shorthands
  if (hexString.length === 3) {
    hexString =
      hexString[0] +
      hexString[0] +
      hexString[1] +
      hexString[1] +
      hexString[2] +
      hexString[2];
  }

  // Ignore alpha value if present
  if (hexString.length === 8) {
    hexString = hexString.slice(0, 6);
  }

  if (hexString.length !== 6) {
    return null;
  }

  const red = parseInt(hexString[0] + hexString[1], 16);
  const green = parseInt(hexString[2] + hexString[3], 16);
  const blue = parseInt(hexString[4] + hexString[5], 16);

  if (isNaN(red) || isNaN(blue) || isNaN(green)) {
    return null;
  }

  return { red, green, blue };
}

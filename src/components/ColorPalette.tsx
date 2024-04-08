import { Color, colorIsLight, colorToHexString } from "../util/Color";
import "./ColorPalette.css";

interface ColorPaletteProps {
  colors: Color[];
  createNewColor: () => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export default function ColorPalette(props: ColorPaletteProps) {
  const { colors, createNewColor, selectedIndex, setSelectedIndex } = props;

  return (
    <div id="palette">
      {colors.map((color, i) => (
        <div>
          <button
            key={i}
            className="palette-button"
            onClick={() => setSelectedIndex(i)}
            style={{
              backgroundColor: colorToHexString(color),
              color: colorIsLight(color) ? "black" : "white",
              ...(selectedIndex === i ? { borderWidth: "3px" } : {}),
            }}
          >
            {color.name ?? ""}
          </button>
        </div>
      ))}
      <div>
        <button className="palette-button new-color" onClick={createNewColor}>
          New
        </button>
      </div>
    </div>
  );
}

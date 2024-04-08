import { RgbColorPicker } from "react-colorful";
import {
  Color,
  colorIsLight,
  colorToHexString,
  hexStringToColor,
} from "../util/Color";
import { useState } from "react";

import "./ColorDetail.css";

interface ColorDetailProps {
  color: Color;
  setColor: (color: Color) => void;
  deleteColor: (() => void) | null;
}

export default function ColorDetail(props: ColorDetailProps) {
  const { color, setColor, deleteColor } = props;
  const [hexInput, setHexInput] = useState<string | null>(null);

  const pickerColor = { r: color.red, g: color.green, b: color.blue };
  const hexColor = colorToHexString(color);

  function updateColor(updates: Partial<Color>, resetHexInput: boolean = true) {
    setColor({ ...color, ...updates });
    if (resetHexInput) {
      setHexInput(null);
    }
  }

  const setPickerColor = ({ r, g, b }: { r: number; g: number; b: number }) => {
    updateColor({ red: r, green: g, blue: b });
  };

  function handleHexInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHexInput(event.target.value);
    const newColor = hexStringToColor(event.target.value);
    if (newColor === null) {
      return;
    }
    updateColor(newColor, false);
  }

  return (
    <div id="color-detail">
      <RgbColorPicker color={pickerColor} onChange={setPickerColor} />
      <div id="color-settings">
        <div>
          <input
            id="color-name"
            type="text"
            value={color.name ?? ""}
            onChange={(event) => updateColor({ name: event.target.value })}
            style={{
              backgroundColor: hexColor,
              color: colorIsLight(color) ? "black" : "white",
            }}
          />
        </div>

        <div>
          <input
            id="color-hex"
            type="text"
            value={hexInput ?? hexColor}
            onChange={handleHexInputChange}
          />
        </div>

        <table>
          <tbody>
            <tr>
              <td>Red</td>
              <td>
                <ColorInput
                  type="range"
                  value={color.red}
                  setValue={(red) => updateColor({ red })}
                />
              </td>
              <td>
                <ColorInput
                  type="number"
                  value={color.red}
                  setValue={(red) => updateColor({ red })}
                />
              </td>
            </tr>

            <tr>
              <td>Green</td>
              <td>
                <ColorInput
                  type="range"
                  value={color.green}
                  setValue={(green) => updateColor({ green })}
                />
              </td>
              <td>
                <ColorInput
                  type="number"
                  value={color.green}
                  setValue={(green) => updateColor({ green })}
                />
              </td>
            </tr>

            <tr>
              <td>Blue</td>
              <td>
                <ColorInput
                  type="range"
                  value={color.blue}
                  setValue={(blue) => updateColor({ blue })}
                />
              </td>
              <td>
                <ColorInput
                  type="number"
                  value={color.blue}
                  setValue={(blue) => updateColor({ blue })}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {deleteColor !== null && (
          <button className="button" onClick={deleteColor}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

interface ColorInputProps {
  type: "range" | "number";
  value: number;
  setValue: (value: number) => void;
}

function ColorInput(props: ColorInputProps) {
  const { type, value, setValue } = props;
  return (
    <input
      className="color-input"
      tabIndex={type === "range" ? -1 : 0}
      type={type}
      min="0"
      max="255"
      value={value}
      onChange={(event) => setValue(parseInt(event.target.value))}
    />
  );
}

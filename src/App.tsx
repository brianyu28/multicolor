import { useState } from "react";
import "./App.css";

import { BLACK, Color, WHITE } from "./util/Color";
import ColorDetail from "./components/ColorDetail";
import ColorPalette from "./components/ColorPalette";
import { message, open, save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api";

export default function App() {
  const [colors, setColors] = useState<Color[]>([BLACK]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  function setColorAtIndex(index: number, color: Color) {
    setColors(colors.map((c, i) => (index === i ? color : c)));
  }

  function deleteColorAtIndex(index: number) {
    const newColors = colors.filter((_, i) => selectedIndex !== i);
    setColors(newColors);
    setSelectedIndex(index > 0 ? index - 1 : 0);
  }

  function createNewColor() {
    const newColors = [...colors, BLACK];
    setColors(newColors);
    setSelectedIndex(newColors.length - 1);
  }

  async function importColors() {
    try {
      const filename = await open({
        filters: [
          {
            extensions: ["multicolor"],
            name: "Multicolor",
          },
        ],
      });
      if (!filename) {
        return;
      }
      const colors: Color[] = await invoke("import", { path: filename });
      setColors(colors);
    } catch (error) {
      await message(error as string, { title: "Multicolor", type: "error" });
    }
  }

  async function exportColors() {
    try {
      const filename = await save({
        filters: [
          {
            extensions: ["multicolor"],
            name: "Multicolor",
          },
        ],
      });
      if (!filename) {
        return;
      }
      invoke("export", { colors, path: filename });
    } catch (error) {
      await message(error as string, { title: "Multicolor", type: "error" });
    }
  }

  return (
    <div id="container">
      <ColorPalette
        colors={colors}
        createNewColor={createNewColor}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <div id="controls">
        <button className="button" onClick={importColors}>
          Import
        </button>
        <button className="button" onClick={exportColors}>
          Export
        </button>
      </div>
      <hr />
      <ColorDetail
        color={colors[selectedIndex]}
        setColor={(color) => setColorAtIndex(selectedIndex, color)}
        deleteColor={
          colors.length > 1 ? () => deleteColorAtIndex(selectedIndex) : null
        }
      />
    </div>
  );
}

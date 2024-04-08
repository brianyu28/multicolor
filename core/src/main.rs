#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
struct Color {
    name: Option<String>,
    red: i32,
    green: i32,
    blue: i32,
}

#[tauri::command]
fn import(path: &str) -> Result<Vec<Color>, &'static str> {
    let Ok(text) = fs::read_to_string(path) else {
        return Err("Could not read file");
    };
    let Ok(colors) = serde_json::from_str::<Vec<Color>>(&text) else {
        return Err("Invalid color file");
    };
    Ok(colors)
}

#[tauri::command]
fn export(colors: Vec<Color>, path: &str) -> Result<(), &'static str> {
    let Ok(serialized_colors) = serde_json::to_string(&colors) else {
        return Err("Could not generate file from colors");
    };
    let Ok(_) = fs::write(path, serialized_colors) else {
        return Err("Could not export file");
    };
    Err("")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![import, export])
        .run(tauri::generate_context!())
        .expect("Error while running application");
}

#!/bin/bash

SRC_SCOPE="@boonya.dev"
TARGET_SCOPE="@boonya"

for pkg_dir in packages/*; do
  pkg="$pkg_dir/package.json"

  # Змінити name та всі залежності, які мають старий скоуп
  jq --arg src "$SRC_SCOPE" --arg tgt "$TARGET_SCOPE" '
    .name |= sub("^" + $src + "/"; $tgt + "/") |
    if .dependencies then
      .dependencies |= with_entries(
        if .key | test("^" + $src + "/") then
          .key |= sub("^" + $src + "/"; $tgt + "/")
        else . end
      )
    else . end |
    if .devDependencies then
      .devDependencies |= with_entries(
        if .key | test("^" + $src + "/") then
          .key |= sub("^" + $src + "/"; $tgt + "/")
        else . end
      )
    else . end
  ' "$pkg" > "$pkg_dir/package.tmp.json" && mv "$pkg_dir/package.tmp.json" "$pkg"
done

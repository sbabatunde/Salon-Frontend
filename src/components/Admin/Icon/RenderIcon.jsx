import React, { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";

// List of icon names you want to allow for selection (can be expanded)
const ICON_NAMES = [
  "Scissors",
  "Brush",
  "Sparkles",
  "Flower2",
  "Star",
  "Heart",
  "Sun",
  "Moon",
  "Cloud",
  "Zap",
  "Anchor",
  "Bell",
  "Camera",
  "Coffee",
  "Gift",
  "Globe",
  "Home",
  "Music",
  "Phone",
  "Smile",
];

// Helper to render icon by name
function RenderIcon({ iconName, className }) {
  const IconComponent = LucideIcons[iconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

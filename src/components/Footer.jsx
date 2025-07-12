import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 py-6 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} PlantVision. All rights reserved. | Made with 🌿 by nature enthusiasts.
      </p>
    </footer>
  );
}

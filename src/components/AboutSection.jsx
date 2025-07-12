import React from "react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
          About PlantVision
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          PlantVision is a modern web tool that helps you identify plants with just a photo. Whether you're a gardener,
          nature lover, or curious explorer — PlantVision makes plant recognition quick, accurate, and fun.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Powered by advanced image recognition, our tool analyzes leaves, flowers, and features to identify plant
          species and provide useful taxonomy information like genus, common names, and Wikipedia links.
        </p>
      </div>
    </section>
  );
}

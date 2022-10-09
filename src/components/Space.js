// Import Style Sheet
import ".//Space.css";

// Import useEffect Hook
// Tell React that your component needs to do something after render
import React, { useEffect } from "react";

// Import Three.js
import * as THREE from "three";

// Import Orbit Controls package from Three.js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Space() {
    useEffect(() => {});

    return <canvas id="sun_canvas"></canvas>;
}

export default Space;

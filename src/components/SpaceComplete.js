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
    useEffect(() => {
        // Create scene and renderer
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#sun_canvas"),
        });

        // Fit canvas to window
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create a camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // Use mouse to control camera position
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.zoomSpeed = 0.5;
        controls.rotateSpeed = 0.8;
        controls.minDistance = 2;
        controls.maxDistance = 200;

        // Update camera position
        camera.position.set(0, 1, 5);
        // Controls.update() must be called after any manual changes to the camera's transform
        controls.update();

        // Add Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        // Create stars function
        function addStar() {
            // Create geometry with radius, horizontal mesh amount, vertical mesh amount
            const starGeometry = new THREE.SphereBufferGeometry(0.25, 24, 24);
            // Create mesh material
            const starMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
            });
            // Create star object with geometry and material
            const star = new THREE.Mesh(starGeometry, starMaterial);
            // Create star position x y z as random numbers from 0 to 200
            const [x, y, z] = Array(3)
                .fill()
                .map(() => THREE.MathUtils.randFloatSpread(200));
            star.position.set(x, y, z);
            // Add star to scene
            scene.add(star);
        }
        // Create 1000 stars
        Array(1000).fill().forEach(addStar);

        // Create geometry with radius, horizontal mesh amount, vertical mesh amount
        const sunGeometry = new THREE.SphereBufferGeometry(1, 100, 100);
        // Load a picture as texture
        const sunTexture = new THREE.TextureLoader().load("/images/sun.jpeg");
        // Create mesh material
        const sunMaterial = new THREE.MeshBasicMaterial({
            map: sunTexture,
            wireframe: false,
        });
        // Create sun object with geometry and material
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        // Add sun to scene
        scene.add(sun);

        // Render the scene!
        renderer.render(scene, camera);

        // Update Each Frame
        function animate() {
            // Callback function to update animation for next repaint
            requestAnimationFrame(animate);

            // Update Camera Screen Ratio upon Window Resize
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Update Object
            sun.rotation.x += -0.0001;
            sun.rotation.y += 0.002;

            // Rerender
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    });

    return <canvas id="sun_canvas"></canvas>;
}

export default Space;

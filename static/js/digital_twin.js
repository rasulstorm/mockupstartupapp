document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("twin-container");

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(20, 20, 20);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Hangar structure
    const hangarGeometry = new THREE.BoxGeometry(40, 10, 20);
    const hangarMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.7, // Semi-transparent walls
    });
    const hangar = new THREE.Mesh(hangarGeometry, hangarMaterial);
    hangar.position.set(0, 5, 0); // Raise hangar above ground
    scene.add(hangar);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(40, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Lay the floor flat
    floor.receiveShadow = true;
    scene.add(floor);

    // Create racks
    const racks = [];
    const rackMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    for (let row = 0; row < 5; row++) {
        for (let level = 0; level < 4; level++) {
            const rackGeometry = new THREE.BoxGeometry(2, 2, 3); // Width, height, depth
            const rack = new THREE.Mesh(rackGeometry, rackMaterial);
            rack.position.set(-15 + row * 6, 1 + level * 2, 0); // Position racks
            rack.castShadow = true;
            rack.receiveShadow = true;
            racks.push(rack);
            scene.add(rack);
        }
    }

    // Camera setup
    camera.position.set(40, 20, 40);
    camera.lookAt(0, 5, 0); // Look at the hangar

    // Orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

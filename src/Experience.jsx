import {
	PresentationControls,
	useGLTF,
	Environment,
	Float,
	Stars,
	Html,
	Text,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
export default function Experience() {
	const [isHovered, setIsHovered] = useState(false);

	const { size, camera } = useThree();

	const laptopRef = useRef();

	useEffect(() => {
		camera.aspect = size.width / size.height;
		camera.updateProjectionMatrix();
		if (size.width < 500) {
			computer.scene.scale.setScalar(1);
		}
	}, [size]);

	const { bgColor } = useControls({
		bgColor: "#141217",
	});

	const computer = useGLTF(
		"https://threejs-journey.com/resources/models/macbook_model.gltf"
	);

	const onPointerEnter = () => setIsHovered(true);
	const onPointerLeave = () => setIsHovered(false);
	useFrame(() => {
		if (laptopRef.current) {
			const targetScale = isHovered ? 1.3 : 1; 
			laptopRef.current.scale.lerp(
				{ x: targetScale, y: targetScale, z: targetScale },
				0.1 
			);
		}
	});
	return (
		<>
			<Environment preset="city" />
			<color args={[bgColor]} attach="background" />
			<Stars
				radius={100}
				depth={50}
				count={5000}
				factor={4}
				saturation={0}
				fade
				speed={1}
			/>
			<PresentationControls
				global
				rotation={[0.13, -0.2, 0]}
				polar={[-0.4, 0.2]}
				azimuth={[-1, 0.8]}
				config={{ mass: 2, tension: 400 }}
				snap={{ mass: 4, tension: 400 }}
			>
				<Float rotationIntensity={0.5}>
					<rectAreaLight
						width={2.5}
						height={1.65}
						intensity={85}
						color="#e9b966"
						rotation={[0.1, Math.PI, 0]}
						position={[0, 0.55, -1.15]}
					/>
					<primitive ref={laptopRef} object={computer.scene} position-y={-1.5}>
						<Html
							wrapperClass="htmlScreen"
							transform
							distanceFactor={1.17}
							position={[0, 1.56, -1.4]}
							rotation-x={-0.256}
						>
							<iframe
								onPointerEnter={onPointerEnter}
								onPointerLeave={onPointerLeave}
								src={"https://kodix.ru/"}
							/>
						</Html>
					</primitive>
				</Float>
				<Text
					font="./bangers-v20-latin-regular.woff"
					position={[2.4, 0.75, 0.45]}
					fontSize={1.2}
					rotation-y={-1.25}
					textAlign="center"
				>
					KODIX
					{"\n"}
					
				</Text>
			</PresentationControls>
		</>
	);
}

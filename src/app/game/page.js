import CityScene from "@/components/cityScene";

export default function gamePage() {
  THREE.Cache.clear();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <CityScene />
    </div>
  );
}

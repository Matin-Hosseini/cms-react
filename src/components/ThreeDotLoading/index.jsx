import "./index.css";

const ThreeDotsLoading = ({ color }) => {
  return (
    <div
      className="loader"
      style={{
        "--_g": `no-repeat radial-gradient(circle closest-side, ${
          color || "#000"
        } 90%, #0000)`,
      }}
    ></div>
  );
};

export default ThreeDotsLoading;

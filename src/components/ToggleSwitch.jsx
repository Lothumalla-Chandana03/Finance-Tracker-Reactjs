import { useDataSource } from "../context/DataSourceContext";

export default function ToggleSwitch() {
  const { useApi, setUseApi } = useDataSource();

  // Inline style for container
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end", // push to right
    gap: "10px",
    fontWeight: 600,
    color: "#1f2937",
    width: "100%", // take full width of parent
    marginTop: "10px",
  };

  return (
    <label style={containerStyle}>
      API Data
      <input
        type="checkbox"
        checked={useApi}
        onChange={() => setUseApi(!useApi)}
      />
    </label>
  );
}

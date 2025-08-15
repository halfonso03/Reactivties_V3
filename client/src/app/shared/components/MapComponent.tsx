import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
type Props = {
	position: [number, number];
	venue: string;
};
export default function MapComponent({ position, venue }: Props) {
	// const position = [25.8015232, -80.3536896];

	return (
		<MapContainer
			center={position}
			zoom={13}
			scrollWheelZoom={false}
			style={{ height: "100%" }}>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={position}>
				<Popup>{venue}</Popup>
			</Marker>
		</MapContainer>
	);
}

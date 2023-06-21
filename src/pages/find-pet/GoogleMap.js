import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Modal } from "antd";
const MyMapComponent = withScriptjs(withGoogleMap((props) => {

    const handleClick = (e) => {
        console.log('Selected location:', e.latLng.lat(), e.latLng.lng());
        props.setGeolocation({
            lat: e.latLng.lat()
            , lon: e.latLng.lng()
        })
    }

    return <GoogleMap
        defaultZoom={8}
        onClick={handleClick}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {props.isMarkerShown && <Marker
            position={{ lat: props.geolocation.lat, lng: props.geolocation.lon }}
        />}
    </GoogleMap>
}
))



export default function GoogleMap1(props) {
    const handleOk = () => {
        props.onGetLocation1()
        props.setIsModalOpen(false);
    };

    const handleCancel = () => {
        props.setIsModalOpen(false);
    };
    return (
        <Modal title="GoogleMap" open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                geolocation={props.geolocation}
                setGeolocation={props.setGeolocation}
            />
        </Modal>

    )
}


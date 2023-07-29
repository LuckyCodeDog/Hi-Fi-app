import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet ,View } from 'react-native';
import SlideUpMenu from './SlideUpMenu';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: "100%",
   width: "100%",
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

const Map =  () => (
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       initialRegion={{
         latitude: -43.64532061931982,
         longitude: 172.4642259485763,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
);

export default Map
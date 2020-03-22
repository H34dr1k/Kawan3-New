import React from "react";
import { Container } from "native-base";
import MapContainer from "./MapContainer";


import { connect } from "react-redux";
import {
    getCurrentLocation
} from "../module/home";

class Home extends React.Component {
    componentDidMount() {
        this.props.getCurrentLocation();
    }    
    render() {
        
        const region = {
            latitude: -0.021250,
            longitude: 109.336929,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        return (
            <Container>
                <MapContainer region={region} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    region: state.home.region,
});
const mapActionCreators = {
    getCurrentLocation
};

export default connect(mapStateToProps, mapActionCreators,Home);

// import React fro./node_modules/reactact";
// import { View, Text } from "react-native";
// import { Actions } fro./node_modules/react-native-router-fluxlux";

// import { Container } from "native-base";

// import MapContainer from "./MapContainer";
// import HeaderComponent from "../../../components/HeaderComponent";
// import FooterComponent from "../../../components/FooterComponent";
// import Fare from "./Fare";
// import Fab from "./Fab";
// import FindDriver from "./FindDriver";
// const taxiLogo = require("../../../assets/img/taxi_logo_white.png");
// const carMarker = require("../../../assets/img/carMarker.png");
// class Home extends React.Component {

//     componentDidMount() {
//         var rx = this;
//         this.props.getCurrentLocation();
//         setTimeout(function () {
//             rx.props.getNearByDrivers();

//         }, 1000);
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if (this.props.booking.status === "confirmed") {
//             Actions.trackDriver({ type: "reset" });
//         }
//         this.props.getCurrentLocation();
//     }

//     render() {
//         const region = {
//             latitude: 3.146642,
//             longitude: 101.695845,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421
//         }
//         const { status } = this.props.booking;
//         return (
//             <Container>
//                 {(status !== "pending") &&
//                     <View style={{ flex: 1 }}>
//                         <HeaderComponent logo={taxiLogo} />
//                         {this.props.region.latitude &&
//                             <MapContainer region={this.props.region}
//                                 getInputData={this.props.getInputData}
//                                 toggleSearchResultModal={this.props.toggleSearchResultModal}
//                                 getAddressPredictions={this.props.getAddressPredictions}
//                                 resultTypes={this.props.resultTypes}
//                                 predictions={this.props.predictions}
//                                 getSelectedAddress={this.props.getSelectedAddress}
//                                 selectedAddress={this.props.selectedAddress}
//                                 carMarker={carMarker}
//                                 nearByDrivers={this.props.nearByDrivers}
//                             />
//                         }

//                         <Fab onPressAction={() => this.props.bookCar()} />
//                         {
//                             this.props.fare &&
//                             <Fare fare={this.props.fare} />
//                         }
//                         <FooterComponent />

//                     </View>
//                     ||
//                     <FindDriver selectedAddress={this.props.selectedAddress} />
//                 }

//             </Container>

//         );

//     }
// }

// export default Home;
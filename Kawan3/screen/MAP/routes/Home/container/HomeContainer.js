
import React,  {Component} from 'react';
import { connect } from "react-redux";
import Home from "../components/Home";
import {getCurrentLocation} from "../module/home";

const mapStateToProps = (state) => ({
    region: state.home.region,
});
const mapActionCreators = { 
    getCurrentLocation
};

export default connect(mapStateToProps, mapActionCreators)(Home);
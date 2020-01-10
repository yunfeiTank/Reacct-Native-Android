import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
const { width, height } = Dimensions.get('window')
import loadingImage from '../assets/gif/loading3.gif'
class LoadingView extends Component{
    constructor(props) {
        super(props);
    }
    _close(){
        console.log("onRequestClose ---- ")
    }
    render() {
        const { showLoading, opacity, backgroundColor } = this.props
        return (
            <Modal onRequestClose={() => this._close()} visible={showLoading} transparent>
                <View style={ [styles.loadingView, {opacity: opacity||0.3, backgroundColor: backgroundColor||'#000'}]}></View>
                <View style={ styles.loadingImageView }>
                    <View style={ styles.loadingImage }>
                        {
                            this.props.loadingViewClick?
                            <TouchableOpacity onPress={ this.props.loadingViewClick }>
                                <Image style={ styles.loadingImage } source={ loadingImage }/>
                            </TouchableOpacity>
                            :
                            <Image style={ styles.loadingImage } source={ loadingImage }/>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        height,
        width,
        position: 'absolute'
    },
    loadingImage: {
        width: 150,
        height: 100,
    },
    loadingImageView: {
        position: 'absolute',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
// LoadingView.propTypes = {
//     loadingViewClick: React.PropTypes.func, //.isRequired,
//     showLoading: React.PropTypes.bool.isRequired,
//     opacity: React.PropTypes.number,
//     backgroundColor: React.PropTypes.string
// }


export default LoadingView
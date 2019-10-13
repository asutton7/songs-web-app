import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import SongEditor from '../SongEditor/SongEditor';
import SongsNav from '../SongsNav/SongsNav';
import classes from './Layout.module.css';
import Navbar from '../../components/Navbar/Navbar';
import OverlayContainer from '../OverlayContainer/OverlayContainer';
import firebase from '../../firebase';
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
  
} from "@react-firebase/auth";
import 'firebase/auth';
import Authentication from '../Authentication/Authentication';
import ToolboxSlider from '../../components/ToolboxSlider/ToolboxSlider';
import '../../react-transitions/react-transitions.css';

class Layout extends Component {
    state = {
        metronomeVis: false,
        tunerVis: false,
        toolboxVis: false,
        loadingAuth: true
    }
    
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            this.setState({loadingAuth: false});
        });
    }

    toggleMetronomeVis = () => {
        this.setState({metronomeVis: !this.state.metronomeVis});
    }

    toggleTunerVis = () => {
        this.setState({tunerVis: !this.state.tunerVis});
    }

    toggleToolboxVis = () => {
        this.setState({toolboxVis: !this.state.toolboxVis});
    }

    googleAuthSignIn = () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
    }

    googleAuthSignOut =() => {
        firebase.auth().signOut();
    }
    
    render () {    
        let content = null;
        if(this.state.loadingAuth) {
            content = (<div className={classes.loadingScreen}>
                            <p>songs</p>
                            <div className={classes.loadingIcon}></div>
                        </div>)
        }else {
            content = (            
                <React.Fragment>
                    <Navbar signOutFunc={this.googleAuthSignOut} />  
                        <IfFirebaseAuthed>
                            <OverlayContainer 
                                showMet={this.state.metronomeVis} 
                                toggleMet={this.toggleMetronomeVis}
                                showTuner={this.state.tunerVis}
                                toggleTuner={this.toggleTunerVis}
                                />
                            <ToolboxSlider expandTools={this.state.toolboxVis} toggleToolbox={this.toggleToolboxVis} toggleMet={this.toggleMetronomeVis} toggleTuner = {this.toggleTunerVis}/>
                            <React.Fragment>
                            <div className={[classes.mobileMc, classes.MainContent, 'transition-container'].join(' ')}>
                                <Route path='/' exact component={SongsNav}  />
                                <Route path='/:username/:id/:title' exact component={SongEditor}/> 
                            </div>
                            </React.Fragment>
                        </IfFirebaseAuthed>
                        <IfFirebaseUnAuthed>
                            <Authentication className={classes.MainContent} authFunc={this.googleAuthSignIn}/>
                        </IfFirebaseUnAuthed>
                </React.Fragment>
            )
        }
        return (
            <FirebaseAuthProvider  firebase={firebase}>
                {content}
            </FirebaseAuthProvider>

        )
    }
}

export default withRouter(Layout);
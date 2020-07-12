import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Draggable from "react-draggable";
import axios from 'axios';
import actionCable from 'actioncable';

const cable = actionCable.createConsumer('ws://localhost:3000/cable');

let channel = cable.subscriptions.create({
    channel: `PositionChannel`,
    id: 1
},{
    connected: () => {
        console.log("connected!")
    },
    disconnected: () => {},
    received: data => {}
});

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x: false,
            y: false,
        }
    }
    componentDidMount() {
        this.getData()
    }

    getData() {
        axios.get('http://localhost:3000/positions/1.json')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    x: response.data.x,
                    y: response.data.y})
            })
    }
    handleStart(e, data) {
        // console.log(data)
    };

    handleEnd(e, data) {
        // axios.put('http://localhost:3000/positions/1.json', {x: data.x, y: data.y})
        //     .then(() => {
        //         console.log('done')
        //     })
        channel.send({
            x: data.x,
            y: data.y
        });
    }

    render() {
        if (this.state.x === false)
            return null;
        return (
        <Draggable
            defaultPosition={{x: this.state.x, y: this.state.y}}
            position={null}
            offsetParent={document.body}
            onStart={this.handleStart}
            onStop={this.handleEnd}
            scale={1}
        >
            <div className="">
                <h1 className="">This is a titles</h1>
                <p className="">
                    And this is some text to display.
                </p>
                <hr className="my-4"/>
                <Link
                    to="/"
                    className=""
                    role="button"
                >
                    A legit button
                </Link>
            </div>
        </Draggable>
        )}
}

export default Home;
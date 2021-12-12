import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timer: 0,
            timerIntervalId: 0
        }
        this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
        this.handleBreakIncrease = this.handleBreakIncrease.bind(this);
        this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
        this.handleSessionIncrease = this.handleSessionIncrease.bind(this);
        this.updateTimerLength = this.updateTimerLength.bind(this);
    }

    componentDidMount() {
        this.updateTimerLength();
    }

    componentDidUpdate() {
        //console.log("componentDidUpdate: ", this.state.sessionLength);
    }

    updateTimerLength() {
        this.setState((state) => {
            let dateNow = new Date();
            let dateDiff = new Date().setMinutes(dateNow.getMinutes() + state.sessionLength);
            //console.log("updateSessionLength: ", state.sessionLength);
            return { timer: dateDiff - dateNow }
        });
    }

    handleBreakDecrease(event) {
        event.preventDefault();
        this.setState((state) => {
            return { breakLength: state.breakLength - 1 }
        })
    }

    handleBreakIncrease(event) {
        event.preventDefault();
        this.setState((state) => {
            return { breakLength: state.breakLength + 1 }
        })
    }

    handleSessionDecrease(event) {
        event.preventDefault();
        this.setState((state) => {
            return { sessionLength: state.sessionLength - 1 }
        });
        this.updateTimerLength();
    }

    handleSessionIncrease(event) {
        event.preventDefault();
        this.setState((state) => {
            return { sessionLength: state.sessionLength + 1 }
        });
        this.updateTimerLength();
    }

    formatTimer() {
        let options = {
            minute: '2-digit',
            second: '2-digit'
        }
        let formattedTime = new Intl.DateTimeFormat('default', options).format(this.state.timer);
        return formattedTime;
    }

    tickTimer() {
        this.setState((state) => {
            return { timer: state.timer - 1000 }
        })
    }

    startTimer(event) {
        event.preventDefault();
        this.setState((state) => {
            return { timerIntervalId: setInterval(this.tickTimer(), 1000) }
        });
    }

    pauseTimer(event) {
        event.preventDefault();
        this.setState((state) => {
            return { timerIntervalId: clearInterval(state.timerIntervalId) }
        });
    }

    resetTimer(event) {
        // To do
    }

    render() {
        return (
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-2 border p-2 m-2">
                        <div className="text-center">
                            <p id="timer-label">Session/Break</p>
                            <p id="time-left">
                                {this.formatTimer()}
                            </p>
                            <button className="btn btn-primary m-1">
                                <i className="bi bi-play"></i>
                            </button>
                            <button className="btn btn-primary m-1">
                                <i className="bi bi-pause"></i>
                            </button>
                            <button className="btn btn-primary m-1">
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                        </div>

                    </div>
                    <div className="col-2 border p-2 m-4">
                        <div className="text-center">
                            <p id="session-label">Session Length</p>
                            <p id="session-length">{this.state.sessionLength}</p>
                            <button className="btn btn-primary m-1" id="session-decrement" onClick={this.handleSessionDecrease}>
                                <i className="bi bi-plus"></i>
                            </button>
                            <button className="btn btn-primary m-1" id="session-decrement" onClick={this.handleSessionIncrease}>
                                <i className="bi bi-dash"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-2 border p-2 m-4">
                        <div className="text-center">
                            <p id="break-label">Break Length</p>
                            <p id="break-length">{this.state.breakLength}</p>
                            <button className="btn btn-primary m-1" id="break-decrement" onClick={this.handleBreakDecrease}>
                                <i className="bi bi-plus"></i>
                            </button>
                            <button className="btn btn-primary m-1" id="break-increment" onClick={this.handleBreakIncrease}>
                                <i className="bi bi-dash"></i>
                            </button>

                        </div>
                    </div>
                    <div className="col-12">
                        <h4>25 + 5 Clock</h4>
                    </div>
                </div>
            </div>
        )
    }
}